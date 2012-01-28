var CP = CP || {};

CP = {
    export_overlay:{},
    edit_overlay:{},
    user_timeedit:{},
    options:{
        BaseURI:"/index.php/"
    }
}; 
   

(CP.export_overlay = {
    init: function(){
        var o = CP.options;

        this._self = new Element("div", {
			class:"cpOverlay"
		})
		 
		// request overlay's html content from tpl
		new Request.HTML({
			url: o.BaseURI + 'admin/export',
			onRequest: function(){
			},			
			onComplete: function(response){				
				CP.export_overlay._self.adopt(response);
			}   
		}).send();      
    },  
    
    open: function(){ 
        var e = this._self;
        
        $(document.body).adopt(e);
            
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
        });

        e.getElement('input.cancel').addEvents({
            click: function(){
                CP.export_overlay.close();
            }
        });
    },
    
    close: function(){
        this._self.destroy();
    }   
    
}).init();   
          
(CP.edit_overlay = {
    init: function(){
        this._self = new Element("div", {
			class:"cpOverlay"
		})
    },  
    
    open: function(cards, e_date){
        var e = this._self,
            o = CP.options; 
            
         e.setStyles({
             left    :(window.getWidth()/2-250),
             width   : 500, 
             height  :'auto',
             display :'block'  
         });   

         new Request.HTML({
             url: o.BaseURI + 'admin/usertimeedit?t=' + Math.random(),
             
             onRequest: function(){        
               	Rose.ui.statusMessage.display( 'Loading...', 'notice' );
             },			        
             
             onComplete: function(response){
                 var output={},
                     u_name=$$('.control.sub').get('title'),
                     u_id = $('admin-time').get('title'),
                     c_date;
                 
                 Rose.ui.statusMessage.hide();
                 
                 e.empty().adopt(response);   
                 
                 e.getElement('div.col-heading').set('text', "Time cards for "+u_name+" on "+e_date);
                 
                 e.getElement('input.cancel').addEvents({
                     click: function(){
                         CP.edit_overlay.close();
                     }
                 });
                 
                 e.getElements('td a.delete_row').addEvents({
                     click: function(){
                         var cid = this.get('title'),
                             del_tr = this;
                                           
                         new Request.HTML({
                             url: o.BaseURI + 'admin/usertimeedit',
                             onRequest: function(){        
                             },
                             onComplete: function(){
                                 Rose.ui.statusMessage.display( 'Saved.', 'success' );
                                 del_tr.getParents('tr').destroy();    
                                 CP.loadUserTime(u_id, 'all'); 								
                             }
                         }).get({'cid':cid});
                     }
                 });
                 
                 e.getElement('input.submit').addEvents({
                     click: function(){
                         e.getElements('tr.timecard').each(function(el){
                             var card_tr = [],
                                 card_id;
                             card_id = el.getElement('td').get('text');
                             el.getElements('td input').each(function(val){
                                 card_tr.push(val.value);
                             })                       
                             output[card_id] = card_tr;
                         })
                         new Request.HTML({
                             url: o.BaseURI + 'admin/usertimeedit',
                             onRequest: function(){        
                             },   
                             onComplete: function(response){
                                Rose.ui.statusMessage.display( 'Saved.', 'success' );
                                CP.loadUserTime(u_id, 'all');
                                e.destroy();     
                                new Fx.Scroll(document.body).toElement($('crud-controll'));
                             }
                         }).post('update='+JSON.encode(output));

                         return false;
                     }
                 });
             }   
         }).get({'cards':cards});   
         
         $(document.body).adopt(e);
    },  
    
    close: function(){
        this._self.destroy();
    }
    
        
}).init();

