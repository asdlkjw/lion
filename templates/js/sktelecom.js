// tab, accordion, etc... component action script
// 각 page 에서 실행 (ex. t.um page) sktelecomJSInit(jQuery, window, document);


	var sktelecomJSInit = function($, win, doc) {
    'use strict';

        // tab + select function
        // page 내 한 개의 tab에서만 사용 가능
        function setTab(tab) {
            var $tabSelector = $('.tab-header .tab-item');
            var $tabSelect = $('.tab-wrap .tab-header').find('select');
            $tabSelector.removeClass('active');
            $('.tab-wrap .tab-body > .content-item').hide();

            if ($.isEmpty(tab)) {
                tab = $tabSelector.first().addClass('active').attr('rel');
                $('.tab-wrap .tab-body > .content-item:first').show();
            } else if (typeof tab === 'string') {
                $(tab).show();
                tab = tab.slice(1);
                $('[rel=' + tab + ']').addClass('active');
            } else {
                tab = tab.addClass('active').show().attr('rel');
                $('#' + tab).show();
            }

            if($('html').hasClass('screen-large') && $tabSelect.length > 0) {
                $tabSelect.val(tab);
            }

        }

        $(function() {
            var $html = $('html'), $container = $('.container');
            var ww = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;


            // accordion action
            $('.accordion-header a').click(function(e) {
                e.preventDefault();
                var $this = $(this), $p = $this.closest('li'), $accorBody = $p.find('.accordion-body');
                if(!$('#content_inner').hasClass('faq-page')) {
                    $p.toggleClass('expanded');
                    if($p.hasClass('expanded')) {
                        $accorBody.slideDown(100);
                    } else {
                        $accorBody.slideUp(100);
                    }
                }
            });

            // tab + select action
            var tw = $('.container').find('.tab-wrap:not(.carousel-wrap)');
            if(tw.length) {
                // tab init
                if(!tw.hasClass('new-page-tab')) {
                    setTab();
                }
                // tab click action
                // .not-link-in class 포함시 동작안함
                tw.find('.tab-header .tab-item a:not(.not-link-in)').click(function(e) {
                    e.preventDefault();
                    setTab($(this).closest('.tab-item'));
                });
                // tab select change action
                tw.find('.tab-header select').change(function() {
                    var v = $(this).val(), str = '#' + v;
                    var _href = $('[rel=' + v + ']').find('a').attr('href');
                    if($('html').hasClass('screen-small') && !tw.hasClass('new-page-tab')) {
                        setTab(str);
                    } else if (tw.hasClass('new-page-tab')) {
                        if(_href!= undefined) {
                            window.location.href = _href;
                        }
                    }
                });
            }

            // tab2 action
            // t.um page check
            $('.tab-wrap-2 .tab-item a').click(function(e) {
                e.preventDefault();

                var _parentWrap = $(this).closest('.tab-wrap-2'), _parentHeader = $(this).closest('.tab-header-2'), _parentBody = _parentWrap.find('.tab-body-2');
                var _index = _parentHeader.find('.tab-item').index($(this).parent('.tab-item'));

                _parentHeader.find('.tab-item').removeClass('active');
                $(this).closest('.tab-item').addClass('active');
                _parentWrap.find('.tab-body-2 > .content-item').hide();
                _parentWrap.find('.tab-body-2 > .content-item').eq(_index).show();
            });

            $(win).resize(function() {
                var newWw = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
                if(ww !== newWw) {

                    ww = newWw;
                }
                if(!$html.hasClass('device-type-desktop')) {
                    $(win).on('orientationchange', function() {
                        ww =  win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
                    });
                }
            });

            // /js/app_common.js
            clickHash();
        });

}



