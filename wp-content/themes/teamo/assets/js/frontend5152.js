jQuery(document).ready(function ($) {
    "use strict";
    var $body = $('body'),
        has_rtl = $body.hasClass('rtl');

    function teamo_megamenu() {
        var $elements = $('.submenu.megamenu');
        $.each($elements, function () {
            var $el = $(this),
                $width = $(this).attr('data-width')+ 'px';
            $el.css('width', $width);
        });
    }
    function teamo_sticky_detail() {
        $('.contain-left.sticky_detail .entry-summary').theiaStickySidebar({
            additionalMarginTop: 50
        });
    }
    $(document).on('click', '.teamo-account-tabs .teamo-account-title', function (e) {
        var dataActive = $(this).data('active');
        $('.teamo-account-tabs').attr('data-active', dataActive);
        e.preventDefault();
    });
    /* NOTIFICATIONS */
    function teamo_setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    function teamo_getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    $(document).on('click', '.remove_from_cart_button', function () {
        var cart_item_key = $(this).data('cart_item_key');
        teamo_setCookie("cart_item_key_just_removed", cart_item_key, 1);
        teamo_setCookie("undo_cart_link", teamo_ajax_frontend.wp_nonce_url + '&undo_item=' + cart_item_key, 1);
    });

    $body.on('click', 'a.add_to_cart_button', function () {
        $('a.add_to_cart_button').removeClass('recent-added');
        $(this).addClass('recent-added');

        if ($(this).is('.product_type_variable, .isw-ready')) {
            $(this).addClass('loading');
        }

    });

    // On single product page
    $body.on('click', 'button.single_add_to_cart_button', function () {
        $('button.single_add_to_cart_button').removeClass('recent-added');
        $(this).addClass('recent-added');
    });

    $body.on('click', '.add_to_wishlist', function () {
        $(this).addClass('loading');
    });

    function teamo_fix_vc_full_width_row() {
        if ($('body.rtl').length) {
            var $elements = $('[data-vc-full-width="true"]');
            $.each($elements, function () {
                var $el = $(this);
                $el.css('right', $el.css('left')).css('left', '');
            });
        }
    }

    function teamo_force_vc_full_width_row_rtl() {
        var _elements = $('[data-vc-full-width="true"]');
        $.each(_elements, function (key, item) {
            var $this = $(this);
            if ($this.parent('[data-vc-full-width="true"]').length > 0) {
                return;
            } else {
                var this_left = $this.css('left'),
                    this_child = $this.find('[data-vc-full-width="true"]');

                if (this_child.length > 0) {
                    $this.css({
                        'left': '',
                        'right': this_left
                    });
                    this_child.css({
                        'left': 'auto',
                        'padding-left': this_left.replace('-', ''),
                        'padding-right': this_left.replace('-', ''),
                        'right': this_left
                    });
                } else {
                    $this.css({
                        'left': 'auto',
                        'right': this_left
                    });
                }
            }
        }), $(document).trigger('teamo-force-vc-full-width-row-rtl', _elements);
    };

    function teamo_fix_full_width_row_rtl() {
        if (has_rtl) {
            $('.chosen-container').each(function () {
                $(this).addClass('chosen-rtl');
            });
            $(document).on('vc-full-width-row', function () {
                teamo_force_vc_full_width_row_rtl();
            });
        }
    };

    function teamo_header_sticky($elem) {
        var $this = $elem;
        $this.on('teamo_header_sticky', function () {
            $this.each(function () {
                var previousScroll = 0,
                    header = $(this).closest('.header'),
                    header_wrap_stick = $(this),
                    header_position = $(this).find('.header-position'),
                    headerOrgOffset = header_position.offset().top;
                header_wrap_stick.css('height', header_wrap_stick.outerHeight());
                $(document).on('scroll', function (ev) {
                    var currentScroll = $(this).scrollTop();
                    if (currentScroll > headerOrgOffset) {
                        header_position.addClass('fixed');
                    } else {
                        header_position.removeClass('fixed');
                    }
                    previousScroll = currentScroll;
                });

            })
        }).trigger('teamo_header_sticky');
        $(window).on('resize', function () {
            $this.trigger('teamo_header_sticky');
        });
    }

    function teamo_vertical_menu($elem) {
        /* SHOW ALL ITEM */
        var _countLi = 0,
            _verticalMenu = $elem.find('.vertical-menu'),
            _blockNav = $elem.closest('.block-nav-category'),
            _blockTitle = $elem.find('.block-title');

        $elem.each(function () {
            var _dataItem = $(this).data('items') - 1;
            _countLi = $(this).find('.vertical-menu>li').length;

            if (_countLi > (_dataItem + 1)) {
                $(this).addClass('show-button-all');
            }
            $(this).find('.vertical-menu>li').each(function (i) {
                _countLi = _countLi + 1;
                if (i > _dataItem) {
                    $(this).addClass('link-other');
                }
            })
        });

        $elem.find('.vertical-menu').each(function () {
            var _main = $(this);
            _main.children('.menu-item.parent').each(function () {
                var curent = $(this).find('.submenu');
                $(this).children('.toggle-submenu').on('click', function () {
                    $(this).parent().children('.submenu').stop().slideToggle(300);
                    _main.find('.submenu').not(curent).stop().slideUp(300);
                    $(this).parent().toggleClass('show-submenu');
                    _main.find('.menu-item.parent').not($(this).parent()).removeClass('show-submenu');
                });
                var next_curent = $(this).find('.submenu');
                next_curent.children('.menu-item.parent').each(function () {
                    var child_curent = $(this).find('.submenu');
                    $(this).children('.toggle-submenu').on('click', function () {
                        $(this).parent().parent().find('.submenu').not(child_curent).stop().slideUp(300);
                        $(this).parent().children('.submenu').stop().slideToggle(300);
                        $(this).parent().parent().find('.menu-item.parent').not($(this).parent()).removeClass('show-submenu');
                        $(this).parent().toggleClass('show-submenu');
                    })
                });
            });
        });

        /* VERTICAL MENU ITEM */
        if (_verticalMenu.length > 0) {
            $(document).on('click', '.open-cate', function (e) {
                _blockNav.find('li.link-other').each(function () {
                    $(this).slideDown();
                });
                $(this).addClass('close-cate').removeClass('open-cate').html($(this).data('closetext'));
                e.preventDefault();
            });
            $(document).on('click', '.close-cate', function (e) {
                _blockNav.find('li.link-other').each(function () {
                    $(this).slideUp();
                });
                $(this).addClass('open-cate').removeClass('close-cate').html($(this).data('alltext'));
                e.preventDefault();
            });

            _blockTitle.on('click', function () {
                $(this).toggleClass('active');
                $(this).parent().toggleClass('has-open');
                $body.toggleClass('category-open');
            });
        }
    }

    function teamo_auto_width_vertical_menu() {
        var full_width = parseInt($('.container').outerWidth()) - 50;
        var menu_width = parseInt($('.vertical-menu').outerWidth());
        var w = (full_width - menu_width);
        $('.vertical-menu').find('.megamenu').each(function () {
            $(this).css('max-width', w + 'px');
        });
    };

    function teamo_animation_tabs($elem, _tab_animated) {
        _tab_animated = (_tab_animated == undefined || _tab_animated == "") ? '' : _tab_animated;
        if (_tab_animated == "") {
            return;
        }
        $elem.find('.owl-slick .slick-active, .product-list-grid .product-item').each(function (i) {
            var _this = $(this),
                _style = _this.attr('style'),
                _delay = i * 200;

            _style = (_style == undefined) ? '' : _style;
            _this.attr('style', _style +
                ';-webkit-animation-delay:' + _delay + 'ms;'
                + '-moz-animation-delay:' + _delay + 'ms;'
                + '-o-animation-delay:' + _delay + 'ms;'
                + 'animation-delay:' + _delay + 'ms;'
            ).addClass(_tab_animated + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                _this.removeClass(_tab_animated + ' animated');
                _this.attr('style', _style);
            });
        });
    }

    function teamo_init_carousel($elem) {
        $elem.not('.slick-initialized').each(function () {
            var _this = $(this),
                _responsive = _this.data('responsive'),
                _config = [];

            if (has_rtl) {
                _config.rtl = true;
            }
            if (_this.hasClass('slick-vertical')) {
                _config.prevArrow = '<span class="fa fa-angle-up prev"></span>';
                _config.nextArrow = '<span class="fa fa-angle-down next"></span>';
            } else {
                _config.prevArrow = '<span class="fa fa-angle-left prev"></span>';
                _config.nextArrow = '<span class="fa fa-angle-right next"></span>';
            }
            _config.responsive = _responsive;

            _this.slick(_config);
            _this.on('afterChange', function (event, slick, direction) {
                teamo_init_lazy_load(_this.find('.lazy'));
            });
        });
    }

    function teamo_product_thumb($elem) {
        $elem.on('teamo_product_thumb', function () {
            $elem.not('.slick-initialized').each(function () {
                var _this = $(this),
                    _responsive = JSON.parse(teamo_global_frontend.data_responsive),
                    _config = JSON.parse(teamo_global_frontend.data_slick);
                if ($('.vertical_thumbnail').length > 0) {
                    _config.vertical = true;
                }
                if (has_rtl) {
                    _config.rtl = true;
                }
                _config.infinite = false;
                _config.prevArrow = '<span class="fa fa-angle-left prev"></span>';
                _config.nextArrow = '<span class="fa fa-angle-right next"></span>';
                _config.responsive = _responsive;

                _this.slick(_config);
            });
        }).trigger('teamo_product_thumb');
    }

    function teamo_countdown($elem) {
        $elem.on('teamo_countdown', function () {
            $elem.each(function () {
                var _this = $(this),
                    _text_countdown = '';

                _this.countdown(_this.data('datetime'), function (event) {
                    _text_countdown = event.strftime(
                        '<span class="days"><span class="number">%D</span><span class="text">' + teamo_global_frontend.countdown_day + '</span></span>' +
                        '<span class="hour"><span class="number">%H</span><span class="text">' + teamo_global_frontend.countdown_hrs + '</span></span>' +
                        '<span class="mins"><span class="number">%M</span><span class="text">' + teamo_global_frontend.countdown_mins + '</span></span>' +
                        '<span class="secs"><span class="number">%S</span><span class="text">' + teamo_global_frontend.countdown_secs + '</span></span>'
                    );
                    _this.html(_text_countdown);
                });
            });
        }).trigger('teamo_countdown');
    }

    function teamo_init_lazy_load($elem) {
        var _this = $elem;
        _this.each(function () {
            var _config = [];

            _config.beforeLoad = function (element) {
                if (element.is('div') == true) {
                    element.addClass('loading-lazy');
                } else {
                    element.parent().addClass('loading-lazy');
                }
            };
            _config.afterLoad = function (element) {
                if (element.is('div') == true) {
                    element.removeClass('loading-lazy');
                } else {
                    element.parent().removeClass('loading-lazy');
                }
            };
            _config.effect = "fadeIn";
            _config.enableThrottle = true;
            _config.throttle = 250;
            _config.effectTime = 600;
            if ($(this).closest('.megamenu').length > 0)
                _config.delay = 0;
            $(this).lazy(_config);
        });
    }

    // teamo_init_dropdown
    $(document).on('click', function (event) {
        var _target = $(event.target).closest('.teamo-dropdown'),
            _parent = $('.teamo-dropdown');

        if (_target.length > 0) {
            _parent.not(_target).removeClass('open');
            if (
                $(event.target).is('[data-teamo="teamo-dropdown"]') ||
                $(event.target).closest('[data-teamo="teamo-dropdown"]').length > 0
            ) {
                _target.toggleClass('open');
                event.preventDefault();
            }
        } else {
            $('.teamo-dropdown').removeClass('open');
        }
    });

    // category product
    function teamo_category_product($elem) {
        $elem.each(function () {
            var _main = $(this);
            _main.find('.cat-parent').each(function () {
                if ($(this).hasClass('current-cat-parent')) {
                    $(this).addClass('show-sub');
                    $(this).children('.children').stop().slideDown(300);
                }
                $(this).children('.children').before('<span class="carets"></span>');
            });
            _main.children('.cat-parent').each(function () {
                var curent = $(this).find('.children');
                $(this).children('.carets').on('click', function () {
                    $(this).parent().toggleClass('show-sub');
                    $(this).parent().children('.children').stop().slideToggle(300);
                    _main.find('.children').not(curent).stop().slideUp(300);
                    _main.find('.cat-parent').not($(this).parent()).removeClass('show-sub');
                });
                var next_curent = $(this).find('.children');
                next_curent.children('.cat-parent').each(function () {
                    var child_curent = $(this).find('.children');
                    $(this).children('.carets').on('click', function () {
                        $(this).parent().toggleClass('show-sub');
                        $(this).parent().parent().find('.cat-parent').not($(this).parent()).removeClass('show-sub');
                        $(this).parent().parent().find('.children').not(child_curent).stop().slideUp(300);
                        $(this).parent().children('.children').stop().slideToggle(300);
                    })
                });
            });
        });
    }

    function teamo_magnific_popup() {
        $('.play-video').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            disableOn: false,
            fixedContentPos: false
        });
        $('.product-video-button a').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            disableOn: false,
            fixedContentPos: false
        });
        $('.product-360-button a').magnificPopup({
            type: 'inline',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            disableOn: false,
            preloader: false,
            fixedContentPos: false,
            callbacks: {
                open: function () {
                }
            }
        });
        $('.contain-left.gallery_thumbnail .woocommerce-product-gallery__image a, .contain-left.sticky_detail .woocommerce-product-gallery__image a').magnificPopup({
            type: 'image',
            mainClass: 'mfp-with-zoom',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out',
                opener: function (openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        })
    }

    function teamo_better_equal_elems($elem) {
        $elem.each(function () {
            if ($(this).find('.equal-elem').length) {
                $(this).find('.equal-elem').css({
                    'height': 'auto'
                });
                var _height = 0;
                $(this).find('.equal-elem').each(function () {
                    if (_height < $(this).height()) {
                        _height = $(this).height();
                    }
                });
                $(this).find('.equal-elem').height(_height);
            }
        });
    }

    // Teamo Ajax Tabs
    $(document).on('click', '.teamo-tabs .tab-link a, .teamo-accordion .panel-heading a', function (e) {
        e.preventDefault();
        var _this = $(this),
            _ID = _this.data('id'),
            _tabID = _this.attr('href'),
            _ajax_tabs = _this.data('ajax'),
            _sectionID = _this.data('section'),
            _tab_animated = _this.data('animate'),
            _loaded = _this.closest('.tab-link,.teamo-accordion').find('a.loaded').attr('href');

        if (_ajax_tabs == 1 && !_this.hasClass('loaded')) {
            $(_tabID).closest('.tab-container,.teamo-accordion').addClass('loading');
            _this.parent().addClass('active').siblings().removeClass('active');
            $.ajax({
                type: 'POST',
                url: teamo_ajax_frontend.ajaxurl,
                data: {
                    action: 'teamo_ajax_tabs',
                    security: teamo_ajax_frontend.security,
                    id: _ID,
                    section_id: _sectionID,
                },
                success: function (response) {
                    if (response['success'] == 'ok') {
                        $(_tabID).html($(response['html']).find('.vc_tta-panel-body').html());
                        $(_tabID).closest('.tab-container,.teamo-accordion').removeClass('loading');
                        $('[href="' + _loaded + '"]').removeClass('loaded');
                        teamo_countdown($(_tabID).find('.teamo-countdown'));
                        teamo_init_carousel($(_tabID).find('.owl-slick'));
                        if ($(_tabID).find('.variations_form').length > 0) {
                            $(_tabID).find('.variations_form').each(function () {
                                $(this).wc_variation_form();
                            });
                        }
                        $(_tabID).trigger('teamo_ajax_tabs_complete');
                        _this.addClass('loaded');
                        $(_loaded).html('');
                    } else {
                        $(_tabID).closest('.tab-container,.teamo-accordion').removeClass('loading');
                        $(_tabID).html('<strong>Error: Can not Load Data ...</strong>');
                    }
                    /* for accordion */
                    _this.closest('.panel-default').addClass('active').siblings().removeClass('active');
                    _this.closest('.teamo-accordion').find(_tabID).slideDown(400);
                    _this.closest('.teamo-accordion').find('.panel-collapse').not(_tabID).slideUp(400);
                },
                complete: function () {
                    $(_tabID).addClass('active').siblings().removeClass('active');
                    setTimeout(function (args) {
                        teamo_animation_tabs($(_tabID), _tab_animated);
                    }, 10);
                }
            });
        } else {
            _this.parent().addClass('active').siblings().removeClass('active');
            $(_tabID).addClass('active').siblings().removeClass('active');
            /* for accordion */
            _this.closest('.panel-default').addClass('active').siblings().removeClass('active');
            _this.closest('.teamo-accordion').find(_tabID).slideDown(400);
            _this.closest('.teamo-accordion').find('.panel-collapse').not(_tabID).slideUp(400);
            teamo_animation_tabs($(_tabID), _tab_animated);
        }
    });

    $(document).on('click', 'a.backtotop', function (e) {
        $('html, body').animate({scrollTop: 0}, 800);
        e.preventDefault();
    });
    $(document).on('scroll', function () {
        if ($(window).scrollTop() > 200) {
            $('.backtotop').addClass('active');
        } else {
            $('.backtotop').removeClass('active');
        }
    });
    /* QUANTITY */
    if (!String.prototype.getDecimals) {
        String.prototype.getDecimals = function () {
            var num = this,
                match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
            if (!match) {
                return 0;
            }
            return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
        };
    }
    $(document).on('click', '.quantity-plus, .quantity-minus', function (e) {
        e.preventDefault();
        // Get values
        var $qty = $(this).closest('.quantity').find('.qty'),
            currentVal = parseFloat($qty.val()),
            max = parseFloat($qty.attr('max')),
            min = parseFloat($qty.attr('min')),
            step = $qty.attr('step');

        if (!$qty.is(':disabled')) {
            // Format values
            if (!currentVal || currentVal === '' || currentVal === 'NaN') currentVal = 0;
            if (max === '' || max === 'NaN') max = '';
            if (min === '' || min === 'NaN') min = 0;
            if (step === 'any' || step === '' || step === undefined || parseFloat(step) === 'NaN') step = '1';

            // Change the value
            if ($(this).is('.quantity-plus')) {
                if (max && (currentVal >= max)) {
                    $qty.val(max);
                } else {
                    $qty.val((currentVal + parseFloat(step)).toFixed(step.getDecimals()));
                }
            } else {
                if (min && (currentVal <= min)) {
                    $qty.val(min);
                } else if (currentVal > 0) {
                    $qty.val((currentVal - parseFloat(step)).toFixed(step.getDecimals()));
                }
            }

            // Trigger change event
            $qty.trigger('change');
        }
    });

    function teamo_product_gallery($elem) {
        $elem.each(function () {
            var _items = $(this).closest('.product-inner').data('items'),
                _main_slide = $(this).find('.product-gallery-slick'),
                _dot_slide = $(this).find('.gallery-dots');

            _main_slide.not('.slick-initialized').each(function () {
                var _this = $(this),
                    _config = [];

                if ($('body').hasClass('rtl')) {
                    _config.rtl = true;
                }
                _config.prevArrow = '<span class="fa fa-angle-left prev"></span>';
                _config.nextArrow = '<span class="fa fa-angle-right next"></span>';
                _config.cssEase = 'linear';
                _config.infinite = false;
                _config.fade = true;
                _config.slidesMargin = 0;
                _config.arrows = false;
                _config.asNavFor = _dot_slide;
                _this.slick(_config);
            });
            _dot_slide.not('.slick-initialized').each(function () {
                var _config = [];
                if ($('body').hasClass('rtl')) {
                    _config.rtl = true;
                }
                _config.slidesToShow = _items;
                _config.infinite = false;
                _config.focusOnSelect = true;
                _config.vertical = true;
                _config.slidesMargin = 10;
                _config.prevArrow = '<span class="fa fa-angle-up prev"></span>';
                _config.nextArrow = '<span class="fa fa-angle-down next"></span>';
                _config.asNavFor = _main_slide;
                _config.responsive = [
                    {
                        breakpoint: 992,
                        settings: {
                            vertical: false,
                            slidesMargin: 10,
                            prevArrow: '<span class="fa fa-angle-left prev"></span>',
                            nextArrow: '<span class="fa fa-angle-right next"></span>',
                        }
                    }
                ];
                $(this).slick(_config);
            })
        })
    }

    function teamo_popup_newsletter() {
        var _popup = document.getElementById('popup-newsletter');
        if (_popup != null) {
            if (teamo_global_frontend.teamo_enable_popup_mobile != 1) {
                if ($(window).innerWidth() <= 992) {
                    return;
                }
            }
            var disabled_popup_by_user = getCookie('teamo_disabled_popup_by_user');
            if (disabled_popup_by_user == 'true') {
                return;
            } else {
                if (teamo_global_frontend.teamo_enable_popup == 1) {
                    setTimeout(function () {
                        $(_popup).modal({
                            keyboard: false
                        });
                        $(_popup).find('.lazy').lazy({
                            delay: 0
                        });
                    }, teamo_global_frontend.teamo_popup_delay_time);
                }
            }
            $(document).on('change', '.teamo_disabled_popup_by_user', function () {
                if ($(this).is(":checked")) {
                    setCookie('teamo_disabled_popup_by_user', 'true', 7);
                } else {
                    setCookie('teamo_disabled_popup_by_user', '', 0);
                }
            });
        }

        function setCookie() {
            var d = new Date();
            d.setTime(d.getTime() + (arguments[2] * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = arguments[0] + "=" + arguments[1] + "; " + arguments[2];
        }

        function getCookie() {
            var name = arguments[0] + "=",
                ca = document.cookie.split(';'),
                i = 0,
                c = 0;
            for (; i < ca.length; ++i) {
                c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
    }

    // Load all needed functions when document ready
    teamo_fix_vc_full_width_row();
    if ($('.vertical-menu').length > 0) {
        teamo_auto_width_vertical_menu();
    }
    if ($('.lazy').length > 0) {
        teamo_init_lazy_load($('.lazy'));
    }
    if ($('.owl-slick').length) {
        setTimeout(function () {
            $('.owl-slick').each(function () {
                teamo_init_carousel($(this));
            });
        }, 10);
    }
    if ($('.product-gallery').length) {
        teamo_product_gallery($('.product-gallery'));
    }
    if ($('.flex-control-thumbs').length) {
        teamo_product_thumb($('.flex-control-thumbs'));
    }
    if ($('.teamo-countdown').length) {
        teamo_countdown($('.teamo-countdown'));
    }
    teamo_sticky_detail();
    if ($('.category-search-option').length) {
        $('.category-search-option').chosen();
    }
    if ($('.block-nav-category').length) {
        teamo_vertical_menu($('.block-nav-category'));
    }
    if ($('.widget_teamo_nav_menu').length) {
        teamo_vertical_menu($('.widget_teamo_nav_menu'));
    }
    if ($('.block-minicart .cart_list').length && $.fn.scrollbar) {
        $('.block-minicart .cart_list').scrollbar();
    }
    teamo_magnific_popup();
    if($('.submenu.megamenu').length) {
        teamo_megamenu();
    }
    // Window load
    $(window).load(function () {
        if ($('.widget_product_categories .product-categories').length) {
            teamo_category_product($('.widget_product_categories .product-categories'));
        }
        if ($('.header-sticky .header-wrap-stick').length) {
            teamo_header_sticky($('.header-sticky .header-wrap-stick'));
        }
        if ($('.equal-container.better-height').length) {
            teamo_better_equal_elems($('.equal-container.better-height'));
        }
        teamo_popup_newsletter();

    });

    // Window resize
    $(window).resize(function () {
        if ($('.vertical-menu').length > 0) {
            teamo_auto_width_vertical_menu();
        }
        if ($('.equal-container.better-height').length) {
            teamo_better_equal_elems($('.equal-container.better-height'));
        }
    });

    // AJAX completed
    $(document).ajaxComplete(function (event, xhr, settings) {
        if ($('.lazy').length > 0) {
            teamo_init_lazy_load($('.lazy'));
        }
        if ($('.equal-container.better-height').length) {
            teamo_better_equal_elems($('.equal-container.better-height'));
        }
        if ($('.block-minicart .cart_list').length > 0 && $.fn.scrollbar) {
            $('.block-minicart .cart_list').scrollbar();
        }
    });
});
