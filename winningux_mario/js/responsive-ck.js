//enquire.register("screen and (max-width:900px)", {
// OPTIONAL
//If supplied, triggered when a media query matches.
//match : function() {
//alert("Enquire.js @media query: 900px.");
// },      
// OPTIONAL
// If supplied, triggered when the media query transitions 
// *from a matched state to an unmatched state*.
//unmatch : function() {},    
// OPTIONAL
// If supplied, triggered once, when the handler is registered.
//setup : function() {},    
// OPTIONAL, defaults to false
// If set to true, defers execution of the setup function 
// until the first time the media query is matched
//deferSetup : true,
// OPTIONAL
// If supplied, triggered when handler is unregistered. 
// Place cleanup code here
//destroy : function() {}
//});
enquire.register("screen and (min-width: 0px) and (max-width: 499px)",{match:function(){$("bb_content_holder").removeClassName("has-menu");$$("html")[0].removeClassName("has-menu")}});