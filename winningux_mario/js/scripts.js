//Sticky header. Too wonky.
// TODO: find a jQuery plugin
var origHeaderPosTop;

function stickHeader() {
  var header = $('bb_chrome_header');
  var chrome = $('bb_chrome');
  var headerH = header.offsetHeight;
  var content = $('bb_content_holder');
  var contentH = $('bb_payload').offsetHeight;
  var isStuck = (header.style.position == 'fixed');

      if ( !isStuck && header.viewportOffset().top < 0) 
      {
        origHeaderPosTop = header.cumulativeOffset().top;
        header.style.position='fixed';
        header.style.top='0px';
        header.addClassName('sticky');
         content.style.top = headerH - 17 + 'px';
         content.style.minHeight = headerH - 17 + 'px';
         content.style.minHeight = contentH + 'px';
         chrome.style.minHeight = contentH + headerH - 17 + 'px';
         
      }

  var scrolltop = document.viewport.getScrollOffsets().top;

      if (isStuck && scrolltop < origHeaderPosTop)
      {
        //header.style.top = 190+"px";
        header.style.position='relative';
    //     header.style.top='-34px';
        header.removeClassName('sticky');
         content.style.top = 'auto';

        
      }

 }
 


function adjustH() {

	var bb_box = $('bb_box');
	var headerH = $('bb_chrome_header').offsetHeight;
	//var brandingH = $('branding').offsetHeight;
	var chrome = $('bb_chrome');
	var windowH = window.innerHeight;
	
	bb_box.style.minHeight = windowH + "px";
	$('bb_payload').style.minHeight = windowH + "px";
	//if ($('branding')) chrome.style.marginTop = $('branding').offsetHeight + 'px';
}
 
 
 function adjustConvH() {

	//var bb_box = $('bb_box');
	var conversation_wrapper = $('conversation_wrapper');
	var mybb_header = $('mybb_header').offsetHeight;
	var conversation_utility = $('conversation_utility').offsetHeight;
	
	var windowH = window.innerHeight;
	
	conversation_wrapper.style.height = windowH - mybb_header - conversation_utility + "px";
	//bb_payload.style.minHeight = windowH - headerH + "px";
}
 
 
 
//Edit mode toggle
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
		
		el.addClassName('button-success');
			return false;
	}
	else if (el.className=='button button-success') {
		if ($('bb_payload'))  $('bb_payload').removeClassName('is-editable').removeClassName('edit-controls-hide').removeClassName('edit-controls-show');
		if ($('bb_content_nav')) $('bb_content_nav').removeClassName('is-editable').removeClassName('edit-controls-hide').removeClassName('edit-controls-show');
		//$('tool_menu').removeClassName('is-editable').removeClassName('edit-controls-hide').removeClassName('edit-controls-show');
		el.removeClassName('button-success');
		//el.down('.text-primary').replace('<strong class="text-primary"><i class="icon-left" data-icon="&times;"></i> OFF</strong>');
		el.down('.text-primary').childNodes[1].nodeValue=" OFF";
		el.down('[class*="icon"]').setAttribute('data-icon', "○");
			return false;
	}
	return false;
}






//Edit mode toggle
function togglePageMode_remote() {
	
	
	$$('status-toggle')[0].addClasseName('on');
	$$('status-toggle')[0].down('.status-value').innerHTML="ON";
	$('bb_payload').addClassName('is-editable edit-controls-show');
	$('bb_content_nav').addClassName('is-editable edit-controls-show');
	if  ($('bb_payload')) setTimeout(function(){$('bb_payload').removeClassName('edit-controls-show').addClassName('edit-controls-hide')}, 2000);
	if  ($('bb_content_nav')) setTimeout(function(){$('bb_content_nav').removeClassName('edit-controls-show').addClassName('edit-controls-hide')}, 2000);   

	//return false;
}

//course availability toggle
function toggleCourseMode(el) {
	if (el.className=='status-toggle') { 
		el.down('.status-value').innerHTML="ON";
		el.addClassName('on');
		return false;
	}
	else if (el.className=='status-toggle on') {
		el.removeClassName('on');
		el.down('.status-value').innerHTML="OFF";
			return false;
	}
	return false;
}


function simpleModeToggle(el) {
	if (el.className=='status-toggle') {
		el.addClassName('on');
	} 
	else if (el.className=='status-toggle on') {
		el.removeClassName('on');
	}
}

