



	// gnb, footer, etc... 모든 page 에서 공통적으로 사용
// gnb.js 에서 실행 layoutJsInit(jQuery, window, document);

	var layoutJsInit = function($, win, doc) {
    'use strict';

        $.fn.extend({
            // google analytics click count
            // 현재 메인에서만 사용중
            gaClickCount: function(){
                $(this).on('click', function(){
                    var documentTitle = document.title;
                    var dataGaLabel = $.trim($(this).attr('data-galabel'));
                    if(documentTitle == "SK telecom") {
                        documentTitle = "메인 페이지";
                    }
                    else {
                        documentTitle = documentTitle.substr(0, documentTitle.indexOf('<')) + ' 페이지';
                    }
                    ga('send', 'event', {
                        eventCategory: documentTitle,
                        eventAction: 'click',
                        eventLabel: dataGaLabel,
                        transport: 'beacon'
                    });
                });
            }
        });

        $.extend($, {
            // div.container padding-bottom setting (== footer height)
            settingContainerPadding: function() {
                var _ww = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
                var $container = $('.container');
                var fh = $('.footer').outerHeight();
                /*mib2020 제거//
                if(_ww > 768) {
                  if($('html').attr("lang") === "en") {
                    $container.css('padding-bottom', fh + 30);
                  }
                } else {
                  if($('html').attr("lang") === "en") {
                    $container.css('padding-bottom', fh + 26);
                  }
                }
                /mib2020 제거*/
            },
            // open window popup 채용정보
            openPopup: function(event, el) {
                event.preventDefault();
                var url = el.getAttribute('href');
                var width=550;
                var height=440;

                var sw = screen.availWidth;
                var sh = screen.availHeight;

                var px = (sw - width) / 2;
                var py = (sh - height) / 2;
                // px += window.screenLeft;

                var set = 'top=' + py + ',left=' + px;
                set += ',width=' + width + ',height=' + height + ',location=no,scrollbars=yes,resizable=yes';

                window.open(url, 'popup', set);
            }
        });

        // 모바일일때 광고 page list image 비율에 따른 height setting
        function adThumbnailResize(w) {
            if($('#content_inner').hasClass('advertise-page')) {
                var img = $('.list-wrap').find('img');
                var ratio = 56.25, imgW = img.width();
                if(w < 769) {
                    var imgH = imgW * ratio / 100;
                    img.css('height', imgH);
                } else {
                    img.css('height', '');
                }
            }
        }

        // 모바일일때 보도자료 상세 page .board-detail-thumbnail image 비율에 따른 height setting
        function boardThumbnailResize(w) {
            if($('.container').find('.board-detail-thumbnail').length > 0) {
                var img = $('.board-detail-thumbnail').find('img.thumbnail');
                var ratio = 56.25, imgW = img.width();
                if(w < 769) {
                    var imgH = imgW * ratio / 100;
                    img.css('height', imgH);
                } else {
                    img.css('height', '');
                }
            }
        }

        // browser width 에 따른 html class 추가
        function checkScreenSize(ww) {
            ww = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
            var $html = $('html');
            var small = 'screen-small', large = 'screen-large';
            if(ww > 768) {
                if($html.hasClass(small)) {
                    $html.removeClass(small);
                }
                if(! $html.hasClass(large)) {
                    $html.addClass(large);
                }
            } else {
                if($html.hasClass(large)) {
                    $html.removeClass(large);
                }
                if(! $html.hasClass(small)) {
                    $html.addClass(small);
                }
            }
        }

        // browser width 에 따른 gnb reset
        function resetSubMenu(ww, smt) {
            ww = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
            if(ww > 768) {
                $('.gnb').removeClass('expanded');
                smt.removeAttr('tabindex');
            } else {
                var $subMenuItem = $('.gnb .gnb-menu-wrap > .sub-menu .sub-menu-item');
                $('.gnb .gnb-menu-wrap > .sub-menu').css('height', '');
                $subMenuItem.removeClass('expanded');
                smt.attr('tabindex', '0');
            }
        }

        // footer family site button top setting
        function familySiteButtonTop(ww, fs, btn) {
            ww = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
            if(fs.hasClass('expanded')) {
                var fsh = fs.outerHeight(), t = fsh;
                ww > 768 ? t += 33 : t += 27;
                btn.css('top', '-' + t + 'px');
            } else {
                btn.css('top', '');
            }
        }

        $(function() {
            var $html = $('html');
            var ww = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
            var g = $('.gnb'), $menu = g.find('.menu'), $subMenu = $('.gnb .gnb-menu-wrap > .sub-menu');
            var $subMenuItem = $('.gnb .gnb-menu-wrap > .sub-menu .sub-menu-item');
            var $subMenuItemTitle = $subMenu.find('.sub-menu-item > .sub-menu-title');
            var $btnSubMenuToggle = $menu.find('a');
            var $footer = $('.footer'), fs = $footer.find('.family-site'), $btnFamilySiteToggle = $footer.find('.btn-family-site-toggle');
            var _toTop = $('#btn_page_top');
            var scrolled = document.documentElement.scrollTop > 0;

            // #btn_page_top setting
            _toTop.toggle(scrolled);
            _toTop.click(function() {
                $('html, body').animate({scrollTop: 0}, '600', 'swing', function() {
                    g.focus();
                });
            });
            $('.container').append(_toTop);

            g.attr('tabindex', '-1');

            checkScreenSize(ww);
            resetSubMenu(ww, $subMenuItemTitle);

            // multi line text ellipsis
            if(!$('#content_inner').hasClass('notice-page') && !$('#content_inner').hasClass('news-page')) {
                $('.multi-ellipsis').ellipsis(true);
            }
            boardThumbnailResize(ww);
            adThumbnailResize(ww);

            setTimeout(function() {
                // multi line text ellipsis
                if(!$('#content_inner').hasClass('notice-page') && !$('#content_inner').hasClass('news-page')) {
                    $('.multi-ellipsis').ellipsis(true);
                }
                boardThumbnailResize(ww);
                adThumbnailResize(ww);
            }, 2500);


            $(win).resize(function() {
                var newWw = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
                if(ww !== newWw) {
                    // #btn_page_top setting
                    scrolled = document.documentElement.scrollTop > 0;
                    _toTop.toggle(scrolled);

                    familySiteButtonTop(ww, fs, $btnFamilySiteToggle);

                    checkScreenSize(ww);
                    resetSubMenu(ww, $subMenuItemTitle);
                    // multi line text ellipsis
                    if(!$('#content_inner').hasClass('notice-page') && !$('#content_inner').hasClass('news-page')) {
                        $('.multi-ellipsis').ellipsis(true);
                    }
                    boardThumbnailResize(newWw);
                    adThumbnailResize(ww);
                    ww = newWw;
                }
                if(!$html.hasClass('device-type-desktop')) {
                    $(win).on('orientationchange', function() {
                        ww = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
                    });
                }
            });

            // #btn_page_top setting
            $(win).scroll(function() {
                scrolled = document.documentElement.scrollTop > 0;
                _toTop.toggle(scrolled);
            });


            ////////////////////////////////////// gnb start

            // pc: gnb menu height setting
            var _gnbMenuHeight = 0;
            if($html.attr('lang') === 'ko') {
                _gnbMenuHeight = 375;
            } else {
                _gnbMenuHeight = 578;
            }


            // pc: gnb menu keyboard tab action (tab, shift + tab)
            $menu.find('a').keydown(function(e) {
                var _c = $(this).parent().attr('class');
                var _start = _c.indexOf('menu-item-');
                var i = _c.substr(_start+10, 2);
                if (e.which == 9 && e.shiftKey) {
                    if($(this).parent().hasClass('menu-item-01')) {
                        if(ww > 768) {
                            if(g.hasClass('expanded')) {
                                $btnSubMenuToggle.removeClass('selected');
                                $subMenuItem.removeClass('focus');
                                $subMenu.css('display','block');
                                g.removeClass('expanded');
                                $subMenu.stop().animate({"height":0}, 300, function() {
                                    $subMenu.css('display','');
                                });
                            }
                        }
                    }
                } else if (e.which == 9) {
                    if(ww > 768) {
                        if(g.hasClass('expanded')) {
                            $subMenu.find('.sub-menu-item.item-'+i).focus();
                        }
                    }
                }
            });
            // pc: gnb menu focus action
            $btnSubMenuToggle.on('mouseenter focus', function(e) {
                var _num = ($menu.find('>li').index($(this).parent('li'))*1) + 1;
                $btnSubMenuToggle.removeClass('selected');
                $subMenuItem.removeClass('focus');
                $(this).addClass('selected');
                $subMenu.find('.sub-menu-item.item-0'+_num).addClass('focus');
                if(!g.hasClass('expanded')) {
                    g.addClass('expanded');
                    $subMenu.stop().animate({"height":_gnbMenuHeight}, 300);
                }
            });
            // pc: gnb sub menu mouse enter action
            $subMenuItem.mouseenter(function(e) {
                if(ww > 768) {
                    var _num = ($subMenuItem.index($(this))*1) + 1;
                    $btnSubMenuToggle.removeClass('selected');
                    $subMenuItem.removeClass('focus');
                    $menu.find('>li.menu-item-0'+_num + ' a').addClass('selected');
                    $(this).addClass('focus');
                }
            });
            // pc: gnb sub menu first li.menu-link-wrap keyboard tab action (tab, shift + tab)
            $subMenu.find('.sub-menu-inner li.sub-menu-item .sub-menu-contents li.menu-link-wrap:first-child > a').keydown(function(e) {
                var _c = $(this).closest('.sub-menu-item').attr('class');
                var _start = _c.indexOf('item-0');
                var i = (_c.substr(_start+6, 1))*1;

                if (e.which == 9 && e.shiftKey) {
                    if(ww > 768) {
                        $menu.find('.menu-item-0'+i+' img').focus();
                    }
                }
            });
            // pc: gnb sub menu last li.menu-link-wrap(bold text menu) keyboard tab action, except last li.sub-menu-item (tab, shift + tab)
            $subMenu.find('.sub-menu-inner li.sub-menu-item:not(:last-child) .sub-menu-contents > ul:last-child  li.menu-link-wrap:last-child').keydown(function(e) {
                var _c = $(this).closest('.sub-menu-item').attr('class');
                var _start = _c.indexOf('item-0');
                var i = (_c.substr(_start+6, 1))*1;
                i++;

                if($(this).hasClass('sub-link')) {
                    if (e.which == 9 && e.shiftKey) {
                        // do nothing
                    } else if (e.which == 9) {
                        if(ww > 768) {
                            if(g.hasClass('expanded')) {
                                $menu.find('.menu-item-0'+i).focus();
                            }
                        }
                    }
                }
            });
            // pc: gnb sub menu last li.sub-link(normal text menu) keyboard tab action, except last li.sub-menu-item (tab, shift + tab)
            $subMenu.find('.sub-menu-inner li.sub-menu-item:not(:last-child) .sub-menu-contents > ul:last-child li.menu-link-wrap:last-child .sub-link:last-child').keydown(function(e) {
                var _c = $(this).closest('.sub-menu-item').attr('class');
                var _start = _c.indexOf('item-0');
                var i = (_c.substr(_start+6, 1))*1;
                i++;

                if($(this).hasClass('sub-link')) {
                    if (e.which == 9 && e.shiftKey) {
                        // do nothing
                    } else if (e.which == 9) {
                        if(ww > 768) {
                            if(g.hasClass('expanded')) {
                                $menu.find('.menu-item-0'+i).focus();
                            }
                        }
                    }
                }
            });
            // pc: gnb sub menu last li.menu-link-wrap(bold text menu) keyboard tab action, in last li.sub-menu-item (tab, shift + tab)
            $subMenu.find('.sub-menu-inner li.sub-menu-item:last-child .sub-menu-contents li.menu-link-wrap:last-child').keydown(function(e) {
                if($(this).hasClass('sub-link')) {
                    if (e.which == 9 && e.shiftKey) {
                        // do nothing
                    } else if (e.which == 9) {
                        if(ww > 768) {
                            if(g.hasClass('expanded')) {
                                $btnSubMenuToggle.removeClass('selected');
                                $subMenuItem.removeClass('focus');
                                $subMenu.css('display','block');
                                g.removeClass('expanded');
                                $subMenu.stop().animate({"height":0}, 300, function() {
                                    $subMenu.css('display','');
                                });
                            }
                        }
                    }
                }
            });
            // pc: gnb sub menu last li.sub-link(normal text menu) keyboard tab action, in last li.sub-menu-item (tab, shift + tab)
            $subMenu.find('.sub-menu-inner li.sub-menu-item:last-child .sub-menu-contents li.menu-link-wrap:last-child .sub-link:last-child').keydown(function(e) {
                if (e.which == 9 && e.shiftKey) {
                    // do nothing
                } else if (e.which == 9) {
                    if(ww > 768) {
                        if(g.hasClass('expanded')) {
                            $btnSubMenuToggle.removeClass('selected');
                            $subMenuItem.removeClass('focus');
                            $subMenu.css('display','block');
                            g.removeClass('expanded');
                            $subMenu.stop().animate({"height":0}, 300, function() {
                                $subMenu.css('display','');
                            });
                        }
                    }
                }
            });
            // pc: gnb mouse leave action
            $('.gnb > .gnb-menu-wrap').mouseleave(function(e) {
                if(ww > 768) {
                    if(g.hasClass('expanded')) {
                        $btnSubMenuToggle.removeClass('selected');
                        $subMenuItem.removeClass('focus');
                        $subMenu.css('display','block');
                        g.removeClass('expanded');
                        $subMenu.stop().animate({"height":0}, 300, function() {
                            $subMenu.css('display','');
                        });
                    }
                }
            });

            // mobile: gnb hamburger menu click
            $('.gnb .btn-hamburger-menu').click(function(e) {
                e.preventDefault();
                g.toggleClass('expanded');
                if(g.hasClass('expanded')) {
                    document.documentElement.scrollTop = 0;
                } else {
                    $subMenuItem.removeClass('expanded');
                }
                if($('container').hasClass('main-page')) {
                    Waypoint.refreshAll();
                }
            });
            // mobile: gnb menu title click (toggle expand)
            $subMenuItemTitle.click(function() {
                ww = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
                if(ww < 769) {
                    var i = $(this).closest('.sub-menu-item');
                    i.siblings('.sub-menu-item').removeClass('expanded');
                    i.toggleClass('expanded');
                    if(i.hasClass('expanded')) {
                        document.documentElement.scrollTop = $(this).offset().top;
                    }
                }
            });
            // mobile: gnb menu title enter control
            $subMenuItemTitle.keydown(function(e) {
                var keyCode = (e.keyCode ? e.keyCode : e.which);
                if(keyCode === 13) {
                    $(this).trigger('click');
                }
            });
            ////////////////////////////////////// gnb end


            // footer family site button click
            $btnFamilySiteToggle.click(function() {
                fs.toggleClass('expanded');
                $('.container').toggleClass('family-site-open');
                /*mib2020 제거//
                if($('html').attr("lang") === "en") {
                  $.settingContainerPadding();
                }
                //mib2020 제거*/
                familySiteButtonTop(ww, fs, $btnFamilySiteToggle);
                if(fs.hasClass('expanded')) {
                    fs.focus();
                    document.documentElement.scrollTop = fs.offset().top - 185;
                }
                if($('container').hasClass('main-page')) {
                    Waypoint.refreshAll();
                }
            });


            // checkbox enter control
            $('input:checkbox').keydown(function(e){
                if((e.keyCode ? e.keyCode : e.which) == 13){
                    $(this).trigger('click');
                }
            });

            // radio enter control
            $('input:radio').keydown(function(e){
                if((e.keyCode ? e.keyCode : e.which) == 13){
                    $(this).trigger('click');
                }
            });

            // content keyboard focus scrollTop setting
            $('#content').bind('keyup', function(e) {
                if(!($(e.target).closest('.nav').length > 0) &&  (e.keyCode ? e.keyCode : e.which) == 9){
                    var wt = document.documentElement.scrollTop;
                    var et = $('*:focus').offset().top;
                    if(et-wt<200) {
                        document.documentElement.scrollTop = et-200;
                    }
                }
            });

            // footer keyboard focus scrollTop setting
            $('.footer').bind('keyup', function(e) {
                if((e.keyCode ? e.keyCode : e.which) == 9){
                    var wt = document.documentElement.scrollTop;
                    var et = $('*:focus').offset().top;
                    if(et-wt<200) {
                        document.documentElement.scrollTop = wt - 200;
                    }
                }
            });

            // 광고 page script
            if($('#content_inner').hasClass('advertise-page')) {
                var count = 0;
                var complete = false;

                var advTimer = setInterval(function() {
                    if($('.relate-video-wrap').length > 0) {
                        if(count > 5 || complete) {
                            clearInterval(advTimer);
                            advTimer = null;
                            return false;
                        }
                        // 관련 광고 image alt 추가
                        $('.relate-video-wrap li').each(function() {
                            var _this = $(this);
                            _this.find('img').attr('alt', _this.find('.box-hover > p').text());
                        });
                        complete = true;
                    } else {
                        count++;
                    }
                }, 500);

                // 광고 목록에서 광고를 클릭했을때
                $('.advertise-page .list-wrap a').on('click', function() {
                    // focus move
                    $('iframe').focus();
                    document.documentElement.scrollTop = 0;

                    if(advTimer != null) {
                        clearInterval(advTimer);
                        advTimer = null;
                    }
                    count = 0;
                    complete = false;

                    advTimer = setInterval(function() {
                        if($('.relate-video-wrap').length > 0) {
                            if(count > 5 || complete) {
                                clearInterval(advTimer);
                                advTimer = null;
                                return false;
                            }
                            // 관련 광고 image alt 추가
                            $('.relate-video-wrap li').each(function() {
                                var _this = $(this);
                                _this.find('img').attr('alt', _this.find('.box-hover > p').text());
                            });
                            complete = true;
                        } else {
                            count++;
                        }
                    }, 500);
                });

                // 관련 광고 목록에서 광고를 클릭했을때
                $('.relate-list-wrap a').click(function() {
                    // focus move
                    $('iframe').focus();
                    document.documentElement.scrollTop = 0;
                });
            }

            // 고객지원 faq page script
            if($('#content_inner').hasClass('faq-page')) {
                // 자주하는 질문 first tab add .active class
                if($('.cbody-02 .tab-header').find('.tab-item:first-child').length <= 0) {
                    var faqTimer = setInterval(function() {
                        $('.cbody-02 .tab-header').find('.tab-item:first-child').addClass('active');

                        if($('.cbody-02 .tab-header').find('.tab-item:first-child').hasClass('active')) {
                            clearInterval(faqTimer);
                            faqTimer = null;
                        }
                    }, 500);
                } else {
                    $('.cbody-02 .tab-header').find('.tab-item:first-child').addClass('active');
                }
            }


        /*mib2019 추가//*/
          /**
           * GNB 스크립트(데스크탑)
           */
          ///Var
          var $header = $('.js.navigation-header');//Header
          var $headerGnb = $('.js.navigation-header-gnb');//Nav wrapper
          var $d1list = $('.js.navigation-gnb-d1-list');//1depth
          var $gnbD1Link = $('.js.navigation-gnb-d1-link');//1depth anchor
          var $gnbD2Links = $('.js.navigation-gnb-d2-list a');//2depth
          var $gnbUtilSupportWrap = $('.js.navigation-header-support-1depth');//Util support wrap
          var $gnbUtilSupport = $('.js.navigation-header-support-title');//Util support
          var $gnbUtilSupportLinks = $('.js.navigation-header-support-1depth .js.support-2depth a');//Util support
          var $gnbUtilLanguage = $('.js.navigation-header-language');//Util english

          ///Event
          //depth1 영역 마우스 진입(오버) 시 하위메뉴 활성화
          $d1list.on('mouseenter, mouseover', function(){
            var $this = $(this);
            //헤더 활성화
            $header.removeClass('is-active');
            $header.addClass('is-active');
          });
          //클릭할 때는 초점 빼서 ouline 지우기
          $gnbD1Link.on('click', function() {
            $(this).blur();
          });
          //depth1 텍스트 링크에 초점 오버 시 하위메뉴 활성화
          $gnbD1Link.on('focus click', function() {
            $header.removeClass('is-active');
            $header.addClass('is-active');
            //1댑스 세로 활성화
            $d1list.removeClass('is-active');
            $(this).parent().addClass('is-active');
          });
          //Depth2 텍스트 링크에 초점 오버시 GNB 활성화 및 고객지원 활성 해제
          $gnbD2Links.on('focus', function() {
            $header.removeClass('is-active');
            $header.addClass('is-active');
            //1댑스 세로 활성화
            $d1list.removeClass('is-active');
            $(this).parents('.js.navigation-gnb-d1-list').addClass('is-active');
            $gnbUtilSupportWrap.removeClass('is-active');
          });
          //header 영역 마우스 아웃 시 하위메뉴 비활성화
          $header.on('mouseout, mouseleave', function() {
            $header.removeClass('is-active');
          });
          //GNB 초점 벗어나면 하위메뉴 비활성화 (로고 & 고객지원 포커스)
          $('.js.navigation-header-logo').on('focus click', function() {
            $header.removeClass('is-active');
          });
          //고객지원 마우스 진입(오버) 시 하위메뉴 활성화
          $gnbUtilSupport.on('mouseenter focus', function(){
            //헤더 활성화
            $header.removeClass('is-active');
            $gnbUtilSupportWrap.addClass('is-active');
          });
          $gnbUtilSupportLinks.on('focus', function(){
            //헤더 활성화
            $gnbUtilSupportWrap.addClass('is-active');
          });
          //고객지원 마우스 아웃 시 하위메뉴 활성화 해제
          $gnbUtilSupportWrap.on('mouseleave', function(){
            //헤더 활성화
            $gnbUtilSupportWrap.removeClass('is-active');
          });
          //언어병경 마우스 진입 시 고객지원 활성 해제
          $gnbUtilLanguage.on('focus', function() {
            $gnbUtilSupportWrap.removeClass('is-active');
          });

          /**
           * GNB 스크립트(모바일)
           */
          //모바일 단말 구분해서 앵커 클릭 제거
          $(function() {
            var _chkMobile = false;
            var _UserAgent = navigator.userAgent;
            if (_UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || _UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
              _chkMobile = true;
            }else{
              _chkMobile = false;
            }
            if(_chkMobile) {
              //console.log('모바일');
              //클릭 앵커 제거
              $('.js.navigation-gnb-d1-link').each(function(index, item) {
                var $href = $(this).attr('href');
                $(this).attr('data-href', $href).attr('href','').on('click', function() {
                  return false;
                });
              });
              //터치-hover 연동
              $('.js.navigation-gnb-d1-link').on('touchstart', function () {
                $(this).trigger('hover');
              }).on('touchend', function () {
                $(this).trigger('hover');
              });
            } else {
              //console.log('데스크탑');
            }
          });

          /*
           * 사이드 메뉴 스크립트(모바일)
           */
          ///Var
          var $sideMenuBtnClose = $('.js.navigation-side-menu-btn[data-func="close"]');//사이드메뉴 열기 버튼
          var $sideMenuBtnOpen = $('.js.navigation-side-menu-btn[data-func="open"]');//사이드메뉴 닫기 버튼
          var $sideSupportWrap = $('.js.navigation-side-support-1depth');//사이드 유틸 고객지원
          var $sideSupportTitle = $sideSupportWrap.find('.js.navigation-side-support-title');//사이드 유틸 고객지원 버튼
          var $sideSupportLinks = $sideSupportWrap.find('.js.support-2depth a');//사이드 유틸 고객지원 링크
          var $sideD1List = $('.js.navigation-side-d1-list');//사이드메뉴 1댑스 리스트
          var $sideD1btn = $('.js.navigation-side-d1-btn');//사이드메뉴 1댑스 버튼
          var sideToggleTimer = false;

          ///Event
          $sideMenuBtnOpen.on('click', toggleSideMenu);//사이드메뉴 열기 버튼 포커스 및 클릭
          $sideMenuBtnClose.on('click', toggleSideMenu);//사이드메뉴 닫기 버튼 클릭
          $sideSupportTitle.on('focusout', closeSideUtil);//사이드메뉴 유틸 버튼 포커스아웃
          $sideSupportTitle.on('click', toggleSideUtil);//사이드메뉴 유틸 버튼 클릭
          $sideSupportLinks.on('focus', toggleSideUtil);//사이드메뉴 유틸 링크 포커스
          $sideSupportLinks.on('blur', closeSideUtil);//사이드메뉴 유틸 링크 포커스아웃
          $sideD1btn.on('click', toggleSideNav);//사이드메뉴 1댑스 클릭

          ///Fx
          //사이드 메뉴 토글
          function toggleSideMenu() {
            $sideSupportWrap.removeClass('is-active');
            //쓰로틀링
            if(!sideToggleTimer) {
                if($header.hasClass('is-open')) {
                  //사이드 메뉴가 열려있을 때
                  $('body').removeClass("on-side");
                  $header.removeClass('is-open');//애니메이션 끄기
                  sideToggleTimer = setTimeout(function() {
                    sideToggleTimer = null;//Reset
                    $header.removeClass('side-active');//디스플레이 끄기
                  }, 300);
                } else {
                  //사이트 메뉴가 닫혀있을 때
                  $('body').addClass("on-side");
                  $header.addClass('side-active');//디스플레이 켜기
                  sideToggleTimer = setTimeout(function() {
                    sideToggleTimer = null;//Reset
                    $header.addClass('is-open');//애니메이션 켜기
                    $('.js.navigation-side-support-title').focus();
                  }, 100);
                }
            }
          }
          //사이드 유틸 열기
          function toggleSideUtil() {
            $sideSupportWrap.toggleClass('is-active');
          }
          //사이드 유틸 닫기
          function closeSideUtil() {
            $sideSupportWrap.removeClass('is-active');
          }
          //사이드 네비게이션 토글(어코디언)
          function toggleSideNav() {
            //Init
            var $this = $(this);
            var $target = $(this).parents('.js.navigation-side-d1-list');
            var $chk = $target.hasClass('is-active');
            //Reset
            $sideSupportWrap.removeClass('is-active');
            $sideD1List.removeClass('is-active');
            //Set
            if($chk) {
              //열린 상태일 떄
            } else {
              //닫힌 상태일 때
              $target.addClass('is-active'); 
            }
          }

          //GNB Fixed 가로 스크롤 이슈 해결
          $(window).scroll(function() {
            $('.js.navigation-header, .js.familysite-toggle-btn.is-fixed, .index-business.show-only-desktop .index-business-content').css('left', 0-$(this).scrollLeft());
          });
          /*
           * 푸터 영역
           * (패밀리사이트 토글 및 위치 고정)
           */
          ///Bar
          var $familysiteWrap = $('.js.familysite-wrap');//패밀리사이트 덮는 영역
          var $familysiteBtn = $('.js.familysite-toggle-btn');//패밀리사이트 토글 버튼
          ///Evnets
          //패밀리사이트 버튼 클릭
          $familysiteBtn.on('click', toggleFamilysite);
          ///Functions
          //패밀리사이트 토글
          function toggleFamilysite() {
            var $toggleWrap = $(this).parent();//토글되는 영역
            var $chk = $toggleWrap.hasClass('is-active');//체커
            var $thisTop = $(this).offset().top;//패밀리사이트 위치 Top
            //토글
            if($chk) {
              //끔
              $toggleWrap.removeClass('is-active');
            } else {
              //켬
              $toggleWrap.addClass('is-active');
              $('.js.navigation-header').addClass('scroll-up');
            }
            setTimeout(function() {
              var $chkW = _getWindowWidth(); 
              var $topH = $familysiteWrap.offset().top;
              if($chkW >= 769) {
                //Desktop
                if($('.container').hasClass('main-page')) {//main page
                  $topH = $topH-$('.navigation-header.js').height();
                } else {
                  $topH = $topH-$('.navigation-header.js').height()-$('.nav-inner').height();
                }
                $('html, body').stop().animate( { scrollTop : $topH }, 500);
              } else {
                //Mobile
                $('html, body').stop().animate( { scrollTop : $topH }, 500);
              }
            },100)
          }
          // //패밀리사이트 버튼 고정&해제
          // function familyBtnFixed() {
          //   var $scrollTop = $(window).scrollTop()+$(window).innerHeight();//디바이스 스크롤 높이
          //   if($('html').attr("lang") === "ko") {//한국어일 때만(추후 영문 작업 시 삭제)
          //     var $footerTop = $('.footer-new').offset().top;//푸터 위치
          //   }
          //   if($scrollTop >= $footerTop) {
          //     //스크롤이 푸터 위치 도달했을 때
          //     $familysiteBtn.removeClass('is-fixed').css('left',0);
          //   } else {
          //     //스크롤이 푸터보다 위로 벗어날 때
          //     $familysiteBtn.addClass('is-fixed');
          //   }
          // }
          // $(window).on("load",function() {
          //   familyBtnFixed();
          // });
          // $(window).resize(function() {
          //   familyBtnFixed();
          // });
          // $(window).scroll(function() {
          //   familyBtnFixed();
          // });
        /*//mib2019 추가*/
        });

        /* mib2021 리뉴얼 추가 // */
        $(function() {
          
          gsap.registerPlugin(ScrollTrigger); //공통 선언


          var $body = $("body");
          var $header = $(".navigation-header");
          var $gnb = $(".gnb");//GNB
          var $d1item = $(".gnb-content-desktop .nav-wrap .depth1-item");//뎁스1(데스크탑)
          var $d1link = $(".gnb-content-desktop .nav-wrap .depth1-link");//뎁스1 링크(데스크탑)
          var $d2wrap = $(".gnb-content-desktop .nav-wrap .depth2-wrap");//뎁스2 wrap(데스크탑)

          var $d1h2Mobile = $(".gnb-content-mobile .nav-wrap .depth1-h2");//뎁스1 (모바일)
          var $d1linkMobile = $(".gnb-content-mobile .nav-wrap .depth1-link");//뎁스1 버튼(모바일)

          var $allMenuOpen = $(".gnb-content-desktop .all-menu-open-btn");// 전체메뉴닫기(데스크탑)
          var $allMenuClose = $(".gnb-content-desktop .all-menu-close-btn");// 전체메뉴열기(데스크탑)
          var $allMenuWrap = $(".gnb-content-desktop .all-menu-wrap");// 전체메뉴wrap(데스크탑)
          var $allMenuInner = $(".gnb-content-desktop .all-menu-inner");// 전체메뉴wrap(데스크탑)
          
          var $slideMenuOpen = $(".gnb-content-mobile .nav-wrap .side-menu-open");//사이드메뉴 열기 (모바일)
          var $slideMenuClose = $(".gnb-content-mobile .nav-wrap .side-menu-close");//사이드메뉴 닫기 (모바일)

          var $supportD1Mobile = $(".gnb-content-mobile .nav-wrap .support-d1-link");//고객지원 열기/닫기 (모바일)

          // gnb(데스크탑)
          ScrollTrigger.create({
            start: '5%',
            end: 99999,
            //markers: true,
            onEnter: function() {
              $(".page-index").addClass("scroll-active");
            },
            onLeaveBack: function() {
              $(".page-index").removeClass("scroll-active");
            },
            //toggleClass: {className: 'scroll-active', targets: '.page-index'}
          });

          // 사이드메뉴 열기 (모바일)
          $slideMenuOpen.on("click", function() {
            $body.addClass("stop-scroll");
            $(".side-menu-wrap").show(0).animate( { right: '0px' },500);
            $(".side-menu-wrap").addClass("is-open");
          });
          // 사이드메뉴 닫기 (모바일)
          $slideMenuClose.on("click", function() {
            $body.removeClass("stop-scroll");
            $(".side-menu-wrap").animate( { 
              right: '-100%' 
            },500, function() {
              $(".side-menu-wrap").removeClass("is-open");
            });
            $d1h2Mobile.removeClass("is-active"); //모든 2댑스 닫기
            $d1h2Mobile.next(".depth2-group").slideUp(300); //모든 2댑스 닫기
            $supportD1Mobile.parent(".support-d1").removeClass("is-open");
          });

          // 1댑스 클릭 (모바일)
          $d1linkMobile.on("click", function() {
            var checkClass = $(this).parents(".depth1-h2").hasClass("is-active");
            
            if ( checkClass ) {
              $(this).parents(".depth1-h2").removeClass("is-active");
              $(this).parents(".depth1-h2").next(".depth2-group").slideUp(300);
            } else {
              $d1h2Mobile.removeClass("is-active"); //모든 2댑스 닫기
              $d1h2Mobile.next(".depth2-group").slideUp(300); //모든 2댑스 닫기
              $(this).parents(".depth1-h2").addClass("is-active");
              $(this).parents(".depth1-h2").next(".depth2-group").slideDown(300);
            }
          });
          
          

          $supportD1Mobile.on("click", function() {
            $(this).parent(".support-d1").toggleClass("is-open");
          });

          // 1댑스 hove or focus 메뉴열기(데스크탑)
          $d1link.on("focus mouseenter", function() {
            $d1link.removeClass("is-active");
            $(this).addClass("is-active");
            // 해당 2d wrap
            var $thisD2wrap = $(this).parent().next(".depth2-wrap");
            $d2wrap.slideUp(0);

            var thisIndex = $(this).parents(".depth1-item").index();

            if ( thisIndex === 3 || thisIndex === 4 ) { //2댑스가 없는 경우
              $gnb.addClass("is-active");
              $gnb.addClass("non-dimmed");
            } else { //2댑스가 있는 경우
              if ( $gnb.hasClass("is-active") ) {
                $gnb.addClass("is-active");
                $gnb.removeClass("non-dimmed");
                $thisD2wrap.slideDown(0);
              } else if ( !$gnb.hasClass("is-active") ) {
                $gnb.addClass("is-active");
                $gnb.removeClass("non-dimmed");
                $thisD2wrap.slideDown(300);
              }
            }
          });

          // gnb에서 마우스가 벗어나면 메뉴닫기(데스크탑)
          $header.on("mouseleave", function() {
            $d1link.removeClass("is-active");
            // 고객지원 닫기
            $(".gnb-content-desktop .support-d2-wrap").removeClass("is-active");

            // 해당 2d wrap
            var $thisD2wrap = $(this).parent().next(".depth2-wrap");
            if ( !$thisD2wrap.hasClass("is-active") ) { //중복실행 방지
              $gnb.removeClass("is-active");
              $gnb.removeClass("non-dimmed");
              $d2wrap.slideUp(300);
            }
          });

          //1댑스 키보드 이동(데스크탑)
          $d1link.on("keydown", function(e) {
            var _i = $(this).parents(".depth1-item").index();
            var keyCode = e.keycode || e.which;
            var $thisD2wrap = $(this).parent().next(".depth2-wrap");
            
            if ( keyCode == 9 ) {//탭 키 이벤트
              if ( e.shiftKey) {//쉬프트탭으로 포커스 종료시 메뉴 닫기
                $thisD2wrap.removeClass("is-active");
                if ( _i == 0 ) {//맨 처음에서 나갈 떄 애니메이션
                  $thisD2wrap.slideUp(300);
                  $gnb.removeClass("is-active");
                } else {
                  $thisD2wrap.hide();
                }
                $gnb.removeClass("is-active");
              } else {//탭
              }
            } else if ( keyCode == 37 ) {//좌측 버튼
              if ( _i !== 0 ) {//맨 처음 1댑스에서 실행 방지
                //$d1item.removeClass("active");
                $thisD2wrap.hide();
                $d1item.eq(_i-1).find(".depth1-link").trigger("focus");//이전 1댑스 메뉴 열기
              }
            } else if ( keyCode == 39 ) {//우측 버튼
              if ( _i !== $d1item.length - 1 ) {//맨 끝 1댑스에서 실행 방지
                $d1item.removeClass("active");
                $d2wrap.hide();
                $d1item.eq(_i+1).find(".depth1-link").trigger("focus");//다음 1댑스 메뉴 열기
              }
            }
          }); 

          // 고객지원 열기(데스크탑)
          $(".gnb-content-desktop .support-d1-link").on("focus mouseenter", function() {
            $(".gnb-content-desktop .support-d2-wrap").addClass("is-active");
          });
          // 고객지원 닫기(데스크탑)
          $(".gnb-content-desktop .support-d1-link").on("click", function() {
            $(".gnb-content-desktop .support-d2-wrap").toggleClass("is-active");
          });
          
          // 전체메뉴열기(데스크탑)
          $allMenuOpen.on("click", function() {
            $body.addClass("stop-scroll");
            $gnb.addClass("all-menu-active");
            $allMenuWrap.fadeIn(300);$(".index-business .pin-spacer").offsetTop;
          });

          // 전체메뉴닫기(데스크탑)
          $allMenuClose.on("click", function() {
            //$body.css({"overflow-y":"visible"});
            $body.removeClass("stop-scroll");
            $gnb.removeClass("all-menu-active");
            $allMenuWrap.fadeOut(300);
          });

          var $familyBtn = $(".family-box .btn-title");
          var $familyBox = $(".family-box");
          // 패밀리 사이트 열기/닫기
          $familyBtn.on('click', function(e) {
            e.preventDefault();
            $(".drop-box").slideToggle(150);
            $(this).toggleClass("is-open");
          });
          $familyBox.on('mouseleave', function() {
            $(".drop-box").slideUp(150);
            $familyBtn.removeClass("is-open");
          });

          // 좌우 스크롤
          $(window).scroll(function() {
            $(".gnb").css("left", 0-$(this).scrollLeft()); //gnb
            $(".gnb-content-desktop .depth2-wrap").css("left", 0-$(this).scrollLeft()); //2뎁스
            $(".all-menu-wrap").css("left", 0-$(this).scrollLeft()); //전체 메뉴
            $(".index-business-content.show-only-desktop").css("left", 0-$(this).scrollLeft()); // 비즈니스 영역
          });

          //푸터 퀵링크
          var footerQuickTl = gsap.timeline({
            scrollTrigger: {
              trigger: ".quicklink",
              start: "-68% center",
              end: "-68% top",
              //markers: true,
            }
          });

          footerQuickTl.fromTo(".quicklink .title", .5, {
            y: 80,
            opacity: 0, 
          }, {
            y: 0,
            opacity: 1, 
          })
          .fromTo(".quicklink .group", .5, {
            x: 100, 
            opacity: 0, 
          }, {
            x: 0, 
            opacity: 1, 
            stagger: .2
          } ,.5)
          .fromTo(".family-box .famil-link", .5, {
            x: 100, 
            opacity: 0, 
          }, {
            x: 0, 
            opacity: 1, 
            stagger: .2
          }, .5);
        });
        /* // mib2021 리뉴얼 추가 */
  };

