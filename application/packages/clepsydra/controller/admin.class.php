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
use foundry\response\redirect as Redir;
 
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
			->order('self:name asc') 
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
	
	/*
	 Method: form
	  <# description #>
	 
	 Access:
	  <# public #>
	 
	 Parameters:
	  <# params #>
	 
	 Returns:
	  <# return value #>
	*/
    public function userform(){
		$id = $this->request->get('id', 'num');
		$uname = $this->request->post('uname', 'specialChars');
		if ($id){
			$person = M::init('clepsydra:person')->findByUID($id);
			return array(
				'person'=> $person
			);
		} elseif ($uname){
			return array(
				'uname' => $uname
			);
		}
	   
	}
	
	public function userinfo(){
		$id = $this->request->get('id', 'num');
		$uname = $this->request->post('uname', 'specialChars');
		$person = M::init('clepsydra:person')->findByUID($id);
		return array(
			'person'=> $person
		);
	}
	
	
	public function edit(){
		$id = $this->request->post('uid', 'num');
		
		if ($id) {
			$person = M::init('clepsydra:person')->findByUID($id);
			$message = "User profile saved.";
		} else {
			$person = M::init('clepsydra:person');
			$message = "User profile created.";
		};
		
		if( $person && $_POST && !empty($_POST) ) {
			$person->password   = $this->request->post('password', 'specialChars');
			$person->passwordc  = $this->request->post('passwordc', 'specialChars'); 
			
			//if ($person->password!=$person->passwordc){
			//	return $resp;
			//}             
			
			$person->name       = $this->request->post('uname', 'specialChars');
			$person->email      = $this->request->post('email', 'email');
			$person->department = $this->request->post('department', 'specialChars');
			$person->pin		= $this->request->post('pin', 'num');
			$person->phone      = $this->request->post('phone', 'num');
			$person->is_admin 	= $this->request->post('admin', 'num'); 
			$person->active     = $this->request->post('active', 'num');
			$person->track      = $this->request->post('track', 'num');
			$person->status		= $this->request->post('status', 'num');
			$person->locked		= $this->request->post('locked', 'num');
			$person->attempts 	= $this->request->post('attempts', 'num');
			
			$person->save();
			
			$resp = new Redir(URL::linkTo(URL::build(
					'clepsydra:admin', array(
						'message' => $message,
						'type' => 'success'
					))));	

			return $resp;
		 };   
	}
	
	public function usertime(){
		$id = $this->request->get('id', 'num');
		$user = M::init('clepsydra:person')->findByUID($id)->timeByDay();	
		
		return array(
			'usertime' => $user
		);
		
	}
	
	public function timecardarray(){
		//$user = M::init('clepsydra:person')->findByUID($this->request->authSession->user);
		$user = M::init('clepsydra:person')->findByUID(3);
		//$t = array("element 1 text", "element 2 text", "3");
		//$t = 1;
		print_r($user->timeByDay());
		exit();
	}       
	
} 

?>