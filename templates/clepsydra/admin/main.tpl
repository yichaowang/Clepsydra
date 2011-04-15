{% extends 'clepsydra/base.tpl' %}
 
{% block active %}admin{% endblock %}


{% block content %}
<div id="frame">	
   	<div class="control grid_12 alpha omega">
	  	<span class="title">SORT BY:</span>
		<a id="edit-mode" class="button">Edit User</a>   	
	</div>
	<div class="grid_12 alpha omega">
		<div id="ticker">
			  message: {{message}}
		</div>
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
		<span class="title" id="add-user">ADD NEW:</span>
		<input type="text" size="20" />
	</div>
	<div id="crud-form" class="grid_8 alpha ">
	</div>   
</div>	
{% endblock %}