/*------Yichao--------*/    

/*
	clockIn();     	   					Call Person Class clockIn , then checkOpenCard()
	clockOut();         				Call Person Class clockOut, then checkOpenCard()
	checkOpenCard();    				Ajax check current state, and display info. Call updateTotalPanel() if is check in.
		--> displayInfo(jsonObj) 		Display info in the jsonObj. 
	updateTotalPanel();					Update timer at Total hr panel.
	updateClock();                  	Update clock.
	
	displayTimeDiff(id, t, endtext);	Static time different between t and now. 
	displayTimer(id, t, timerid);		Ticking timer start from the diff between t and now.        							   
	displayTime(id, t); 				Static time at t.
	
	timerid[];							0: opencard area timer
										1: total time to year timer
										2: total time to month timer
										3: total time to week timer
										4: total time today timer  
*/    

var CP = CP || {};

CP = {
    overlay:{},
    options:{
        BaseURI:"/index.php/"
    }
}; 
   

(CP.overlay = {
    init: function(){
        var o = CP.options;

        this._self = new Element("div", {
			id:"cpOverlay"
		})
		 
		// request overlay's html content from tpl
		new Request.HTML({
			url: o.BaseURI + 'admin/export',
			onRequest: function(){
			},			
			onComplete: function(response){				
				CP.overlay._self.adopt(response);
			}   
		}).send();   
		
    },      
    
    load: function(){
        var e = this._self;
        e.setStyles({
            display :'none',
            width   :1,
            height  :1
        });           
                  
        $(document.body).adopt(e);
    },
    
    open: function(){ 
        var e = this._self;
            
        e.setStyles({
            left    :(window.getWidth()/2-250),
            width   : 500, 
            height  :'auto',
            display :'block'  
        });  
        
        e.getElements('input[name=period]').addEvents({
            click:function(){
                var period = this.get('value'),
                start, 
                end;

                start = period.split("|")[0];
                end = period.split("|")[1];
                
                e.getElements('input[name=exdate-start]').set('value',start);
                e.getElements('input[name=exdate-end]').set('value',end);
            }
        })

        e.getElement('input.cancel').addEvents({
            click: function(){
                CP.overlay.close();
            }
        })
    },
    
    close: function(){
        var e = CP.overlay._self;
        e.setStyles({
            display: 'none'
        });
    }   
    
}).init();

/*
	Setting Base URI
*/
var BaseURI = "/index.php/";

var clockIn = function(){
	var fx = new Fx.Morph('opencard', {duration: 1000})
	var request = new Request({
		url: BaseURI + '3cabfab8f977ae7d12a3773423acf849/clockin.json?t=' + Math.random(),
		method: 'get',
		onRequest: function(){
			fx.set('html','<a>Loading...</a>');
		},
		onSuccess: function(jsonObj){
			$('clockbtn').set('html', '<a href=\"#\" id=\"clock_out\" onclick="clockOut()" class=\"red\ readonly">Clock out</a>');
			$('status').set('text', 'Clocked In');
			var clock = $('t-today').get('html');
			var tri = clock.split(':');
			var s   = tri[0]*3600+tri[1]*60+tri[2]*1;
			$('t-today').set('text', s);
			updateTotalPanel();						
			
			if($('day-list')!=null){
				$('opencard').set('html','You are now clocked in.');
				$('timer0tag').set('html','');
				$('timer0').set('html',''); 
			    fx.start().chain(function(){
				   this.start.delay(1000,this,{
					    'opacity' : [1,0] 
				   });
				}).chain(function(){
							checkOpenCard();
							this.start({
		   						'opacity' : 1
							});
			   	}) 
	    	}
		}
	}).send()
}

var clockOut = function(){
	var fxc = new Fx.Morph('clockbtn', {duration: 2000})
	var fxo = new Fx.Morph('opencard', {duration: 2000})
	var request = new Request({
		url: BaseURI + '3cabfab8f977ae7d12a3773423acf849/clockout.json?t=' + Math.random(), 
		method: 'get',
		onRequest: function(){
			if($('day-list')!=null){
		   		$('opencard').set('text', 'Loading...')
			}
		},
		onSuccess: function(jsonObj){
			var jsonDecoded = JSON.decode(jsonObj)
			$('status').set('text', 'Clocked Out');
			$('clockbtn').set('html', '<a href=\"#\" id=\"clock_in\" class=\"green\">Clock in</a>');
			$('clock_in').addEvent('click', clockIn);
			for (x in timerids){$clear(timerids[x])};
			if($('day-list')!=null){
				displayInfo(jsonDecoded[0].card);
			}	
		}
	}).send()
	
	var displayInfo = function(item){
		$('opencard').set('text', 'You are now clocked out.');
		$('timer0tag').set('text', 'Last session: ');
     
	}
}