(CP.user_timeedit = {
    init: function(){
        this._self = new Element("div", {
			class:"cpOverlay"
		})
    },  
    
    open: function(cards, e_date){
        var e = this._self,
            o = CP.options; 
            
         e.setStyles({
             left    :(window.getWidth()/2-250),
             width   : 500, 
             height  :'auto',
             display :'block'  
         });   

         new Request.HTML({
             url: o.BaseURI + '3cabfab8f977ae7d12a3773423acf849/useredittime',
             
             onRequest: function(){        
               	Rose.ui.statusMessage.display( 'Loading...', 'notice' );
             },			        
             
             onComplete: function(response){
                 var output={},
                     u_id = $('day-list').get('title'),
                     c_date;
                 
                 Rose.ui.statusMessage.hide();
                 
                 e.empty().adopt(response);   
                 
                 // e.getElement('div.col-heading').set('text', "Time cards for "+u_name+" on "+e_date);
                 
                 e.getElement('input.cancel').addEvents({
                     click: function(){
                         CP.user_timeedit.close();
                     }
                 });
                 
                 e.getElements('td a.delete_row').addEvents({
                     click: function(){
                         var cid = this.get('title'),
                             del_tr = this;
                                           
                         new Request.HTML({
                             url: o.BaseURI + '3cabfab8f977ae7d12a3773423acf849/useredittime',
                             onRequest: function(){        
                             },
                             onComplete: function(){
                                 del_tr.getParents('tr').destroy();                    
                                 Rose.ui.statusMessage.display( 'Time card removed. Refreshing...', 'success' );
                                 setTimeout('window.location.reload()',1000);
                             }
                         }).get({'cid':cid});
                     }
                 });
                 
                 e.getElement('input.submit').addEvents({
                     click: function(){
                         e.getElements('tr.timecard').each(function(el){
                             var card_tr = [],
                                 card_id;
                             card_id = el.getElement('td').get('text');
                             el.getElements('td input').each(function(val){
                                 card_tr.push(val.value);
                             })                       
                             output[card_id] = card_tr;
                         })
                         new Request.HTML({
                             url: o.BaseURI + '3cabfab8f977ae7d12a3773423acf849/useredittime',
                             onRequest: function(){        
                             },   
                             onComplete: function(response){
                                 e.destroy();     
                                 Rose.ui.statusMessage.display( 'Time card removed. Refreshing...', 'success' );
                                 setTimeout('window.location.reload()',1000);
                             }
                         }).post('update='+JSON.encode(output));

                         return false;
                     }
                 });
             }   
         }).get({'cards':cards});   
         
         $(document.body).adopt(e);
    },  
    
    close: function(){
        this._self.destroy();
    }
    
    
}).init();

