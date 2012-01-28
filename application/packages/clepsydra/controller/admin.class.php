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
  Yichao Wang <wangyic3@msu.edu>
  
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
		} else {
			return array();
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
	
	public function userdel(){
		$delid = $this->request->get('id','alnum');
		
		if ($delid){
			$person = M::init('clepsydra:person')->findByUID($delid);
			$person->delete();
		}  
		
		echo $delid;                   
		
		return array();
	}
	
	
	public function edit(){
		$id = $this->request->post('uid', 'num');
		
		if ($id) {
			$person = M::init('clepsydra:person')->findByUID($id);
			$salt = $person->salt;
			$message = "User profile saved.";
		} else {
			$person = M::init('clepsydra:person');
			$message = "User profile created.";
			$salt = "256369";
		};
		
		if( $person && $_POST && !empty($_POST) ) {
			if ($this->request->post('password', 'specialChars')!=null){
				$person->password   = md5($this->request->post('password', 'specialChars').$salt);           
			}
			$person->salt       = $salt;
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
		$id 	= $this->request->get('id', 'num');
		$wk 	= $this->request->get('wk', 'specialChars');
		$sletS 	= $this->request->get('start', 'specialChars');
		$sletE 	= $this->request->get('end', 'specialChars');
	
		if ($wk=='pre' || $wk=='next' || $wk=='all'){
			$user = M::init('clepsydra:person')->findByUID($id)->timeByWk($wk);
			$range['ss'] = $user['start'];
			$range['es'] = $user['end'];
			$user_row = M::init('clepsydra:person')->findByUID($id);
			$user_name = $user_row->name;
		} else if(($wk=='slet' || $wk=='navpre' || $wk=='navnt') && $sletS!="" && $sletE!=""){
			$start  	= explode("/",$sletS);
			$end  		= explode("/",$sletE);
			// $sstamp 	= mktime(0, 0, 0, $start[0], $start[1], (($start[0]<=$end[0]) ? date('Y') : date('Y')-1));
			// $estamp 	= mktime(0, 0, 0, $end[0], $end[1], date('Y'));
			
			$sstamp 	= mktime(0, 0, 0, $start[0], $start[1], $start[2]);
			$estamp 	= mktime(0, 0, 0, $end[0], $end[1], $end[2]); 
			
			if($wk=='navpre'){
            	$sstamp = strtotime('last sunday', $sstamp);   
				$estamp = mktime(0,0,0,date('m',$sstamp),date('d',$sstamp)+7,date('Y',$sstamp));
			}
			if($wk=='navnt'){
            	$sstamp = (date('w', $estamp) == 0) ? $estamp : strtotime('last sunday', $estamp);
				$estamp = mktime(0,0,0,date('m',$sstamp),date('d',$sstamp)+7,date('Y',$sstamp));
			}
			
			$user['t']	= M::init('clepsydra:person')->findByUID($id)->timeByDay($sstamp,$estamp);
			$user_row = M::init('clepsydra:person')->findByUID($id);
			$user_name = $user_row->name;
			$range['ss'] = $sstamp;
			$range['es'] = $estamp; 		
		} 
		
		$t = time();
		$pay['nows'] = (date('w', $t) == 0) ? $t : strtotime('last sunday', $t);
		$pay['nowe'] = $pay['nows'] + 7 * 24 * 60 * 60;
 	    $pay['pre']  = $pay['nows'] - 7 * 24 * 60 * 60;
		$pay['nxt']  = $pay['nowe'] + 7 * 24 * 60 * 60;
		
		
		$range['swday'] = date(l,$range['ss']);
		$range['ewday'] = date(l,$range['es']);
		
		return array(
			'wk'   		=> $wk,
			'usertime' 	=> $user['t'],
			'range'		=> $range,
			'pay'		=> $pay,
			'username'  => $user_name,
			'userid'    => $id
		);
		
	}   
	
	public function usertimeedit(){ 
   		$cards_id_request = $this->request->get('cards','specialChars');
        // no avilible filter for JSON in Filter Class
		$update_json = $_POST['update'];
		$del_id = $this->request->get('cid','alnum');
        
		if ($update_json!=null){   
			$update_cards = json_decode($update_json);
			
			foreach($update_cards as $u_cid => $u_time){
				$u_in = mktime($u_time[3],$u_time[4],$u_time[5],$u_time[1],$u_time[2],$u_time[0]);
				$u_out = mktime($u_time[9],$u_time[10],$u_time[11],$u_time[7],$u_time[8],$u_time[6]); 
				$u_card = M::init('clepsydra:card')->findByUID($u_cid);   
				$u_card->timein = $u_in;
				$u_card->timeout = $u_out;
				$u_card->save();
			}
						
			return array(
				'is_view' => 0
			);
		}   
		
		if ($del_id!=null){
			$d_card = M::init('clepsydra:card')->findByUID($del_id);   
			$d_card->delete(); 
			
			return array(
				'is_view' => 0
			);
		}

        //id array
		$cards_id = explode("|", $cards_id_request);
		
		//output container
		$cards = array();      
		
		foreach ($cards_id as $cid){
			if ($cid == null){continue;} 
			$card = M::init('clepsydra:card')->findByUID($cid); 
			
			if ($card == null) {continue;} 
			
			$cards[] = array(
				       		'id' => $card->uid,
							'in' => $card->timein,
							'out'=> $card->timeout
			);
		}
		
		return array(        
			'is_view' => 1,
        	'cards' => $cards
		);
	} 
	
	public function usertimeadd(){                    
		$user_id = $this->request->get('uid','alnum');
        // no avilible filter for JSON in Filter Class
		$card_json = $_GET['timeinout'];  
		
		
		
		if (($user_id!=null) && ($card_json!=null)){
			$new_card = json_decode($card_json); 
		    $u_in = mktime($new_card[3],$new_card[4],$new_card[5],$new_card[1],$new_card[2],$new_card[0]);
			$u_out = mktime($new_card[9],$new_card[10],$new_card[11],$new_card[7],$new_card[8],$new_card[6]);    
			
			$card = M::init('clepsydra:card');
			$card->timein = $u_in;
			$card->timeout = $u_out;
			$card->person_id = $user_id;
			$card->save();
			
			return array(
			 	'is_view' => 0
			);
		}           
		
		return array(
			'is_view' => 1
		);
	}  
	
	public function testtest(){
		print_r(json_decode('{"name":"Fido","dob":"2010-04-11T22:36:22.436Z","legs":[1,2,3,4]}'));
		
		return array();
	}
	
	public function export(){
		$ex_start = $this->request->post('exdate-start', 'specialChars'); 
		$ex_end = $this->request->post('exdate-end', 'specialChars'); 
		$people = $this->request->post('people', 'arrayCallback', 'specialChars');
				
		$t = time();
		$pay['nows'] = (date('w', $t) == 0) ? $t : strtotime('last sunday', $t);
		$pay['nowe'] = $pay['nows'] + 7 * 24 * 60 * 60;
 	    $pay['pre']  = $pay['nows'] - 7 * 24 * 60 * 60;
		$pay['nxt']  = $pay['nowe'] + 7 * 24 * 60 * 60;   
		
		$users = M::init('clepsydra:person')->find(); 
		
		if ($ex_start!="mm/dd/yyyy" && $ex_end!="mm/dd/yyyy" && ($people)){    
            $timesheet = array();
			$timesheet_users = array();
			$ex_start = explode("/", $ex_start);
			$ex_end = explode("/", $ex_end);
			$start_stamp = mktime(0, 0, 0, $ex_start[0], $ex_start[1], $ex_start[2]);
			$end_stamp = mktime(0, 0, 0, $ex_end[0], $ex_end[1], $ex_end[2]); 
			
			for($i=0, $length = ($end_stamp-$start_stamp) / 86400; $i<=$length; ++$i){
				$key = date("mdy", ($start_stamp+$i*86400));
				$timesheet[$key] = array("date" => date("m/d/y", ($start_stamp+$i*86400))); 
			}  
			
			for($u_seq=0, $u_count=count($people); $u_seq<$u_count; ++$u_seq){
				$person = M::init('clepsydra:person')->findByUID($people[$u_seq]);
				$person_hours = $person->timeByDay($start_stamp,$end_stamp,false);
				$timesheet_users[$u_seq]['name'] = $person['name'];
				if ($person_hours!=null){
					foreach($person_hours as $person_card){
						$key = str_pad($person_card['month'],2,"0",STR_PAD_LEFT). str_pad($person_card['mday'],2,"0",STR_PAD_LEFT).str_pad($person_card['yr'],2,"0",STR_PAD_LEFT);
						$timesheet[$key][$u_seq] = $person_card['time'];
						$timesheet_users[$u_seq]['total_hr'] += $person_card['time'];
					}
				}  
			}             
			
			// print_r($timesheet_users);			
			// print_r($timesheet); 
			
			// output 
			
			header("Content-type: application/csv");
			header("Content-Disposition: attachment; filename=SNTimesheet". date("Ymd", ($start_stamp))."to".date("Ymd", ($end_stamp)).".csv");
			header("Pragma: no-cache");
			header("Expires: 0");
			
			echo "Date (mm/dd/yyyy),"; 
			
			for ($i=0, $length=count($timesheet_users); $i<$length; ++$i){
				echo $timesheet_users[$i]['name'] . ",";
			}  		                            
			
			echo "\n";

			foreach ($timesheet as $date => $u_hours){ 
				echo $u_hours['date'] . ",";
				for ($i=0, $length<count($timesheet_users); $i<$length; ++$i){
					if(isset($u_hours[$i])) {
						echo $u_hours[$i] . ",";
					} else {
						echo " - ,";
					}
				}
				echo "\n";
			} 
			
			echo "Total (in hours),";  
			
			for ($i=0, $length=count($timesheet_users); $i<$length; ++$i){
				echo $timesheet_users[$i]['total_hr'] . ",";
			}

			return array(
				'export' => 1
			);
 
		    
		} else if( $ex_start=="mm/dd/yyyy" || $ex_end=="mm/dd/yyyy" || !isset($people)){
			echo "Please select the dates and the users to be exported.";
			return false;
		}
		
		return array(
			'users' => $users,
			'pay'   => $pay
		);
	}     
	
} 

?>