function toggleCourseMenu() {
	//$('bb_content_nav').toggle();
	$('bb_content_holder').toggleClassName('has-menu');
}


function togglePathMenu() {
	$('path_menu').toggle();
}





//Puts page in a semi data-collection mode
function editPage() {
	var editables = $$('.page-wide-editable');
	var hidables = $$('.vtbe-output');
	
	
	
	editables.each(function(e){e.insert({
		top: new Element('input', {type: 'text', value: '', 'class': 'edit-mode-input'})
	})});
	



	hidables.each(function(g){
		g.hide();
	})

	var inputs = $$('.edit-mode-input');
	
	var list_inputs = $$('h3 > .edit-mode-input');	
	
	inputs.each(function(f){
		f.value = f.next('span').childNodes[0].nodeValue;
		f.next('span').hide();
		$$('.control-bar')[0].hide();
	});
	
	list_inputs.each(function(f){f.insert({
		before: new Element('input', {type: 'checkbox', 'class': 'pw-checkbox'})
	})});
	
	
			
	
	$('bb_payload').removeClassName('is-editable').addClassName('pw-edit-mode');
	$('pw_edit_mode_controls').show();
	
	var list_controls = $$('.list-controls');
	
	list_controls.each(function(g){
		g.show()
	});
	
		
//	inputs.each(function(e){});

}

//Saving changes to a page in a partial data-collection mode 
function savePage() {
	var editables = $$('.page-wide-editable');
	var hidables = $$('.vtbe-output');
	
	var inputs = $$('.edit-mode-input');
	var list_inputs = $$('h3 > input[type="checkbox"]');	
	
	inputs.each(function(f){
		f.next('span').show();
		f.next('span').childNodes[0].nodeValue = f.value;
		f.remove();
		$$('.control-bar')[0].show();
		

	});
	
	list_inputs.each(function(f){
		f.remove()
	});

	hidables.each(function(g){
		g.show();
	});
	
	$('bb_payload').addClassName('is-editable').removeClassName('pw-edit-mode');
	
	$('pw_edit_mode_controls').hide();
	
	var list_controls = $$('.list-controls');
	
	list_controls.each(function(g){
		g.hide()
	});	
//	inputs.each(function(e){});

}

//Content item header inline edit
function inlineEdit(el) {

//alert (el.up(1).previous().innerHTML);

	el.up(1).previous('.title-text').insert({
		before: new Element('input', {type: 'text', value: '', 'class': 'edit-mode-input inline-mode'})
	});
	
	el.up(1).insert({
		after: new Element('a', {href: '#',  id: 'inline_save', title: 'Save changes', 'class': 'button button-clear button-notext element-temp', 'onclick': 'inlineSave(); return false'})
	});
	
	$('inline_save').insert ({
		top: new Element ('i', {'data-icon': '3', 'class': 'icon-center'})
	});
	
	el.up(1).insert({
		after: new Element('a', {href: '#',  id: 'inline_undo', title: 'Undo', 'class': 'button button-clear button-notext element-temp', 'onclick': 'inlineSave(); return false'})
	});
	
	$('inline_undo').insert ({
		top: new Element ('i', {'data-icon': '1', 'class': 'icon-center'})
	});

	
	
	var new_input = $('.edit-mode-input.inline-mode');
	
	el.up(1).previous('.title-text').hide();
	el.up(1).hide();
	el.up(1).previous('input').value=el.up(1).previous('.title-text').innerHTML;
	el.up(1).previous('input').focus();
	$('bb_payload').removeClassName('is-editable');
	
	return false;
	
}


//content item header inline saving
function inlineSave() {
	var inputs = $$('.edit-mode-input');
	var buttons = $$('.element-temp');
	
	inputs.each(function(f){
		f.next('.control-bar').show();
		f.next('.title-text').show();
		f.next().innerHTML = f.value;
		f.remove();

	});
	
	buttons.each(function(g){
		g.remove();

	});
	
	$('bb_payload').addClassName('is-editable');

	
}


