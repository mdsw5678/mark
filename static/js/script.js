$(function(){

/* =============================================================================
   GENERAL
   ========================================================================== */

/* JS enabled user
   -------------------------------------------------------------------------- */
	$('html').removeClass('no-js').addClass('has-js');


/* Resize dispatcher
   -------------------------------------------------------------------------- */

   var windowWidth = $(window).width();
   var windowHeight = $(window).height();

	$(window).on('resize orientationchange', function(e) {
		if (e.type == 'orientationchange') {
			// iOs 7 hack
			$(window).scrollTop(0);
		}

		var fixedHeight = $(window).height();
		windowWidth = $(window).width();
		windowHeight = fixedHeight;

		checkDeviceType();

		navHandheldResize();
		positionPage();
		workResize();

		$(window).trigger('scroll');
	});


/* Scroll dispatcher
   -------------------------------------------------------------------------- */
	$(window).on('scroll', function () {
		togglePageTopBar();
		pageTopHide();
		workTopHide();
		worksMoreScroll();
		aboutIllustrationScroll();
	});



/* OS detect
   -------------------------------------------------------------------------- */
	function OSdetect() {
		var platform = null;
		var version = null;

		var ua = navigator.userAgent.toLowerCase();

		if (/iP(hone|od|ad)/.test(navigator.platform)) {
			platform = 'iOS';

			var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
			version = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];

			$('html').addClass('ios');

			if (version[0] <= 4) {
				$('html').addClass('old-ios');
			}
		} else if (ua.indexOf('android') > -1) {
			platform = 'android';

			var v = (navigator.appVersion).match(/Android (\d+).(\d+).?(\d+)?/);
			version = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];

			$('html').addClass('android');
		}
	}
	OSdetect();


/* Detect mobile/tablet browser
   -------------------------------------------------------------------------- */
	(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
	if (jQuery.browser.mobile) {
		$('html').addClass('mobile');
	}


/* Detect Safari
   -------------------------------------------------------------------------- */
	var isSafari = false;

	function checkSafari() {
		if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)
			isSafari = true;
	}
	checkSafari();


/* Detect IE
   -------------------------------------------------------------------------- */
	var isIE = false;

	function getInternetExplorerVersion() {
		var rv = -1;
		if (navigator.appName == 'Microsoft Internet Explorer')
		{
			var ua = navigator.userAgent;
			var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null)
				rv = parseFloat( RegExp.$1 );
		}
		else if (navigator.appName == 'Netscape')
		{
			var ua = navigator.userAgent;
			var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null)
				rv = parseFloat( RegExp.$1 );
		}
		if (rv != -1)
			isIE = true;

		return rv;
	}
	var IEVersion = getInternetExplorerVersion();


/* Check device type
   -------------------------------------------------------------------------- */
	var isHandheld = null;
	var isTablet = null;
	var isSmartphone = null;
	var isDesktop = null;

	function checkDeviceType () {
		if (windowWidth >= 1100) {
			isHandheld = isSmartphone = isTablet = false;
			isDesktop = true;
		} else if (windowWidth >= 800) {
			isHandheld = isTablet = true;
			isDesktop = isSmartphone = false;
		} else {
			isHandheld = isSmartphone = true;
			isDesktop = isTablet = false;
		}
	}
	checkDeviceType();


/* Image replacement on hover
   -------------------------------------------------------------------------- */
	$('body').on('mouseenter mouseleave', '.hover-img', function(e) {
		if ( !$(this).hasClass('current') ) {
			var img = $(this).find('img');
			if (img.length == 0)
				img = $(this);

			var src = img.attr('src');
			if (src) {
				var newSrc = src.replace('_hover','');
				if ( e.type == 'mouseenter' ) {
					newSrc = src.replace(new RegExp("(\.png|\.jpg)", "i"), "_hover$1");
				}
				img.attr('src',newSrc);
			}
		}
	});


/* Prevent image dragging
   -------------------------------------------------------------------------- */
	$('body').on('mousedown', 'img', function() {
		return false;
	});


/* Prevent hover event on scroll
   -------------------------------------------------------------------------- */
	var globalScrollTimeout = null
	function disableHoverOnScroll() {
		clearTimeout(globalScrollTimeout);
		if (!$('body').hasClass('no-hover'))
			$('body').addClass('no-hover');

		globalScrollTimeout = setTimeout(function(){
		  $('body').removeClass('no-hover');
		},500);
	}
	//$(window).on('scroll', disableHoverOnScroll);



/* =============================================================================
   NAV DESKTOP
   ========================================================================== */

/* Toggle
   -------------------------------------------------------------------------- */
	$('body').on('click', '.nav-desktop-toggle', function() {
		var nav = $('.nav-desktop');
		var button = nav.find('.nav-desktop-toggle svg');
		var links = nav.find('.link');

		var tl = new TimelineLite();
		tl.pause();

		// Button
		tl.fromTo(
			button.find('rect').eq(0),
			0.3,
			{
				y: 0
			},
			{
				y: -2,
				ease: Power3.easeInOut
			},
			0
		);
		tl.fromTo(
			button.find('rect').eq(2),
			0.3,
			{
				y: 0
			},
			{
				y: 2,
				ease: Power3.easeInOut
			},
			0
		);

		// Links
		tl.staggerFromTo(
			links,
			0.2,
			{
				display:'block',
				top: -10,
				alpha: 0
			},
			{
				top: 0,
				alpha: 1,
				ease: Power3.easeOut
			},
			0.1
		);

		if (!nav.hasClass('is-opened')) {
			nav.addClass('is-opening');

			tl.call(function() {
				links.attr('style', '');
				nav.addClass('is-opened');
				nav.removeClass('is-opening');
			});

			tl.play();
		} else {
			tl.call(function() {
				links.attr('style', '');
				nav.removeClass('is-opened');
			}, null, null, 0);

			tl.reverse(0);
		}
	});



/* =============================================================================
   PAGE
   ========================================================================== */

/* Intro vertical align
   -------------------------------------------------------------------------- */
	function positionPage(container) {
		if (container == null || container.length != 1)
			container = $('.layout-page').first();

		// Selectors
		var pageTop = container.find('.page-top');
		var pageIntro = container.find('.page-intro');
		var pageIllustration = container.find('.page-illustration .svg');
		var pageContent = container.find('.page-content');

		// Set intro's margin
		var top = (windowHeight-pageIntro.height())/2;
		pageIntro.css({marginTop: top});
		if (pageIntro.hasClass('fullheight'))
			pageIntro.css({marginBottom: top});
		else
			pageIntro.css({marginBottom: ''});

		// Set illustration's position
		top = (windowHeight-pageIllustration.height())/2;
		//pageIllustration.css({marginTop:top});

		// Set page top's size
		pageTop.css({width:windowWidth, height:windowHeight});

		// Set page content's margin
		if (isDesktop)
			pageContent.css({marginTop:windowHeight+200});
		else
			pageContent.css({marginTop:''});
	}


