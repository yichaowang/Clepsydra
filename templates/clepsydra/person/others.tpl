{% extends 'clepsydra/base.tpl' %}
 
{% block active %}others{% endblock %}


{% block content %}
<div id="frame">	
	<div class="grid_12 alpha omega">
		<table id="others" cellspacing="0" summary="Colleagues at State News."> 
		<tr> 
			<th width="50%"></th> 
			<th>Email</th> 
			<th>Has been<br> here for </th> 
			<th>Talk to<br> him/her</th> 
		</tr> 
		{%for user in users%}
		<tr> 
			<td class="name">{{user.name}}</td> 
			<td>{{user.email}}</td> 
			<td>{{user.timeTotal('toDay','auto')}}</td> 
			<td>Hello!</td> 
		</tr>
		{%endfor%}
		 
		<tr class="alt"> 
			<td class="name">Ryan Mcbride</td> 
			<td>ryan@msu.edu</td> 
			<td>29 Minutes</td> 
			<td>Hello!</td> 
		</tr>
		
	   
		</table>
	</div>
</div>	
{% endblock %}