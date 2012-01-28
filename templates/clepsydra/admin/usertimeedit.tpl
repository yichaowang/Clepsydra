{% if (is_view!=0) %}     

<div class="col-heading">
	Time Cards
</div> 
<div class="clear"></div>

<form method="post" target="_blank">

	<table class="usertime-edit">
		<tr class="heading">
			<td colspan="1">id</td>
			<td colspan="6">start</td>
			<td colspan="6">end</td>
			<td colspan="1">remove</td>
		</tr>       
		<tr class="sub-heading">
			<td></td>     
			
			<td>yyyy</td>
			<td>mm</td>
			<td>dd</td>
			<td>hh</td>
			<td>mm</td>
			<td>ss</td> 
			
			<td>yyyy</td>
			<td>mm</td>
			<td>dd</td>
			<td>hh</td>
			<td>mm</td>
			<td>ss</td>   
			
			<td></td>
		</tr>
		{% for card in cards %}
		<tr class="timecard">
			<td>{{card.id}}</td>      
			
			<td><input size="4" type="text" name="in_yr" value="{{card.in|date('Y')}}" class="yr"/></td>
			<td><input size="2" type="text" name="in_month" value="{{card.in|date('m')}}"/></td>
			<td><input size="2" type="text" name="in_day" value="{{card.in|date('d')}}"/></td>
			<td><input size="2" type="text" name="in_h" value="{{card.in|date('H')}}"/>:</td>
			<td><input size="2" type="text" name="in_m" value="{{card.in|date('i')}}"/>:</td>
			<td><input size="2" type="text" name="in_d" value="{{card.in|date('s')}}"/></td>
			
			<td><input size="4" type="text" name="out_yr" value="{{card.out|date('Y')}}" class="yr"/></td>
			<td><input size="2" type="text" name="out_month" value="{{card.out|date('m')}}"/></td>
			<td><input size="2" type="text" name="out_day" value="{{card.out|date('d')}}"/></td>
			<td><input size="2" type="text" name="out_h" value="{{card.out|date('H')}}"/>:</td>
			<td><input size="2" type="text" name="out_m" value="{{card.out|date('i')}}"/>:</td>
			<td><input size="2" type="text" name="out_d" value="{{card.out|date('s')}}"/></td>   
			
			<td><a class="delete_row" title="{{card.id}}" href="#">x</a></td>
		</tr>	
		{% endfor %}
	</table>
	<div class="submit">
		<input class="submit" type="submit" value="Save"/> or
		<input class="cancel" type="button" value="Cancel">
	</div>
</form>
<div class="clear"></div>


{% endif %}          