var checkOpenCard = function(){ 
    console.log('ran');
	var request = new Request({
		url: BaseURI + '3cabfab8f977ae7d12a3773423acf849/opencard.json?t=' + Math.random(),
		method: 'get',
		onRequest: function(){
		},
		onSuccess: function(jsonObj){
			Rose.ui.statusMessage.hide(); 
            // console.log(jsonObj);
			var jsonDecoded = JSON.decode(jsonObj);
			displayInfo(jsonDecoded[0].opencard);
		}
	}).send();
	
	var fxli = new Fx.Morph('opencardli', {duration: 1000})
	var displayInfo = function(item){
		if (typeof item == 'undefined'){
			$('opencard').set('text', 'Clocked out');
		} else if(typeof item.opencard == 'undefined') {
			$('opencard').set('text', 'Clocked out');
		} else {
			$('clockbtn').set('html', '<a href=\"#\" id=\"clock_out\" class=\"red\">Clock out</a>');
			$('timer0tag').set('text', 'You worked: ');
			displayTimeDiff('opencard', item.opencard.timein, ' - Current');
			displayTimer('timer0', item.opencard.timein, 0);
			$('clock_out').addEvent('click', clockOut);
		}
		fxli.start({
			'opacity' : [0,1]
		});
	};   
}

var displayTimeDiff = function(id,t,endtext){
	var d = new Date(t*1000);
	var h = d.getHours();
	var m = d.getMinutes();
	m=(m<10?"0":"")+m;
	var apm = ( h < 12 ) ? "AM" : "PM";
  	h = ( h > 12 ) ? h - 12 : h;
  	h = ( h == 0 ) ? 12 : h;
	h=(h<10?"0":"")+h;          
	$(id).set('html', h +':'+ m +' '+apm + endtext);
};   

var updateTotalPanel = function(){    
	if ($('status').get('text').trim()=="Clocked In"){
		timer_i=1;
		updateToltime = function(value, id){
			value = (Number(value)+0.01).toFixed(2);
			$(id).set('text', value+" hr");
			timerids[timer_i]=setTimeout('updateToltime('+value+',"'+id+'")', 36000);
			timer_i++; 
			if (timer_i==4){timer_i=1};
			//console.log(timerids);
		}  
		$('totalhr').getElements('div').getElements('span').each(function(div){
			if (div.get('id').toString()=="t-today"){
				displayTimer("t-today", ($time()/1000)-($('t-today').get('html')), 4);
			}else{
				var str = div.get('html').toString();
				updateToltime(str.split(" ",1).toString(),div.get('id').toString());                
			}
		});
	}else{
		displayTime("t-today",$('t-today').get('html'))
	}                                 
}; 

var displayTimer = function(id, t, timerid){
	var now = new Date();
	var diff = Math.floor((now/1000)-t);
	var s = Math.floor(diff % 60);
		s=(s<10?"0":"")+s;
	 	diff = diff/60;
	var m = Math.floor(diff % 60);
		m=(m<10?"0":"")+m;
	 	diff = diff/60;
	var h = Math.floor(diff % 60)
	$(id).set('html', h+':'+m+':'+s);
	timerids[timerid] = setTimeout('displayTimer("'+id+'",'+t+','+timerid+')', 1000);
}  

var displayTime = function(id,seconds){
	var t = seconds;
	var s = t % 60;
		s=(s<10?"0":"")+s;
		t = Math.floor(t/60);
	var m = t % 60;
		m=(m<10?"0":"")+m;
		t = Math.floor(t/60);
	var h = t % 60;
	$(id).set('html', h+":"+m+":"+s); 
}

var updateClock = function(id){
	var d = new Date();
 	var h = d.getHours();
 	var m = d.getMinutes();
  	var s = d.getSeconds();
  	m = ( m < 10 ? "0" : "" ) + m;
  	s = ( s < 10 ? "0" : "" ) + s;
  	var apm = ( h < 12 ) ? "AM" : "PM";
  	h = ( h > 12 ) ? h - 12 : h;
  	h = ( h == 0 ) ? 12 : h;
  	var outstr = h + ":" + m + ":" + s + " " + apm;
  	// Update the time display
  	$(id).set('html', outstr);
	var id2 = id;
	setTimeout('updateClock("'+id2+'")', 1000);
}


