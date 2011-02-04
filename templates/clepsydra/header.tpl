{% helper userHelper as user %}
			<div class="container_12">
				<div class="grid_12">
					<ul class="nav" id="main">
						<li class="active"><a href="#">Your Timesheet</a></li>
						<li><a href="#">Other Users</a></li>
					</ul>
					<ul class="nav" id="user_actions">
						<li><a href="#" onclick="clockin()" id="clock_in" class="{% if user.status %}red{% else %}green{% endif %}">Clock {% if user.status %}out{% else %}in{% endif %}</a></li>
						<li id="prograss"></li>
						<li><a href="#">Settings</a></li>
						<li><a href="{{ 'clepsydra:main/logout'|url }}">Log Out</a></li>
					</div>
					
				</div>
			</div>
