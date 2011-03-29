{% extends 'clepsydra/base.tpl' %}
{% block active %}timesheet{% endblock %}

{% block content %}
{% helper userHelper as user %}
	{% if user.track == 1 and user.active == 1 %}
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
	{% endif %}
	</div>

{% endblock %}