{/* <script type="text/javascript">  */}
(function ($) {
    var Page = (function() {
        var $nav = $( '.attachment .view-content > .nav-dot' ),
        slitslider = $( '.view-homepage-features.view-display-id-home' ).slitslider( {
            onBeforeChange : function( slide, pos ) {
            $nav.removeClass( 'nav-dot-current' );
            $nav.eq( pos ).addClass( 'nav-dot-current' );
            }
        } ),
        init = function() {
            initEvents();
            // Scrolling carousel navigation	    	    
            var delta = 0;
            var scrollThreshold = 10;
            function elementScroll (e) {
                // --- Scrolling up ---
                if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {	
                    delta--;
                    if ( Math.abs(delta) >= scrollThreshold) {
                        slitslider.previous();
                    }
                }
                // --- Scrolling down ---
                else {
                    if ( $(window).width() < 1025 ) {
                        window.scrollTo(0, 41);
                    } else {
                        window.scrollTo(0, 71);
                    }
                    delta++;
                    if (delta >= scrollThreshold) {
                        slitslider.next();	
                    }
                }
                // Prevent page from scrolling
                return false;
            }
            
            // Touch-based carousel navigation
            
            var dragThreshold = 0.05;// "percentage" to drag before engaging
            var dragStart = null;	 // used to determine touch / drag distance
            var percentage = 0;
            var windowWidth = $(window).width();
            
            function touchStart(event) {
                //console.log('touch start');
                if (dragStart !== null) { return; }
                
                if (event.originalEvent.touches) { 
                    event = event.originalEvent.touches[0];
                }
            
                // where in the viewport was touched
                dragStart = event.clientX;
            
            }
            
            function touchMove (event) {
            
                if (dragStart === null) { return; }
                if (event.originalEvent.touches) { 
                    event = event.originalEvent.touches[0];
                }
            
                delta = dragStart - event.clientX;
                percentage = delta / windowWidth;
                
                //console.log(percentage);
            
                // Don't drag element. This is important.
                return false;
            }
            
            function touchEnd () {
                
                if ( $(window).width() < 1025 ) {
                    window.scrollTo(0, 41);
                } else {
                    window.scrollTo(0, 71);
                }
                                
                dragStart = null;
            
                if (percentage >= dragThreshold) {
                    
                    slitslider.next();
                }
                else if ( Math.abs(percentage) >= dragThreshold ) {
                    slitslider.previous();
                } 
                percentage = 0;
            }
            // Listen for touches on mobile and tablet
            
            if ( $(window).width() < 1025 ) {
                $('#homepage').on({
                    'touchstart': touchStart,
                    'touchmove': touchMove,
                    'touchend': touchEnd
                });	
            }			
            
                
            
            // Listen for scrolling over homepage carousel on desktop and up
            if ( $(window).width() >= 1025 ) {
                $('#homepage').on({
                    'DOMMouseScroll mousewheel': elementScroll	
                });	
            }	          
            
        },
        initEvents = function() {
            
            $nav.first().addClass('nav-dot-current');

            $nav.each( function( i ) {
            
            $( this ).on( 'click', function( event ) {
                
                var $dot = $( this );
                
                if( !slitslider.isActive() ) {

                $nav.removeClass( 'nav-dot-current' );
                $dot.addClass( 'nav-dot-current' );
                
                }
                if ( $(window).width() < 1025 ) {
                    window.scrollTo(0, 41);
                } else {
                    window.scrollTo(0, 71);
                }
                
                
                slitslider.jump( i + 1 );
                return false;
            
            } );
            
            } );

        };

        return { init : init };

    })();

    Page.init();
    

})(jQuery);
// </script>