/* Toggle page top bar on scroll
   -------------------------------------------------------------------------- */
	function togglePageTopBar() {
		// Selectors
		var bar = $('.site-topbar');
		var content = $('.page-content');
		if (bar.length == 0)
			return;

		if ($('.page-top').length == 0) {
			bar.addClass('is-visible');
			return;
		}

		if (content.length == 0) {
			if (isDesktop)
				bar.removeClass('is-visible');
			else
				bar.addClass('is-visible');

			return;
		}

		// Calculate positions
		var offset = content.offset();
		var scrollTop = $(window).scrollTop();
		//var scrollLimit = offset.top-windowHeight/2;
		var scrollLimit = offset.top-bar.height()-10;
		if ($('.layout-about').length == 1)
			var scrollLimit = $('.layout-about .skills').offset().top;

		if (scrollTop >= scrollLimit) {
			// Show top bar
			bar.addClass('is-visible');
		} else {
			// Hide top bar
			bar.removeClass('is-visible');
		}
	}
	//$(window).on('scroll', togglePageTopBar);


/* Page top hide
   -------------------------------------------------------------------------- */
	function pageTopHide() {
		// Selectors
		var container = $('.page-top');
		if (container.length == 0)
			return;

		if (isDesktop && !jQuery.browser.mobile) {
			// Calculate scale
			var scrollTop = $(window).scrollTop();
			var scale = scrollTop/windowHeight;
			if (scale > 1)
				scale = 1;

			container.css({opacity:1-scale, transform:'translate3d(0, '+(-scrollTop/5)+'px, 0)'})
			container.find('.page-illustration').css({transform: 'scale('+(1-scale/2)+')'});
			container.find('.page-intro').css({transform: 'scale('+(1-scale/3)+')'});
			container.find('.page-nav').css({transform: 'scale('+(1-scale/5)+')'});
		} else {
			container.css({opacity:'', transform:''})
			container.find('.page-illustration, .page-intro, .page-nav').css({transform: ''});
		}
	}
	//$(window).on('scroll', pageTopHide)


/* Scroll to content
   -------------------------------------------------------------------------- */
	$('body').on('click', '.scroll-to-content', function(e) {
		var head = $('.site-topbar');
		var content = $($(this).attr('href'));
		if (content.length != 1)
			content = $('.page-content');

		var scrollTop = content.offset().top - head.height();

		/*
		TweenMax.to(
			window,
			1.5,
			{
				scrollTo:{y:scrollTop, autoKill:false},
				ease:Power3.easeInOut
			}
		);
		*/

		$('html,body').animate(
			{
				scrollTop:scrollTop
			},
			{
				duration: 1500,
				easing: 'easeInOutQuint'
			}
		);

		e.preventDefault();
	});



/* =============================================================================
   WORKS
   ========================================================================== */

	var homeScroll = 0;
	var homeFilter = null;
	var worksMoreScrollTimeout = null;

/* Illustration on scroll
   -------------------------------------------------------------------------- */
	function worksMoreScroll() {
		if ($('.layout-works .button-more').not('.is-visible').length != 1)
			return;

		var scrollTop = $(window).scrollTop();
		var maxScrollTop = $(document).height()-$(window).height();
		var windowBottom = $(window).height()+scrollTop;
		var threshold = $(window).height()/4;

		var button = $('.layout-works .button-more');
		var buttonTop = button.offset().top;

		clearTimeout(worksMoreScrollTimeout);
		if (buttonTop < windowBottom-threshold) {
			worksMoreScrollTimeout = setTimeout(function() {
				button.addClass('is-visible');
			}, 500)
		}
	}
	//$(window).on('scroll', aboutIllustrationScroll);

/* Display more
   -------------------------------------------------------------------------- */
	$('body').on('click', '.layout-works .button-more', function(e) {
		// Selectors
		var container = $('.layout-works .works');
		var works = container.find('.work').not('.is-hidden');
		var firstWork = works.first();
		var deferred = works.filter('.is-deferred');

		// Get next works to show
		var limit = Number(container.attr('data-deferred'));
		var worksToShow = deferred.slice(0, limit);

		// Show next works
		worksToShow.each(function(index) {
			var work = $(this);
			var container = work.find('.work-inner');
			var block = container.find('> a');

			work.removeClass('is-deferred');
			work.find('.image').queueLoading();

			if (isSmartphone)
				work.css({width:Math.floor(windowWidth), height:0});
			else
				work.css({width:Math.floor(windowWidth/2), height:0});

			block.css({width:work.width(), height:firstWork.height()});

			TweenMax.to(
				work,
				0.8,
				{
					height: firstWork.height(),
					ease: Power3.easeInOut,
					delay: index*0.2,
					onComplete: function() {
						work.add(block).css({width:'', height:''});
					}
				}
			);
		})

		if (works.filter('.is-deferred').length == 0)
			$(this).addClass('is-hidden');
	});


/* Filters toggle
   -------------------------------------------------------------------------- */
	$('body').on('click', '.link-filters, .works-filters .button-close', function(e) {
		e.preventDefault();

		// Selectors
		var container = $('.works-filters');

		if (container.hasClass('is-opened'))
			worksFiltersClose();
		else
			worksFiltersOpen();
	});

	function worksFiltersClose() {
		// Selectors
		var container = $('.works-filters');
		var categories = container.find('.category');
		var button = container.find('.button-close');

		// Works position
		var scrollTop = $('.layout-works').offset().top - $('.site-topbar').height();
		window.scrollTo(0, scrollTop);

		if (jQuery.browser.mobile) {
			// Animation
			var tl = new TimelineLite();
			tl.pause();

			tl.fromTo(
				button,
				0.3,
				{
					alpha: 1
				},
				{
					alpha: 0,
					ease: Power3.easeInOut
				}
			);

			tl.staggerFromTo(
				categories,
				0.4,
				{
					alpha: 1
				},
				{
					alpha: 0,
					ease: Power2.easeInOut
				},
				0.1,
				0
			);

			tl.fromTo(
				container,
				0.3,
				{
					alpha: 1,
				},
				{
					alpha: 0,
					ease: Power3.easeInOut
				},
				0.4
			);


			tl.call(function() {
				categories.attr('style', '');
				button.attr('style', '');
				container.attr('style', '').removeClass('is-opened');
			});

			tl.play();
		} else {
			// Animation
			var tl = new TimelineLite();
			tl.pause();

			tl.fromTo(
				button,
				0.3,
				{
					alpha: 1
				},
				{
					alpha: 0,
					ease: Power3.easeInOut
				}
			);

			tl.staggerFromTo(
				categories,
				0.4,
				{
					alpha: 1,
					scale: 1
				},
				{
					alpha: 0,
					scale: 1.2,
					ease: Power2.easeInOut
				},
				0.1,
				0
			);

			tl.fromTo(
				container,
				0.3,
				{
					alpha: 1,
				},
				{
					alpha: 0,
					ease: Power3.easeInOut
				},
				0.4
			);


			tl.call(function() {
				categories.attr('style', '');
				button.attr('style', '');
				container.attr('style', '').removeClass('is-opened');
			});

			tl.play();
		}
	}

	function worksFiltersOpen() {
		// Selectors
		var container = $('.works-filters');
		var categories = container.find('.category');
		var button = container.find('.button-close');

		if (jQuery.browser.mobile) {
			// Pre animation
			container.css({display:'block', zIndex:40});
			button.css({opacity:0});

			// Animation
			var tl = new TimelineLite();
			tl.pause();

			tl.fromTo(
				container,
				0.2,
				{
					alpha: 0,
				},
				{
					alpha: 1,
					ease: Power3.easeInOut
				},
				0
			);

			tl.staggerFromTo(
				categories,
				0.4,
				{
					alpha: 0
				},
				{
					alpha: 1,
					ease: Power2.easeInOut
				},
				0.1,
				0
			);

			tl.to(
				button,
				0.3,
				{
					alpha: 1,
					ease: Power3.easeInOut
				},
				'-=0.2'
			);

			tl.call(function() {
				categories.attr('style', '');
				button.attr('style', '');
				container.attr('style', '').addClass('is-opened');
			});

			tl.play();
		} else {
			// Pre animation
			container.css({display:'block', zIndex:40});
			button.css({opacity:0});

			// Animation
			var tl = new TimelineLite();
			tl.pause();

			tl.fromTo(
				container,
				0.2,
				{
					alpha: 0,
				},
				{
					alpha: 1,
					ease: Power3.easeInOut
				},
				0
			);

			tl.staggerFromTo(
				categories,
				0.4,
				{
					alpha: 0,
					scale: 1.2
				},
				{
					alpha: 1,
					scale: 1,
					ease: Power2.easeInOut
				},
				0.1,
				0
			);

			tl.to(
				button,
				0.3,
				{
					alpha: 1,
					ease: Power3.easeInOut
				},
				'-=0.2'
			);

			tl.call(function() {
				categories.attr('style', '');
				button.attr('style', '');
				container.attr('style', '').addClass('is-opened');
			});

			tl.play();
		}
	}


