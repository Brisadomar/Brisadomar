;(function () {
	
	'use strict';



	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Main Menu Superfish
	var mainMenu = function() {

		$('#fh5co-primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});

	};

	//Date Picker

   $('#date-start, #date-end').datepicker();

   [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {  
      new SelectFx(el);
   } );

	// Parallax
	var parallax = function() {
		if ( !isiPad() || !isiPhone() ) {
			$(window).stellar();
		}
	};


	// Offcanvas and cloning of the main menu
	var offcanvas = function() {

		var $clone = $('#fh5co-menu-wrap').clone();
		$clone.attr({
			'id' : 'offcanvas-menu'
		});
		$clone.find('> ul').attr({
			'class' : '',
			'id' : ''
		});

		$('#fh5co-page').prepend($clone);

		// click the burger
		$('.js-fh5co-nav-toggle').on('click', function(){

			if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			} else {
				$('body').addClass('fh5co-offcanvas');
			}
			// event.preventDefault();

		});

		$('#offcanvas-menu').css('height', $(window).height());

		// Close menu + scroll to section (hash links break if page is still transformed)
		function closeOffcanvas() {
			$('body').removeClass('fh5co-offcanvas');
			$('.js-fh5co-nav-toggle').removeClass('active');
		}

		// Only react to real taps on links inside the menu (not accidental outside touches)
		$('#offcanvas-menu').on('click', 'a', function (e) {
			var href = $(this).attr('href') || '';
			closeOffcanvas();
			if (href.charAt(0) === '#' && href.length > 1) {
				e.preventDefault();
				e.stopPropagation();
				var id = href.slice(1);
				setTimeout(function () {
					var target = document.getElementById(id);
					if (!target) return;
					var header = document.getElementById('fh5co-header-section');
					var offset = header ? header.offsetHeight : 0;
					var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
					window.scrollTo(0, top);
					if (history.replaceState) {
						history.replaceState(null, '', href);
					}
				}, 320);
			}
		});

		$(window).resize(function(){
			var w = $(window);


			$('#offcanvas-menu').css('height', w.height());

			if ( w.width() > 769 ) {
				if ( $('body').hasClass('fh5co-offcanvas') ) {
					$('body').removeClass('fh5co-offcanvas');
				}
			}

		});	

	}

	

	// Close only when user taps the main page content (not the whole document — too sensitive on phones)
	var mobileMenuOutsideClick = function() {
		$(document).on('click', '#fh5co-page', function (e) {
			if (!$('body').hasClass('fh5co-offcanvas')) return;
			// Ignore taps that are on the offcanvas menu or the burger
			if ($(e.target).closest('#offcanvas-menu, .js-fh5co-nav-toggle, .fh5co-nav-toggle').length) {
				return;
			}
			$('body').removeClass('fh5co-offcanvas');
			$('.js-fh5co-nav-toggle').removeClass('active');
		});
	};


	// Animations

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};
	
	var stickyBanner = function() {
		var $stickyElement = $('.sticky-banner');
		var sticky;
		if ($stickyElement.length) {
		  sticky = new Waypoint.Sticky({
		      element: $stickyElement[0],
		      offset: 0
		  })
		}
	}; 

	// Document on load.
	$(function(){
		mainMenu();
		parallax();
		offcanvas();
		mobileMenuOutsideClick();
		contentWayPoint();
		stickyBanner();
	});


}());