//Action bar
function showAdd(el) {
	var inserted = $('just_cloned');
	var cloned = $('add_menu').clone(5);
	if (inserted) {
		
		inserted.blindUp({duration: 0.1});
		setTimeout(function(){ inserted.remove()}, 1000);
		
	}
	
	else {
		$('bb_payload').removeClassName('is-editable');
		el.up(1).insert({before: cloned});
		cloned.writeAttribute({id: 'just_cloned'}).addClassName('display').blindDown({duration: 0.2});
	}


	
		//$('add_menu').addClassName('display').blindDown({duration: 0.3});
		
}




function showMenuAdd(el) {
	var inserted = $('just_cloned');
	var cloned = $('add_bb_content_nav').clone(5);
	if (inserted) {
		
		inserted.blindUp({duration: 0.1});
		setTimeout(function(){ inserted.remove()}, 1000);
		
	}
	
	else {
		if  ($('bb_content_nav')) $('bb_content_nav').removeClassName('is-editable');
		el.up(1).insert({before: cloned});
		cloned.writeAttribute({id: 'just_cloned'}).addClassName('display').blindDown({duration: 0.2});
	}


	
		//$('add_menu').addClassName('display').blindDown({duration: 0.3});
		
}

function showToolsAdd(el) {
	var inserted = $('just_cloned');
	var cloned = $('add_tools').clone(5);
	if (inserted) {
		
		inserted.blindUp({duration: 0.1});
		setTimeout(function(){ inserted.remove()}, 1000);
		
	}
	
	else {
		if  ($('bb_content_nav')) $('bb_content_nav').removeClassName('is-editable');
		el.up(1).insert({before: cloned});
		cloned.writeAttribute({id: 'just_cloned'}).addClassName('display').blindDown({duration: 0.2});
	}
	
}

//Action bar
function showUpload(el) {
	var uploaded = $('current_upload');
	var cloned = $('upload_progress').clone(5);
	var created = $('new_item').clone(5);
	if (uploaded) {
		
		uploaded.blindUp({duration: 0.1});
		setTimeout(function(){ uploaded.remove()}, 1000);
		
	}
	
	else {
		$('bb_payload').removeClassName('is-editable');
		el.up(1).insert({before: cloned});
		cloned.writeAttribute({id: 'current_upload_1'}).addClassName('display').blindDown({duration: 0.2});
			

		setTimeout(function(){ $('current_upload_1').hide()}, 5000);
		created.writeAttribute({id: 'new_item_1'}).addClassName('new-item').blindDown({duration: 0.2});
		setTimeout(function(){ $('current_upload_1').insert({after: created})}, 5000);
		//setTimeout(function(){ $('bb_payload').addClassName('is-editable')}, 5000);
		
		created.show();
		setTimeout(function(){ $('bb_payload').addClassName('is-editable')}, 5000);
		
			/*
setTimeout(function(){ 
			el.up(1).insert({before: created});
			}, 2000
		);
*/
	}


	
		//$('add_menu').addClassName('display').blindDown({duration: 0.3});
		
}
	
	 

function addCourseTheme() {
	var stylesheet = $('custom_course_css');
	
	if (stylesheet) {
		stylesheet.remove();
	}
	
	else  {
		
		
		$$('head')[0].insert({
		bottom: new Element('link', {rel: 'stylesheet',  href: '../css/course_theme.css', id: 'custom_course_css'})
	});
	}
	
}

function showAb() {
	var inserted = $('just_cloned');
	var cloned = $('create_menu').clone(5);
	if (inserted) {
		inserted.blindUp({duration: 0.1});
		setTimeout(function(){ inserted.remove()}, 500);
	}
	
	else {
		
		$('page_header').insert({after: cloned});
		cloned.writeAttribute({id: 'just_cloned'}).blindDown({duration: 0.2});
	}
}


/*
var isChecked = false;

function checkListItems(){
	
	$$('input[type="checkbox"]').each(function(element) {
		
		var isChecked = false;
				
		if(element.checked === false) {
		
			element.setAttribute('checked', true);
			alert(element.checked);
			 isChecked = 'true';
		}
		
		else {
			alert(element.checked);
			element.writeAttribute('checked', false);
			alert(element.checked);
		  	isChecked = 'false';
		}

});

}
*/