/* Filter selection
   -------------------------------------------------------------------------- */
	$('body').on('click', '.works-filters .category', function(e) {
		// Selectors
		var container = $('.layout-works .works');
		var category = $(this);
		var slug = category.attr('data-slug');
		var activeCategory = $('.works-filters .is-active');
		var works = $('.works .work');
		var output = $('.link-filters .selected');

		// Toggle works
		if (!category.hasClass('is-active')) {
			// Init
			activeCategory.removeClass('is-active');
			category.addClass('is-active');

			if (slug) {
				works.addClass('is-hidden');
				works.filter('[data-terms~="'+slug+'"]').removeClass('is-hidden');

				output.html(category.find('span').html()).addClass('is-visible');
			} else {
				works.removeClass('is-hidden');
				output.html('').removeClass('is-visible');
			}
		}

		// Show coming soon
		if (works.not('.is-hidden, .blank').length%2 === 1)
			works.filter('.blank').removeClass('is-hidden');
		else
			works.filter('.blank').addClass('is-hidden');

		// Load deferred works
		var limit = Number(container.attr('data-deferred'));
		var firstWorks = works.not('.is-hidden').slice(0, limit);
		var otherWorks = works.not('.is-hidden').slice(limit);

		firstWorks.removeClass('is-deferred');
		firstWorks.find('.image').queueLoading();

		otherWorks.addClass('is-deferred');

		if (otherWorks.length == 0)
			$('.layout-works .button-more').addClass('is-hidden');
		else
			$('.layout-works .button-more').removeClass('is-hidden');

		homeFilter = $(this).index();

		// Hide categories screen
		if ($('.works-filters').hasClass('is-opened'))
			worksFiltersClose();
	});



/* =============================================================================
   WORK
   ========================================================================== */

/* Resize
   -------------------------------------------------------------------------- */
	function workResize() {
		// Main media resize
		var section = $('.work-main-media');

		if (section.length == 1) {
			var container = section.find('.container');
			var newHeight = windowHeight-$('.site-topbar').height();

			// Set container's height
			section.css({width:windowWidth, height:windowHeight});
			container.css({height:newHeight});

			// Set content's height
			var content = container.find('.image, .video').first();
			if (content.hasClass('image')) {
				content.css({width:'', height:''});
				var maxWidth = Number(content.attr('width'));
				var maxHeight = Number(content.attr('height'));

				// Fit width
				if (container.hasClass('fullscreen')) {
					var newWidth = container.width();
					var newHeight = container.height();

					content.css({width:newWidth});
					if (content.height() < container.height())
						content.css({width:'', height:newHeight});
				} else {
					var newWidth = Math.min(maxWidth, container.width());
					var newHeight = Math.min(maxHeight, container.height());

					content.css({width:newWidth});
					if (content.height() > container.height())
						content.css({width:'', height:newHeight});
				}
			} else {
				var sizer = content.find('.sizer');
				content.css({width:'', height:''});
				sizer.css({width:'', height:''});

				// Fit width
				var newWidth = container.width();
				var newHeight = container.height();

				sizer.css({width:newWidth});
				if (sizer.height() > container.height())
					sizer.css({width:'', height:newHeight});

				content.css({width:sizer.width(), height:sizer.height()});
			}

			// Center content
			content.css({top:(container.height()-content.height())/2, left:(container.width()-content.width())/2})
		}

		// Nav resize
		var nav = $('.work-navigation');
		if (nav.length == 1) {
			// Set nav's height
			nav.css({top:windowHeight/2});
		}

	}


/* Work top hide
   -------------------------------------------------------------------------- */
	function workTopHide() {
		// Selectors
		var container = $('.layout-work .work-main-media .container');
		if (container.length == 0)
			return;

		if (isDesktop && !jQuery.browser.mobile) {
			// Calculate scale
			var scrollTop = $(window).scrollTop();
			var scale = scrollTop/windowHeight;
			if (scale > 1)
				scale = 1;

			if (!container.hasClass('fullscreen'))
				container.css({transform:'translate3d(0, '+(-scrollTop/5)+'px, 0) scale('+(1-scale/2)+')'})
			else
				container.css({transform:'translate3d(0, '+(-scrollTop/5)+'px, 0)'})
		} else {
			container.css({opacity:'', transform:''})
		}
	}
	//$(window).on('scroll', workTopHide)


/* Work navigation
   -------------------------------------------------------------------------- */
	$('body').on('click', '.work-navigation .arrow', function() {
		$(this).addClass('is-clicked');
	});



/* =============================================================================
   ABOUT
   ========================================================================== */

	var aboutAwardsWait = false;


/* Illustration on scroll
   -------------------------------------------------------------------------- */
	function aboutIllustrationScroll() {
		if ($('html').hasClass('mobile') || $('.layout-about').length != 1)
			return;

		var scrollTop = $(window).scrollTop();
		var maxScrollTop = $(document).height()-$(window).height();
		var windowBottom = $(window).height()+scrollTop;
		var threshold = $(window).height()/4;

		$('.layout-about .skill').not('.is-visible').each(function() {
			// Selectors
			var skill = $(this);
			var illustration = skill.find('.illustration');
			var elements = skill.find('.illustration, .content');
			var illustrationTop = illustration.offset().top;

			if (illustrationTop < windowBottom-threshold /*|| illustrationTop >= maxScrollTop*/) {
				skill.addClass('is-visible');

				elements.css({position:'relative', top:50});

				TweenMax.staggerTo(
					elements,
					1,
					{
						alpha:1,
						top:0,
						ease:Expo.easeOut,
						onComplete:function() {
							elements.attr('style', '');
						}
					},
					0.2
				);
			}
		});

		$('.layout-about .publication').not('.is-visible').each(function() {
			// Selectors
			var publication = $(this);
			var elements = publication.find('.title, .text');
			var publicationTop = publication.find('.title').offset().top;

			if (publicationTop < windowBottom-threshold /*|| publicationTop >= maxScrollTop*/) {
				publication.addClass('is-visible');

				elements.css({position:'relative', top:50});

				TweenMax.staggerTo(
					elements,
					1,
					{
						alpha:1,
						top:0,
						ease:Expo.easeOut,
						onComplete:function() {
							elements.attr('style', '');
						}
					},
					0.2
				);
			}
		});

		$('.layout-about .section-awards').not('.is-visible').each(function() {
			// Selectors
			var section = $(this);
			var elements = section.find('.section-title, .intro, .awards-sites');
			var sectionTop = section.find('.section-title').offset().top;

			if (sectionTop < windowBottom-threshold /*|| publicationTop >= maxScrollTop*/) {
				section.addClass('is-visible');

				elements.css({position:'relative', top:50});

				TweenMax.staggerTo(
					elements,
					1,
					{
						alpha:1,
						top:0,
						ease:Expo.easeOut,
						onComplete:function() {
							elements.attr('style', '');
						}
					},
					0.2
				);
			}
		});
	}
	//$(window).on('scroll', aboutIllustrationScroll);


