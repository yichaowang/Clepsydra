<div class='control sub' title="{{username}}">
	<span class="description">Pay Period:</span>
	<a id="pre" class="button {% if (wk=='pre') %}clicked{% endif %}">{{pay.pre|date('m/d')}}-{{pay.nowe| date('m/d')}}</a>      
	<a id="next" class="button {% if (wk=='next') %}clicked{% endif %}">{{pay.nows|date('m/d') }}-{{pay.nxt|  date('m/d')}}</a>
	<a id="all" class="button {% if (wk=='all') %}clicked{% endif %}">&rarr;&#124</a>
	<span class="description">Date:</span>
	<input id="slet-s" type="text" size="10" value={{range.ss|date('m/d/Y') }} />
	<span class="description">to</span>
	<input id="slet-e" type="text" size="10" value={{range.es|date('m/d/Y') }} />
	<a id="go" class="button">GO</a>
	<div class="clear"></div>   	  		
</div>
<div id="admin-time-nav">
	{{range.ss|date('m/d/Y') }}, {{range.swday}} - {{range.es|date('m/d/Y') }}, {{range.ewday}}
	<a id="nav-pre" class="btn-plain">&laquo</a>
	<a id="nav-nt" class="btn-plain">&raquo</a>
</div>
<table id="admin-time" title="{{userid}}" cellspacing="0" summary="Colleagues at State News.">
	<tr class="title">
		<td>Date</td>
		<td>Total</td>
		<td>Edit</td>
	</tr>
	{% for day in usertime %}	
	<tr class='admin-time-row'>
		<td class="t-date">{{ day.month }}/{{ day.mday }}/{{ day.yr }} {{ day.weekday }}</td>
		<td>{{ day.time }}</td>
		<td class="edit"><span class="icon-pencil" title="{%for card in day.cards %}{{card.0}}|{% endfor %}"></span></td>
	</tr>
	{% endfor %}
</table> 
<a class="add-time-card">Add new time card</a>