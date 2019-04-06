//请求连接参数分割
$UrlParameter = function(_key) {
    //debugger
    var _url = window.location.search;
    //如果不等于空表示存在参数
    if (_url.length != 0) {
        //清除问号字符
        _params = _url.replace('?', "").split('&');
        for (var i = 0; _p = _params[i]; i++) {
            _params[_p.split('=')[0]] = _p.split('=')[1];
        }
        //是否返回固定参数值
        if (_key && _key.length != 0) {
            return _params[_key];
        }
        //否则返回对象集合
        return _params;
    }
};
//字符编码
function reCode(s) {
    //特殊字符
    s = s.replace(/\+/g, "%2B");   // +
    s = s.replace(/\=/g, "%3D");   // =
    s = s.replace(/\!/g, "%21");   // !
    s = s.replace(/\'/g, "%27");   // '
    s = s.replace(/\(/g, "%28");   // (
    s = s.replace(/\)/g, "%29");   // )
    s = s.replace(/\*/g, "%2A");   // *
    s = s.replace(/\-/g, "%2D");   // -
    s = s.replace(/\./g, "%2E");   // .
    s = s.replace(/\_/g, "%5F");   // _
    s = s.replace(/\~/g, "%7E");   // ~
    //中文编码
    s = encodeURIComponent(s);
    s = encodeURIComponent(s);
    return s;
};
//字符解码
function deCode(s) {
    return decodeURIComponent(decodeURIComponent(s));
};
//占位符  alert("{0}|{1}".format(1,2));
String.prototype.format = function() {
    if (arguments.length == 0) return this;
    for (var s = this, i = 0; i < arguments.length; i++)
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return s;
};
//判断浏览器是否支持 placeholder
(function($){
    $.fn.formTip = function(options){
        var defaults = {
            useClass:"ui-input"
        };
        var J = $.extend(defaults,options,{});
        //判断浏览器是否支持 placeholder
        var hasPlaceholderSupport = function(){
            var attr = "placeholder";
            var input = document.createElement("input");
            return attr in input;
        }
        return this.each(function(){
            var that = $(this);
            var ui_init = $(J.useClass);
            var tip = that.attr('placeholder');
            var support  = hasPlaceholderSupport();
            if(!support){
                that.val(tip);
                that.focus(function(){
                    if($(this).val()==tip){
                        $(this).val("");
                    }
                }).blur(function(){
                    if($(this).val()==""){
                        $(this).val(tip)
                    }
                })
            }
        })
    }
})(jQuery);
/***** menu *****/
//Navigate the current state
$(function() {
    function navCurrent() {
        var fullUrl = window.location.href;
        var About = new RegExp("\/About\/", "i");
        var Region = new RegExp("\/Region\/", "i");
        var News = new RegExp("\/News\/", "i");
        var Overall = new RegExp("\/Overall\/", "i");
        var Merchants = new RegExp("\/Merchants\/", "i");
        var Services = new RegExp("\/Services\/", "i");
        if(About.test(fullUrl))
            current(1);
        else if (Region.test(fullUrl))
            current(2);
        else if (News.test(fullUrl))
            current(3);
        else if (Overall.test(fullUrl))
            current(4);
        else if (Merchants.test(fullUrl))
            current(5);
        else if (Services.test(fullUrl))
            current(6);
        else{
            current(0);
        }
        function current(n) {
            $("ul#menu li a.f").eq(n).addClass("current");
        }
    }
    navCurrent();
    function changeWallBG(){
        var hrefUrl = window.location.href;
        var str0 = new RegExp("/news/");
        var str1 = new RegExp("/hr/Recruitment.aspx");
        var str2 = new RegExp("/hr/Detail.aspx");
        var str3 = new RegExp("/hr/result.aspx");
        var str4 = new RegExp("/hr/Result.aspx");
        if(str0.test(hrefUrl)||str1.test(hrefUrl)||str2.test(hrefUrl)||str3.test(hrefUrl)||str4.test(hrefUrl)){
            $("#Header .wall").addClass("black");
        }

        if(str1.test(hrefUrl)){
            $("#Header .s-job a").hide();
        }
    }
    changeWallBG();
    function currentPage(){
        //<li><a href="" class="active">中国招聘</a></li>
        var hrefUrl = window.location.href;
        var str1 = new RegExp("Outremer.aspx");
        var str2 = new RegExp("School.aspx");
        var str3 = new RegExp("Social.aspx");
        var str4 = new RegExp("Guide.aspx");
        var str5 = new RegExp("Result.aspx");
        if(str1.test(hrefUrl)){
            $("#page-menu li a").eq(2).addClass("active");
        }
        else if(str2.test(hrefUrl)){
            $("#page-menu li a").eq(3).addClass("active");
        }
        else if(str3.test(hrefUrl)){
            $("#page-menu li a").eq(4).addClass("active");
        }
        else if(str4.test(hrefUrl)){
            $("#page-menu li a").eq(5).addClass("active");
        }
        else if(str5.test(hrefUrl)){
            $("#page-menu li a").eq(6).addClass("active");
        }
    };
    currentPage()
});
$(function(){
    var index = 0;
    $("#menuOppen").mouseenter('click', function() {
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $("#menu").fadeIn();
        }
        else{
            $(this).removeClass('active');
            $("#menu").fadeOut('fast',function(){
                $("#nav li a").removeClass('current');
                $(".layer").hide();
                $("#nav li").eq(0).trigger('mouseenter');
            });
        }
    });
    $(".menuBtn-logon").mouseenter('click', function() {
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $("#menu").fadeIn();
        }
        else{
            $(this).removeClass('active');
            $("#menu").fadeOut('fast',function(){
                $("#nav li a").removeClass('current');
                $(".layer").hide();
                $("#nav li").eq(0).trigger('mouseenter');
            });
        }
    });
    $("#nav li").mouseenter(function(){
        index = $("#nav li").index(this);
        $(this).find('a').addClass('current').parent().siblings().find('a').removeClass('current');
        $(".submenu").show();
        $(".layer").eq(index).show().siblings().hide();
    });
    $("#Header").mouseleave(function(){
        $(".submenu").hide();
        $("#menu").fadeOut('fast',function(){
            $("#nav li a").removeClass('current');
            $(".layer").hide();
        });
        $("#menuOppen").removeClass('active');
        $("#lang").parent().prev().css({right:125});
        $("#lang").next().hide();
        $(".menuBtn-logon").removeClass('active');
    });

    $("#popOppen").bind('click',function(){
        $("#pop-up").fadeIn();
        $("#pop-up .contMain").removeClass('zoomOut').addClass('bounceIn');
    });
    $("#pop-up #close").bind('click',function(){
        $("#pop-up .contMain").removeClass('bounceIn').addClass('zoomOut');
        setTimeout(function(){
            $("#pop-up").fadeOut();
        },500)
    });
    $(".apply a").click(function(){
        $("#job-pop-up").fadeIn();
        $("#job-pop-up .job-pop").removeClass('zoomOut').addClass('bounceIn');
    });
    $("#login-close").click(function(){
        $("#job-pop-up .job-pop").removeClass('bounceIn').addClass('zoomOut');
        setTimeout(function(){
            $("#job-pop-up").fadeOut();
        },500)
    });

    $(".job-apply a").click(function(){
        $("#job-pop-up").fadeIn();
        $("#job-pop-up .job-pop").removeClass('zoomOut').addClass('bounceIn');
    });
    $("#login-close").click(function(){
        $("#job-pop-up .job-pop").removeClass('bounceIn').addClass('zoomOut');
        setTimeout(function(){
            $("#job-pop-up").fadeOut();
        },500)
    });

    function regis(){
        var current_fs, next_fs, previous_fs;
        var left, opacity, scale;
        var animating;
        $("#go-register").click(function(){
            if(animating) return false;
            animating = true;
            current_fs = $(this).parent().parent();
            next_fs = $(this).parent().parent().next();
            next_fs.show();
            current_fs.animate({opacity: 0}, {
                step: function(now, mx) {
                    scale = 1 - (1 - now) * 0.2;
                    left = ((now) * 50)+"%";
                    opacity = 1 - now;
                    current_fs.css({'transform': 'scale('+scale+')'});
                    next_fs.css({'left': left, 'opacity': opacity});
                },
                duration: 800,
                complete: function(){
                    current_fs.hide();
                    animating = false;
                },
                easing: 'easeInOutBack'
            });
        });

        $("#register-close").click(function(){
            var self=$(this);
            if(animating) return false;
            animating = true;
            current_fs = $(this).parent();
            previous_fs = $(this).parent().prev();
            previous_fs.show();
            current_fs.animate({opacity: 0}, {
                step: function(now, mx) {
                    scale = 0.8 + (1 - now) * 0.2;
                    left = ((1-now) * 50)+"%";
                    opacity = 1 - now;
                    current_fs.css({'left': left});
                    previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
                },
                duration: 800,
                complete: function(){
                    current_fs.hide();
                    animating = false;
                },
                easing: 'easeInOutBack'
            });
        });

    }
    regis();

});
//banner size
function bannerSize(){
    var winW=$(window).width();
    var winH=$(window).height();
    var wrapWidth = $(".wrap").width();
    if(winW>1024){
        $('.b-size').css({height:winH});
        $(".video-size").css({height:winH});
    }
    else{
        var BL=1000/1440;
        var NH= parseInt(winW*BL);
        $('.b-size').css({height:NH});
        $(".video-size").css({height:NH});
    };
    var rataro = 700/1200;
    $(".box-size-over").css({height:parseInt(wrapWidth*rataro)});

    var rt= 900/1440;
    $(".banner-size").css({height:parseInt(winW*rt)});

    var ContBL = 500/940;
    var contMain=winW*0.65;
    $(".contMain .boxes").css({height:parseInt(contMain*ContBL),marginTop:-parseInt((contMain*ContBL)/2)+30});
    var pageNav = $(".pageNav li").width();
    var BL = 401/600;
    $(".b-picture").css({height:parseInt((pageNav-8)*BL)});
    $(".pageNav li a").width(pageNav-8);
    var BL_Re = 284/285;
    var WPN = $(".pageNav-list li").width();
    $(".pageNav-list li a").width(WPN-20);
    $(".b-picture-re").css({height:parseInt((WPN-20)*BL_Re)});

    var magW=$(".mag-wrap").width();
    var radio=457/1052;
    var magH = parseInt(magW*radio);
    $(".mag-box").css({height:magH,paddingTop:parseInt(winH-magH)/2});
    $(".mag-box li a").css({height:magH});
    $(".history-box").css({height:winH-100,padding:'60px 0px 39px'});
    //媒体
    var r=640/940;
    $("#media-pop-up .media-box").css({width: parseInt(winW*0.65),height:parseInt((winW*0.65)*r),'margin-top':-parseInt(((winW*0.65)*r)/2),'margin-left':-parseInt((winW*0.65)/2)})
}
var webSize={
    meidaSize:function(){
        var v=$("#video-play");
        var vs=$("#video-small");
        var parentW=vs.parent().width();
        var parentH=vs.parent().height();
        var winW=$(window).width();
        var winH=$(window).height();
        var videoRatio=340/798;
        v.css({width:parseInt(winH/videoRatio),marginLeft:-parseInt(winH/videoRatio)/2});
        vs.css({width:parentW,height:parentH});
    },
    publicSize:function(){
        var winW=$(window).width(),
            lgW=$(".logo").width();
        $(".menuBtn-logon").css({width:winW-lgW-180-100-210})
    }
}
$(function(){
    bannerSize();
    webSize.meidaSize();//视频尺寸
    webSize.publicSize();
    $(window).resize(function(){
        setTimeout(function(){
            bannerSize();
            webSize.meidaSize();//视频尺寸
            webSize.publicSize();
        },100)
    });
    dlDive("#flow-list");
});
var dlDive=function(wrap){
    var box = $(wrap);
    var _dl = $('dl',box);
    var _dt = $("dt",_dl);
    _dt.bind('click',function(){
        if(!$(this).hasClass('oppen')){
            $(this).addClass('oppen').parent().siblings().find('dt').removeClass('oppen');
            $(this).next().slideDown().parent().siblings().find('dd').slideUp();
            $(this).parent().addClass('active').siblings().removeClass('active');
        }
        else{
            $(this).next().slideUp();
            $(this).removeClass('oppen');
            $(this).parent().removeClass('active');
            $(".guildeQA").next().slideUp();
            $(".guildeQA").removeClass('oppen');
            $(".guildeQA").parent().removeClass('active');
        }
    });
}
//模块模式
var module = new Object({
    _count : 0,
    HeaderHideShow:function(){
        var initScroll=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;; //初始滚动的位置
        var headerHS=$("#Header").outerHeight(true);
        var scrollTimer;
        function BrowserType() {
            var userAgent = navigator.userAgent;
            var isOpera = userAgent.indexOf("Opera") > -1;
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera;
            var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1;
            if (isIE) {
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                if (fIEVersion == 6) {
                    return "IE"
                }
                if (fIEVersion == 7) {
                    return "IE"
                } else if (fIEVersion == 8) {
                    return "IE"
                } else if (fIEVersion == 9) {
                    return "IE"
                } else {
                    return "0"
                }
            }
            if (isChrome) {
                return "Chrome"
            }
        }
        var browser = BrowserType();
        if(browser=="IE"){
            $(window).scroll(function(){
                var changeScroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;;//改变滚动的位置
                if(scrollTimer) {
                    clearTimeout(scrollTimer);
                    scrollTimer = undefined;
                }
                scrollTimer = setTimeout(function(){
                    if(changeScroll>headerHS){$("#Header").addClass('gizle');$("#page-menu").addClass('up')}else{$("#Header").removeClass('gizle');$("#page-menu").removeClass('up')}
                    //位置的变化判断显示与隐藏
                    if(changeScroll>initScroll){$("#Header").removeClass('sabit');$("#page-menu").addClass('up')}else{$("#Header").addClass('sabit');$("#page-menu").removeClass('up')}

                    //隐藏掉子菜单
                    $(".submenu").hide();
                    $("#menu").fadeOut('fast',function(){
                        $("#nav li a").removeClass('current');
                        $(".layer").hide();
                    });
                    $("#menuOppen").removeClass('active');
                    $("#lang").next().hide();
                    $(".menuBtn-logon").removeClass('active');
                    //重置初始滚动的位置
                    initScroll=$(document).scrollTop();
                },100);
            })
        } else{
            $(window).scroll(function(){
                var changeScroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;;//改变滚动的位置
                if(changeScroll>headerHS){$("#Header").addClass('gizle');$("#page-menu").addClass('up')}else{$("#Header").removeClass('gizle');$("#page-menu").removeClass('up')}
                //位置的变化判断显示与隐藏
                if(changeScroll>initScroll){$("#Header").removeClass('sabit');$("#page-menu").addClass('up')}else{$("#Header").addClass('sabit');$("#page-menu").removeClass('up')}

                //隐藏掉子菜单
                $(".submenu").hide();
                $("#menu").fadeOut('fast',function(){
                    $("#nav li a").removeClass('current');
                    $(".layer").hide();
                });
                $("#menuOppen").removeClass('active');
                $("#lang").next().hide();
                $(".menuBtn-logon").removeClass('active');
                //重置初始滚动的位置
                initScroll=$(document).scrollTop();
            })
        }
    },
    bean:function(){
        var that = this;
        var box = $("#mode-list");
        var job = $("#job-mode-list");
        var _dl = $('dl',box);
        var _dt = $("dt",_dl);
        var _dlS = $('dl',job);
        var _dtS = $("dt",job);
        _dt.bind('click',function(){
            if(!$(this).hasClass('oppen')){
                $(this).addClass('oppen').parent().siblings().find('dt').removeClass('oppen');
                $(this).next().slideDown().parent().siblings().find('dd').slideUp();
                $(this).parent().addClass('active').siblings().removeClass('active');
            }
            else{
                $(this).next().slideUp();
                $(this).removeClass('oppen');
                $(this).parent().removeClass('active');
                $(".guildeQA").next().slideUp();
                $(".guildeQA").removeClass('oppen');
                $(".guildeQA").parent().removeClass('active');
            }
        });
        _dtS.bind('click',function(){
            if(!$(this).hasClass('oppen')){
                $(this).addClass('oppen').parent().siblings().find('dt').removeClass('oppen');
                $(this).next().slideDown().parent().siblings().find('dd').slideUp();
                $(this).parent().addClass('active').siblings().removeClass('active');
            }
            else{
                $(this).next().slideUp();
                $(this).removeClass('oppen');
                $(this).parent().removeClass('active');
                $(".guildeQA").next().slideUp();
                $(".guildeQA").removeClass('oppen');
                $(".guildeQA").parent().removeClass('active');
            }
        });
        $(".guildeQA").bind('click',function(){
            if(!$(this).hasClass('oppen')){
                $(this).addClass('oppen').parent().siblings().find('.guildeQA').removeClass('oppen');
                $(this).next().slideDown().parent().siblings().find('.guilde-infor').slideUp();
                $(this).parent().addClass('active').siblings().removeClass('active');
            }
            else{
                $(this).next().slideUp();
                $(this).removeClass('oppen');
                $(this).parent().removeClass('active');
            }
        });
    },
    langOpt: function (){
        $("#lang").bind('click',function(){
            $(this).parent().prev().css({right:170});
            $(this).next().show();
        });
    },
    minHeig:function(){
        var BL = 390/390;
        var BW = $("#people-list li").width()-17;
        var NH = parseInt(BW*BL);
        $("#people-list li").css({'min-height':NH+'px'});
        $("#people-list li a").css({'height':NH+'px'});
        $(window).resize(function(){
            setTimeout(function(){
                $("#people-list li").css({'min-height':NH+'px'});
                $("#people-list li a").css({'height':NH+'px'});
            },100)
        });
    },
    botnDown:function(){
        var botnDown="<div class='botnDown'><span></span></div>";
        $("#banner").append(botnDown);
        $(".page-inner").append(botnDown);

        var bd=$(".botnDown");
        if(bd.length>1){
            bd.slice(1,bd.length).remove();
        }
    },
    init:function(){
        var that = this;
        that.HeaderHideShow(); //固定位置下拉隐藏上拉显示悬浮导航菜单
        that.bean();
        that.langOpt();
        that.botnDown();
        // that.minHeig();
    }
});
$(function(){
    module.init();
});
