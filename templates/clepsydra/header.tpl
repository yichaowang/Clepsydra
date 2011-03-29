{% helper userHelper as user %}
			<div class="container_12">
				<div class="grid_12">
					<ul class="nav" id="main">
						<li {% if active == 'timesheet' %} class="active" {% endif %}>
							<a href="{{ 'clepsydra:person' | url }}">Your Timesheet</a>
						</li>
						<li {% if active == 'others' %} class="active" {% endif %}>
							<a href="{{ 'clepsydra:person/others' | url }}">Other Users</a>
						</li>
						{% if user.is_admin == 1 %}
						<li {% if active == 'admin' %} class="active" {% endif %}>
							<a href="{{ 'clepsydra:person/admin' | url }}">Adminastration</a>
						</li>
						{% endif %}
					</ul>
					<ul class="nav" id="user_actions">
						{% if user.track == 1 and user.active == 1 %}
						<li id="clockbtn">
							{% if user.status %}
							<a href="#" id="clock_out" onclick="clockOut()" class="red">Clock out</a>
							{% else %}
							<a href="#" id="clock_in" onclick="clockIn()" class="green">Clock in</a> 
							{% endif %}
						</li> 
						{% endif %}
						<!--<li><a href="#">Settings</a></li> -->
						<li><a href="{{ 'clepsydra:main/logout'|url }}">Log Out</a></li>
					</ul>
					
				</div>
			</div>
			
