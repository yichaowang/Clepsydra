<?php
/*
 Title: controller\person

 Group: Controllers
 
 File: person.class.php
  Provides person controller class
  
 Version:
  2010.12.23
  
 Copyright:
  2004-2010 The State News, Inc
  
 Author:
  Mike Joseph <josephm5@msu.edu>
  
 License:
  GNU GPL 2.0 - http://opensource.org/licenses/gpl-2.0.php
*/
namespace clepsydra\controller;
use foundry\model as M;
use foundry\config as Conf;
use foundry\request\url as URL;
 
/*
 Class: person
  Person controller
 
 Namespace:
  \clepsydra\controller
*/
class person extends \foundry\controller {


	/*
	 Method: constructor
	 
	 Access:
	  public
	 
	 Parameters:
	  request - _object_ request instance
	 
	 Returns:
	  _object_
	*/
	public function __construct($request) {
		parent::__construct($request);
	}

	
	/*
	 Method: main
	  <# description #>
	 
	 Access:
	  <# public #>
	 
	 Parameters:
	  <# params #>
	 
	 Returns:
	  <# return value #>
	*/
	public function main() {
		$user = M::init('clepsydra:person')->findByUID($this->request->authSession->user);
		
		$timebyday = $user->timeByDay();
		
		$hour['today'] = $user->timeTotal("toDay", "second");
		$hour['toweek'] = $user->timeTotal("toWeek", "hour");
		$hour['tomonth'] = $user->timeTotal("toMonth", "hour");
		$hour['toyear'] = $user->timeTotal("toYear", "hour");
		
		return array(
			'hourbyday' => $timebyday,
			'hour' => $hour
		);
	}
	
	// create clock in action
	public function clockin(){
		if( $this->request->query->type != 'json') {return false;}
		 
		$user = M::init('clepsydra:person')->findByUID($this->request->authSession->user);
			
		if ( $user->active && $user->track && !$user->status){
			$user->status=1;
			$user->save();
			
			$card = M::init('clepsydra:card');
			$card->timein = time();
			$card->timeout = time();
			$card->person_id = $user->uid;
			$card->save();			
		}
		//$resp = new \foundry\response\redirect(URL::linkTo('clepsydra:person'));
		//return $resp;
		return array(
				'card' => $card
			);
	}
	
	// create clock out action
	public function clockout(){
		if($this->request->query->type != 'json') {return false;}
		
		$card = M::init('clepsydra:card')
				->where('self:person_id = :pid')
				->bind(array(':pid' => $this->request->authSession->user))
				->order('timein desc')
				->find()
				->shift();
				
		$user = M::init('clepsydra:person')->findByUID(
			$this->request->authSession->user);
					
		if ( $user->active && $user->track && $user->status){
			$user->status=0;
			$user->save();
			if ($card->timein == $card->timeout) {
				$card->timeout = time();
				$card->person_id = $user->uid;
				$card->save();
			}
		}
		//$resp = new \foundry\response\redirect(URL::linkTo('clepsydra:person'));
		//return $resp;
		return array(
			'card'=> $card
		);
	}
	
	public function opencard(){
		if($this->request->query->type != 'json') {return false;}
		
		$cards = M::init('clepsydra:card')
				->where('self:person_id = :pid')
				->bind(array(':pid' => $this->request->authSession->user))
				->order('timein desc')
				->find();
				
		foreach( $cards as $card ){
			$i++;
			if ($card->timein==$card->timeout){
				if ($i == 1){
					$opencard['opencard'] = $card;
				}else{
					$j++;
					$opencard['wrg']['cards'][$j] = $card;
					$opencard['wrg']['cards'][$j]['ertype'] = "unclosed time card"; 
				}
			}
			
			if ($card->timeout-$card->timein > 43200){
				$j++;
				$opencard['wrg']['cards'][$j] = $card;
				$opencard['wrg']['cards'][$j]['ertype'] = "time card exceeds 12 hours";
			}
		};
		
		//if(!isset($opencard)){$opencard['card']=null;};
		return array(
			'opencard' => $opencard
		);
	}
	public function others(){
		$users = M::init('clepsydra:person')->find();
		$user = M::init('clepsydra:person')->findByUID($this->request->authSession->user);
		$hour['today'] = $user->timeTotal("toDay", "second");
		$hour['toweek'] = $user->timeTotal("toWeek", "hour");
		$hour['tomonth'] = $user->timeTotal("toMonth", "hour");
		$hour['toyear'] = $user->timeTotal("toYear", "hour");
		
		return array(
			'users' => $users,
			'hour' => $hour
			
		);
	}
	
	public function otherusers(){
		$user = M::init('clepsydra:person')->findByUID($this->request->authSession->user);
		echo $user->hourToday();
		return array(
			'test' => $asdfasdfadsf
   		);
		
	}
}

?>