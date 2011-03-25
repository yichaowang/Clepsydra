/*------Yichao--------*/    

/*
	clockIn();     	   					Ajax record timecard->timein, then call checkOpenCard()
	clockOut();         				Ajax record timecard->timeout, then call checkOpenCard()
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


var clockIn = function(){
	var fx = new Fx.Morph('opencard', {duration: 1000})
	var request = new Request.JSON({
		url: '/index.php/3cabfab8f977ae7d12a3773423acf849/clockin.json?t=' + Math.random(),
		onRequest: function(){
			fx.set('html','<a>Loading...</a>');
		},
		onSuccess: function(jsonObj){
			$('clockbtn').set('html', '<a href=\"#\" id=\"clock_out\" class=\"red\">Clock out</a>');
			$('status').set('text', 'Clocked In');
			$('opencard').set('html','You are now clocked in.');
			$('timer0tag').set('html','');
			$('timer0').set('html',''); 
		    fx.start().chain(function(){
			   this.start.delay(1000,this,{
				    'opacity' : [1,0] 
			   });
			}).chain(function(){
		   		   	 	var clock = $('t-today').get('html');
	 					var tri = clock.split(':');
	 					var s   = tri[0]*3600+tri[1]*60+tri[2]*1;
	 					$('t-today').set('text', s);
						console.log('end');
						checkOpenCard();
						this.start({
	   						'opacity' : 1
						});
		   	}) 
		   
		}
	}).send()
}

var clockOut = function(){
	var fxc = new Fx.Morph('clockbtn', {duration: 2000})
	var fxo = new Fx.Morph('opencard', {duration: 2000})
	var request = new Request.JSON({
		url: '/index.php/3cabfab8f977ae7d12a3773423acf849/clockout.json?t=' + Math.random(),
		onRequest: function(){
			$('opencard').set('text', 'Loading...')
		},
		onSuccess: function(jsonObj){
			$('status').set('text', 'Clocked Out'); 
			displayInfo(jsonObj[0].card);
		}
	}).send()
	
	var displayInfo = function(item){
		for (x in timerids){$clear(timerids[x])};
		$('opencard').set('text', 'You are now clocked out.');
		$('timer0tag').set('text', 'Last session: ');
		$('clockbtn').set('html', '<a href=\"#\" id=\"clock_in\" class=\"green\">Clock in</a>');
		$('clock_in').addEvent('click', clockIn);   
	}
}

var checkOpenCard = function(){
	var request = new Request.JSON({
		url: '/index.php/3cabfab8f977ae7d12a3773423acf849/opencard.json?t=' + Math.random(),
		onRequest: function(){
			$('opencard').set('text','Loading...');
		},
		onSuccess: function(jsonObj){
			displayInfo(jsonObj[0].opencard);
		}
	}).send();
	
	var fxli = new Fx.Morph('opencardli', {duration: 1000})
	var displayInfo = function(item){ 
		if (typeof item.opencard == 'undefined'){
			$('opencard').set('text', 'Clocked out');
			displayTime('t-today', $('t-today').get('html'));
		}else{
			$('clockbtn').set('html', '<a href=\"#\" id=\"clock_out\" class=\"red\">Clock out</a>');
			$('timer0tag').set('text', 'You worked: ');
			displayTimeDiff('opencard', item.opencard.timein, ' - Current');
			displayTimer('timer0', item.opencard.timein, 0);
			//updateTotalPanel();			
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
			console.log($('t-today').get('html'));
		}else{
			var str = div.get('html').toString();
			updateToltime(str.split(" ",1).toString(),div.get('id').toString());                
		}
	});                              
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


document.addEvent('domready', function() {
	timerids = []; 	
	$('clock_in').addEvent('click', clockIn);   
	updateClock('clock');
	updateTotalPanel();			
	checkOpenCard();
	
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

	// Handles the status message passed via GET-back
	if( window.location.search.length && window.location.search.indexOf('message=') != -1 ) {
		
		var data = new URI(window.location.href).get('data'),
			msgStr = data.message.replace(/[^a-zA-Z0-9\.\!\?\:\-\\\/\*]/g, ' '),
			msgType = data.type;
			
		// call message class method here...	
	}

	/*
var data = new URI(window.location.href).get('data');
	var message = data.message.unencode(), 
		   type = data.type.unencode();
	
	var message = data.replace(/[^a-zA-Z0-9\.\!\?\:\-\\\/\*]/g, ' ');
	
	switch(type) {
		case 'success':
		case 'notice':
		case 'error':
			break;
		default:
			type = 'notice';
			break;
	}

	var el = new Element('span',{
		'class': type,
		'text': message
	});
	
	
	setTimeout(function() {
		alert(message);
	}, 1000);
*/

}); // end domready

//--------addons


