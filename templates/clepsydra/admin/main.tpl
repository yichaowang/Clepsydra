{% extends 'clepsydra/base.tpl' %}
 
{% block active %}admin{% endblock %}


{% block content %}
<div id="frame">	
   	<div class="control grid_12 alpha omega">
	  	<span class="description">SORT BY:</span>
		<a id="edit-mode" class="button">Edit User</a>
		<div class="clear"></div>   	
	</div>
	<div class="grid_12 alpha omega">
		<table id="admin-others" cellspacing="0" summary="Colleagues at State News.">
		<tr class="title">
			<th>NAME</th> 
			<th>EMAIL</td>
			<th>TODAY</th>
			<th>TO WEEK</th>
			<th>TO MONTH</th> 
			<th>TO YEAR</th> 
			<th>CHAT</th>	
		<tr>		 
		{%for user in users%}
		<tr {% if user.status == 1 %} class="in" {% endif %} id="{{user.uid}}"> 
			<td>{{user.name}}</td> 
			<td>{{user.email}}</td> 
			<td>{{user.timeTotal('toDay','auto')}}  </td>
			<td>{{user.timeTotal('toWeek','auto')}} </td> 
			<td>{{user.timeTotal('toMonth','auto')}}</td> 
			<td>{{user.timeTotal('toYear','auto')}} </td>  
			<td>{% if user.status == 1 %}<img src="{{ 'styles/img/icon_talk.png'|url }}"/>{% endif %}</td> 
		</tr>
		{%endfor%}                        
		</table>
	</div>
	
	<div id="crud-controll" class="control grid_12 alpha omega">
		<span class="description" id="add-user">ADD NEW:</span>
		<input type="text" size="20" />
	</div>
	<div id="crud-form" class="grid_5 omega">
		<form class="userform" action="{{ 'clepsydra:admin/edit' | url }}" id="userform-create" method="post">
			<fieldset>
				<div id="form-type" role="add" class="title">Add new user:</div>
				<ul>
					<li> 
						<label>Name</label>
						<input id="uname" name="uname" type="text" size="20" value="{{uname}}" readonly="readonly" />
					</li>
					<li> 
						<label for="email">Email</label>
						<input type="text" name="email" size="20" value="{{person.email}}"/>
					</li>

					<li> 
						<label for="password">Password</label>
						<input type="password" name="password" size="20" />
					</li>

					<li> 
						<label for="passwordc">Confirm Password</label>
						<input type="password" name="passwordc" size="20" />
					</li>
                                          
					<li> 
						<label for="department">Department</label>
						<input type="text" name="department" size="20" />
					</li>

					<li> 
						<label for="pin">Pin (4 digits)</label>
						<input type="text" name="pin" size="4" />
					</li>

					<li> 
						<label for="phone">Phone</label>
						<input type="text" name="phone" size="20" />
					</li>

					<li> 
						<label for="admin">Admin</label>
						<input type="checkbox" name="admin" value="1"/>
						<label>is admin</label>
					</li>

					<li> 
						<label for="active">Active</label>
						<input type="checkbox" name="active" value="1"/>
						<label>is currently an active user</label>
					</li>

					<li>
						<label for="track">Time Tracked</label>
						<input type="checkbox" name="track" value="1"/>
						<label>time is tracked</label>
					</li>	

					<li> 
						<label for="status">Current Status</label>
						<input type="checkbox" name="status" value="1"/>
						<label>is currently clocked in</label>
					</li>

					<li>
						<label for="locked">Locked</label>
						<input type="checkbox" name="locked" value="1">
						<label>is locked due to invalid password</label>
					</li>

					<li>
						<label for="attempts">Attempts (3 maximum)</label>
						<input type="text" name="attempts" size="1">
					</li>

					<li>
						<fieldset class="submit">
							<input type="submit" id="submit" value="add" />
							<input type="button" id="reset" value="cancel"/>
						</fieldset>
					</li>
				</ul>
			<fieldset>
		</form>
	</div>
	<div class="grid_7 alpha">
		<div id="name" class='control sub'>
			<span class="description">Pay Period:</span>
			<a id="pre-wk" class="button">4/10 - 4/23</a>
			<a id="next-wk" class="button">4/17 - 4/30</a>
			<span class="description">Date:</span>
			<input type="text" size="10" />
			<span class="description">to</span>
			<input type="text" size="10" />
			<a id="next-wk" class="button">GO</a>
			<div class="clear"></div>   	  		
		</div>
		<table id="admin-time" cellspacing="0" summary="Colleagues at State News.">
			<div id="admin-time-nav">week of</div>
			<tr class="title">
				<td>Date</td>
				<td>Total</td>
				<td>Periods</td>
				<td>Comment</td>
			</tr>	
			<tr>
				<td>4/19</td>
				<td>4.32 hours</td>
				<td>1</td>
				<td></td>
			</tr>
			<tr>
				<td>4/20</td>
				<td>3.12 hours</td>
				<td>1</td>
				<td></td>
			</tr>
			<tr>
				<td>4/21</td>
				<td>5.32 hours</td>
				<td>1</td>
				<td></td>
			</tr>
		</table>	
	</div>   
</div>	
{% endblock %}