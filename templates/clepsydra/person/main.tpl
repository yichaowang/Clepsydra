{% extends 'clepsydra/base.tpl' %}
{% block active %}timesheet{% endblock %}

{% block content %}
{% helper userHelper as user %}
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
	
	<div id="frame">
	<div id="grid_12 alpha omega">
		<ul id="day-list" class="dark_list">
			<li class="Tips1" id="opencardli" title="" style="height:28px; ">
				<span id="opencard"></span><br/> 
				<span id="timer0tag"></span> 
				<span id="timer0"></span>
			</li>
			
			{% for day in hourbyday %}
				<li class="Tips1" title="On that day, you worked: ::
				{% for card in day.cards %}{% set diff = card.timeout - card.timein %}
				{% if card.timein != card.timeout %}
				{{card.timein | date('h:i:s')}} - {{card.timeout | date('h:i:s A')}} | {{ diff//36/100 }} Hrs<br/>
				{% endif %}
				{% endfor %}">
					<em>{{ day.weekday }}. {{ day.month }}/{{ day.mday }}</em><br/>
					<span>{{ day.hours//0.01/100 }} hr</span> 
				</li>
			{% endfor %}
		</ul>
	</div>
	<!--
	<div class="clear"></div>
	<div id="grid_12">
		<!-- test start
		tester: {{ tester }} <br/>
		helper.tracked: {{ user.track }} <br/>
		helper.status: {{ user.status }} <br/><br/>
		
		Variables: <br/>
		Hour worked today: {{hour.today//0.01/100}} hours <br/> {# //0.01/100 is to round hour to the nearest 1/100 #}
		Hour worked this week: {{hour.toweek//0.01/100}} hours <br/>
		Hour worked this month: {{hour.tomonth//0.01/100}} hours <br/>
		Hour worked this year: {{hour.toyear//0.01/100}} hours <br/><br/>
		
		Hour by day: (in EST) <br/>
		{% for day in hourbyday %}
			== {{ day.weekday }} - {{ day.month }}/{{ day.mday }} : {{ day.hours//0.01/100 }} hours <br/>
		{% endfor %}
		
		<br/>Recorded time (in GMT):
		<ul>
	   
		{% for card in user.cards %}
		{% set diff = card.timeout - card.timein %}
			{% if card.timein == card.timeout %} {% else %}
			<li>{{ card.timein | date('F jS -- h:i:s A') }} - {{ card.timeout | date('h:i:s A') }} - - - - - - {{ diff//60 }} minutes  </li>
			{% endif %} 
		{% endfor %}
		<!-- test end
		</ul>
	</div>
    -->
	</div>

{% endblock %}