/*mib2019 추가//*/
  /**
   * 기능 스크립트 (전역)
   * 접두사 "_" 사용
   * ex) function _fx() {}
   */
  //아이폰 터치(hover) 버그 개선
  function _mobileHover() {
    $('*').on('touchstart', function () {
      $(this).trigger('hover');
    }).on('touchend', function () {
      $(this).trigger('hover');
    });
  };
  //마우스 오버 이미지 변경
  function _mouseEnterImg() {
    var $this = $(this);
    var $dataGif = $this.attr("data-gif");

    $this.attr("src", $dataGif);
  }
  //마우스 리브 이미지 변경
  function _mouseLeaveImg(){
    //Set
    var $this = $(this);
    var $dataOrigin = $this.attr("data-origin");
    //Event
    $this.attr("src", $dataOrigin);
  }
  //페이지 로드 시 기본 액션
  function _timeout( target, time ) {
    //Init
    var _target = target;
    var _time = time;

    //Set
    setTimeout(function() {
      _target.attr("data-timeout", "is-loaded");
    }, time);
  }
  //GIF 리로드
  function _restartGif(ImageSelector){
    var _this = $(ImageSelector);
    var _src = _this.attr("src");
    _this.attr("src",_src+"?"+Math.floor(Math.random()*100));
  }
  //토글 액티브
  function _toggleActive() {
    if($(this).hasClass("is-active")) {
      $(this).removeClass("is-active");
    } else {
      $(this).addClass("is-active");
    }
    $(this).blur();
  }

  /**
   * 반응형 스크립트 (전역)
   * 접두사 "_" 사용
   * ex) function _fx() {}
   */

  //브라우저 width
  function _getWindowWidth() {
    if (self.innerWidth) {
      return self.innerWidth;
    }
    if (document.documentElement && document.documentElement.clientWidth) {
      return document.documentElement.clientWidth;
    }
    if (document.body) {
      return document.body.clientWidth;
    }
  }
  //모바일 구분
  function _isMobile() {
    var UserAgent = navigator.userAgent;
    if (UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
      return true;
    } else {
      return false;
    }
  }
  //단말 구분
  if(_isMobile()) {
    //모바일 단말
    _mobileHover();//터치 hover화
    //console.log("모바일");
  } else {
    //데스크탑 단말
    //console.log("데스크탑");
  }

  //반응형 사이즈 구분
  var _winW = _getWindowWidth();
  $(window).resize(_chkResponsive);
  function _chkResponsive() {
    _winW = parseInt(_getWindowWidth());
    if(_winW <= 768) {
      //모바일 사이즈
      $('body').attr('data-responsive','responsive-mobile');
    } else {
      //데스크탑 사이즈
      $('body').attr('data-responsive','responsive-desktop');
    }
  }
  $(function() {
    _chkResponsive();
  });

  /*
   * 크로스브라우징 스크립트
   */
  (function() {
    $(document).ready(function() {
      var agents = [/(opr|opera)/gim,/(chrome)/gim,/(firefox)/gim,/(safari)/gim,/(msie[\s]+[\d]+)/gim,/(trident).*rv:(\d+)/gim];
      var agent = navigator.userAgent.toLocaleLowerCase();
      for(var ag in agents) {
        if(agent.match(agents[ag])) {
          $(document.body).addClass(String(RegExp.$1+RegExp.$2).replace(/opr/,'opera').replace(/trident/,'msie').replace(/\s+/,''));
          break;
        }
      }
    });
  })();

/*//mib2019 추가*/