function showFullPage(el) {
	var content_clone = $('bb_payload').clone(10);
	var cloned = $('cloned_content');
	var close_button = $('full_page');
	
	if (cloned) {	
		cloned.remove();
		$('dark_overlay').remove();
		$$('body')[0].removeClassName('full-view');
	}
	
	else {
		$$('body')[0].insert({bottom: content_clone});
		$$('body')[0].addClassName('full-view').insert({bottom: new Element('div', {'class': 'dark-overlay', id: 'dark_overlay'})});
		content_clone.writeAttribute({id: 'cloned_content'}).addClassName('cloned-content-overlay');
		$$('.cloned-content-overlay #full_page span')[0].setAttribute('data-icon', '*');
		$$('.cloned-content-overlay #full_page span')[0].setAttribute('title', 'Exit Full Page View');
	//	$$('.bb-payload.cloned-content-overlay .control-bar a:not(.full-page)')[0].hide();
	//	$$('.bb-payload.cloned-content-overlay .control-bar a:not(.full-page)')[1].hide();
	
	$$('.bb-payload.cloned-content-overlay .control-bar a:not(.full-page)').each(function(element) {
		element.hide();
	});
	$$('.bb-payload.cloned-content-overlay #full_page')[0].show();
	
	}

	
}

function toggleGlobalNav(el) {
//	$('global_nav_flyout').toggle('appear', { duration: .5 });
	//el.toggleClassName('active');
	//el.up(1).toggleClassName('flyout-on');
	$('global_nav_flyout').toggleClassName('display');
	el.up(1).hide();
	el.up(1).appear({ duration: .6 });
}

/*
function toggleMyBb(){
	$('global_nav_flyout').toggle();
	$('current_user').toggleClassName('active');
	$('my_bb').toggle();
	$$('body')[0].addClassName('full-view');
	$('my_bb').insert({before: new Element('div', {'class': 'dark-overlay', id: 'dark_overlay'})});
}
*/

function createArea() {
	$('empty_message').hide();
	$('empty_add').hide();
	$('fresh_area').show();
	$('adding_now').focus();
	
}


function toggleSpokeContent(el) {
	//var open_status = "closed"; 
	el.next().toggle();

	
	
	
/*if (open_status != "open") {
		alert(open_status);
		el.next().blindDown({duration: 0.2});
		var open_status = "open"; 
		
		alert(open_status);
	} 
	else if (open_status != "closed") {
		alert(open_status);
		el.next().blindUp({duration: 0.2});
		var open_status = "closed";
	}*/
}

function detectMobileClient() {
   if(window.innerWidth <= 800 && window.innerHeight <= 600) {
   
        } else if($$('.course-page')[0]) {
    // $$('.course-page')[0].up().addClassName('has-menu');
	 }
}

