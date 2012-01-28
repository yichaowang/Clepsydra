{% extends 'clepsydra/base.tpl' %}
 
{% block active %}others{% endblock %}


{% block content %}
<div id="frame">	
	<div class="grid_12 alpha omega">
		<table id="others" cellspacing="0" summary="Colleagues at State News."> 
		<tr> 
			<th></th> 
			<th>Email</th> 
			<th>Has been<br> here for </th> 
		</tr> 
		{%for user in users%}
		<tr> 
			<td class="name">{{user.name}} 
				{% if user.status == 0 %}<img src="{{ 'styles/img/icon_offline.png'|url }}"/>
				{% else %} <img src="{{ 'styles/img/icon_online.png'|url }}"/>  
				{% endif %}
			</td> 
			<td>{{user.email}}</td> 
			<td>{% if user.status == 1 %}{{user.timeTotal('toDay','auto')}}{% endif %}</td> 
		</tr>
		{%endfor%}
	     
		</table>
	</div>
</div>	
{% endblock %}