{% extends 'clepsydra/base.tpl' %}

{% block content %}

	<div class="grid_6">
		<h1>Welcome Back, {{ user.name }}.</h1>
		<em>Status:</em>
		{% if user.track %}
			Clocked {% if user.status %}In{% else %}Out{% endif %}
		{% else %}
			Your time isn't tracked.
		{% endif %}
		&nbsp;&nbsp;&nbsp;&nbsp;
		<em>Currently:</em> <span id="clock">Fetching time</span>
	</div>
	<div class="grid_6">
		<div id="timer" class="dark round">
			<em>Today</em>
			<span id="clock">x</span>
		</div>
	</div>
	<div id="clear"></div>
	<div id="gird_6">
		tester: {{ tester }} <br/>
		helper.tracked: {{ user.track }} <br/>
		helper.status: {{ user.status }} <br/><br/>
		
		Variables: <br/>
		Hour worked today: {{hour.d//0.01/100}} hours <br/> {# //0.01/100 is to rounded hour to the nearest 1/100 #}
		Hour worked this week: {{hour.w//0.01/100}} hours <br/>
		Hour worked this month: {{hour.m//0.01/100}} hours <br/>
		Hour worked this year: {{hour.y//0.01/100}} hours <br/><br/>
		
		Hour by day: (in EST) <br/>
		{% for day in hourbyday %}
			== {{ day.weekday }} - {{ day.mon }}/{{ day.mday }} : {{ day.hours//0.01/100 }} hours <br/>
		{% endfor %}
		
		<br/>Recorded time (in GMT):
		<ul>
		{% for card in user.cards %}
		{% set diff = card.timeout - card.timein %}
			<li>{{ card.timein | date('F jS -- h:i:s A') }} - {% if card.timein == card.timeout %} current 
				{% else %} {{ card.timeout | date('h:i:s A') }} - - - - - - {{ diff//60 }} minutes {% endif %}  </li>
		{% endfor %}
		
		</ul>
	</div>


{% endblock %}