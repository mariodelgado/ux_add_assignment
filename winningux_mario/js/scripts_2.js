
document.observe("dom:loaded", function() { 

//Edit mode toggle - v2

if ($('status_toggle_new'))  $('status_toggle_new').observe('click',function(Event) {

	if ($('status_toggle_new').className=='toggle-track off') {
	
	
		$('status_toggle_new').removeClassName('off').addClassName('on');
		$$('.toggle-knob > [class*="icon"]')[0].removeClassName('icon-remove').addClassName('icon-ok');
		
		
		// Show/hide animation
		if ($('bb_payload')) $('bb_payload').addClassName('is-editable edit-controls-show');
		if ($('bb_content_nav')) $('bb_content_nav').addClassName('is-editable edit-controls-show');
		if ($$('.hero-holder')[0]) $$('.hero-holder')[0].addClassName('is-editable edit-controls-show');
		
		setTimeout(function(){$('bb_payload').removeClassName('edit-controls-show').addClassName('edit-controls-hide')}, 2000);
		setTimeout(function(){$('bb_content_nav').removeClassName('edit-controls-show').addClassName('edit-controls-hide')}, 2000);  
		if ($$('.hero-holder')[0]) setTimeout(function(){$$('.hero-holder')[0].removeClassName('edit-controls-show').addClassName('edit-controls-hide')}, 2000);
		Event.stop();
		
	}
	
	else if ($('status_toggle_new').className=='toggle-track on') {
		$('status_toggle_new').removeClassName('on').addClassName('off');
		$$('.toggle-knob > [class*="icon"]')[0].removeClassName('icon-ok').addClassName('icon-remove');	
		
		if ($('bb_payload'))  $('bb_payload').removeClassName('is-editable').removeClassName('edit-controls-hide').removeClassName('edit-controls-show');
		if ($('bb_content_nav')) $('bb_content_nav').removeClassName('is-editable').removeClassName('edit-controls-hide').removeClassName('edit-controls-show');
		Event.stop();	
	}
});



if ($('course_status_toggle'))  $('course_status_toggle').observe('click',function(Event) {


	if ($('course_status_toggle').className=='button-toggle toggle-track inverse off') {

	
		$('course_status_toggle').removeClassName('off').addClassName('on');
		$$('#course_status_toggle .toggle-knob > [class*="icon"]')[0].removeClassName('icon-remove').addClassName('icon-ok');
		$$('#course_status_toggle .toggle-label')[0].innerHTML = 'ON';
		Event.stop();
		
	}
	
	else if ($('course_status_toggle').className=='button-toggle toggle-track inverse on') {
		$('course_status_toggle').removeClassName('on').addClassName('off');
		$$('#course_status_toggle .toggle-knob > [class*="icon"]')[0].removeClassName('icon-ok').addClassName('icon-remove');	
		$$('#course_status_toggle .toggle-label')[0].innerHTML = 'OFF';
		Event.stop();	
	}
});




// Fake drag&drop action

 if($('drop_target')) $('drop_target').observe('click',function(Event)  {
	//alert('hello');


	$('drop_target').addClassName('drop-action');

	setTimeout(function(){$('drop_target').addClassName('drop-action')}, 2000);	
	Event.stop();
});


if($('assistant_button')) $('assistant_button').observe('click',function(Event)  {
	$('assistant_overlay').addClassName('display');
	$('assistant_button').down('span').innerHTML = "3 Steps Left..."
	Event.stop();
	
});

if($('close_assistant_button')) $('close_assistant_button').observe('click',function(Event) {
	$('assistant_button').up().hide();
	alert("Setup reminder will be displayed when you login next time. Thank you.");
});



});



/*
function togglePageMode(el) {
	if (el.className=='button') {
		if ($('bb_payload')) $('bb_payload').addClassName('is-editable edit-controls-show');
		if ($('bb_content_nav')) $('bb_content_nav').addClassName('is-editable edit-controls-show');
		if ($$('.hero-holder')[0]) $$('.hero-holder')[0].addClassName('is-editable edit-controls-show');
		//$('tool_menu').addClassName('is-editable edit-controls-show');
		
		setTimeout(function(){$('bb_payload').removeClassName('edit-controls-show').addClassName('edit-controls-hide')}, 2000);
		setTimeout(function(){$('bb_content_nav').removeClassName('edit-controls-show').addClassName('edit-controls-hide')}, 2000);  
		setTimeout(function(){$$('.hero-holder')[0].removeClassName('edit-controls-show').addClassName('edit-controls-hide')}, 2000);  
		//setTimeout(function(){$('tool_menu').removeClassName('edit-controls-show').addClassName('edit-controls-hide')}, 2000); 
		
		//el.down('.text-primary').replace('<strong class="text-primary"><i class="icon-left" data-icon="2"></i> ON</strong>');
		el.down('.text-primary').childNodes[1].nodeValue=" ON";
		el.down('[class*="icon"]').setAttribute('data-icon', '2');
		
		el.removeClassName('off').addClassName('on');
			return false;
	}
	else if (el.className=='button button-success') {
		if ($('bb_payload'))  $('bb_payload').removeClassName('is-editable').removeClassName('edit-controls-hide').removeClassName('edit-controls-show');
		if ($('bb_content_nav')) $('bb_content_nav').removeClassName('is-editable').removeClassName('edit-controls-hide').removeClassName('edit-controls-show');
		//$('tool_menu').removeClassName('is-editable').removeClassName('edit-controls-hide').removeClassName('edit-controls-show');
		el.removeClassName('on').addClassName('off');
		//el.down('.text-primary').replace('<strong class="text-primary"><i class="icon-left" data-icon="&times;"></i> OFF</strong>');
		el.down('.text-primary').childNodes[1].nodeValue=" OFF";
		el.down('[class*="icon"]').setAttribute('data-icon', "○");
			return false;
	}
	return false;
}
*/
