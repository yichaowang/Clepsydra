{% extends 'clepsydra/base.tpl' %}
 
{% block active %}admin{% endblock %}


{% block content %}
<div id="frame">	
	<div class="grid_8 alpha omega">
		<table id="admin-others" cellspacing="0" summary="Colleagues at State News."> 

		{%for user in users%}
		<tr {% if user.status == 1 %} class="in" {% endif %}> 
			<td class="name">{{user.name}} 
				
			</td> 
			<td>{{user.email}}</td> 
			<td>{% if user.status == 1 %}{{user.timeTotal('toDay','auto')}}{% endif %}</td> 
			<td>{% if user.status == 1 %}<img src="{{ 'styles/img/icon_talk.png'|url }}"/>{% endif %}</td> 
		</tr>
		{%endfor%}
	     
		</table>
	</div>
</div>	
{% endblock %}