/* Awards toggle
   -------------------------------------------------------------------------- */
	$('body').on('click', '.awards-site .header, .awards-site .button-close', function(e) {
		if (aboutAwardsWait)
			return;
		aboutAwardsWait = true;

		// Selectors
		var button = $(this);
		var container = $('.awards-sites');
		var site = button.closest('.awards-site');
		var content = site.find('.awards-list');
		var otherSite = container.find('.awards-site.is-opened').not(site);

		// Toggle
		if (button.is('.header') && !site.hasClass('is-opened')) {
			// Close opened sites
			otherSite.each(function() {
				aboutAwardsClose($(this));
			});

			aboutAwardsOpen(site, ((otherSite.length == 1) ? 0.4:0));
		} else {
			aboutAwardsClose(site);

			aboutAwardsWait = false;
		}
	});

	function aboutAwardsOpen(site, delay) {
		var container = $('.awards-sites');
		var content = site.find('.awards-list');

		// Get opened content height
		content.css({display:'block'});
		var toHeight = content.height()
		content.css({height:0, opacity:0});

		// Open animation
		site.addClass('is-opened');
		container.addClass('is-opened');

		TweenMax.to(
			content,
			0.5,
			{
				alpha: 1,
				height: toHeight,
				delay: delay,
				ease: Power3.easeInOut,
				onComplete: function() {
					content.attr('style', '');

					aboutAwardsWait = false;
				}
			}
		);

		// Scroll auto
		/*
		var scrollTop = $('.awards-sites').offset().top - 50 - $('.site-topbar').height();

		TweenMax.to(
			window,
			0.5,
			{
				scrollTo: {y:scrollTop},
				delay: 0.5,
				ease: Power3.easeInOut
			}
		);
		*/
	}

	function aboutAwardsClose(site) {
		var container = $('.awards-sites');
		var content = site.find('.awards-list');

		content.css({display:'block', height:content.height()});

		// Close animation
		site.removeClass('is-opened');
		container.removeClass('is-opened');

		TweenMax.to(
			content,
			0.3,
			{
				alpha: 0
			}
		);
		TweenMax.to(
			content,
			0.5,
			{
				height: 0,
				ease: Power3.easeInOut,
				onComplete: function() {
					content.attr('style', '');
				}
			}
		);
	}



/* =============================================================================
   CONTACT
   ========================================================================== */

/* Check field
   -------------------------------------------------------------------------- */
	function checkFormField(field) {
		if (field.val() != '')
			field.addClass('is-filled');
		else
			field.removeClass('is-filled');
	}


/* Check forms
   -------------------------------------------------------------------------- */
	function checkForms() {
		$('.wpcf7-form').each(function() {
			var form = $(this);
			var canSubmit = true;
			var submit = form.find('[type="submit"]');

			var fields = $('input[type="text"], input[type="email"], textarea').not('[name="info"]');

			fields.each(function() {
				var field = $(this);

				checkFormField(field);

				if (!field.hasClass('is-filled'))
					canSubmit = false;
			})

			if (canSubmit)
				submit.addClass('is-active');
			else
				submit.removeClass('is-active');
		});
	}
	$('body').on('blur', 'input[type="text"], input[type="email"], textarea', function(e) {
		checkForms();
	});



/* =============================================================================
   NAV HANDHELD
   ========================================================================== */

/* Resize
   -------------------------------------------------------------------------- */
	function navHandheldResize() {
		// Selectors
		var nav = $('.nav-handheld');

		// Set nav's height
		nav.css({height:''});
		if (nav.height() < windowHeight)
			nav.css({height:windowHeight});

		navHandheldScrollInit();
	}


/* Toggle
   -------------------------------------------------------------------------- */
	$('body').on('click', '.nav-handheld-toggle, .nav-handheld-mask', function(e) {
		// Selectors
		var container = $('.global-container');
		var nav = $('.nav-handheld');
		var page = $('.layout-page');
		var fixedElement = container.find('.is-fixed, .site-foot');
		var mask = $('.nav-handheld-mask');

		var gap = 230;

		// Transition
		if (nav.hasClass('is-opened')) {
			/*TweenMax.to(
				page.add(fixedElement),
				0.5,
				{
					left: 0,
					ease: Expo.easeInOut
				}
			);*/
			TweenMax.to(
				mask,
				0.5,
				{
					alpha: 0,
					ease: Expo.easeInOut
				}
			);
			TweenMax.to(
				nav,
				0.5,
				{
					left: -gap,
					ease: Expo.easeInOut,
					onComplete: function() {
						page.add(fixedElement).css({left:''});
						mask.css({display:'', opacity:''});
						nav.css({left:''});

						nav.removeClass('is-opened');
						$('body').removeClass('overflow-hidden');
					}
				}
			);
		} else {
			$('body').addClass('overflow-hidden');
			mask.css({display:'block', opacity:0});

			/*TweenMax.to(
				page.add(fixedElement),
				0.5,
				{
					left: gap,
					ease: Expo.easeInOut
				}
			);*/
			TweenMax.to(
				mask,
				0.5,
				{
					alpha: 1,
					ease: Expo.easeInOut
				}
			);
			TweenMax.to(
				nav,
				0.5,
				{
					left: 0,
					ease: Expo.easeInOut,
					onComplete: function() {
						page.add(fixedElement).css({left:''});
						mask.css({display:'', opacity:''});
						nav.css({left:''});

						nav.addClass('is-opened');
					}
				}
			);

		}

	});


/* Close on click
   -------------------------------------------------------------------------- */
	$('body').on('click', '.nav-handheld-inner a', function(e) {
		if ($('.nav-handheld').hasClass('is-opened'))
			$('.nav-handheld-toggle').click();
	});


/* Scroll
   -------------------------------------------------------------------------- */
	function navHandheldScrollInit() {
		// Selectors
		var nav = $('.nav-handheld-inner');
		if (nav.length != 1)
			return;
		var container = $('.nav-handheld');

		// Get Draggable object
		var navHandheldScroller = Draggable.get(nav);

		if (typeof(navHandheldScroller) == 'undefined') {
			Draggable.create(
				nav,
				{
					type:'y',
					bounds:container,
					dragClickables:true,
					edgeResistance:0.5,
					throwProps:true,
					onClick:function(e) {
						var target = $(e.target);
						if (target.is('a'))
							target.click();
					}
				}
			);
			navHandheldScroller = Draggable.get(nav);
		} else {
			navHandheldScroller.update(true);
		}

		if (container.height() > nav.height())
			navHandheldScroller.disable();
		else
			navHandheldScroller.enable();
	}



