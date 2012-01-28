{% extends 'clepsydra/base.tpl' %}
 
{% block active %}admin{% endblock %}


{% block content %}
<div id="frame">
   	<div class="control grid_12 alpha omega">
		<a id="edit-mode" class="button">Edit Profile &amp Time</a>
		<a id="export" class="button">Export</a>
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
		<tr>		 
		{%for user in users%}
		<tr {% if user.status == 1 %} class="in" {% endif %} id="{{user.uid}}"> 
			<td>{{user.name}}</td> 
			<td>{{user.email}}</td> 
			<td>{{user.timeTotal('toDay','auto')}}  </td>
			<td>{{user.timeTotal('toWeek','auto')}} </td> 
			<td>{{user.timeTotal('toMonth','auto')}}</td> 
			<td>{{user.timeTotal('toYear','auto')}} </td>  
		</tr>
		{%endfor%}                        
		</table>
	</div>
	<div id="crud-controll" class="control grid_12 alpha omega">
		<a type="button" class="s-button" id="add-user">Add New User</a>
	</div>
	<div id="crud-form" class="grid_5 omega">

	</div>
	<div id="crud-time" class="grid_7 alpha">
		   
	</div>   
</div>	
{% endblock %}