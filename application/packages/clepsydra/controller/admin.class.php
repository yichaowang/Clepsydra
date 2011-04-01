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
    public function adduser(){
		if ($this->request->post('name-transfer', 'specialChars')){
			
			$name = $this->request->post('name-transfer', 'specialChars');		
			return array(
				'name' => $name
			);
		};
		
		if( $this->request->post('email', 'specialChars') ){
			
		}; 
	   
	}
	
	public function edit(){
		$id = $this->request->get(':uid', 'num');
		
		if( $id ) {
			$person = M::init('clepsydra:person')->findByUID($id);
		} else {
			$person = M::init('clepsydra:person');
		};
		
		if( $person && $_POST && !empty($_POST) ) {
			$person->name = $this->request->post('username', 'specialChars');
			$person->email = $this->request->post('email', 'email');
			$person->password = $this->request->post('password', 'specialChars');
			$person->department = $this->request->post('department', 'specialChars');
			$person->active = $this->request->post('active', 'num');
			$person->track = $this->request->post('track', 'num');
			$person->is_admin = $this->request->post('is_admin', 'num');
			
			$person->save();
			
			$resp = new Redir(URL::linkTo(URL::build(
					'clepsydra:admin', array(
						'message' => 'Person saved',
						'type' => 'success'
					))));	

			return $resp;
		 };   
	}       
	
} 

?>