(function ($) {
  'use strict';

  var root = $('base').attr('href');

  $.fn.footerReveal = function (options) {
    $('#footer.sticky-footer').before('<div class="footer-shadow"></div>');
    var $this = $(this), $prev = $this.prev(), $win = $(window), defaults = $.extend({
      shadow: true,
      shadowOpacity: 0.12,
      zIndex: -10
    }, options), settings = $.extend(true, {}, defaults, options);
    $this.before('<div class="footer-reveal-offset"></div>');
    if ($this.outerHeight() <= $win.outerHeight()) {
      $this.css({'z-index': defaults.zIndex, position: 'fixed', bottom: 0});
      $win.on('load resize', function () {
        $this.css({'width': $prev.outerWidth()});
        $prev.css({'margin-bottom': $this.outerHeight()});
      });
    }
    return this;
  };

  $('#footer.sticky-footer').footerReveal();

  $(document).ready(function () {
    var jPanelMenu = $.jPanelMenu({
      menu: '#responsive',
      animated: true,
      duration: 200,
      keyboardShortcuts: false,
      closeOnContentClick: true,
      backgroundColor: '#363636',
      afterOn: function() {
        $('#jPanelMenu-menu').prepend(
          $('<li/>').addClass('logo').append(
            $('#logo > a').first().clone(true)
          )
        );
        $('#jPanelMenu-menu').css('overflow-y', 'hidden').simplebar();
      },
      afterClose: function() {
        jPanelMenu.off();
        $('.menu-trigger').removeClass('active');
      }
    });

    $('.menu-trigger').on('click', function () {
      var jpm = $(this);
      if (jpm.hasClass('active')) {
        jPanelMenu.off();
        jpm.removeClass('active');
      } else {
        jPanelMenu.on();
        jPanelMenu.open();
        jpm.addClass('active');
        $('#jPanelMenu-menu').removeClass('menu');
        $('ul#jPanelMenu-menu li').removeClass('dropdown');
        $('ul#jPanelMenu-menu li ul').removeAttr('style');
        $('ul#jPanelMenu-menu li div').removeClass('mega').removeAttr('style');
        $('ul#jPanelMenu-menu li div div').removeClass('mega-container');
      }
      return false;
    });

    $(window).resize(function () {
      var winWidth = $(window).width();
      if (winWidth > 992) {
        jPanelMenu.close();
      }
    });

    $('#header').not('#header-container.header-style-2 #header').clone(true).addClass('cloned unsticky').insertAfter('#header');
    $('#navigation.style-2').clone(true).addClass('cloned unsticky').insertAfter('#navigation.style-2');
    $('#logo .sticky-logo').clone(true).prependTo('#navigation.style-2.cloned ul#responsive');

    var headerOffset = $('#header-container').height() * 2;

    $(window).scroll(function () {
      if ($(window).scrollTop() >= headerOffset) {
        $("#header.cloned").addClass('sticky').removeClass('unsticky');
        $("#navigation.style-2.cloned").addClass('sticky').removeClass('unsticky');
      } else {
        $("#header.cloned").addClass('unsticky').removeClass('sticky');
        $("#navigation.style-2.cloned").addClass('unsticky').removeClass('sticky');
      }
    });

    $('.top-bar-dropdown').on('click', function (e) {
      $('.top-bar-dropdown').not(this).removeClass('active');
      if ($(e.target).parent().parent().attr('class') == 'options') {
        hideDD();
      } else {
        if ($(this).hasClass('active') && $(e.target).is('span')) {
          hideDD();
        } else {
          $(this).toggleClass('active');
        }
      }
      e.stopPropagation();
    });

    $(document).on('click', function (e) {
      hideDD();
    });

    function hideDD() {
      $('.top-bar-dropdown').removeClass('active');
    }

    $('.adv-search-btn').on('click', function (e) {
      e.preventDefault();

      if ($(this).is('.active')) {
        $(this).removeClass('active');
        $('.main-search-container').removeClass('active');
        window.setTimeout(function () {
          $('#map-container.homepage-map').removeClass('overflow');
        }, 0);
      } else {
        $(this).addClass('active');
        $('.main-search-container').addClass('active');
        window.setTimeout(function () {
          $('#map-container.homepage-map').addClass('overflow');
        }, 400);
      }
    });

    function inlineCSS() {
      $('section.fullwidth, .img-box-background, .flip-banner, .property-slider .item, .fullwidth-property-slider .item, .fullwidth-home-slider .item, .address-container').each(function () {
        var attrImageBG = $(this).attr('data-background-image');
        var attrColorBG = $(this).attr('data-background-color');
        if (attrImageBG) {
          $(this).css('background-image', 'url(' + attrImageBG + ')');
        }

        if (attrColorBG) {
          $(this).css('background', '' + attrColorBG + '');
        }
      });
    }

    inlineCSS();

    function parallaxBG() {
      $('.parallax').prepend('<div class="parallax-overlay"></div>');
      $('.parallax').each(function () {
        var attrImage = $(this).attr('data-background');
        var attrColor = $(this).attr('data-color');
        var attrOpacity = $(this).attr('data-color-opacity');

        if (attrImage) {
          $(this).css('background-image', 'url(' + attrImage + ')');
        }

        if (attrColor) {
          $(this).find('.parallax-overlay').css('background-color', '' + attrColor + '');
        }

        if (attrOpacity) {
          $(this).find('.parallax-overlay').css('opacity', '' + attrOpacity + '');
        }
      });
    }

    parallaxBG();
    
    $('#titlebar .listing-address').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({scrollTop: $($.attr(this, 'href')).offset().top - 40}, 600);
    });
    $('.tooltip.top').tipTip({defaultPosition: 'top'});
    $('.tooltip.bottom').tipTip({defaultPosition: 'bottom'});
    $('.tooltip.left').tipTip({defaultPosition: 'left'});
    $('.tooltip.right').tipTip({defaultPosition: 'right'});
    
    if ('ontouchstart' in window) {
      document.documentElement.className = document.documentElement.className + ' touch';
    }
    
    if (!$('html').hasClass('touch')) {
      $('.parallax').css('background-attachment', 'fixed');
    }
    
    function fullscreenFix() {
      var h = $('body').height();
      $('.content-b').each(function (i) {
        if ($(this).innerHeight() > h) {
          $(this).closest('.fullscreen').addClass('overflow');
        }
      });
    }

    $(window).resize(fullscreenFix);
    
    fullscreenFix();
    
    function backgroundResize() {
      var windowH = $(window).height();
      $('.parallax').each(function (i) {
        var path = $(this);
        var contW = path.width();
        var contH = path.height();
        var imgW = path.attr('data-img-width');
        var imgH = path.attr('data-img-height');
        var ratio = imgW / imgH;
        var diff = 100;
        diff = diff ? diff : 0;
        var remainingH = 0;
        if (path.hasClass('parallax') && !$('html').hasClass('touch')) {
          remainingH = windowH - contH;
        }
        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;
        if (contW > imgW) {
          imgW = contW;
          imgH = imgW / ratio;
        }
        path.data('resized-imgW', imgW);
        path.data('resized-imgH', imgH);
        path.css('background-size', imgW + 'px ' + imgH + 'px');
      });
    }

    $(window).resize(backgroundResize);
    $(window).focus(backgroundResize);
    
    backgroundResize();
    
    function parallaxPosition(e) {
      var heightWindow = $(window).height();
      var topWindow = $(window).scrollTop();
      var bottomWindow = topWindow + heightWindow;
      var currentWindow = (topWindow + bottomWindow) / 2;
      $('.parallax').each(function (i) {
        var path = $(this);
        var height = path.height();
        var top = path.offset().top;
        var bottom = top + height;
        if (bottomWindow > top && topWindow < bottom) {
          var imgH = path.data('resized-imgH');
          var min = 0;
          var max = -imgH + heightWindow;
          var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow;
          top = top - overflowH;
          bottom = bottom + overflowH;
          var value = 0;
          if ($('.parallax').is('.titlebar')) {
            value = min + (max - min) * (currentWindow - top) / (bottom - top) * 2;
          } else {
            value = min + (max - min) * (currentWindow - top) / (bottom - top);
          }
          var orizontalPosition = path.attr('data-oriz-pos');
          orizontalPosition = orizontalPosition ? orizontalPosition : '50%';
          $(this).css('background-position', orizontalPosition + " " + value + 'px');
        }
      });
    }

    if (!$('html').hasClass('touch')) {
      $(window).resize(parallaxPosition);
      $(window).scroll(parallaxPosition);
      parallaxPosition();
    }
    
    if (navigator.userAgent.match(/Trident\/7\./)) {
      $('body').on('mousewheel', function () {
        event.preventDefault();
        var wheelDelta = event.wheelDelta;
        var currentScrollPosition = window.pageYOffset;
        window.scrollTo(0, currentScrollPosition - wheelDelta);
      });
    }
    function searchTypeButtons() {
      $('.search-type label.active input[type="radio"]').prop('checked', true);
      var buttonWidth = $('.search-type label.active').width();
      var arrowDist = $('.search-type label.active').position().left;
      $('.search-type-arrow').css('left', arrowDist + (buttonWidth / 2));
      $('.search-type label').on('change', function () {
        $('.search-type input[type="radio"]').parent('label').removeClass('active');
        $('.search-type input[type="radio"]:checked').parent('label').addClass('active');
        var buttonWidth = $('.search-type label.active').width();
        var arrowDist = $('.search-type label.active').position().left;
        $('.search-type-arrow').css({
          'left': arrowDist + (buttonWidth / 2),
          'transition': 'left 0.4s cubic-bezier(.87,-.41,.19,1.44)'
        });
      });
    }

    if ($('.main-search-form').length) {
      searchTypeButtons();
    }
    var config = {
      '.chosen-select': {disable_search_threshold: 10, width: '100%'},
      '.chosen-select-deselect': {allow_single_deselect: true, width: '100%'},
      '.chosen-select-no-single': {disable_search_threshold: 100, width: '100%'},
      '.chosen-select-no-single.no-search': {disable_search_threshold: 10, width: '100%'},
      '.chosen-select-no-results': {no_results_text: 'Oops, nothing found!'},
      '.chosen-select-width': {width: "95%"}
    };
    for (var selector in config) {
      if (config.hasOwnProperty(selector)) {
        $(selector).chosen(config[selector]);
      }
    }
    $('.select-input').each(function () {
      var thisContainer = $(this);
      var $this = $(this).children('select'), numberOfOptions = $this.children('option').length;
      $this.addClass('select-hidden');
      $this.wrap('<div class="select"></div>');
      $this.after('<div class="select-styled"></div>');
      var $styledSelect = $this.next('div.select-styled');
      $styledSelect.text($this.children('option').eq(0).text());
      var $list = $('<ul />', {'class': 'select-options'}).insertAfter($styledSelect);
      for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
          text: $this.children('option').eq(i).text(),
          rel: $this.children('option').eq(i).val()
        }).appendTo($list);
      }
      var $listItems = $list.children('li');
      $list.wrapInner('<div class="select-list-container"></div>');
      $(this).children('input').on('click', function (e) {
        $('.select-options').hide();
        e.stopPropagation();
        $styledSelect.toggleClass('active').next('ul.select-options').toggle();
      });
      $(this).children('input').keypress(function () {
        $styledSelect.removeClass('active');
        $list.hide();
      });
      $listItems.on('click', function (e) {
        e.stopPropagation();
        $(thisContainer).children('input').val($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
      });
      $(document).on('click', function (e) {
        $styledSelect.removeClass('active');
        $list.hide();
      });
      var fieldUnit = $(this).children('input').attr('data-unit');
      $(this).children('input').before('<i class="data-unit">' + fieldUnit + '</i>');
    });
    
    $('.more-search-options-trigger').on('click', function (e) {
      e.preventDefault();
      $('.more-search-options, .more-search-options-trigger').toggleClass('active');
      $('.more-search-options.relative').animate({height: 'toggle', opacity: 'toggle'}, 300);
    });
    
    $('.like-icon, .widget-button').on('click', function (e) {
      e.preventDefault();
      $(this).toggleClass('liked');
      $(this).children('.like-icon').toggleClass('liked');
    });
    
    $('.show-more-button').on('click', function (e) {
      e.preventDefault();
      $('.show-more').toggleClass('visible');
    });
    
    var pxShow = 600;
    var fadeInTime = 300;
    var fadeOutTime = 300;
    var scrollSpeed = 500;
    
    $(window).scroll(function () {
      if ($(window).scrollTop() >= pxShow) {
        $('#backtotop').fadeIn(fadeInTime);
      } else {
        $('#backtotop').fadeOut(fadeOutTime);
      }
    });
    
    $('#backtotop a').on('click', function () {
      $('html, body').animate({scrollTop: 0}, scrollSpeed);
      return false;
    });
    
    $('.carousel').owlCarousel({
      autoPlay: false,
      navigation: true,
      slideSpeed: 600,
      items: 3,
      itemsDesktop: [1239, 3],
      itemsTablet: [991, 2],
      itemsMobile: [767, 1]
    });
    
    $('.logo-carousel').owlCarousel({
      autoPlay: false,
      navigation: true,
      slideSpeed: 600,
      items: 5,
      itemsDesktop: [1239, 4],
      itemsTablet: [991, 3],
      itemsMobile: [767, 1]
    });
    
    $('.listing-carousel').owlCarousel({
      autoPlay: false,
      navigation: true,
      slideSpeed: 800,
      items: 1,
      itemsDesktop: [1239, 1],
      itemsTablet: [991, 1],
      itemsMobile: [767, 1]
    });
    
    $('.owl-next, .owl-prev').on('click', function (e) {
      e.preventDefault();
    });
    
    $('.property-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      asNavFor: '.property-slider-nav',
      centerMode: true,
      slide: '.item'
    });
    
    $('.property-slider-nav').slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      asNavFor: '.property-slider',
      dots: false,
      arrows: false,
      centerMode: false,
      focusOnSelect: true,
      responsive: [{breakpoint: 993, settings: {slidesToShow: 4}}, {breakpoint: 767, settings: {slidesToShow: 3}}]
    });
    
    $('.fullwidth-property-slider').slick({
      centerMode: true,
      centerPadding: '20%',
      slidesToShow: 1,
      responsive: [{breakpoint: 1367, settings: {centerPadding: '15%'}}, {
        breakpoint: 993,
        settings: {centerPadding: '0'}
      }]
    });
    
    $('.fullwidth-home-slider').slick({
      centerMode: true,
      centerPadding: '0',
      slidesToShow: 1,
      responsive: [{breakpoint: 1367, settings: {centerPadding: '0'}}, {
        breakpoint: 993,
        settings: {centerPadding: '0'}
      }]
    });
    
    $('body').magnificPopup({
      type: 'image',
      delegate: 'a.mfp-gallery',
      fixedContentPos: true,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: false,
      preloader: true,
      removalDelay: 0,
      mainClass: 'mfp-fade',
      gallery: {enabled: true}
    });
    
    $('.popup-with-zoom-anim').magnificPopup({
      type: 'inline',
      fixedContentPos: false,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      mainClass: 'my-mfp-zoom-in'
    });
    
    $('.mfp-image').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      mainClass: 'mfp-fade',
      image: {verticalFit: true}
    });
    
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
    
    if (navigator.userAgent.match(/Trident\/7\./)) {
      $('#footer').removeClass('sticky-footer');
    }

    $('.img-box').each(function () {
      $(this).append('<div class="img-box-background"></div>');
      $(this).children('.img-box-background').css({'background-image': 'url(' + $(this).attr('data-background-image') + ')'});
    });
    
    function gridLayoutSwitcher() {
      var listingsContainer = $('.listings-container');
      
      if ($(listingsContainer).is(".list-layout")) {
        owlReload();
        $('.layout-switcher a.grid, .layout-switcher a.grid-three').removeClass("active");
        $('.layout-switcher a.list').addClass("active");
      }
      
      if ($(listingsContainer).is(".grid-layout")) {
        owlReload();
        $('.layout-switcher a.grid').addClass("active");
        $('.layout-switcher a.grid-three, .layout-switcher a.list').removeClass("active");
        gridClear(2);
      }
      
      if ($(listingsContainer).is(".grid-layout-three")) {
        owlReload();
        $('.layout-switcher a.grid, .layout-switcher a.list').removeClass("active");
        $('.layout-switcher a.grid-three').addClass("active");
        gridClear(3);
      }
      
      function gridClear(gridColumns) {
        $(listingsContainer).find(".clearfix").remove();
        $('.listings-container > .listing-item:nth-child(' + gridColumns + 'n)').after('<div class="clearfix"></div>');
      }

      var resizeObjects = $('.listings-container .listing-img-container img, .listings-container .listing-img-container');

      function listLayout() {
        if ($('.layout-switcher a').is('.list.active')) {
          $(listingsContainer).each(function () {
            $(this).removeClass('grid-layout grid-layout-three');
            $(this).addClass('list-layout');
          });
          $('.listing-item').each(function () {
            var listingContent = $(this).find('.listing-content').height();
            $(this).find(resizeObjects).css('height', '' + listingContent + '');
          });
        }
      }

      listLayout();
      
      $('.layout-switcher a.grid').on('click', function (e) {
        gridClear(2);
      });
      
      function gridLayout() {
        if ($('.layout-switcher a').is('.grid.active')) {
          $(listingsContainer).each(function () {
            $(this).removeClass('list-layout grid-layout-three');
            $(this).addClass('grid-layout');
          });
          $('.listing-item').each(function () {
            $(this).find(resizeObjects).css('height', 'auto');
          });
        }
      }

      gridLayout();
      $('.layout-switcher a.grid-three').on('click', function (e) {
        gridClear(3);
      });
      
      function gridThreeLayout() {
        if ($('.layout-switcher a').is('.grid-three.active')) {
          $(listingsContainer).each(function () {
            $(this).removeClass('list-layout grid-layout');
            $(this).addClass('grid-layout-three');
          });
          $('.listing-item').each(function () {
            $(this).find(resizeObjects).css('height', 'auto');
          });
        }
      }

      gridThreeLayout();
      
      $(window).on('resize', function () {
        $(resizeObjects).css('height', '0');
        listLayout();
        gridLayout();
        gridThreeLayout();
      });
      
      $(window).on('load resize', function () {
        var winWidth = $(window).width();
        if (winWidth < 992) {
          owlReload();
          gridClear(2);
        }
        if (winWidth > 992) {
          if ($(listingsContainer).is('.grid-layout-three')) {
            gridClear(3);
          }
          if ($(listingsContainer).is('.grid-layout')) {
            gridClear(2);
          }
        }
        if (winWidth < 768) {
          if ($(listingsContainer).is('.list-layout')) {
            $('.listing-item').each(function () {
              $(this).find(resizeObjects).css('height', 'auto');
            });
          }
        }
        if (winWidth < 1366) {
          if ($('.fs-listings').is('.list-layout')) {
            $('.listing-item').each(function () {
              $(this).find(resizeObjects).css('height', 'auto');
            });
          }
        }
      });

      function owlReload() {
        $('.listing-carousel').each(function () {
          $(this).data('owlCarousel').reload();
        });
      }

      $('.layout-switcher a').on('click', function (e) {
        e.preventDefault();
        var switcherButton = $(this);
        switcherButton.addClass('active').siblings().removeClass('active');
        $(resizeObjects).css('height', '0');
        owlReload();
        gridLayout();
        gridThreeLayout();
        listLayout();
      });
    }

    gridLayoutSwitcher();

    $('#area-range').each(function () {
      var dataMin = $(this).attr('data-min');
      var dataMax = $(this).attr('data-max');
      var dataUnit = $(this).attr('data-unit');
      $(this).append('<input type="text" class="first-slider-value" disabled><input type="text" class="second-slider-value" disabled>');
      $(this).slider({
        range: true,
        min: dataMin,
        max: dataMax,
        step: 10,
        values: [dataMin, dataMax],
        slide: function (event, ui) {
          event = event;
          $(this).children(".first-slider-value").val(ui.values[0] + " " + dataUnit);
          $(this).children(".second-slider-value").val(ui.values[1] + " " + dataUnit);
        }
      });
      $(this).children(".first-slider-value").val($(this).slider("values", 0) + " " + dataUnit);
      $(this).children(".second-slider-value").val($(this).slider("values", 1) + " " + dataUnit);
    });

    $("#price-range").each(function () {
      var dataMin = $(this).attr('data-min');
      var dataMax = $(this).attr('data-max');
      var dataUnit = $(this).attr('data-unit');
      $(this).append("<input type='text' class='first-slider-value' disabled/><input type='text' class='second-slider-value' disabled/>");
      $(this).slider({
        range: true, min: dataMin, max: dataMax, values: [dataMin, dataMax], slide: function (event, ui) {
          event = event;
          $(this).children(".first-slider-value").val(dataUnit + ui.values[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
          $(this).children(".second-slider-value").val(dataUnit + ui.values[1].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
        }
      });
      $(this).children(".first-slider-value").val(dataUnit + $(this).slider("values", 0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
      $(this).children(".second-slider-value").val(dataUnit + $(this).slider("values", 1).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    });

    $(window).on('load resize', function () {
      $('.agents-grid-container').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        percentPosition: true
      });
      var agentAvatarHeight = $(".agent-avatar img").height();
      var agentContentHeight = $(".agent-content").innerHeight();
      if (agentAvatarHeight < agentContentHeight) {
        $('.agent-page').addClass('long-content');
      } else {
        $('.agent-page').removeClass('long-content');
      }
    });

    $('.tip').each(function () {
      var tipContent = $(this).attr('data-tip-content');
      $(this).append('<div class="tip-content">' + tipContent + '</div>');
    });

    var $tabsNav = $('.tabs-nav'), $tabsNavLis = $tabsNav.children('li');
    $tabsNav.each(function () {
      var $this = $(this);
      $this.next().children('.tab-content').stop(true, true).hide().first().show();
      $this.children('li').first().addClass('active').stop(true, true).show();
    });
    $tabsNavLis.on('click', function (e) {
      var $this = $(this);
      $this.siblings().removeClass('active').end().addClass('active');
      $this.parent().next().children('.tab-content').stop(true, true).hide().siblings($this.find('a').attr('href')).fadeIn();
      e.preventDefault();
    });

    var hash = window.location.hash;
    var anchor = $('.tabs-nav a[href="' + hash + '"]');
    if (anchor.length === 0) {
      $('.tabs-nav li:first').addClass('active').show();
      $('.tab-content:first').show();
    } else {
      anchor.parent('li').click();
    }

    var $accor = $('.accordion');
    $accor.each(function () {
      $(this).toggleClass('ui-accordion ui-widget ui-helper-reset');
      $(this).find('h3').addClass('ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all');
      $(this).find('div').addClass('ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom');
      $(this).find("div").hide();
    });

    var $trigger = $accor.find('h3');
    $trigger.on('click', function (e) {
      var location = $(this).parent();
      if ($(this).next().is(':hidden')) {
        var $triggerloc = $('h3', location);
        $triggerloc.removeClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideUp(300);
        $triggerloc.find('span').removeClass('ui-accordion-icon-active');
        $(this).find('span').addClass('ui-accordion-icon-active');
        $(this).addClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideDown(300);
      }
      e.preventDefault();
    });

    $('.toggle-container').hide();
    $('.trigger, .trigger.opened').on('click', function (a) {
      $(this).toggleClass('active');
      a.preventDefault();
    });
    $('.trigger').on('click', function () {
      $(this).next('.toggle-container').slideToggle(300);
    });
    $('.trigger.opened').addClass('active').next('.toggle-container').show();
    $('a.close').removeAttr('href').on('click', function () {
      $(this).parent().fadeOut(200);
    });

    $('#result').hide();
    $('input[type=text], input[type=email], textarea', '#contact').on('change invalid', function() {
      var field = $(this).get(0);

      field.setCustomValidity('');

      if (!field.validity.valid) {
        field.setCustomValidity($(this).attr('title'));
      }
    });
    $('#name, #message, #subject').focusout(function () {
      if (!$(this).val())
        $(this).addClass('error').parent().find('mark').removeClass('valid').addClass('error'); else
        $(this).removeClass('error').parent().find('mark').removeClass('error').addClass('valid');
    });

    $('#email').focusout(function () {
      if (!$(this).val() || !isEmail($(this).val()))
        $(this).addClass('error').parent().find('mark').removeClass('valid').addClass('error'); else
        $(this).removeClass('error').parent().find('mark').removeClass('error').addClass('valid');
    });

    $('#contact-form').submit(function (e) {
      e.preventDefault();

      $('#result').slideUp(200, function () {
        $('#result').hide();
        $('#name, #email, #subject, #message').triggerHandler('focusout');

        if ($('#contact mark.error').length) {
          $('#contact').effect('shake', {times: 2}, 75, function () {
            $('#contact input.error:first, #contact textarea.error:first').focus();
          });
          return false;
        }
      });

      if ($('#contact mark.error').length) {
        $('#contact').effect('shake', {times: 2}, 75);
        return false;
      }

      $('#contact #submit').after('<img src="' + root + '/img/loader.gif" class="loader">');
      $('#submit').prop('disabled', true).addClass('disabled');

      $.post($(this).attr('action'), $('#contact-form').serialize(), function (result) {
        $('#result').html(result.text);
        $('#result').slideDown();
        $('#contact-form img.loader').fadeOut('slow', function () {
          $(this).remove();
        });
        if (result.success) $('#contact-form').slideUp('slow');
      });
      return false;
    });

    function isEmail(emailAddress) {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      return pattern.test(emailAddress);
    }

    function isNumeric(input) {
      return (input - 0) == input && input.length > 0;
    }
  });
})(this.jQuery);