var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1;
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var isSafari = /constructor/i.test(window.HTMLElement);

$( document ).ready(function() {
	if (isSafari) {
		$('.findPatriot input[type="submit"]').css('top','2px');
		$('.productDetail .sidebar .findPatriot input[type="submit"]').css('top','0');
		$('.newsSidebar .findPatriot input[type="submit"]').css('top','0');
		$('.default .defaultSidebar .findPatriot input[type="submit"]').css('top','0');
	}

	$( ".form-field input" ).click(function() {
		//$(this).parent('.form-field').children('label').addClass('clicked');
		$(this).parent('.form-field').children('label').click();
	 });
	 
	 /******************************************/
	/************ TOOL TIPS ************/
	/******************************************/
	$('.toolTip').each(function(){
		var activationName = $(this).attr('data-tool');
		console.log(activationName);
		$('.toolTipContent.'+activationName).appendTo('a.toolTip[data-tool="'+activationName+'"]');
	});
	toolTipHover();

	function toolTipHover() {
		if ($(window).width() > 1080) {
			$(".toolTip" ).hover(
			  function() {
				$(this).find('.toolTipContent').stop().fadeIn();
			  }, function() {
				$(this).find('.toolTipContent').stop().fadeOut();
			  }
			);
		}
	}
	
	$(window).resize(function() {
		toolTipHover();
	});
	
	
	 
	/******************************************/
	/************ INTERAL VS EXTERNAL LINKS ************/
	/******************************************/
	/*$('a').click(function () {
		if (this.hostname !== location.hostname) {
			// external
			alert('You are about to proceed to an offsite link. Patriot Bank, N.A. has no control over the content of this site Click OK to proceed.');
		}
	});
	$( "#Login" ).submit(function() {
		alert('You are about to proceed to an offsite link. Patriot Bank, N.A. has no control over the content of this site Click OK to proceed.');
	});*/
	$('a.externalLink').click(function() {
        var url = $(this).attr('href');
		var tk = "You are about to proceed to an offsite link. Patriot Bank, N.A. has no control over the content of this site. Click OK to proceed.";

            if (confirm(tk)) {
               window.open(url, 'newwin');
            }
        return false;
    });
	
	/******************************************/
	/************ PDF LINKS ************/
	/******************************************/
	$('a[href$=".pdf"]').attr( "aria-label", "Download PDF" );

	$('a[href$=".pdf"]').click(function(evt) {
        var url = evt.target.href;
		var tk = "You are downloading a PDF. Click OK to continue.";

            if (confirm(tk)) {
               window.open(url, 'newwin');
            }
        return false;
    });
	
	
	/****************************************************************************/
	/************ #LINKS FOR PRODUCTS TO OPEN CORRESPONDING DRAWERS ************/
	/***************************************************************************/
	if(window.location.hash) {
		var hash = window.location.hash.substring(1);
		
		$('.categoryDrawer h4').each(function(){
			if ($(this).attr('class') === hash) {
				if(!$('.innerNavigation').hasClass('fixed')) {
					$('.innerNavigation').addClass('fixed');
				}
				$(this).parent('.categoryDrawer').find('.moreLessContent').addClass('open');
			}
		});
	}
	
	/******************************************/
	/************ FLEXSLIDERS ************/
	/******************************************/
	$(".flexslider.sliderOne").flexslider({
	  	animation: "fade",
	  	directionNav: "true",
	  	slideshowSpeed: 7000,
		slideshow: false,
		controlNav: true 
	});
	$(".flexslider.sliderTwo").flexslider({
	  	animation: "fade",
	  	directionNav: "true",
	  	slideshowSpeed: 7000,
		slideshow: false,
		controlNav: true   
	});
	$(".flexslider.sliderThree").flexslider({
	  	animation: "fade",
	  	directionNav: "true",
	  	slideshowSpeed: 7000,
		slideshow: false,
		controlNav: true  
	});
	$(".flexslider.sliderFour").flexslider({
	  	animation: "fade",
	  	directionNav: "true",
	  	slideshowSpeed: 7000,
		slideshow: false,
		controlNav: true   
	});
	
	/******************************************/
	/************ NAVIGATION ************/
	/******************************************/
   $( ".nav #menu-header-menu > .menu-item-has-children" ).hover(
	  function() {
		  //$("#tabs").css("cssText", "height: 650px !important;");
		$(this).children('ul').css('cssText','display: inline-block !important');
		$(this).children('ul').css('cssText','margin-left: 0 !important');
	  }, function() {
		$(this).children('ul').css('cssText','display: none !important');
		$(this).children('ul').css('cssText','margin-left: -99999 !important');
	  }
	);
	
	var header = $("#mainMenu");
	var headerY = header.offset().top;
	$(window).scroll(function () {
		var y = $(window).scrollTop();
	
		if (y >= headerY) {
			header.addClass('fixed');
			$('.innerNavigation').addClass('fixed');
			$('body.page-template-default').css('top','50px');
			$('body.page-template-page-product-landing').css('top','97px');
			$('body.page-template-page-product-detail').css('top','97px');
			$('body.page-template-page-digital-communications').css('top','55px');
			$('body.parent-pageid-388').css('top','97px');
			$('body.parent-pageid-397').css('top','97px');
			$('body.page-template-page-jobs').css('top','97px');
			$('body.single-job').css('top','97px');
			$('body.page-template-page-contact').css('top','55px');
			$('body.blog').css('top','97px');
			$('body.home').css('top','55px');	
			$('body.page-template-page-no-sidebar').css('top','50px');	
			$('body.page-id-2001').css('top','97px');
			$('body.page-id-2083').css('top','97px'); 
			$('body.single-white-paper').css('top','97px');
		} else {
			header.removeClass('fixed');
			$('.innerNavigation').removeClass('fixed');
			$('body.page-template-page-product-landing').css('top','0');	
			$('body.page-template-page-product-detail').css('top','0');
			$('body.page-template-page-digital-communications').css('top','0');
			$('body.page-template-page-contact').css('top','0');
			$('body.parent-pageid-388').css('top','0');
			$('body.page-template-page-jobs').css('top','0');
			$('body.single-job').css('top','0');
			$('body.blog').css('top','0');
			$('body.home').css('top','0');	
			$('body.parent-pageid-397').css('top','0');	
			$('body.page-template-page-no-sidebar').css('top','0');	
			$('body.page-template-default').css('top','0');
			$('body.page-id-2001').css('top','0');
			$('body.page-id-2083').css('top','0');
			$('body.single-white-paper').css('top','0');
		}
	});
	
	/******************************************/
	/************ MOBILE NAVIGATION ************/
	/******************************************/
	$('.lines-button').click(function () {
		$(this).toggleClass('x');
		$('body').toggleClass('moveLeft');
		
		if ($('body').hasClass('moveLeft')){
			$('.mobileHeader').animate({left: -275}, 800);
			$('.innerNavigation').animate({left: -275}, 800);
			$('body').animate({left: -275}, 800, function() {
				$('.mainContent').animate({opacity: 0.2}, 500);
			});
			$('.mobileHeader .navigation').animate({right: 0}, 800);
			
			
		} else {
			$('.mainContent').animate({opacity: 1}, 500, function(){
				$('body').animate({left: 0}, 800);
				$('.mobileHeader .navigation').animate({right: -275}, 800);
				$('.mobileHeader').animate({left: 0}, 800);
				$('.innerNavigation').animate({left: 0}, 800);
			});
		}
		
		if(isAndroid) {
		  $(this).removeClass('x');
		}
	
	});
	
	$('.accountLogin, .loginTabBTN').click(function () {
		$('.lines-button').removeClass('x');
		$('body').removeClass('moveLeft');
		$('body').animate({left: 0}, 800);
		$('.mainContent').animate({opacity: 0.2}, 500);
		$('.mobileHeader .navigation').animate({right: -275}, 800);
		$('.mobileHeader').animate({left: 0}, 800);
		$('.innerNavigation').animate({left: 0}, 800);
		$('.login.mobile').fadeIn(500);
	});
	
	$('.login.mobile .loginTitle img').click(function () {
		$('.login.mobile').fadeOut(500);
		$('.mainContent').animate({opacity: 1}, 500);
	});
	
	$( window ).resize(function() {
	  if ($(window).width() > 980){
			$('.lines-button').removeClass('x');
			$('body').removeClass('moveLeft');
			$('.mainContent').css('opacity','1');
			$('body').css('left','0');
			$('.mobileHeader .navigation').css('right','-275px');
			$('.mobileHeader').css('left','0');
			$('.innerNavigation').css('left','0');
	  	}
	});
	
	$('.mobileNavigation > .menu-mobile-menu-container > ul#menu-mobile-menu > li.menu-item-has-children > a').click(function () {
		$(this).parent('.mobileNavigation > .menu-mobile-menu-container > ul#menu-mobile-menu > li.menu-item-has-children').find('.sub-menu').first().slideToggle();
		$(this).toggleClass('activeDown');
	
	});
	$('.mobileNavigation > .menu-mobile-menu-container > ul#menu-mobile-menu.menu > li.menu-item-has-children > ul.sub-menu > li.menu-item-has-children > a').click(function () {
		$(this).parent('.mobileNavigation > .menu-mobile-menu-container > ul#menu-mobile-menu.menu > li.menu-item-has-children > ul.sub-menu > li.menu-item-has-children').find('.sub-menu').first().addClass('subMenuActive');
		$('#menu-mobile-menu').animate({left: -275}, 800);
	});
	$('.backMainMenu').click(function () {
		$('#menu-mobile-menu').animate({left: 0}, 800, function(){
			$('.sub-menu').removeClass('subMenuActive');
		});
	});
	
	/******************************************/
	/************ PRODUCT DETAIL ************/
	/******************************************/
	$('.moreLessBar').click(function () {
		$(this).parent('.categoryDrawer').find('.moreLessContent').slideToggle();
		$(this).parent('.categoryDrawer').find('.moreLessContent').toggleClass('open');
		$('.categoryDrawer').each(function(){
			if ($(this).children('.moreLessContent').hasClass('open')) {
			  	$(this).children('.moreLessBar').addClass('open');
			} else {
				$(this).children('.moreLessBar').removeClass('open');
			}
		});
	});
	
	
	$('.categoryDrawer').each(function(){
		if ($(this).children('.moreLessContent').hasClass('open')) {
		  $(this).children('.moreLessBar').addClass('open');
		 
		}
	});
	
	$('.typeDrawer h3').click(function () {
		$(this).parent('.typeDrawer').find('.categoryDrawers').slideToggle(function(){
			$(this).parent('.typeDrawer').toggleClass('openTypeDrawer');
		});
		
	});
	
	/******************************************/
	/************ RIGHT HEADER RESIZE ************/
	/******************************************/
	$(window).on("resize", function () {
		var containerWidth = $('.container').width();
		var windowWidth = $(window).width();
		var sidebarWidth = (windowWidth - containerWidth)/2;
		var rightHeaderWidthInterior = windowWidth - (142 + sidebarWidth) + "px";
		$('.header .rightHeader').css('width', rightHeaderWidthInterior);
		var rightHeaderWidth = windowWidth - (258 + sidebarWidth) + "px";
		$('.home .header .rightHeader').css('width', rightHeaderWidth);
		if ($(window).width() > 1000) {
			$('.login.mobile').fadeOut(500);
			$('.mainContent').css('opacity','1');
		}
	}).resize();
	
	/******************************************/
	/************ APP LINKS ************/
	/******************************************/
	$('.personalDownload').click(function () {
		if (iOS) {
			window.location.href = "https://itunes.apple.com/us/app/patriot-national-bank-mobile/id517385385?mt=8";
		}
		if(isAndroid) {
			window.location.href = "https://play.google.com/store/apps/details?id=com.ifs.banking.fiid7254";
		}
	});
	$('.businessDownload').click(function () {
		if (iOS) {
			window.location.href = "https://itunes.apple.com/us/app/patriot-national-bank-business/id912555177?mt=8";
		}
		if(isAndroid) {
			window.location.href = "https://play.google.com/store/apps/details?id=com.malauzai.BTBB7254";
		}
	});
	
	/******************************************/
	/************ rECAPTCHA ISSUE IN IE 11************/
	/******************************************/
	if (window.location.href.indexOf("contact") > -1) {
	    grecaptcha.reset();
	}
	
}); //END DOCUMENT.READY