/* =============================================================================
   INTRO ILLUSTRATION
   ========================================================================== */

	var introHomePlayed = false;

/* Home intro
   -------------------------------------------------------------------------- */
	$('body').on('startIntro', '.svg-intro-home', function() {
		if (jQuery.browser.mobile || (isIE && IEVersion < 10))
			return;

		if (!introHomePlayed) {

			introHomePlayed = true;

			var tl = new TimelineLite();
			tl.pause();
			tl.add('startIllustration', 2.3);

			if (!isIE) {
				// Logo
				var title = $('.page-title');
				var inner = title.find('.inner');
				var svg = inner.find('svg');
				var letters = svg.find('#logo-letters');
				var nLeft = svg.find('#logo-n_left');
				var nRight = svg.find('#logo-n_right');

				// Pre animation
				var innerWidth = inner.width();

				tl.set(
					title,
					{
						alpha:0
					},
					0
				);
				tl.to(
					title,
					0.4,
					{
						alpha:1,
						ease:Linear.easeNone
					},
					1
				);

				tl.set(
					letters,
					{
						alpha:0
					},
					0
				);
				tl.set(
					nLeft,
					{
						x:(inner.width()/2)-51
					},
					0
				);
				tl.set(
					nRight,
					{
						x:-((inner.width()/2)-51)
					},
					0
				);

				tl.to(
					nLeft,
					0.2,
					{
						x:'+=3',
						ease:Linear.easeNone,
						force3D:true
					},
					2.1
				);
				tl.to(
					nRight,
					0.2,
					{
						x:'-=3',
						ease:Linear.easeNone,
						force3D:true
					},
					2.1
				);

				tl.to(
					nLeft,
					0.6,
					{
						x:0,
						ease:Power3.easeOut,
						force3D:true
					},
					2.3
				);
				tl.to(
					nRight,
					0.6,
					{
						x:0,
						ease:Power3.easeOut,
						force3D:true
					},
					2.3
				);
				tl.to(
					letters,
					0.8,
					{
						alpha:1,
						ease:Power2.easeOut
					},
					2.4
				);
			} else {
				// Logo
				var title = $('.page-title');

				tl.set(
					title,
					{
						alpha:0
					},
					0
				);
				tl.to(
					title,
					0.4,
					{
						alpha:1,
						ease:Linear.easeNone
					},
					1
				);
			}

			// Texts
			var texts = $('.page-intro > *, .page-nav, .language-selector-desktop, .awwwards').not(title);
			tl.set(
				texts,
				{
					alpha:0
				},
				0
			);
			tl.to(
				texts,
				0.3,
				{
					alpha:1,
					ease:Linear.easeNone
				},
				1.6
			);

			// Triangles
			var pyramid = $("#home-triangle");
			tl.set(
				pyramid,
				{
					y:25,
					force3D:true
				},
				0
			);
			tl.to(
				pyramid,
				0.4,
				{
					y:-5,
					ease:Power2.easeOut
				},
				'startIllustration'
			);
			tl.to(
				pyramid,
				0.2,
				{
					y:0,
					ease:Linear.easeNone
				},
				'startIllustration+=0.4'
			);

			var pyramidAlpha = $("#home-triangle > g");
			tl.set(
				pyramidAlpha,
				{
					alpha:0,
				},
				0
			);
			tl.to(
				pyramidAlpha,
				0.4,
				{
					alpha:1,
				},
				'startIllustration'
			);

			// Nuages gauche
			var cloudsLeft = $("#home-nuage_gauche");
			tl.set(
				cloudsLeft,
				{
					x:50,
					force3D:true
				},
				0
			);
			tl.to(
				cloudsLeft,
				0.4,
				{
					x:-5,
					ease:Power2.easeOut
				},
				'startIllustration+=0.1'
			);
			tl.to(
				cloudsLeft,
				0.4,
				{
					x:0,
					ease:Linear.easeNone
				},
				'startIllustration+=0.5'
			);

			var cloudsLeftAlpha = $("#home-nuage_gauche > g");
			tl.set(
				cloudsLeftAlpha,
				{
					alpha:0,
				},
				0
			);
			tl.to(
				cloudsLeftAlpha,
				0.4,
				{
					alpha:1,
				},
				'startIllustration+=0.1'
			);

			var tongueLeft1 = Snap.select('#home-langue_1');
			tl.set(
				tongueLeft1,
				{
					snap: { scale:0.01 }
				},
				0
			);
			tl.to(
				tongueLeft1,
				0.15,
				{
					snap: { scale:1.1 },
					ease:Linear.easeNone
				},
				'startIllustration+=0.1'
			);
			tl.to(
				tongueLeft1,
				0.15,
				{
					snap: { scale:1 },
					ease:Linear.easeNone
				},
				'startIllustration+=0.25'
			);

			var tongueLeft2 = Snap.select('#home-langue_2');
			tl.set(
				tongueLeft2,
				{
					snap: { scale:0.01 }
				},
				0
			);
			tl.to(
				tongueLeft2,
				0.15,
				{
					snap: { scale:1.1 },
					ease:Linear.easeNone
				},
				'startIllustration+=0.2'
			);
			tl.to(
				tongueLeft2,
				0.15,
				{
					snap: { scale:1 },
					ease:Linear.easeNone
				},
				'startIllustration+=0.35'
			);

			var tongueLeft3 = Snap.select('#home-langue_3');
			tl.set(
				tongueLeft3,
				{
					snap: { scale:0.01 }
				},
				0
			);
			tl.to(
				tongueLeft3,
				0.15,
				{
					snap: { scale:1.1 },
					ease:Linear.easeNone
				},
				'startIllustration+=0.3'
			);
			tl.to(
				tongueLeft3,
				0.15,
				{
					snap: { scale:1 },
					ease:Linear.easeNone
				},
				'startIllustration+=0.45'
			);

			var tongueLeft4 = Snap.select('#home-langue_4');
			tl.set(
				tongueLeft4,
				{
					snap: { scale:0.01 }
				},
				0
			);
			tl.to(
				tongueLeft4,
				0.2,
				{
					snap: { scale:1.1 },
					ease:Linear.easeNone
				},
				'startIllustration+=0.2'
			);
			tl.to(
				tongueLeft4,
				0.15,
				{
					snap: { scale:1 },
					ease:Linear.easeNone
				},
				'startIllustration+=0.4'
			);

			// Nuages droite
			var cloudsRight = $("#home-nuage_droite");
			tl.set(
				cloudsRight,
				{
					x:-25,
					force3D:true
				},
				0
			);
			tl.to(
				cloudsRight,
				0.4,
				{
					x:5,
					ease:Power2.easeOut
				},
				'startIllustration+=0.1'
			);
			tl.to(
				cloudsRight,
				0.4,
				{
					x:0,
					ease:Linear.easeNone
				},
				'startIllustration+=0.5'
			);

			var cloudsRightAlpha = $("#home-nuage_droite > g");
			tl.set(
				cloudsRightAlpha,
				{
					alpha:0,
				},
				0
			);
			tl.to(
				cloudsRightAlpha,
				0.4,
				{
					alpha:1,
				},
				'startIllustration+=0.1'
			);

			// Éclair 1
			var lightning1 = Snap.select('#home-eclair_1');
			tl.set(
				lightning1,
				{
					snap: { scale:0.01 }
				},
				0
			);
			tl.to(
				lightning1,
				0.2,
				{
					snap: { scale:1.1 },
					ease:Linear.easeNone
				},
				'startIllustration+=0.1'
			);
			tl.to(
				lightning1,
				0.2,
				{
					snap: { scale:1 },
					ease:Linear.easeNone
				},
				'startIllustration+=0.3'
			);

			// Éclair 2
			var lightning2 = Snap.select('#home-eclair_2');
			tl.set(
				lightning2,
				{
					snap: { scale:0.01 }
				},
				0
			);
			tl.to(
				lightning2,
				0.2,
				{
					snap: { scale:1.1 },
					ease:Linear.easeNone
				},
				'startIllustration+=0.2'
			);
			tl.to(
				lightning2,
				0.2,
				{
					snap: { scale:1 },
					ease:Linear.easeNone
				},
				'startIllustration+=0.4'
			);


			// Oiseaux et nid
			var birds = Snap.select("#home-oiseau");
			tl.set(
				birds,
				{
					snap: { 'fill-opacity':0, scale:0.9 }
				},
				0
			);
			tl.to(
				birds,
				0.4,
				{
					snap: { 'fill-opacity':1, scale:1 },
					ease:Power2.easeOut
				},
				'startIllustration+=0.1'
			);

			// End
			tl.call(function() {
				// Clean
				$('.page-intro > *')
					.add(inner)
					.add(letters)
					.add(nLeft)
					.add(nRight)
					.attr('style', '');

				// Floating elements
				floatingElement($('#home-oiseau'));
				floatingElement($("#home-nuage_droite"));
				floatingElement($("#home-nuage_gauche"));
				floatingVerticalElement($("#home-diamant"), 'up');
			});

			tl.call(function() {
				homeRandomCloud();
			}, null, this, '+=2');

			tl.play();
		} else {
			// Intro already played
			floatingElement($('#home-oiseau'));
			floatingElement($("#home-nuage_droite"));
			floatingElement($("#home-nuage_gauche"));
			floatingVerticalElement($("#home-diamant"), 'up');

			homeRandomCloud();
		}
	});


