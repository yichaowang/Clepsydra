<?php
/*
 Title: controller\person

 Group: Controllers
 
 File: admin.class.php
  Provides admin controller class
  
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
 Class: admin
  Admin controller
 
 Namespace:
  \clepsydra\controller
*/
class admin extends \foundry\controller {

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
		
		if ($user->is_admin==0){
			$to = URL::build(URL::linkTo('clepsydra:person'));
			$resp = new \foundry\response\redirect($to);
			return $resp;
		}
		
		$users = M::init('clepsydra:person')
			->order('self:status desc') 
			->find();

				
		$hour['today'] = $user->timeTotal("toDay", "second");
		$hour['toweek'] = $user->timeTotal("toWeek", "hour");
		$hour['tomonth'] = $user->timeTotal("toMonth", "hour");
		$hour['toyear'] = $user->timeTotal("toYear", "hour");

		return array(
			'users' => $users,
			'hour' => $hour
		);  
		
	}

} 

?>