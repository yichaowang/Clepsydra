{% if uname %} {% set role = 'create' %} {% endif %}
{% if person %} {% set role = 'edit' %} {% endif %}

{% if role=='create' %}
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
				<input type="text" name="email" size="20" value=""/>
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
{% endif %}

{% if role=='edit' %}
<form class="userform" action="{{ 'clepsydra:admin/edit' | url }}" id="userform-update" method="post">
	<fieldset>
		<div class="title">Editing {{person.name}}'s profile:</div>
   	 	<ul>
			<input type="hidden" name="uid" value={{person.uid}}>
			<li> 
				<label>Name</label>
				<input id="uname" name="uname" type="text" size="20" value="{{person.name}}" />
			</li>
			<li> 
				<label for="email">Email</label>
				<input type="text" name="email" size="20" value="{{person.email}}"/>
			</li>

			<li> 
				<label for="password">Password</label>
				<input type="password" name="password" size="20"/>
			</li>
		
			<li> 
				<label for="passwordc">Confirm Password</label>
				<input type="password" name="passwordc" size="20"/>
			</li>
		
			<li> 
				<label for="department">Department</label>
				<input type="text" name="department" size="20" value="{{person.department}}"/>
			</li>
		
			<li> 
				<label for="pin">Pin (4 digits)</label>
				<input type="text" name="pin" size="4" value="{{person.pin}}"/>
			</li>
		
			<li> 
				<label for="phone">Phone</label>
				<input type="text" name="phone" size="20" value="{{person.phone}}"/>
			</li>
		
			<li> 
				<label for="admin">Admin</label>
				<input type="checkbox" name="admin" value="1" {% if person.is_admin==1 %} checked {% endif%}/>
				<label>is admin</label>
			</li>
		
			<li> 
				<label for="active">Active</label>
				<input type="checkbox" name="active" value="1" {% if person.active==1 %} checked {% endif%}/>
				<label>is currently an active user</label>
			</li>
		
			<li>
				<label for="track">Time Tracked</label>
				<input type="checkbox" name="track" value="1" {% if person.track==1 %} checked {% endif%}/>
				<label>time is tracked</label>
			</li>	
		
			<li> 
				<label for="status">Current Status</label>
				<input type="checkbox" name="status" value="1" {% if person.status==1 %} checked {% endif%}/>
				<label>is currently clocked in</label>
			</li>
		
			<li>
				<label for="locked">Locked</label>
				<input type="checkbox" name="locked" value="1" {% if person.locked==1 %} checked {% endif%}/>
				<label>is locked due to invalid password</label>
			</li>
		
			<li>
				<label for="attempts">Attempts (3 maximum)</label>
				<input type="text" name="attempts" size="1" value="{{person.attempts}}">
			</li>

			<li>
				<fieldset class="submit">
					<input type="submit" id="submit" value="save" /> or
					<input type="button" id="reset" value="cancel" />
				</fieldset> 
			</li>
		<ul> 
	</fieldset> 	
</form>
{% endif %}
