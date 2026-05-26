(function () {

    // store the slider in a local variable
    var jQuerywindow = jQuery(window),
        flexslider = {
            vars: {}
        };

    function getSliderDirection() {
        return (window.innerWidth > 768) ? "vertical" : "horizontal";
    }
    
    function getGridSize() {
        return (window.innerWidth < 768) ? 2 : 1;

    }

    /* jQuery(function() {
       SyntaxHighlighter.all();
     });
    */
    jQuerywindow.load(function () {

        jQuery('#carousel').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            itemWidth: 191,
            direction: getSliderDirection(),
            minItems: getGridSize(),
            maxItems: getGridSize(),
            asNavFor: '#slider'
        });

        jQuery('#slider').flexslider({
            animation: "slide",
            controlNav: false,
            directionNav: false,
            animationLoop: false,
            slideshow: false,
            sync: "#carousel",
            start: function (slider) {
                jQuery('body').removeClass('loading');
            }
        });
    });

    // check grid size on resize event
    jQuerywindow.resize(function () {

        var gridSize = getSliderDirection();

        flexslider.vars.direction = gridSize;
        flexslider.vars.direction = gridSize;

        var gridSizes = getGridSize();

        flexslider.vars.minItems = gridSizes;
        flexslider.vars.maxItems = gridSizes;
    });
}());

jQuery(document).ready(function() {

	jQuery("#carousel ul li").click(function() {
		jQuery('#slider ul li.flex-active-slide iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*'); 
	});
	
	var numOfItemsToFade = 1,
	numOfItems = jQuery('#hslider ul li').length;
	var slide = true;
	var element="#hslider ul li";
	showList();
	function showList() {

		if(slide) {
			jQuery(element).hide();
			jQuery('#hslider ul li:nth-child('+numOfItemsToFade+')').fadeIn(2000, function(){
				numOfItemsToFade++;
				if(numOfItemsToFade<=numOfItems){
					setTimeout(showList, 5000);
				}
				else if(numOfItemsToFade>numOfItems)
				{
				    numOfItemsToFade=1;
				    setTimeout(showList, 5000);
				}
			});
		}

	}

	jQuery("#inner-content ul li").click(function() {

		slide = false; 
        jQuery('.history-cnt .active').removeClass('active');
        jQuery(".collapse-cnt").removeClass("active");
        jQuery('#hslider ul li').hide();
        jQuery(".history-cnt").find("[data-id='"+this.id+"']").css('display','block');
        currentId = jQuery(".history-cnt").find("[data-id='"+this.id+"']").attr('id');
        id = jQuery("#hslider ul #"+currentId).index();
		numOfItemsToFade = ++id;
		if(id!=numOfItems){
			++numOfItemsToFade;
		}
        slide = true;
        jQuery(this).find(".collapse-cnt").addClass("active");

    });

    jQuery("#inner-content ul li").on('click', '.collapsed-sl', function(e) {
    	e.preventDefault();
        if (jQuery(window).width() <= 767) {
        	jQuery(".collapse-cnt").not(jQuery(this).next(".collapse-cnt")).slideUp();
        	jQuery(this).next(".collapse-cnt").stop(this).slideToggle();
        }
    });
  
});    