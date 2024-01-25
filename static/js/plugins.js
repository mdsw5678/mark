/* Avoid `console` errors in browsers that lack a console
   -------------------------------------------------------------------------- */
    (function() {
        var method;
        var noop = function () {};
        var methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeStamp', 'trace', 'warn'
        ];
        var length = methods.length;
        var console = (window.console = window.console || {});

        while (length--) {
            method = methods[length];

            // Only stub undefined methods.
            if (!console[method]) {
                console[method] = noop;
            }
        }
    }());


/* Reverse a selection
   -------------------------------------------------------------------------- */
    jQuery.fn.reverse = [].reverse;


/* Shuffle a selection
   -------------------------------------------------------------------------- */
	jQuery.fn.shuffle = function() {

        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });

        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });

        return $(shuffled);

    };


/* Convert string to Camel Case
   -------------------------------------------------------------------------- */
    String.prototype.toCamel = function(){
        var string = this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
        string = string.replace(/(\/.*)/g, '');
        string = string.replace(/(^.){1}/g, function($1){return $1.toUpperCase();});
        return string;
    };


/* Get hash from URL
   -------------------------------------------------------------------------- */
	String.prototype.getHash = function(){
		var string = this.replace(Nerisson.host, '').replace(/^\//g, '').replace(/\/$/g, '');

		if (string == '')
			string = 'home';
		return string;
	}


/* Check if image is loaded
   -------------------------------------------------------------------------- */
	function isImageOk(img) {
		img = img.get(0);

		if (!img.complete) {
			return false;
		}

		if (typeof img.naturalWidth != "undefined" && img.naturalWidth == 0) {
			return false;
		}

		return true;
	}


/* Images queue loading
   -------------------------------------------------------------------------- */
	(function( $ ) {
		$.fn.queueLoading = function() {
			var maxLoading = 3;

			var images = $(this);
			var imagesToLoad = images;
			var imagesLoading = null;

			function checkImages() {
				// Get loading images
				imagesLoading = imagesToLoad.filter('.is-loading');

				// Check if loading images are ready or not
				imagesLoading.each(function() {
					var image = $(this);

					if (isImageOk(image)) {
						image.addClass('is-loaded').removeClass('is-loading');
						//image.trigger('resize');
					}
				});

				// Remove loaded images from images to load list
				imagesToLoad = images.not('.is-loaded');

				// Load next images
				loadNextImages();
			}

			function loadNextImages() {
				// Get images not already loading
				imagesLoading = imagesToLoad.filter('.is-loading');
				var nextImages = imagesToLoad.slice(0, maxLoading-imagesLoading.length);

				nextImages.each(function() {
					var image = $(this);

					// Start loading
					image.attr('src', image.attr('data-src'));
					image.addClass('is-loading');
				});

				if (imagesToLoad.length != 0)
					setTimeout(checkImages, 25);
			}

			checkImages();
		};
	}( jQuery ));


/* Images deferred loading
   -------------------------------------------------------------------------- */
	(function( $ ) {
		$.fn.deferredLoading = function() {
			var image = $(this);

			if (!image.hasClass('is-loaded')) {
				image.attr('src', image.attr('data-src'));
				image.addClass('is-loading');

				checkImage();
			}

			function checkImage() {
				if (isImageOk(image)) {
					image.addClass('is-loaded').removeClass('is-loading');
				} else {
					setTimeout(checkImage, 25);
				}
			}
		};
	}( jQuery ));


/* Easing
   -------------------------------------------------------------------------- */
	(function() {

		// based on easing equations from Robert Penner (http://www.robertpenner.com/easing)

		var baseEasings = {};

		$.each( [ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function( i, name ) {
			baseEasings[ name ] = function( p ) {
				return Math.pow( p, i + 2 );
			};
		});

		$.extend( baseEasings, {
			Sine: function( p ) {
				return 1 - Math.cos( p * Math.PI / 2 );
			},
			Circ: function( p ) {
				return 1 - Math.sqrt( 1 - p * p );
			},
			Elastic: function( p ) {
				return p === 0 || p === 1 ? p :
					-Math.pow( 2, 8 * (p - 1) ) * Math.sin( ( (p - 1) * 80 - 7.5 ) * Math.PI / 15 );
			},
			Back: function( p ) {
				return p * p * ( 3 * p - 2 );
			},
			Bounce: function( p ) {
				var pow2,
					bounce = 4;

				while ( p < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
				return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - p, 2 );
			}
		});

		$.each( baseEasings, function( name, easeIn ) {
			$.easing[ "easeIn" + name ] = easeIn;
			$.easing[ "easeOut" + name ] = function( p ) {
				return 1 - easeIn( 1 - p );
			};
			$.easing[ "easeInOut" + name ] = function( p ) {
				return p < 0.5 ?
					easeIn( p * 2 ) / 2 :
					1 - easeIn( p * -2 + 2 ) / 2;
			};
		});

	})();