/* Home random cloud
   -------------------------------------------------------------------------- */
	function homeRandomCloud() {
		// Selectors
		var container = $('.svg-intro-home-cloud');
		if (container.length == 0)
			return;

		var cloud = container.find('#cloud-nuage');
		var lightning1 = container.find('#cloud-eclair_1');
		var lightning2 = container.find('#cloud-eclair_2');
		var lightning3 = container.find('#cloud-eclair_3');

		// Cloud position
		var cloudLeft = homeRandomCloudLeft();
		if (!cloudLeft)
			return;

		container.css({display:'block', left:cloudLeft, transform:'scale('+(0.3+Math.random()*0.5)+')'})

		// Animation
		var tl = new TimelineLite();
		tl.pause();

		tl.set( cloud, { alpha:0 }, 0 );
		tl.to( cloud, 0.1, { alpha:1, ease:Linear.easeNone }, 0 );
		tl.to( cloud, 0.1, { alpha:0, ease:Power2.easeOut }, 0.1 );
		tl.to( cloud, 0.1, { alpha:1, ease:Linear.easeNone }, 0.2 );
		tl.to( cloud, 0.1, { alpha:0, ease:Linear.easeNone }, 0.3 );

		tl.set( lightning1, { alpha:0 }, 0 );
		tl.set( lightning1, { alpha:1 }, 0.1 );
		tl.set( lightning1, { alpha:0 }, 0.166 );

		tl.set( lightning2, { alpha:0 }, 0 );
		tl.set( lightning2, { alpha:1 }, 0.2 );
		tl.set( lightning2, { alpha:0 }, 0.233 );

		tl.set( lightning3, { alpha:0 }, 0 );
		tl.to( lightning3, 0.133, { alpha:1, ease:Linear.easeNone }, 0 );
		tl.to( lightning3, 0.133, { alpha:0, ease:Linear.easeNone }, 0.133 );
		tl.to( lightning3, 0.1, { alpha:1, ease:Linear.easeNone }, 0.266 );
		tl.set( lightning3, { alpha:0 }, 0.366 );

		tl.call( function() {
			homeRandomCloud();
		},
		null, this, 0.5+Math.random()*4 );

		tl.play();
	}

	function homeRandomCloudLeft() {
		var safeZone = 1400;
		var margin = 100;

		if (isTablet)
			safeZone = 700;
		else if (isSmartphone)
			safeZone = 300;

		var leftBorder = windowWidth/2-safeZone/2;
		var rightBorder = windowWidth/2+safeZone/2;

		if (leftBorder <= 0)
			return false;

		if (Math.round(Math.random())) {
			var cloudLeft = margin+(Math.random()*leftBorder);
		} else {
			var cloudLeft = rightBorder+(Math.random()*leftBorder)-margin;
		}

		return cloudLeft;
	}


/* Make element floats
   -------------------------------------------------------------------------- */
	function floatingElement(element) {
		var duration = 2+Math.random()*2;
		var xMove = Math.random()*20-10;
		var yMove = -Math.random()*20;

		TweenMax.to(
			element,
			duration,
			{
				x: xMove,
				y: yMove,
				z: 0.1,
				ease:Power1.easeInOut,
				onComplete:function() {
					floatingElement(element);
				}
			}
		);
	}

	function floatingVerticalElement(element, direction) {
		var duration = 2;
		//var xMove = Math.random()*20-10;
		var yMove = 0;
		if (direction == 'up') {
			yMove = -4;
			direction = 'down';
		} else {
			direction = 'up';
		}

		TweenMax.to(
			element,
			duration,
			{
				//x: xMove,
				y: yMove,
				z: 0.1,
				ease:Power1.easeInOut,
				onComplete:function() {
					floatingVerticalElement(element, direction);
				}
			}
		);
	}