document.observe("dom:loaded", function() { 




	
	
	//EVENTS FIRED ONLOAD
	
	function addLoadEvent(func) {
		var oldonload = window.onload;
		if (typeof window.onload != 'function') {
			window.onload = func;
		} else {
			window.onload = function() {
			if (oldonload) {
				oldonload();
			}
		func();
		}
	}
}
	addLoadEvent(adjustH);
	addLoadEvent(detectMobileClient);

	
	
	
	//EVENTS FIRED ONRESIZE
	
	function addResizeEvent(func) {
		var oldonresize = window.onresize;
		if (typeof window.onresize != 'function') {
			window.onresize = func;
		} else {
			window.onresize = function() {
			if (oldonresize) {
				oldonresize();
			}
		func();
		}
	}
}


	addResizeEvent(adjustH);




	
	//course menu peek toggle
	
	if  ($('bb_content_nav_toggle')) $('bb_content_nav_toggle').observe('mouseover',function() {
		$('bb_content_holder').addClassName('has-menu-peek');
	});
	
	if  ($('bb_content_nav_toggle')) $('bb_content_nav_toggle').observe('mouseout',function() {
		$('bb_content_holder').removeClassName('has-menu-peek');
	});
	
	if  ($('bb_content_nav')) $('bb_content_nav').observe('mouseover',function() {
		$('bb_content_holder').addClassName('has-menu-peek');
	});
	
	if  ($('bb_content_nav')) $('bb_content_nav').observe('mouseout',function() {
		$('bb_content_holder').removeClassName('has-menu-peek');
	});
	
	
	
	
	//course menu toggle
	
	if  ($('bb_content_nav_toggle')) $('bb_content_nav_toggle').observe('click',function() {
		if  ($('bb_content_nav')) $('bb_content_nav').toggleClassName('display');
		if ($$('.bb-payload')[0]) $$('.bb-payload')[0].up().toggleClassName('has-menu');
		return false;
	});
	
	
	
	
	//Top navigation
	
	if ($('current_tab'))  $('current_tab').observe('mouseover',function() {
		$('system_tabs').addClassName('display');
	});
	
	
	if ($('system_tabs'))	$('system_tabs').observe('mouseover',function() {
		$('system_tabs').addClassName('display');
	});
	
	
	if ($('current_tab')) $('current_tab').observe('mouseout',function() {
		$('system_tabs').removeClassName('display');
	});
	
	
	if ($('system_tabs'))	$('system_tabs').observe('mouseout',function() {
		$('system_tabs').removeClassName('display');
	});
	

	
	
	//Contextual menu
	
	//var context_menu = $('context_menu');
	//var context_menu_width = context_menu.getWidth();
		
			
/*
$$('.area-add').each(function(element) {
	element.observe('click', function() {
	
		var posH = element.cumulativeOffset().left - context_menu_width + 'px',
			posV = element.cumulativeOffset().top + 'px';

		context_menu.setStyle({left: posH, top: posV}).show();

		});
	});
*/


//Add to Content Area


	$$('.area-add').each(function(element) {
	element.observe('click', function() {
	
	var inserted = $('just_cloned');
	var cloned = $('add_to_area_menu').clone(5);
	
	if (inserted) {
		
		inserted.blindUp({duration: 0.1});
		setTimeout(function(){ inserted.remove()}, 1000);
		
	}
	
	else {
		$('bb_payload').removeClassName('is-editable');
		element.up('div.item-actions').hide();
		element.up(2).down('h3.content-item-title').insert({before: cloned});
		cloned.writeAttribute({id: 'just_cloned'}).addClassName('display').blindDown({duration: 0.7});
	}
		
});

});


//Add to Content Area


	$$('.discussions-add').each(function(element) {
	element.observe('click', function() {
	
	var inserted = $('just_cloned');
	var cloned = $('add_to_discussions_menu').clone(5);
	
	if (inserted) {
		
		inserted.blindUp({duration: 0.1});
		setTimeout(function(){ inserted.remove()}, 1000);
		
	}
	
	else {
		$('bb_payload').removeClassName('is-editable');
		element.up('div.item-actions').hide();
		element.up(2).down('h3.content-item-title').insert({before: cloned});
		cloned.writeAttribute({id: 'just_cloned'}).addClassName('display').blindDown({duration: 0.7});
	}
		
});

});


//Course Management panel toggle
if ($('control_panel_toggle')) $('control_panel_toggle').observe('click',function() {
		$('manage_menu_2').addClassName('display');
		$('control_panel_toggle').hide();
		return false;
	});
	
	
//Course Management panel toggle
if ($('close_control_panel')) $('close_control_panel').observe('click',function() {
		$('manage_menu_2').removeClassName('display');
		$('control_panel_toggle').show();
		return false;
	});
	
//Setup header close
if ($('close_setup_header')) $('close_setup_header').observe('click',function() {
		$('manage_menu_2').addClassName('display');
		$('setup_header').fade({ duration: .25 });;
		$('control_panel_toggle').hide();
		$('welcomeOverlay').style.top="100%";
		//setTimeout(function(){ $('manage_menu_2').removeClassName('display')}, 5000);
		//setTimeout(function(){ $('control_panel_toggle').show()}, 5000);
		$('cm_help').appear({duration: .5});
		setTimeout(function(){ $('cm_help').fade({duration: .2})}, 6000);
		return false;
	});
	
	
//Course Management panel toggle
if ($('cr')) $('cr').observe('click',function() {
		$$('.cr').each(function(element) {
			element.toggle();
		});
	});
	
if ($('goals')) $('goals').observe('click',function() {
		$$('.goal').each(function(element) {
			element.toggle();
		});
	});
	
if ($('programs')) $('programs').observe('click',function() {
		$$('.headcount').each(function(element) {
			element.toggle();
		});
	});
	
	
	
		
if ($$('.batch-selector')[0]) $$('.batch-selector').each(function(element) {
	element.observe('click', function() {
		
		$$('.batch-control').each(function(element) {
			element.toggle('appear', { duration: .3 });
		});
	
		

	$$('input[type="checkbox"]').each(function(element) {
		
		var isChecked = false;
				
		if(element.checked === false) {
		
			element.setAttribute('checked', true);
			//alert(element.checked);
			 isChecked = 'true';
		}
		
		else {
			//alert(element.checked);
			element.writeAttribute('checked', false);
			//alert(element.checked);
		  	isChecked = 'false';
		}
			
			
		});

	});
});
	

if ($('course_settings_edit')) $('course_settings_edit').observe('click',function() {
		$$('.readable').each(function(element) {
			element.toggle();
		});
		
		$$('.editable').each(function(element) {
			element.toggle();
		});
		
		$$('.input-title')[0].toggleClassName('disabled');
		$$('.editable-block')[0].toggleClassName('on');
		$('course_settings_edit').hide();
	});
	
if ($$('.inline-control')[0]) $$('.inline-control').each(function(element) {
	element.observe('click', function() {
		$$('.readable').each(function(element) {
			element.toggle();
		});
		
		$$('.editable').each(function(element) {
			element.toggle();
		});
		
		$$('.input-title')[0].toggleClassName('disabled');
		$$('.editable-block')[0].toggleClassName('on');
		$('course_settings_edit').show();
	});
	
});



		
	
if ($$('.msg-filter.bio')[0]) $$('.msg-filter.bio')[0].observe('click',function() {
	$$('.message.soc').each(function(element) {
			element.blindUp({duration: 0.2});
		});
		
		$$('.message.psy').each(function(element) {
			element.blindUp({duration: 0.2});
		});
		
		$$('.message.peer').each(function(element) {
			element.blindUp({duration: 0.2});
		});
		
		$('pulldown_link').innerHTML = $$('.msg-filter.bio')[0].innerHTML;
	
});

	
if ($$('.msg-filter.all')[0]) $$('.msg-filter.all')[0].observe('click',function() {
	$$('.message').each(function(element) {
			element.show();
		});
		
		
		
		$('pulldown_link').innerHTML = $$('.msg-filter.all')[0].innerHTML;
	
});


if ($('compose_btn')) $('compose_btn').observe('click',function() {
		$('compose_msg').show();
		$$('body')[0].insert({bottom: new Element('div', {'class': 'compose-overlay', id: 'compose_overlay'})});
		
	});
	
if ($$('.close-lb')) $$('.close-lb').each(function(element) {
	element.observe('click', function() {


		$('compose_msg').hide();
		$('compose_overlay').remove();
		
	});
	
	});



//Closing brackets
});



