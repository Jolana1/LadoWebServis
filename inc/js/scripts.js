(function($){

	'use strict';

	var getSize;
    window.viewportSize = {};

    window.viewportSize.getWidth = function() {
        return getSize( 'Width' );
    };

    window.viewportSize.getHeight = function() {
        return getSize( 'Height' );
    };

    getSize = function( Name ) {
        var size, bodyElement, divElement;
        var name = Name.toLowerCase();
        var document = window.document;
        var documentElement = document.documentElement;
        if ( undefined === window['inner' + Name] ) {

            // IE6 & IE7 don't have window.innerWidth or innerHeight
            size = documentElement['client' + Name];
        } else if ( window['inner' + Name] !== documentElement['client' + Name] ) {

            // WebKit doesn't include scrollbars while calculating viewport size so we have to get fancy
            // Insert markup to test if a media query will match document.doumentElement["client" + Name]
            bodyElement = document.createElement( 'body' );
            bodyElement.id = 'vpw-test-b';
            bodyElement.style.cssText = 'overflow:scroll';
            divElement = document.createElement( 'div' );
            divElement.id = 'vpw-test-d';
            divElement.style.cssText = 'position:absolute;top:-1000px';

            // Getting specific on the CSS selector so it won't get overridden easily
            divElement.innerHTML = '<style>@media(' + name + ':' + documentElement['client' + Name] + 'px){body#vpw-test-b div#vpw-test-d{' + name + ':7px!important}}</style>';
            bodyElement.appendChild( divElement );
            documentElement.insertBefore( bodyElement, document.head );
            if ( 7 === divElement['offset' + Name] ) {

                // Media query matches document.documentElement["client" + Name]
                size = documentElement['client' + Name];
            } else {

                // Media query didn't match, use window["inner" + Name]
                size = window['inner' + Name];
            }

            // Cleanup
            documentElement.removeChild( bodyElement );
        } else {

            // Default to use window["inner" + Name]
            size = window['inner' + Name];
        }
        return size;
    };

	// WOW animations settings
	var wow = new WOW(
	  {
		boxClass:     'wow',      // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset:       0,          // distance to the element when triggering the animation (default is 0)
		mobile:       true,       // trigger animations on mobile devices (default is true)
		live:         true,       // act on asynchronously loaded content (default is true)
		callback:     function(box) {
		  // the callback is fired every time an animation is started
		  // the argument that is passed in is the DOM node being animated
		},
		scrollContainer: null,    // optional scroll container selector, otherwise use window,
		resetAnimation: true,     // reset animation on end (default is true)
	  }
	);
	wow.init();


	// remove anchors
	function removeAnchors(){
		$('a[href*="#"]').on('click', function(e){
			e.preventDefault();
		});
	}


	function smoothScrollAnchors() {

        $( 'a[href*="#"]:not([href="#"])' ).on( 'click', function() {
            var target;
            if ( location.pathname.replace( /^\//, '' ) === this.pathname.replace( /^\//, '' ) && location.hostname === this.hostname ) {
                target = $( this.hash );
                target = target.length ? target : $( '[name=' + this.hash.slice( 1 ) + ']' );
                if ( target.length ) {
                    $( 'html,body' ).animate({
                        scrollTop: target.offset().top
                    }, 1000 );
                    return false;
                }
            }

        });
    }

	function stickyNavbar(){
		var distanceY = window.pageYOffset || document.documentElement.scrollTop;

		if( distanceY > 1 ){
			$('header').addClass('stickie');
		} else {
			if( $('header').hasClass('stickie') ){
				$('header').removeClass('stickie');
			}
		}
	}

	function backToTop(){

		//Duration of the top scrolling animation (in ms)
		var    scrollTopDuration = 700;

		$('a[href="#"]').on( 'click', function( event ){
				event.preventDefault();
				$( 'body,html' ).animate({
						scrollTop: 0
					}, scrollTopDuration
				);
		});

	}

	function introduction(){
		if( 'undefined' !== typeof $.fn.owlCarousel.Constructor ) {
			// intro slider
			$('.presentation').owlCarousel({
				loop:			true,
				margin:			10,
				nav:			false,
				singleItem: 	true,
				autoplay:		true,
				autoplayTimeout:2600,
				items:			1
			});
			// testemonials carousel
			$('.owl-testimonials').owlCarousel({
					loop:		false,
					margin:		40,
					nav:		true,
					singleItem: true,
					items:		1
			});
		}
	}

		function animatePieCharts(){

			var slider	= $('#slider'),
				about	= $('#about-me');

				if ( 'undefined' !== typeof $.fn.easyPieChart ) {
					// Animate
					if( $( window ).scrollTop() > slider.height() + about.height() - 200 ) {
						$('.chart').easyPieChart({
								animate: 1300,
								lineCap: 'butt',
								lineWidth: 5,
								size: 200,
								barColor: '#2eb9d9',
								trackColor: 'rgba(250, 226, 95, 0.85)',
								scaleColor: '#2eb9d9',
								onStep: function( from, to, percent ) {
									$( this.el ).find( '.custom-text' ).text( Math.round( percent ) + '%' );
								}
						});
						if( $( window ).scrollTop() > slider.height() + about.height() ){
							setTimeout(function() {
						        $('.chart').data('easyPieChart').update(100);
						    }, 1300);
						}
					}
				}
		}

		function mobileMenu(){
			$( '.mobile > a[href="#ismobile"]' ).on( 'click', function( event ){
				$('ul.nav').toggle().toggleClass('expand');
				( $('ul.nav').hasClass( 'expand' ) ) ? $('.mobile .bar-2').css('display','none') : $('.mobile .bar-2').css('display','block');
				if( $('ul.nav').hasClass( 'expand' ) ){
					$('.bar-1,.bar-3').addClass('rotate');
				} else {
					$('.bar-1,.bar-3').removeClass('rotate');
				}
				event.preventDefault();
			});
			if( viewportSize.getWidth() < 768 ) {
				$( '.nav-link' ).on( 'click', function() {
					$('ul.nav').toggle().toggleClass( 'expand' );
					if( $('ul.nav').hasClass( 'expand' ) ){
						$('.bar-1,.bar-3').addClass('rotate');
						$('.mobile .bar-2').css('display','none')
					} else {
						$('.bar-1,.bar-3').removeClass('rotate');
						$('.mobile .bar-2').css('display','block')
					}
				} );
			}
		}

	jQuery( document ).ready( function( $ ) {
		removeAnchors();
		smoothScrollAnchors();
		backToTop();
		introduction();
		mobileMenu();
	});

	jQuery( window ).scroll( function( $ ) {
		stickyNavbar();
		animatePieCharts();

	});

})( window.jQuery );
