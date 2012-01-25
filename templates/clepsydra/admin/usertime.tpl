<div class='control sub'>
	<span class="description">Pay Period:</span>
	<a id="pre" class="button {% if (wk=='pre') %}clicked{% endif %}">{{pay.pre|date('m/d')}}-{{pay.nowe| date('m/d')}}</a>      
	<a id="next" class="button {% if (wk=='next') %}clicked{% endif %}">{{pay.nows|date('m/d') }}-{{pay.nxt|  date('m/d')}}</a>
	<a id="all" class="button {% if (wk=='all') %}clicked{% endif %}">&rarr;&#124</a>
	<span class="description">Date:</span>
	<input id="slet-s" type="text" size="10" value={{range.ss|date('m/d') }} />
	<span class="description">to</span>
	<input id="slet-e" type="text" size="10" value={{range.es|date('m/d') }} />
	<a id="go" class="button">GO</a>
	<div class="clear"></div>   	  		
</div>
<div id="admin-time-nav">
	{{range.ss|date('m/d') }}, {{range.swday}} - {{range.es|date('m/d') }}, {{range.ewday}}
	<a id="nav-pre" class="btn-plain">&laquo</a>
	<a id="nav-nt" class="btn-plain">&raquo</a>
</div>
<table id="admin-time" cellspacing="0" summary="Colleagues at State News.">
	<tr class="title">
		<td>Date</td>
		<td>Total</td>
		<td>Edit</td>
	</tr>
	{% for day in usertime %}	
	<tr class='admin-time-row'>
		<td>{{ day.month }}/{{ day.mday }} {{ day.weekday }}</td>
		<td>{{ day.time }}</td>
		<td></td>
	</tr>
	{% endfor %}
</table>