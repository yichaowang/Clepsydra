<!DOCTYPE html>
<html>
	<head>
		<title>Clepsydra</title>	
		<link rel="stylesheet" type="text/css" media="screen" href="{{ 'styles/css/master.css'|url }}" />
		<script type="text/javascript" src="{{ 'javascript/vendor/mootools-core-more.js'|url }}"></script>
		<script type="text/javascript" src="{{ 'javascript/master.js'|url }}"></script>
	</head>
	<body id="login_body">
	    <div id="status-message" class="for-demo" style="position: fixed; top: 60px; left: 25%; zoom: 1; opacity: 1; " class="success"><div style="margin-top: 5px; ">Email: "demo@mail.com" Passwod:"demo". Database and all saves will reset every 24 hours.</div></div>

		<div class="container_12">
			<form method="post" action="{{ 'clepsydra:main/login'|url }}" id="login">
				<img src="{{ 'styles/img/logo.png'|url }}" alt="Clepsydra" id="logo" />

				<input class="text-replace" default="Email" type="text" name="email" value="Email" id="email" />
				
				<input class="text-replace" default="Password" type="password" name="passwd" value="Password" id="password" />
				
				<input type="submit" value="Login" class="green" />
				
				<p>
					<strong>clep&bull;sy&bull;dra</strong>
					<span>noun. <i>klep-si-druh</i></span>
					1. An ancient device for measuring time by the regulated flow of water or mercury through a small aperture.	
				</p>
			</form>
		</div>
	
	</body>
</html>

