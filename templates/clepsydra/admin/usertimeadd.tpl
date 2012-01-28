{% if (is_view!=0) %}    
<div class="col-heading">
	Add Timecards
</div> 
<div class="clear"></div>
<form>
<table class="usertime-add">
	<tr class="heading">
		<td colspan="6">start</td>
		<td colspan="6">end</td>
	</tr>       
	<tr class="sub-heading">		
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
	</tr>
	<tr class="timecard">
		<td><input size="4" type="text" name="in_yr" value="" class="yr"/></td>
		<td><input size="2" type="text" name="in_month" value=""/></td>
		<td><input size="2" type="text" name="in_day" value=""/></td>
		<td><input size="2" type="text" name="in_h" value=""/> :</td>
		<td><input size="2" type="text" name="in_m" value=""/> :</td>
		<td><input size="2" type="text" name="in_d" value=""/></td>
		
		<td><input size="4" type="text" name="out_yr" value="" class="yr"/></td>
		<td><input size="2" type="text" name="out_month" value=""/></td>
		<td><input size="2" type="text" name="out_day" value=""/></td>
		<td><input size="2" type="text" name="out_h" value=""/> :</td>
		<td><input size="2" type="text" name="out_m" value=""/> 	:</td>
		<td><input size="2" type="text" name="out_d" value=""/></td>   
	</tr>	
</table> 
<div class="submit">
	<input class="submit" type="submit" value="Save"/> or
	<input class="cancel" type="button" value="Cancel">
</div>
</form>
 
{% endif %}