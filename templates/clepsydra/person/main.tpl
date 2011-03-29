{% extends 'clepsydra/base.tpl' %}
{% block active %}timesheet{% endblock %}

{% block content %}
{% helper userHelper as user %}
	
	<div id="frame">
	<div class="grid_12 alpha omega">
		<ul id="day-list" class="dark_list">
			<li class="Tips1" id="opencardli" title="" style="height:28px; ">
				<span id="opencard"></span><br/> 
				<span id="timer0tag"></span> 
				<span id="timer0"></span>
			</li>
			
			{% for day in hourbyday %}
				<li class="Tips1" title="On that day, you worked: ::
				{% for card in day.cards %}
					{% if card.timein != card.timeout %}
						{% set diff = card.timeout - card.timein %}
						{{card.timein | date('h:i:s')}} - {{card.timeout | date('h:i:s A')}} | {{ diff//36/100 }} hrs<br/> 
					{% else %}
						{{card.timein | date('h:i:s')}} - Now<br/>  
					{% endif %}
				{% endfor %}">
					<em>{{ day.weekday }}. {{ day.month }}/{{ day.mday }}</em><br/>
					<span>{{ day.time }}</span> 
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