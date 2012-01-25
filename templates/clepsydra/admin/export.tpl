{% if (export!=1) %} 
<div class="col-heading">
	Export 
</div> 
 
<form action="{{ 'clepsydra:admin/export' | url }}"  method="post" target="_blank">
	
	<div class="col-tbheading">
		<div class="people">People</div>
		<div class="period">Period</div>
	</div>
	
	<div class="col-people">
		{%for user in users%}
			<input type="checkbox" name="people[]" value="{{user.uid}}"> {{user.name}} <br>
		{%endfor%}
	</div>                                                         
	
	<div class="col-period">
		<span>From</span>
		<input type="text" name="exdate-start" size="12" value="mm/dd/yyyy"/>
		<span>to</span>
		<input type="text" name="exdate-end" size="12" value="mm/dd/yyyy"/><br><br>
		
		
		<span>or Select most recent bi-week dates:</span><br>
		<input type="radio" name="period" value="{{pay.pre|date('m/d/Y')}}|{{pay.nowe| date('m/d/Y')}}" />{{pay.pre|date('m/d/y')}} - {{pay.nowe | date('m/d/y')}}<br />
		
		<input type="radio" name="period" value="{{pay.nows|date('m/d/Y')}}|{{pay.nxt| date('m/d/Y')}}" />{{pay.nows|date('m/d/y') }} - {{pay.nxt | date('m/d/y')}}<br />        
		
		<div class="submit">
			<input class="submit" type="submit" value="Export"/> or
			<input class="cancel" type="button" value="Cancel">
		</div>
	</div>
	<div class="clear"></div>
</form>
<div class="clear"></div>


{% endif %}          
