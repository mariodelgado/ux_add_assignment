//JQUERY.JS 

//J + P = LOVE
var $j = jQuery.noConflict();
 
$j(document).ready(function() {
   

   //grid animations via arrows
  $j('#nextCol').click(function(event) {
    event.preventDefault();
    $j('#gridItems').animate({scrollLeft:'+=160'}, 'slow');        
  });

  $j('#prevCol').click(function(event) {
    event.preventDefault();
  $j('#gridItems').animate({scrollLeft:'-=160'}, 'slow');        
  });


  //row highlighting 
    $j(".cell").mouseover(function () {
      var hoveredRow = $j(".cell").index(this);
      $j(".cell:nth-child("+ (hoveredRow+1) +")").addClass('cellHover');
    });

    $j(".cell").mouseleave(function () {
      var hoveredRow = $j(".cell").index(this);
      $j(".cell:nth-child("+ (hoveredRow+1) +")").removeClass('cellHover');
    });

});

//PROTOTYPE.JS
document.observe("dom:loaded", function() {


	//accordion panels inits
	accordion = new Accordion("accordion1", 1);
	accordion = new Accordion("accordion2", 1);
	//accordion = new Accordion("accordion3", 1);
	
	
	


	//Set Grade Center Grid nicely to fit the page width
	function flexibleGrid(){    
		
	  var containerWidth = $('bb_payload').getWidth();
	  var containerHeight = $('userList').getHeight();

	  var scrollingGridWidth = containerWidth - 372;
	  $('gridItems').setStyle({width: scrollingGridWidth + 'px'});
	  $('gridItems').setStyle({height : containerHeight + 'px'});
	  $$('.prev')[0].setStyle({height : containerHeight + 'px'});
	  $$('.next')[0].setStyle({height : containerHeight + 'px'});


	};

	//call on resize and onload
	
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

	addLoadEvent(flexibleGrid);
	addLoadEvent(adjustH);
	
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

	addResizeEvent(flexibleGrid);
	addResizeEvent(adjustH);



	//window.onload = adjustH;
	//window.onresize = adjustH;
	
		//window.onresize = flexibleGrid;
	//window.onload = flexibleGrid;



	//CellBtn Click - reverses the colors
	$$('.cellBtn').each(function(element) {
		element.observe('click', function() {
			element.addClassName('reversed');
		});
	});

	//Header cell btn click - open dropmenu
	// NOTE TO DEV: Opacity-Height trick here is only temporary as Display:None seems to break the accordion.js. 
	$$('.header .cellBtn').each(function(element) {
		element.observe('click', function() {

			if( element.next('.dropMenu').getStyle('opacity') == 1){
				//if visible, hide
				element.next('.dropMenu').setStyle({
					opacity: 0 , height: 0
				});
				element.removeClassName('reversed');
			}else{
				//if hidden, show
				element.next('.dropMenu').setStyle({
					opacity: 1, height: "auto"
				});
			}

		});
	});


//Student dropdown
	$('studentTab').observe('click',function() {
		if (this.hasClassName('x') == true){
			this.removeClassName('x');
			$('studentDropInfo').hide();
			this.removeClassName('reversed');

		}else{
			this.addClassName('x');
			$('studentDropInfo').show();
		}
	});


		//hide dropdowns when clicked outside - NOT READY
		// document.observe('click', function(e) {
		// 	if ( ! e.target.descendantOf('gridItems')) {
		// 		//NOT READY
		// 	}
		// });

	// });

//clicking inside a grid cell, activates the textfield and displays dropdown
	$$('.items .cellBtn').each(function(element) {
		element.observe('click', function() {

		if (this.hasClassName('exp') == true){
			this.removeClassName('exp');
			this.down('.gradeField').setStyle({ 
				boxShadow: "none"
			});

			//if there is no value, add needs grading icon
			if (this.down('.gradeField').hasClassName('needsGrading') == true) {
				if (this.down('.needsGrading').value == ""){
					this.down('.needsGrading').setStyle({backgroundImage: 'url(../images/needs-grading.png)'});
				}
			}
			
			this.down('.gradeField').setStyle({backgroundColor: 'transparent'});
			
			this.next('.gradeDropInfo').hide();
			this.removeClassName('reversed');

		}else{
			this.addClassName('exp');
			this.down('.gradeField').setStyle({ 
				boxShadow: "0 1px 3px 1px #666666 inset"
			});
			this.down('.gradeField').select();
			this.down('.gradeField').setStyle({backgroundColor: '#fff'});
			if (this.down('.gradeField').hasClassName('needsGrading')== true){
				this.down('.needsGrading').setStyle({backgroundImage: 'none'});
			}
			this.next('.gradeDropInfo').show();
		}

			
		});
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

		

	$('catchAllSettings').observe('click',function() {
		$('allOptionsMenu').toggle();
	});



});