/*
	Admin 
*/
document.addEvent('domready', function(){
	/*
		Init Status Message
	*/
	Rose.ui.statusMessage.setOptions({'container':$(document.body), 'id':"status-message"});
	//Rose.ui.statusMessage.display( 'User setting saved.', 'error' );
	
	if( window.location.search.length && window.location.search.indexOf('message=') != -1 ) {			
			var data = new URI(window.location.href).get('data'),
				msgStr = data.message.replace(/[^a-zA-Z0-9\.\!\?\:\-\\\/\*]/g, ' '),
				msgType = data.type;
				Rose.ui.statusMessage.display( msgStr, msgType );	
	} 
	
	
	if($('admin-others')==null){
		return;
	}
	
	$$('table#admin-others tr:even').addClass('alt'); 
	
	/*
		export
	*/
	CP.overlay.load();
	
	$('export').addEvent('click',function(){
		CP.overlay.open();
	});         
	
	/*
		edit mode button
	*/
	if($('edit-mode')!=null){
		$('edit-mode').addEvent('click', function(){
			if ($('edit-mode').hasClass('clicked')){
				$('edit-mode').removeClass('clicked');
				$$('#add-user + input').removeProperty('readonly');
				$$('#add-user + input').removeEvents('click');
				$$('#admin-others tr[class!=title]').each(function(el){
					if (!el.hasClass('in')){
						el.tween('color','#444');
					}
					el.removeEvents();
					$('crud-form').empty();
					$('crud-time').empty();					
				});
			}else{
				$('edit-mode').addClass('clicked');
				$$('#add-user + input').set('readonly','readonly');
				$$('#add-user + input').addEvent('click', function(){
					Rose.ui.statusMessage.display( 'Please exit editing mode first.', 'error' );
				});
				$$('#admin-others tr[class!=title]').each(function(el){
					new Fx.Scroll(document.body).toTop().chain(function(){
						$('crud-form').empty(); 
						$('crud-time').empty();
					});
					el.tween('color','#ddd');
					el.addEvents({
				   		mouseover: function() {el.addClass('shade')},
					   	mouseout: function() {el.removeClass('shade')},
						click: function(){
						   	new Request.HTML({
                            	url: BaseURI + 'admin/userform',
								onRequest: function(){
									Rose.ui.statusMessage.display( 'Loading...', 'notice' );
								},
								onComplete: function(response){
										Rose.ui.statusMessage.hide();          
										$('crud-form').empty().adopt(response);
									  	$$('#crud-form #reset').addEvent('click', function(){
											if (confirm('Are you sure you want to continue? All your unsaved information will be lost.')){                   
												Rose.ui.statusMessage.display( 'User profile unsaved.', 'error' );
												new Fx.Scroll(document.body).toTop().chain(function(){
													$$('#add-user + input').set('value','');
													$('crud-form').empty();
													$('crud-time').empty();					
												});
											} 									
										});
										new Fx.Scroll(document.body).toElement($('crud-controll'));
										loadUserTime(el.get('id'), 'all');
								}
						    }).get({'id':el.get('id')});
						}
					});
				});  			
			}				
		}); 
	}
	
	if($('crud-controll')==null){
		return;
	};
	
	/*
		add user
	*/
	$$('#add-user + input').addEvent('keyup', function(e){		
		if (this.value.length >= 3 && $('userform-create')==null){
				new Fx.Scroll(document.body).toElement($('crud-controll'));			
				new Request.HTML({
					url: BaseURI + 'admin/userform',
					onRequest: function(){
						Rose.ui.statusMessage.display( 'Loading...', 'notice' );
					},
					onComplete: function(response){
						Rose.ui.statusMessage.hide();
	                	$('crud-form').empty().adopt(response);
						$$('#crud-form #reset').addEvent('click', function(){
						   	if (confirm('Are you sure you want to continue? All your information will be lost.')){
								Rose.ui.statusMessage.display( 'User profile unsaved.', 'error' ); 
								new Fx.Scroll(document.body).toTop().chain(function(){
									$$('#add-user + input').set('value','');
									$('crud-form').empty();
									$('crud-time').empty();					
								});
							}			
						});  
						$('edit-mode').removeClass('clicked');
						$$('#admin-others tr[class!=title]').each(function(el){
							if (!el.hasClass('in')){
								el.tween('color','#444');
							}
							el.removeEvents();
						}); 
					}			
				}).post({'uname': this.value});
			   		
		}
		if (this.value.length >= 0 && $('userform-create')!=null){
			
			if ($('form-type').get('text')=="Add new user:"){				
				$('uname').value = Slick.find(document, '#add-user + input').value
			} 
		}
		
	   	if (this.value.length == 0){
			new Fx.Scroll(document.body).toTop().chain(function(){
				$('crud-form').empty();
			    $('crud-time').empty();
			});
	   	}        
	});
	
	/*
		Admin User Timesheet Editing
		e.g. loadUserTime(2,'nt','4/13','4/16')
			wk: 'pre','next','all','navpre','navnt'
	*/	
	var loadUserTime = function(uid, wk, start, end){
		//console.log(uid);
		new Request.HTML({
			url: BaseURI + 'admin/usertime',
			onRequest: function(){
				
			},
			onComplete: function(response){
				$('crud-time').empty().adopt(response);
				$$('table#admin-time tr:even').addClass('alt');				
				$$('#crud-time .control .button').addEvent('click',function(){
					this.getSiblings('.button').removeClass('clicked');
					if (!this.hasClass('clicked')){
						loadUserTime(uid, this.id);
					}else{
						loadUserTime(uid, 'all');
					}
					this.toggleClass('clicked');
				});
				
				$$('#crud-time .control #go').removeEvents().addEvents({
					'mousedown': function(){ 
						this.addClass('clicked');
					},
					'mouseup'  : function(){ 
						this.removeClass('clicked'); 
						this.getSiblings('.button').removeClass('clicked');
						loadUserTime(uid, 'slet', $('slet-s').getProperty('value'), $('slet-e').getProperty('value'));
					}
				});
				
				$$('#admin-time-nav #nav-pre').addEvent('click',function(){
					var t = $('admin-time-nav').get('text').split('- ');
					t[0] = t[0].substr(0,5);
					t[1] = t[1].substr(0,5);
					loadUserTime(uid, 'navpre', t[0], t[1]);
					return false;
			  	});
			
				$$('#admin-time-nav #nav-nt').addEvent('click',function(){
					var t = $('admin-time-nav').get('text').split('- ');
					t[0] = t[0].substr(0,5);
					t[1] = t[1].substr(0,5);
					loadUserTime(uid, 'navnt', t[0], t[1]);
					return false;
					
			  	});
				
		   		/*
		   		if($$('#crud-time .control a#all').hasClass('clicked')=='true' ){
		   							new Element('a', {id:'nav-pre', class:"btn-plain", styles:{'margin-right':'5px'}, html:'&laquo'}).inject($('admin-time-export'), 'before');
		   							new Element('a', {id:'nav-next', class:"btn-plain", html:'&raquo'}).inject($('admin-time-export'), 'before');          
		   							
		   							$$('#admin-time-nav #nav-pre').addevent('click',function(){

		   						  	});
		   						};*/
			}
		}).get({'id': uid, 'wk':wk, 'start':start, 'end':end})
		
	} 
	 	
});

