<?php
/*
 Title: model\person

 Group: Models
 
 File: person.class.php
  Provides Person model class
  
 Version:
  2010.12.23
  
 Copyright:
  2004-2010 The State News, Inc
  
 Author:
  Mike Joseph <josephm5@msu.edu>
  
 License:
  GNU GPL 2.0 - http://opensource.org/licenses/gpl-2.0.php
*/
namespace clepsydra\model;
use foundry\event as Event;
use foundry\filter as Filter;
use foundry\request\url as URL;

/*
 Class: person
  Person class

 Attributes:
 
  - uid - _int_
  - name - _string_
  - email - _string_
  - password - _string_
  - salt - _string_
  - pin - _int_ (UNUSED)
  - phone - _string_
  - status - _boolean_ 0 = clocked out, 1 = clocked in
  - active - _boolean_ 0 = past employee, 1 = current employee
  - is_admin - _boolean_
  - track - _boolean_ 0 = do not track time, 1 = track time
  - locked - _boolean_ locked account flag
  - attempts - _int_ invalid login attempts
  - url - _string_ READONLY person's infocard URL
  - in - _boolean_ READONLY 'TRUE' if clocked in
  - out - _boolean_ READONLY 'TRUE' if clocked out
  
 Associations:
 
  - card - 1:M
 
 Namespace:
  \clepsydra\model
*/
class person extends \foundry\model {

	protected $hasMany = array(
		'card' => array(
			'namespace' => 'clepsydra',
			'order' => 'self:timein desc',
			'limit' => 100
		)
	);
	
	protected $schema = array(
		'uid',
		'name',
		'email',
		'salt',
		'password',
		'department',
		'pin',
		'phone',
		'active',
		'status',
		'is_admin',
		'track',
		'locked',
		'attempts'
	);

	public function __construct($self=false, $ns=false, $handler=false) {
		parent::__construct($self, $ns, $handler);

//		This is an event callback
//		Event::bind($this, 'beforeSave', array($this, 'preSave'));

	}


	public function preSave() {
//		This is the action called by the above event callback
	}

	public function __in() {
		return ($this->status == 1);
	}
	
	public function __out() {
		return ($this->status == 0);
	}

//	This is an example of an overloaded property
	public function __url() {
		return URL::linkTo(URL::build('some:path/foo', array(
			'var' => 'val'
		)), true);
	}
	
	public function timeTotal($date, $format="second", $digits=2, $unit=""){
		switch ($date) {
			case "toDay": 
				$k = strtotime("Today");
				break;
			case "toWeek": 
				$k = strtotime("last Saturday");
				break;
			case "toMonth": 
				$k = mktime(0,0,0,date("n"),1,date("Y"));
				break;
			case "toYear": 
				$k = mktime(0,0,0,1,1,date("Y"));
				break;
		}
		
		switch ($format) {
			case "second":
				$j = 1;
				break;
			case "minute":
				$j = 60;
				break;
			case "hour":
				$j = 3600;
				break;
			case "auto":
				$j = "auto";
				break;
		}     
		
   		$t = 0; 
		foreach ($this->cards as $card) {
			if (!isset($opencardTimeElapsed)){
				$opencardTimeElapsed = ($card->timein==$card->timeout ?  (time()-$card->timein) : 0); 
			}
			if ($card->timein > $k){
				 $t += $card->timeout - $card->timein; 
			}
		}
		
		$t += $opencardTimeElapsed; 
		if ($j=="auto") {
			if ($t < 60) {
				$unit = "secs";
			}elseif ($t < 3600){
				$t /= 60;
				$unit = "mins"; 
			}elseif ($t >= 3600){
				$t /= 3600;
				$unit = "hrs";
			}
		}else{
			$t /= $j;
		}
		$t = number_format($t,$digits,'.','');
		return $t." ".$unit;       
	}  
	
	Public function timeByDay(){
		$j=0;
		foreach( $this->cards as $card ){ 
			$diff = ($card->timeout - $card->timein);
			$j++;
			$tpart[$j] = getdate($card->timein);
			
			//considering the opencard
			if (!isset($opencardTimeElapsed)){
				$opencardTimeElapsed = ($card->timein==$card->timeout ?  (time()-$card->timein) : 0);
				$t[$j]['time'] 	 = $opencardTimeElapsed;
			}
			
			if ($tpart[$j]['mday'] == $tpart[$j-1]['mday']) {
				$j--;
				$t[$j]['time'] 	 += $diff;
				$t[$j]['cards'][] = $card;
			}else{
				$t[$j]['time']    += $diff;
				$t[$j]['weekday'] = substr($tpart[$j]['weekday'],0,3);
				$t[$j]['mday']    = $tpart[$j]['mday'];
				$t[$j]['month']   = $tpart[$j]['mon'];
				$t[$j]['cards'][] = $card;     
			}
		  
		}
		
		$h=0;
		foreach($t as $n){
			$h++;
			$m = $n['time'];
			if ($m < 60) {
				$unit = "secs";
			}elseif ($m < 3600){
				$m /= 60;
				$unit = "mins"; 
			}elseif ($m >= 3600){
				$m /= 3600;
				$unit = "hrs";
			}
			$m = number_format($m,0,'.','');
			$m = $m." ".$unit; 
			$t[$h]['time']=$m;
		}

		return $t;
	}
}	


?>