(function($, win, doc) {
    'use strict';

    var carouselDefaultOptions = {
        duration: 0,
        loopControl: false,
        loop: true,
        infinite: true,
        navBar: false,
        navBtn: false,
        itemShown: 1,
        count: false
    };

    function moveCarouselLeft($carousel, $panel) {
        var next = ($carousel.data('index') || 0) - 1;
        showCarousel($carousel, next < 0 ? $panel.length - 1 : next, 'right');
    }

    function moveCarouselRight($carousel, $panel) {
        var next = ($carousel.data('index') || 0) + 1;
        showCarousel($carousel, next >= $panel.length ? 0 : next, 'left');
    }

    function resizeCarousel() {
        var $carousel = $(this),
            options = $carousel.data('options') || carouselDefaultOptions,
            height = $carousel.height(),
            $content = $carousel.find('.carousel-content'),
            $panel = $content.find('>li'),
            carouselWidth = $carousel.width(),
            panelWidth = carouselWidth / options.itemShown,
            contentWidth = panelWidth * $panel.length;

        if ($carousel.data('init')) {
            $content.css({width: contentWidth});
            $panel.css({width: panelWidth});
        } else {
            $content.css({
                width: '',
                height: ''
            });
            $panel.css({
                width: '',
                height: ''
            });
        }

        var ww = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
        var $navItem = $('#main_banner_carousel').find('.carousel-nav-item');
        if(ww < 769) {
            var innerWw = $('body').innerWidth(), itemW = (innerWw - 38) * 0.25;
            $navItem.css('width', itemW);
        } else {
            $navItem.css('width', '');
        }
    }

    function showCarousel($carousel, index, direction) {
        var options = $carousel.data('options');
        var isMoveFin = 0;
        if(options !== undefined) {
            $carousel = $.jq($carousel).data('index', index);

            var timer = $carousel.data('timer'),
                $content = $carousel.find('.carousel-content'),
                $panels = $content.children(),
                step = 100 / options.itemShown;

            if (timer) {
                clearTimeout(timer);
                $carousel.data('timer', null);
            }

            switch (direction) {
                case 'left':
                    $carousel.data('frozen', true);
                    if ($panels.length < options.itemShown + 2) {
                        $content.append($panels.first()).css({left: 0}).animate({left: -step + '%'}, 600, function() {
                            $content.append($panels.first());
                            $carousel.data('frozen', false);
                        });
                    } else {
                        $content.animate({left: -step * 2 + '%'}, 600, function() {
                            $content.append($panels.first()).css({left: -step + '%'});
                            if($carousel.find('.carousel-content a').is(':focus')) {
                                $carousel.find('.carousel-content [data-item='+index+'] a').focus();
                            }
                            $carousel.data('frozen', false);
                        });
                    }
                    break;
                case 'right':
                    $carousel.data('frozen', true);
                    $content.animate({left: 0}, 600, function() {
                        $content.prepend($panels.last()).css({left: -step + '%'});
                        $carousel.data('frozen', false);
                    });
                    break;
                case 'direct':
                    $.iterate($.makeArray($panels), function(v) {
                        var $panel = $(v), item = $panel.data('item');

                        if (item !== index) {
                            $content.append($panel);
                        } else {
                            return false;
                        }
                    });
                    // showCarousel($carousel, index);
                    $carousel.data('frozen', true);
                    $content.prepend($content.find('> li:last'));
                    $content.css({left: -step + '%'});
                    $carousel.data('frozen', false);
                    break;
                default:
                    $carousel.data('frozen', true);
                    $content.prepend($content.find('> li:last'));
                    $content.css({left: -step + '%'});
                    $carousel.data('frozen', false);
            }

            $carousel.closest('.carousel-wrap').find('.carousel-nav-item').removeClass('carousel-selected').eq(index).addClass('carousel-selected');
            $carousel.find('.carousel-content a').attr('tabindex', '-1');
            $carousel.find('.carousel-content [data-item='+index+'] a').removeAttr('tabindex');
            $carousel.find('.carousel-nav-left').toggleClass('carousel-disabled', !options.infinite && index === 0);
            $carousel.find('.carousel-nav-right').toggleClass('carousel-disabled', !options.infinite && !(index < $carousel.find('.carousel-content').find('> li').length - 1));

            if(options.count) {
                var $count = $carousel.closest('.carousel-wrap').find('.carousel-count');
                $count.find('.current').text(index + 1);
                $count.find('.all').text($panels.length);
            }

            if ($carousel.is(':visible') && options.duration > 0 && options.loop) {
                $carousel.data('timer', setTimeout(function() {
                    moveCarouselRight($carousel, $panels);
                }, options.duration));
            }
            $carousel.trigger('carouselchange', [index]);
        }
    }

    $.extend($, {
        enableCarousel: function($target, options) {
            if (options) {
                $target.carousel(options).removeClass('carousel-destroyed');
            } else {
                $target.carousel('destroy').addClass('carousel-destroyed');
            }
        }
    });

    $.fn.extend({
        carousel: function(options) {
            if (options === 'option') {
                var $carousel = $(this);
                options = $.extend($carousel.data('options') || {}, arguments[1]);
                $carousel.data('options', options);
                showCarousel($carousel, 0, 'direct');
                return this;
            }
            if (options === 'destroy') {
                return this.each(function() {
                    var $carousel = $(this).removeClass('carousel-init'), init = $carousel.data('init'),
                        options = $carousel.data('options') || {};

                    if (init) {
                        $carousel
                            .data('init', false).find('.carousel-content').css({left: ''});

                        if (options.navBar) {
                            $carousel.find('.carousel-nav-bar-holder').remove();
                        }
                        if (options.navBtn) {
                            $carousel.find('.carousel-nav-btn').remove();
                            $carousel.parent('.carousel-wrap').find('.carousel-nav-btn').remove();
                        }
                    }
                    $carousel.off('carouselresize').on('carouselresize', resizeCarousel).trigger('carouselresize');
                });
            }
            if ($.isNumeric(options)) {
                showCarousel(this, options);
                return this;
            }
            options = $.extend({}, carouselDefaultOptions, options);

            return this.each(function() {
                var $carousel = $(this).data('options', options).addClass('carousel-init'),
                    $content = $carousel.find('.carousel-content'),
                    $panel = $content.find('> li'), $navBarItem, panelCount = $panel.length;
                var isEnter = 0;

                if ($carousel.data('init') || panelCount === 0) {
                    return;
                }
                $carousel.data('init', true);
                $content.css({left: 0});

                Array.prototype.sort.call($panel.detach(), function(a, b) {
                    return $(a).data('item') - $(b).data('item');
                });

                $panel.appendTo($content);

                if (panelCount > 1 && options.navBar) {
                    options.navLabel = options.navLabel || [];
                    var navBar = ['<div class="carousel-nav-bar-holder"><ul class="carousel-nav-bar">'];

                    for (var i = 0, $el; i < panelCount; i++) {
                        $el = $panel.eq(i);
                        if ($.isEmpty($el.attr('data-item'))) {
                            $el.data('item', i).attr('data-item', i);
                        }
                        navBar.push('<li class="carousel-nav-item tab-item"><a href="#" class="txt-hide" data-index="', i, '">', (options.navLabel[i] || i + 1), '</a></li>');
                    }
                    if(options.loopControl) {
                        navBar.push('<li class="carousel-control-item tab-item"><button type="button" class="btn-loop-control loop-on txt-hide" title="Slideshow OFF"><span>ON/OFF</span></button>');
                    }
                    navBar.push('</ul></div>');
                    $carousel.append(navBar.join('')).find('.carousel-nav-item').find('a').on('click', function(ev) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        var i = $(this).data('index');
                        var p = $(this).closest('.carousel-wrap');

                        if (!$carousel.data('frozen')) {
                            showCarousel($carousel, i, 'direct');
                            if(isEnter == 1) {
                                if(p.find('.btn-loop-control').hasClass('loop-on')) {
                                    p.find('.btn-loop-control').click();
                                    isEnter = 0;
                                }
                            }
                            $carousel.find('.carousel-content [data-item='+i+'] a').focus();
                        }
                    });
                    $carousel.find('.carousel-nav-item a').on('keydown', function(ev) {
                        if((ev.keyCode ? ev.keyCode : ev.which) == 13) {
                            isEnter = 1;
                        }
                    });
                    $carousel.find('.btn-loop-control').on('click', function() {
                        if($(this).hasClass('loop-on')) {
                            options.loop = false;
                            $(this).removeClass('loop-on');
                            $(this).addClass('loop-off');
                            $(this).attr('title', 'Slideshow ON');
                            var timer = $carousel.data('timer');
                            if (timer) {
                                clearTimeout(timer);
                                $carousel.data('timer', null);
                            }
                        } else {
                            options.loop = true;
                            $(this).removeClass('loop-off');
                            $(this).addClass('loop-on');
                            $(this).attr('title', 'Slideshow OFF');
                            var $content = $carousel.find('.carousel-content'),
                                $panels = $content.children();
                            $carousel.data('timer', setTimeout(function() {
                                moveCarouselRight($carousel, $panels);
                            }, options.duration));
                        }
                    });
                }
                if (panelCount > 1 && options.navBtn) {
                    $carousel
                        .append('<button type="button" class="carousel-nav-btn carousel-nav-left" title="이전">&lt;</button><button type="button" class="carousel-nav-btn carousel-nav-right" title="다음">&gt;</button>')
                        .find('.carousel-nav-left').on('click', function(ev) {
                        ev.preventDefault();
                        ev.stopPropagation();

                        if (!$carousel.data('frozen')) {
                            moveCarouselLeft($carousel, $panel);
                        }
                    }).end().find('.carousel-nav-right').on('click', function(ev) {
                        ev.preventDefault();
                        ev.stopPropagation();

                        if (!$carousel.data('frozen')) {
                            moveCarouselRight($carousel, $panel);
                        }
                    });
                }

                $carousel.off('carouselresize').on('carouselresize', resizeCarousel).trigger('carouselresize');
                (options.complete || $.noop).call(this);
                showCarousel($carousel, 0);
            });
        }
    });
})(jQuery, window, document);