/*
	User Timesheet
*/
document.addEvent('domready', function() {
	if($('clock')){
		timerids = []; 	
		updateClock('clock');
	}
	
	if($('totalhr')!=null){
		updateTotalPanel();
	}
							
	if($('day-list')!=null){
	    Rose.ui.statusMessage.display( 'Loading...', 'notice' );
		setTimeout(checkOpenCard,500);
	} 
	
	var Tips1 = new Tips($$('.Tips1'), {
		initialize:function(){
			this.fx = new Fx.Morph(this.toolTip, {duration: 200, wait: false});
		},
		onShow: function(toolTip) {
			this.fx.start({
				'opacity' : [0,1]
			});
		},
		onHide: function(toolTip) {
			this.fx.start({
				'opacity' : [1,0]
			});
		}
	});

	if($$('table#others')!=null){
		$$('table#others tr:even').addClass('alt');
	}
});

document.addEvent('domready', function() {
	
	// Handles input text replacement
	$$('.text-replace').each(function(el) {
		if( el.get('type') == 'password' ) {
			el.set('type', 'text');
			el.store('isPass', true);
		}
		
		el.addEvents({
			'focus': function(e) {
				if( this.get('default') == this.get('value') ) {
					this.set('value', '');
				}
				if( this.retrieve('isPass') ) {
					this.set('type', 'password');
				}
			},
			'blur': function(e) {
				if( !this.get('value') ) {
					this.set('value', this.get('default'));
	
					if( this.retrieve('isPass') ) {
						this.set('type', 'text');
					}
	
				}
			}
		});
	});

   

}); // end domready

//--------addons


