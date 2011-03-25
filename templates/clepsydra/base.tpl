{% if not active %}
	{% set active %}{% block active %}{% endblock %}{% endset %}
{% endif %}
{% helper userHelper as user %}

<!DOCTYPE html>
<html>
	<head>
		<title>Clepsydra</title>	
		<link rel="stylesheet" type="text/css" media="screen" href="{{ 'styles/css/master.css'|url }}" />
		<script type="text/javascript" src="{{ 'javascript/vendor/mootools-corecompat.js'|url }}"></script>
		<script type="text/javascript" src="{{ 'javascript/master.js'|url }}"></script>
	</head>
	<body>
	
		<div id="header">
			{% include 'clepsydra/header.tpl' %}
		</div>
		
		<div class="container_12">
			<div class="grid_6 alpha">
				<h1>Welcome Back, {{ user.name }}.</h1>
				<em>Status:</em>
				<span id="status">
				{% if user.track %}
					Clocked {% if user.status %}In{% else %}Out{% endif %}
				{% else %}
					Your time isn't tracked.
				{% endif %}
				</span>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<em>Currently:</em> <span id="clock">Fetching time</span>
			</div>
			<div id="totalhr" class="grid_6 omega">
				<div class="dark round">
					<em>This Year</em>
					<span id="t-year">{{hour.toyear}} hr</span>
				</div>
				<div class="dark round">
					<em>This Month</em>
					<span id="t-month">{{hour.tomonth}} hr</span>
				</div>
				<div class="dark round">
					<em>This Week</em>
					<span id="t-week">{{hour.toweek}} hr</span>
				</div>
				<div class="dark round">
					<em>Today</em>
					<span id="t-today">{{hour.today}}</span>
				</div>
			</div>
			<div class="clear"></div>
			{% block content %}{% endblock %}
		</div>
   		<div class="clear"></div>
        <div class="container_12">
   	 		<div class="grid_12 alpha omega">
				<div id="footer">
					&copy; Copyright 2011 The State News
				</div>
			</div>
	    </div>  
	</body>
</html>

