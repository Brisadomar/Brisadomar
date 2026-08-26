$(document).ready(function() {
  // Single image popup (template default)
	var magnifPopup = function() {
		$('.image-popup').magnificPopup({
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-with-zoom',
			gallery:{
				enabled:true
			},
			zoom: {
				enabled: true,
				duration: 300,
				easing: 'ease-in-out',
				opener: function(openerElement) {
				return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});
	};

	// Fleet card galleries — each boat has its own set of photos
	var fleetGalleries = function() {
		$('.fleet-gallery').each(function() {
			$(this).magnificPopup({
				delegate: 'a',
				type: 'image',
				tLoading: 'A carregar…',
				mainClass: 'mfp-with-zoom',
				removalDelay: 300,
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [1, 1]
				},
				image: {
					tError: 'Não foi possível carregar a imagem.'
				},
				zoom: {
					enabled: true,
					duration: 300,
					easing: 'ease-in-out',
					opener: function(openerElement) {
						return openerElement.is('img') ? openerElement : openerElement.find('img');
					}
				}
			});
		});
	};

	var magnifVideo = function() {
		$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
	};

	magnifPopup();
	fleetGalleries();
	magnifVideo();
});
