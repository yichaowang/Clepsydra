<?php
/*
 Title: model\card

 Group: Models
 
 File: card.class.php
  Provides Card model class
  
 Version:
  2011.1.12
  
 Copyright:
  2004-2010 The State News, Inc
  
 Author:
  <# Your name #> <<# you #>@msu.edu>
  
 License:
  GNU GPL 2.0 - http://opensource.org/licenses/gpl-2.0.php
*/
namespace clepsydra\model;
use foundry\event as Event;
use foundry\filter as Filter;
use foundry\request\url as URL;

/*
 Class: card
  <# desc #>
 
 Namespace:
  <# namespace #>
*/
class card extends \foundry\model {

	protected $hasOne = array(
		'person' => array(
			'namespace' => 'clepsydra',
			'order' => '',
			'limit' => '100'
		)
	);
	
	protected $schema = array(
		'uid',
		'timein',
		'timeout',
		'person_id'
	);

	public function __construct($self=false, $ns=false, $handler=false) {
		parent::__construct($self, $ns, $handler);

//		This is an event callback
//		Event::bind($this, 'beforeSave', array($this, 'preSave'));

	}

	public function preSave() {
//		This is the action called by the above event callback
	}

	// find on time card
	public function opencard() {
		
	}


//	This is an example of an overloaded property
	public function __url() {
		return URL::linkTo(URL::build('some:path/foo', array(
			'var' => 'val'
		)), true);
	}
}

?>