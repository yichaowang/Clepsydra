<?php
namespace clepsydra\controller;
use foundry\model as M;
use foundry\config as Conf;
use foundry\request\url as URL;
use foundry\response\redirect as Redir;


class test extends \foundry\controller 
{
	public function main(){
	 	$user = M::init('clepsydra:person')->findByUID(2)->timeByWk('pre');
	 	//$user = M::init('clepsydra:person')->findByUID(3)->timeByDay();
	
		return array(
		   'user' => $user,
		);
		
	}
}


?>