/* About intro
   -------------------------------------------------------------------------- */
	$('body').on('startIntro', '.svg-intro-about', function() {
		if (jQuery.browser.mobile || (isIE && IEVersion < 10))
			return;

		var tl = new TimelineLite();
		tl.pause();
		tl.add('startIllustration', 1.5);

		// Texts
		var texts = $('.page-intro > *, .page-nav, .language-selector-desktop').not('.link-outline');
		tl.set(
			texts,
			{
				alpha:0
			},
			0
		);
		tl.to(
			texts,
			0.3,
			{
				alpha:1,
				ease:Linear.easeNone
			},
			1
		);

		// Link
		var link = $('.page-intro > .link-outline');
		tl.set(
			link,
			{
				alpha:0
			},
			0
		);
		tl.to(
			link,
			0.5,
			{
				alpha:1,
				ease:Linear.easeNone
			},
			1.15
		);

		// Lion
		var lion = Snap.select('#about-lion');
		tl.set(
			lion,
			{
				snap: { 'fill-opacity':0, scale:0.9 }
			},
			0
		);
		tl.to(
			lion,
			0.5,
			{
				snap: { 'fill-opacity':1, scale:1 },
				ease:Power2.easeOut
			},
			'startIllustration'
		);

		// Lightnings
		$('#about-eclairs, #about-eclair_arriere').find('> g').each(function() {
			var lightning = Snap.select('#'+$(this).attr('id'));

			tl.set(
				lightning,
				{
					snap: { scale:0.01 }
				},
				0
			);
			tl.to(
				lightning,
				0.3,
				{
					snap: { scale:1.2 },
					ease:Linear.easeNone
				},
				'startIllustration+=0.1'
			);
			tl.to(
				lightning,
				0.2,
				{
					snap: { scale:1 },
					ease:Linear.easeNone
				},
				'startIllustration+=0.4'
			);
			tl.to(
				lightning,
				0.2,
				{
					snap: { scale:1.05 },
					ease:Linear.easeNone
				},
				'startIllustration+=0.6'
			);
			tl.to(
				lightning,
				0.3,
				{
					snap: { scale:1 },
					ease:Linear.easeNone
				},
				'startIllustration+=0.8'
			);

		});


		// End
		tl.call(function() {
			// Floating hair
			floatingHair();
		});

		tl.play();
	});


/* Make hair floats
   -------------------------------------------------------------------------- */
	function floatingHair() {
		var container = $('.svg-intro-about');

		var maxAngle = 5;
		var maxDuration = 3;

		if (container.attr('data-rotation') > 0)
			var globalRotation = -maxAngle;
		else
			var globalRotation = maxAngle;
		container.attr('data-rotation', globalRotation)

		var hairs = $('#about-poils_arriere, #about-poils_millieu, #about-poils_devant').find('> g');

		hairs.each(function() {
			var duration = maxDuration;
			var delay = Math.random()*(maxDuration/2);
			var rotation = globalRotation+((-maxAngle/4)+(Math.random()*(maxAngle/2)));

			var hair = Snap.select('#'+$(this).attr('id'));

			var position = 1;
			if ($(this).attr('id').indexOf('droite') > 0)
				position = -1;

			TweenMax.to(
				hair,
				duration,
				{
					snap: { rotation: rotation*position },
					delay: delay,
					ease: Power1.easeInOut
				}
			);
		});

		setTimeout(floatingHair, maxDuration*1000);
	}


/* Contact intro
   -------------------------------------------------------------------------- */
	$('body').on('startIntro', '.svg-intro-contact', function() {
		if (jQuery.browser.mobile || (isIE && IEVersion < 10))
			return;

		var tl = new TimelineLite();
		tl.pause();
		tl.add('startIllustration', 1.3);

		// Texts
		var texts = $('.page-intro > *, .page-title .svg, .page-nav, .language-selector-desktop').not('.link-outline');
		tl.set(
			texts,
			{
				alpha:0
			},
			0
		);
		tl.to(
			texts,
			0.3,
			{
				alpha:1,
				ease:Linear.easeNone
			},
			1
		);

		// Link
		var link = $('.page-intro > .link-outline');
		tl.set(
			link,
			{
				alpha:0
			},
			0
		);
		tl.to(
			link,
			0.5,
			{
				alpha:1,
				ease:Linear.easeNone
			},
			'startIllustration'
		);

		// Burger
		var burger = Snap.select('#contact-burger');
		tl.set(
			burger,
			{
				snap: { 'fill-opacity':0, scale:0.9 }
			},
			0
		);
		tl.to(
			burger,
			1,
			{
				snap: { 'fill-opacity':1, scale:1 },
				ease:Power2.easeOut
			},
			'startIllustration'
		);

		// Clouds
		$('.page-illustration .clouds .svg').shuffle().each(function(index) {
			var cloud = $(this);

			tl.set(
				cloud,
				{
					opacity: 0
				},
				0
			);
			tl.to(
				cloud,
				0.7,
				{
					opacity: 1,
					delay: index*0.15,
					ease:Linear.easeNone
				},
				'startIllustration+=0.7'
			);

		});

		// End
		tl.call(function() {
			// Floating elements
			floatingElement($('#contact-burger'));

			$('.page-illustration .clouds svg > g').each(function() {
				floatingElement($(this));
			});
		});

		tl.play();
	});



/* =============================================================================
   CONTROLLERS FOR AJAXIFED SITE
   ========================================================================== */

/* Specific controller call
   -------------------------------------------------------------------------- */
	function callController(controllerName, hash, data) {
		// Construct function name
		var functionName = controllerName+hash;

		// Execute function if it exists
		if (typeof window[functionName] == 'function') {
			if (controllerName == 'pageInit') {
				window[functionName](data);
			}
			else
				window[functionName]();
		}
	}


/* Internal link handler
   -------------------------------------------------------------------------- */
	$('body').on('click', 'a', function(e) {
		// Get link href
		var url = $(this).attr('href');

		// Get out of 404 page
		if (window.location.pathname.indexOf('404') != -1) {
			var destinationUrl = '/#'+url.getHash();
			window.location.href = destinationUrl;

			e.preventDefault();
			return;
		}

		// Check if it's an internal URL
		if (url.indexOf(Nerisson.host) === 0) {
			if (!pageIsLoading) {
				if ($(this).hasClass('link-home') && $(this).hasClass('scroll-to-top')) {
					$('html,body').animate(
						{
							scrollTop:0
						},
						{
							duration: 1500,
							easing: 'easeInOutQuint'
						}
					);
				} else  if ($(this).hasClass('link-home'))
					homeScroll = 0;
				else if ($(this).hasClass('link-work'))
					homeScroll = $(window).scrollTop();
				else if ($(this).hasClass('link-works'))
					homeScroll = -1;

				// Load page
				pageLoading(url);
			}

			e.preventDefault();
		}
	});