//
// TUNGSTEN
//
// ------------------------


// TUNGSTEN. Add section
function showAddSection(el) {
	var inserted = $('just_cloned');
	var cloned = $('add_lesson_section').clone(5);
	if (inserted) {
		
		inserted.blindUp({duration: 0.1});
		setTimeout(function(){ inserted.remove()}, 1000);
		
	}
	
	else {
		$('bb_payload').removeClassName('is-editable');
		el.up(1).insert({before: cloned});
		cloned.writeAttribute({id: 'just_cloned'}).addClassName('display').blindDown({duration: 0.2});
	}


	
		//$('add_menu').addClassName('display').blindDown({duration: 0.3});
		
}



function addSectionElement(el) {
	var inserted = $('just_cloned');
	var section_title = $('section_title_input').value;

	el.up(1).insert({
		before: new Element('section', { id: 'section_new', 'class': 'lesson-section'})
	})
	
	//$('section_new').insert({
	//	top: new Element('h2')
	//})
	
	//$('#section_new > h2').innerHTML = 'whatever'

$('section_new').innerHTML = '<h2>' + section_title + '</h2>'

	inserted.remove();
}


function addStuff(el) {
	var cloned = $('add_text').clone(5);
	
	el.up(1).remove();
	$('section_new').insert({bottom: cloned});
	cloned.writeAttribute({id: 'just_cloned'}).addClassName('display').blindDown({duration: 0.2});
		
}



function addStuff_2(el, type) {
	var cloned = $(type).clone(5);
	//alert(el.typeOf);
	//el.up(1).remove();
	
	el.up(1).insert({before: cloned});
	el.up(1).remove();
	cloned.writeAttribute({id: 'just_cloned'}).addClassName('display').blindDown({duration: 0.2});
		return false;
}



	 