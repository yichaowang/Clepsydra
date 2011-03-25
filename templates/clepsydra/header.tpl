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
					</ul>
					<ul class="nav" id="user_actions">
						<li id="clockbtn"><a href="#" id="clock_in" class="green">Clock in</a></li>
						<li><a href="#">Settings</a></li>
						<li><a href="{{ 'clepsydra:main/logout'|url }}">Log Out</a></li>
					</ul>
					
				</div>
			</div>