/* Site init
   -------------------------------------------------------------------------- */
	function sitePreInit() {
		// Force hash address
		if (window.location.pathname != '/' && window.location.pathname != '/404') {
			window.location = '/#'+window.location.pathname.replace(/^\//g, '');
			return;
		}
	}
	sitePreInit();

	function siteInit() {
		var globalLoader = $('.global-loader');

		// Load queued images
		$('.queue-loading').queueLoading();

		// Check forms
		checkForms();

		if (window.location.pathname == '/404') {
			globalLoader.remove();

			// Auto redirect
			setTimeout(function() {
				window.location = '/';
			}, 4000);
		} else {
			// iOs : Hide the address bar!
			/*setTimeout(function(){
				window.scrollTo(0, 1);
			}, 10);
			*/

			if (window.location.hash.replace('#', '') == '' || window.location.hash.replace('#', '') == 'home') {
				callController('pageOpening', 'Home', null);

				// Hide global loader
				globalLoader.fadeOut(500, function() {
					globalLoader.remove();

					setInterval(checkAddress, 100);
				});
			} else if (window.location.hash.replace('#', '') != '') {
				setInterval(checkAddress, 100);
				setTimeout(function() {
					globalLoader.remove();
				}, 400);
			}
		}
	}


/* Check address
   -------------------------------------------------------------------------- */
	function checkAddress() {
		var hash = window.location.hash.replace('#', '');
		if (hash == '')
			hash = homeHash;

		if (pageIsLoading) {
			// Be patient
		} else {
			if (currentHash != hash) {
				// Load new page
				var url = Nerisson.host+'/'+hash;
				pageLoading(url);
			} else {
				// It's ok
			}
		}
	}

/* Page loading
   -------------------------------------------------------------------------- */
	function pageLoading(url) {
		// Exit if hash is the same than current one
		if (currentHash == url.getHash() || pageIsLoading) {

		} else {
			if (url.getHash() == homeHash)
				url = Nerisson.host;

			// Display loader
			pageLoader(true);

			setTimeout(function() {
				// Global loading stuff
				$.get(url, function(data) {
					pageInit(url, data);
				}).error(function() { window.location = '/404'; });

				// Call specific loading if exists
				callController('pageLoading', url.getHash().toCamel(), null);
			}, 300);
		}
	}

/* Page init
   -------------------------------------------------------------------------- */
	function pageInit(url, data) {
		// Convert data to HTML
		var html = $(data);

		// Create old container
		var oldContainer = $('.page-container').last();

		// Create new container
		var newContainer = html.find('.page-container')
		newContainer.insertBefore(oldContainer);

		// Switch containers
		oldContainer.addClass('old-container');
		newContainer.addClass('new-container');

		// Handheld links
		var links = $('.nav-handheld .site-links .link');
		links.removeClass('is-active');
		links.find('a[href="'+url+'"], a[href="'+url+'/"]').parent().addClass('is-active');

		// Change address
		changeAddress(url.getHash(), false);

		// Resize
		//$(window).trigger('resize');

		// Call specific init if exists
		callController('pageInit', currentHash.toCamel(), data);

		// Check forms
		checkForms();

		// Load images
		newContainer.find('.queue-loading').queueLoading();
		pageImageLoading(url);
	}

/* Page image loading
   -------------------------------------------------------------------------- */
	function pageImageLoading(url) {
		var images = $('.new-container img')

		var loaded = true;
		images.each(function() {
			if (!isImageOk($(this)))
				loaded = false
		});

		if (!loaded) {
			setTimeout(function () { pageImageLoading(url) }, 50);
		} else {
			pageOpening(url);
		}
	}

/* Page opening
   -------------------------------------------------------------------------- */
	function pageOpening(url) {
		// Call specific opening if exists
		callController('pageOpening', currentHash.toCamel(), null);

		// Get all tweens that have been started for page opening
		var tweens = TweenMax.getAllTweens();
		var maxDuration = 0;
		// Check tweens completion, only for not infinite tweens
		$.each(tweens, function(index, tween) {
			if (typeof(tween.repeat) == 'function' && tween.repeat() > -1) {
				var duration = Number(tween.duration())+Number(tween.delay());

				if (duration > maxDuration)
					maxDuration = duration;
			}
		});
		//setTimeout(pageKill, maxDuration*1000+100);
		pageKill();
	}

/* Page kill
   -------------------------------------------------------------------------- */
	function pageKill() {
		$('.new-container').removeClass('new-container').css({zIndex:''});

		// Call specific kill if exists
		callController('pageKill', previousHash.toCamel(), null);

		$('.old-container').remove();

		// Prevent double container
		var containers = $('[id="container-page"]');
		if (containers.length > 1) {
			containers.not(':last').remove();
		}

		// Remove viewport's limit
		$('.global-container').removeClass('is-limited');
		$(window).trigger('resize');

		// Home scroll auto
		if ($('.layout-works').length == 1) {
			var scrollTop = $('.layout-works').offset().top - $('.site-topbar').height();
			if (homeScroll == -1)
				homeScroll = scrollTop;
			window.scrollTo(0, homeScroll);

			if (homeFilter != null)
				$('.works-filters .category').eq(homeFilter).trigger('click');
		} else {
			window.scrollTo(0, 0);
		}

		// Remove loader
		pageLoader(false);

		setTimeout(function() {
			pageIsLoading = false;
		}, 200);

		previousHash = null;
	}

/* Page loader
   -------------------------------------------------------------------------- */
	function pageLoader(show) {
		// Selectors
		var loader = $('.page-loader');

		if (show) {
			loader.fadeIn(300, function() {
				$('.global-container').addClass('is-limited');
			});

			pageIsLoading = true;
		} else {
			$('.global-container').removeClass('is-limited');

			loader.delay(200).fadeOut(300, function() {
				$('.global-container').removeClass('is-limited');
				loader.css({display:'', opacity:''});
			});
		}
	}



/* =============================================================================
   ENDING STUFF
   ========================================================================== */

/* Trigger resize event to position everything after window load
   -------------------------------------------------------------------------- */
	$(window).on('load', function() {
		$(window).trigger('resize');

		clearTimeout(globalLoaderTimeout);
		siteInit();
	});

	var globalLoaderTimeout = setTimeout(function() {
		$('.global-loader .image').fadeIn();
	}, 500);

});



/* =============================================================================
   GLOBAL
   ========================================================================== */

	var pageIsLoading = false
	var previousHash = null;
	var homeHash = 'home';
	var currentHash = homeHash;

	function changeAddress(newHash) {
		previousHash = currentHash;
		currentHash = newHash;

		// Change window hash
		setTimeout(function () {
			window.location.hash = currentHash;
			//pageIsLoading = false;
		}, 100);

	}



/* =============================================================================
   SPECIFIC PAGE CONTROLLER
   ========================================================================== */

/* Home opening
   -------------------------------------------------------------------------- */
	function pageOpeningHome() {
		$('.svg-intro-home').trigger('startIntro');
	}

/* About opening
   -------------------------------------------------------------------------- */
	function pageOpeningAboutMe() {
		$('.svg-intro-about').trigger('startIntro');

		if (!$('html').hasClass('mobile')) {
			$('.layout-about .skills .illustration, .layout-about .skills .content').css({opacity:0});
			$('.layout-about .publication .text, .layout-about .publication .title').css({opacity:0});
			$('.layout-about .section-awards .section-title, .layout-about .section-awards .intro, .layout-about .section-awards .awards-sites').css({opacity:0});
		}
	}

/* About kill
   -------------------------------------------------------------------------- */
	function pageKillAboutMe() {
		var hairs = $('#about-poils_arriere, #about-poils_millieu, #about-poils_devant').find('> g')
		hairs.each(function() {
			var hair = Snap.select('#'+$(this).attr('id'));
			TweenMax.killTweensOf(hair);
		});
	}

/* Contact init
   -------------------------------------------------------------------------- */
	function pageInitContact(data) {
		$('.site-foot').addClass('fixed');
	}

/* Contact opening
   -------------------------------------------------------------------------- */
	function pageOpeningContact() {
		$('.svg-intro-contact').trigger('startIntro');
	}

/* Contact kill
   -------------------------------------------------------------------------- */
	function pageKillContact(data) {
		$('.site-foot').removeClass('fixed');
	}

/* Work opening
   -------------------------------------------------------------------------- */
	function pageOpeningWork() {
		// Selectors
		var container = $('.work-main-media .container');
		var button = container.find('.scroll-to-content');

		// Pre animation
		button.css({opacity:0});

		// Animation
		TweenMax.to(
			button,
			0.5,
			{
				alpha: 1,
				delay: 0.3,
				ease: Power3.easeOut,
				onComplete: function() {
					button.css({opacity:''});
				}
			}
		);


	}