/*       
    Author: Yichao Wang
    Time: March 2011

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
	var request = new Request({
		url: BaseURI + '3cabfab8f977ae7d12a3773423acf849/opencard.json?t=' + Math.random(),
		method: 'get',
		onRequest: function(){
		},
		onSuccess: function(jsonObj){
			Rose.ui.statusMessage.hide(); 
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
	
	// determine if its in the admin page
	if($('admin-others')==null){
		return;
	}
	
	$$('table#admin-others tr:even').addClass('alt'); 
	
	/*
		export
	*/     
	
	$('export').addEvent('click',function(){
		CP.export_overlay.open();
	}); 
	
	/*
		edit mode button
	*/
	if($('edit-mode')!=null){
		$('edit-mode').addEvent('click', function(){
			if ($('edit-mode').hasClass('clicked')){
				$('edit-mode').removeClass('clicked');
				$$('a#add-user').removeClass('off');
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
				$$('a#add-user').addClass('off');
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
										
										//load profile part          
										$('crud-form').empty().adopt(response);
									  	$$('#crud-form #reset').addEvent('click', function(){
												Rose.ui.statusMessage.display( 'User profile unsaved.', 'error' );
												new Fx.Scroll(document.body).toTop().chain(function(){
    												$('crud-form').empty();
    												$('crud-time').empty();
    											});						
										});
										
										$$('#crud-form a.del-button').addEvents({
										    click: function(){
                                                if (confirm('All information will be deleted. Continue?')){
                                                    new Request.HTML({
                                                        url: BaseURI + 'admin/userdel',
                                                    	onComplete: function(response){                     
                                                    	    Rose.ui.statusMessage.display('User Deleted. Refreshing...', 'success');
                                                            setTimeout(function(){
                                                                window.location = BaseURI + "admin";
                                                            },1000);
                                                    	} 
                                                    }).get({'id':el.get('id')});                                                                            
                                                };
										    }
										});      

                                        $$('a.pw-update').addEvents({
                                            click: function(){
                                                e = new Element('input', {
                                                    type: 'password',
                                                    name: 'password',
                                                    size: 20
                                                })
                                                
                                                e.replaces(this).focus();
                                            }
                                        })
									           
										//load time part 
										loadUserTime(el.get('id'), 'all'); 
										
										new Fx.Scroll(document.body).toElement($('crud-controll'));
										
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
	$$('a#add-user').addEvent('click', function(e){	
	    if(this.hasClass('off')){
	        Rose.ui.statusMessage.display( 'Please exit editing mode first.', 'error' );
	    } else if ($('userform-create')==null){
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
                        Rose.ui.statusMessage.display( 'User profile unsaved.', 'error' ); 
                        new Fx.Scroll(document.body).toTop().chain(function(){
                            $('crud-form').empty();
                            $('crud-time').empty();					
                        });  
                    });
                }			
                }).post({'uname': this.value});

            } 
	});
	
	/*
		Admin User Timesheet Editing
		e.g. loadUserTime(2,'nt','4/13','4/16')
			wk: 'pre','next','all','navpre','navnt'
	*/	
	var loadUserTime = function(uid, wk, start, end){
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
					t[0] = t[0].substr(0,10);
					t[1] = t[1].substr(0,10);
					loadUserTime(uid, 'navpre', t[0], t[1]);
					return false;
			  	});
			
				$$('#admin-time-nav #nav-nt').addEvent('click',function(){
					var t = $('admin-time-nav').get('text').split('- ');
					t[0] = t[0].substr(0,10);
					t[1] = t[1].substr(0,10);
					loadUserTime(uid, 'navnt', t[0], t[1]);
					return false;
			  	});     
			  	
                $$('tr.admin-time-row span.icon-pencil').each(function(e){
                    e.addEvent('click',function(){
                        new Fx.Scroll(document.body).toTop();
                        CP.edit_overlay.open(this.get('title'), this.getParents('tr').getElement('.t-date').get('text'));
                    })
                })
				
		   		$$('a.add-time-card').addEvents({
		   		    click:function(){
                        var o = CP.options,
                            e = new Element("div", {
                    			class:"cpOverlay"
                    		}),
                    		u_name =$$('.control.sub').get('title'),
                            u_id = $('admin-time').get('title');
                    		
                    		$$('.cpOverlay').destroy();
                    		
                        new Request.HTML({
                            url: o.BaseURI + 'admin/usertimeadd',
                            onRequest: function(){        
                                
                            },			        
                            onComplete: function(response){
                                e.adopt(response);
                                e.setStyles({
                                    left    :(window.getWidth()/2-250),
                                    width   : 500, 
                                    height  :'auto',
                                    display :'block'  
                                }); 
                                
                                e.getElement('div.col-heading').set('text',"Add Timecard for "+u_name);  
                                
                                // e.getElement('div.col-heading').set('text', "Time cards for "+u_name+" on "+e_date);
                                
                                
                                e.getElement('input.cancel').addEvents({
                                    click: function(){
                                        e.destroy();
                                    }
                                }); 

                                e.getElement('input.submit').addEvents({
                                    click: function(){
                                        var timeinout = [],
                                        f_validation = 1;

                                        e.getElements('td input').each(function(val){
                                            if (val.value && f_validation){
                                                timeinout.push(val.value);
                                            } else {
                                                Rose.ui.statusMessage.display( 'Some boxes are empty. Please double check.', 'error' ); 
                                                f_validation = 0;
                                                return;
                                            }
                                        });

                                        if (!f_validation) return false;  

                                        new Request.HTML({
                                            url: o.BaseURI + 'admin/usertimeadd',
                                            onRequest: function(){
                                            },   
                                            onComplete: function(response){
                                                Rose.ui.statusMessage.display( 'Saved.', 'success' ); 
                                                CP.loadUserTime(u_id, 'all');
                                                e.destroy();
                                                
                                                new Fx.Scroll(document.body).toElement($('crud-controll'));
                                            }
                                        }).get({'uid':u_id, 'timeinout':JSON.encode(timeinout)});

                                        return false;
                                    }
                                });

                                $(document.body).adopt(e);     
                                
                                new Fx.Scroll(document.body).toTop();
                            }
                        }).get();
                        
		   		        return false;
		   		    }
		   		})
			}
		}).get({'id': uid, 'wk':wk, 'start':start, 'end':end})
		
	}
	
	CP.loadUserTime = loadUserTime; 
	 	
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
    	
        $$('.Tips1').each(function(el){
            el.addEvents({
                click: function(){
                    var ids = el.getElement('.user-card-ids').get('text');
                    CP.user_timeedit.open(ids);
                }
            })
        });
	} 
	
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


