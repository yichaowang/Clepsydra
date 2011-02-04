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
		$user = M::init('clepsydra:person')->findByUID(
			$this->request->authSession->user);
			
		list($y, $m, $w, $d) = array(
			mktime(0,0,0,1,1,date("Y")),
			mktime(0,0,0,date("n"),1,date("Y")),
			strtotime("last Saturday"),
			strtotime("Today")
		);
		
		foreach( $user->cards as $card ){
			$j++;
			if ($card->timein >= $y){
				$diff = ($card->timeout - $card->timein)/3600;
				$hour['y'] += $diff;
				if ($card->timein >= $m){
					$hour['m'] += $diff;
					if ($card->timein >= $w){
						$hour['w'] += $diff;
						if ($card->timein >= $d){
							$hour['d'] += $diff;
			}}}
			
			$tpart[$j] = getdate($card->timein);
			if ($tpart[$j]['mday'] == $tpart[$j-1]['mday']) {
				$hourbyday[$j-1]['hours'] += $diff;
				$j--;
			}else{
				$hourbyday[$j]['hours'] = $diff;
				$hourbyday[$j]['weekday']=$tpart[$j]['weekday'];
				$hourbyday[$j]['mon']=$tpart[$j]['mon'];
				$hourbyday[$j]['mday']=$tpart[$j]['mday'];
			}}
		};
	
	
		return array(
			'hourbyday' => $hourbyday,
			'hour' => $hour
		);
	}
	
	// create clock in action
	public function clockin(){
		$user = M::init('clepsydra:person')->findByUID(
			$this->request->authSession->user);
			
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
		
		return array();
		
	}
	
	// create clock out action
	public function clockout(){
		$user = M::init('clepsydra:person')->findByUID(
			$this->request->authSession->user);
			
		if ( $user->active && $user->track && $user->status){
			$user->status=0;
			$user->save();

			foreach( $user->cards as $card ) {
				if ($card->timein == $card->timeout) {
					$card->timeout = time();
					$card->person_id = $user->uid;
					$card->save();
				}
			}
		}
		
		//$resp = new \foundry\response\redirect(URL::linkTo('clepsydra:person'));
		//return $resp;
		return array();
	}
	
	public function otherusers(){
		
		
	}
}

?>