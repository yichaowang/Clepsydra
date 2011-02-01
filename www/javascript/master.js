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


function updateClock(){
	var currentTime = new Date();
 	var currentHours = currentTime.getHours();
 	var currentMinutes = currentTime.getMinutes();
  	var currentSeconds = currentTime.getSeconds();

  	// add 0 for min and second
  	currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
  	currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

  	// AM or PM	
  	var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

  	// 12 hour format
  	currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

  	// 0 am and 12 pm
  	currentHours = ( currentHours == 0 ) ? 12 : currentHours;

  	// Compose the string for display
  	var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;

  	// Update the time display
  	document.getElementById("clock").firstChild.nodeValue = currentTimeString;
}
