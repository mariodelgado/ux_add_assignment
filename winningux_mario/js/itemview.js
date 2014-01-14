document.observe("dom:loaded", function() {

	//Item view expand-collapse
	$$('.expCollBtn').each(function(element) {
		element.observe('click', function() {
		if (element.hasClassName('arrowUp') == false){
			element.next('.introspect').show();
			element.addClassName('arrowUp');
		}else{
			element.next('.introspect').hide();
			element.removeClassName('arrowUp');
		}
		});
	});



	

//maximizer
	$('maximizer').observe('click',function() {

		 //get viewport height
         //var viewportHeight = document.viewport.getHeight();
         
      	if (this.hasClassName('mxmzd') == false){
      		this.addClassName('mxmzd');
			$('breadcrumbs').hide();
			$$('.locationPane')[0].setStyle({marginTop:0});
			$('content').setStyle({
			position: 'absolute', top:0, left:0, right:0, bottom:0, width: '100%', height: '800px', zIndex: 99999
			});//DEV: height value is temporary- it should get the page height instead.
			
			//adjust grid width
			 flexibleGrid(); 

		}else{
			this.removeClassName('mxmzd');
			$('breadcrumbs').show();
			$$('.locationPane')[0].setStyle({marginTop:'12px'});
			$('content').setStyle({
			position: 'static', height: 'auto'
			});//DEV: height value is temporary- it should get the page height instead.
			
			//adjust grid width
			 flexibleGrid(); 

		}
	});


	//expand filter settings
	$$('.filterSettings')[0].observe('click',function() {
			if (this.hasClassName('expn') == false){
				this.addClassName('expn');
				new Effect.Morph('filterConfig', {style:'width:430px', duration:0.5});
				$$('.f2')[0].appear({ duration: 0.3, from: 0, to: 1 });
				$$('.f3')[0].appear({ duration: 0.3, from: 0, to: 1 });
				$$('.f4')[0].appear({ duration: 0.3, from: 0, to: 1 });
				$$('.f5')[0].appear({ duration: 0.3, from: 0, to: 1 });
			}else{
				this.removeClassName('expn');
				new Effect.Morph('filterConfig', {style:'width:0', duration:0.5});
				$$('.f2')[0].fade({ duration: 0.3, from: 1, to: 0 });
				$$('.f3')[0].fade({ duration: 0.3, from: 1, to: 0 });
				$$('.f4')[0].fade({ duration: 0.3, from: 1, to: 0 });
				$$('.f5')[0].fade({ duration: 0.3, from: 1, to: 0 });
			}
	});


		$$('.gradeField').each(function(element) {
		element.observe('focus', function() {
			element.setStyle({backgroundImage: 'none'});
		});
	});


	//grade now-combo dropdown button
	$$('.dropBtn').each(function(element) {
	element.observe('click', function(e) {
		element.toggleClassName('reversed');
		element.next('.gradeNowDropMenu').setStyle({opacity:1, height:'auto'});
		Event.stop(e);
	});
	
	});


	
	
	$('catchAllSettings').observe('click',function() {
		$('allOptionsMenu').toggle();
	});



	
});