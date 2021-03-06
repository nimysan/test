$(function () {
    /* sidebar */
    function sidebar(){
        var sidebar = $('.sideGoodCategories'),
            sidebarHd = sidebar.find('.sideGoodCategoriesHd'),
            sidebarBd = sidebar.find('.sideGoodCategoriesBd'),
            bdTimer = null,
            menu = $('.sideGoodCategoriesMenu'),
            detail = $('.sideGoodCategoriesDetail'),
            menuItems = menu.find('li'),
            detailItems = detail.find('.item'),
            menuTimer = null,
            detailTimer = null,
            isSelected = false;

        sidebarHd.hover(function (){
            sidebarBd.show();
        }, function (){
            bdTimer = setTimeout(function (){
                sidebarBd.hide();
            }, 200);
        });

        sidebarBd.mouseover(function (){
            sidebarBd.show();
            clearTimeout(bdTimer);
        });

        sidebarBd.mouseout(function (){
            bdTimer = setTimeout(function (){
                sidebarBd.hide();
                detail.hide();
                detailItems.hide();
                $('.sideGoodCategoriesMenu .list li').removeClass('active');
                clearTimeout(detailTimer);
                isSelected = false;
            }, 200);
        });

        menuItems.mouseover(function (){
            var that = $(this);

            if (isSelected == false){
                if (that.index() != -1) {
                    clearTimeout(detailTimer);
                    detail.show();

                    menuItems.removeClass('active');
                    that.addClass('active');

                    detailItems.hide();
                    detailItems.eq(that.index()).show();
                    isSelected = true;
                }
            } else {
                if (that.index() != -1) {
                    clearTimeout(detailTimer);
                    detail.show();

                    detailTimer = setTimeout(function (){
                        menuItems.removeClass('active');
                        that.addClass('active');

                        detailItems.hide();
                        detailItems.eq(that.index()).show();
                    }, 200)
                }
                isSelected = true;
            }

        });

        detailItems.mouseover(function (){
            clearTimeout(detailTimer);
        });

    }

    sidebar();

    // go top
    $(".go_top").click(function () {
        $("html,body").animate({ "scrollTop": 0 }, 200);
    });


    /* Table components
     * used: mywanjiaIndex.html
     * */
    function components_Table() {
        $('.table .tableThumb').each(function (){
            var thumbs = $(this).find('a');

            if (thumbs.length > 3) {
                $(this).find('.tableThumbSwitch').show();
            }

            // bind switch btn
            $(this).find('.tableThumbSwitch').click(function (){

                if (!$(this).prop('data-collapse')) {
                    $(this).siblings('.tableThumbBd').animate({ 'width': (50+8) * thumbs.length + 'px'});
                    $(this).prop('data-collapse', true);
                } else {
                    $(this).siblings('.tableThumbBd').animate({ 'width': 170 + 'px'});
                    $(this).prop('data-collapse', false);
                }
            });
        });
    }

    components_Table();

    function components_Checkbox(){
        $('.checkbox').click(function (){
            if ($(this).attr('data-checked') != 'true') {
                $(this).attr('data-checked', true).addClass('active');
            } else {
                $(this).attr('data-checked', false).removeClass('active');
            }
        });
    }
    components_Checkbox();

    /* floatEntry */
    function floatEntry (){
        $(window).scroll(function (){
            if($(window).scrollTop() >= 490) {
                $('.floatEntry').fadeIn();
            } else {
                $('.floatEntry').fadeOut();
            }
        })
    }

    floatEntry();

    /* panel */
    function panel(){
        $('.messagePanel .closeBtn').click(function () {
            $(this).parents('.messagePanel').fadeOut();
        });

        // absolutePosition panel
        // invoke: showAbsolutePanel('.btn', '.absolutePanel');
        function showAbsolutePanel(btn, panel){
            $(btn).click(function (){
                $(panel).css({
                    "position": "absolute",
                    'left': $(this).offset().left + 'px',
                    'top': $(this).offset().top + $(this).height() + 5 + 'px',
                    'margin-left': '0',
                    'margin-top': '0'
                }).fadeIn();
            });
        }


    }
    panel();


    /* comment-img: img tab */
    function commentImg (){
        var mod = $('.comment-img'),
                hdItem = mod.find('.comment-img-hd li'),
            bdItem = mod.find('.comment-img-bd li'),
            bdItemLen = bdItem.length,
            prevBtn = mod.find('.prev'),
            nextBtn = mod.find('.next');

        hdItem.click(function (){
            var index = $(this).index();

            $(this).addClass('active')
                .siblings('li').removeClass('active');

            $(this).parents('.comment-img-hd')
                .siblings('.comment-img-bd').find('li').removeClass('active')
                .eq(index).addClass('active');
        });

        prevBtn.click(function (){
            var nowItemIndex = $('.comment-img-hd li.active').index();

            if(nowItemIndex > 0) {
                hdItem.eq(nowItemIndex).removeClass('active')
                    .prev('li').addClass('active');
                bdItem.eq(nowItemIndex).removeClass('active')
                    .prev('li').addClass('active');
            } else {
            }
        });

        nextBtn.click(function (){
            var nowItemIndex = $('.comment-img-hd li.active').index();

            if(nowItemIndex < bdItemLen-1) {
                hdItem.eq(nowItemIndex).removeClass('active')
                    .next('li').addClass('active');
                bdItem.eq(nowItemIndex).removeClass('active')
                    .next('li').addClass('active');
            } else {
            }
        });

    }
    commentImg();

    // upload images and preview
    var uploadImgIndex = 0;
    function upLoadImg (){
        function change(obj, img) {
            var pic = $(img);
            var file = $(obj);
            var ext=file.val().substring(file.val().lastIndexOf(".")+1).toLowerCase();
            // gif在IE浏览器暂时无法显示
            if(ext!='png'&&ext!='jpg'&&ext!='jpeg'){
                alert("文件必须为图片！"); return;
            }
            // IE浏览器
            if (document.all) {
                file.select();
                file.blur();
                var reallocalpath = document.selection.createRange().text;
                var ie6 = /msie 6/i.test(navigator.userAgent);
                // IE6浏览器设置img的src为本地路径可以直接显示图片
                if (ie6) pic.src = reallocalpath;
                else {
                    /*这种方式不能控制大小*/
                    // 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现
                    //pic[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
                    // 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
                    // pic[0].src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
                    pic = pic.parent('div');
                    pic.html('');
                    pic[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                    pic[0].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = reallocalpath;
                    pic[0].style.width = "100px";
                    pic[0].style.height = "100px";
                }
            }else{
                html5Reader(file, img);
            }
        }

        function html5Reader(file, img){
            var file = file[0].files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e){
                var pic = $(img);
                pic.attr("src", this.result);

            }
        }

        // call
        $('.chooseFile').change(function (){
            var imgWrap = $(this).parents('.uploadImg');

            // create img dom
            imgWrap.find('.imgList')
                .append('<span data-index="' + uploadImgIndex +'"><img/></span>');

            // create img
            change($(this), '.uploadImg span[data-index="' + uploadImgIndex +'"] img');

            // add img src to input
            imgWrap.find('input[type="hidden"]')
                .eq(imgWrap.find('img').length-1).attr("value", imgWrap.find('.chooseFile').val());

            // updata imgCount
            imgWrap.find('.imgCount span').text(imgWrap.find('img').length);
        });
    }
    upLoadImg();
    
});

//����ʱ
$.fn.extend({
    Countdown: function (options) {
        var that = this,
            el = $(that);
        that.options = {
            "day": el.find(".day"),
            "hour": el.find(".hour"),
            "minute": el.find(".minute"),
            "second": el.find(".second"),
            "callback": function () { }
        }
        for (var i in options) {
            this.options[i] = options[i];
        }
        function getDate(strDate) {
            var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/, function (a) {
                return parseInt(a, 10);
            }).match(/\d+/g) + ')');
            return date;
        }
        var opt = that.options,
            startTime = new Date(),
            nMS = getDate(el.attr("data-time")).getTime() - startTime.getTime();
        var setIntv = setInterval(function () {
            var nH = (Math.floor(nMS / (1000 * 60 * 60)) % 24) % 60;
            //������Сʱ
            var nM = (Math.floor(nMS / (1000 * 60)) % 60) % 60;
            //�����÷���
            var nS = (Math.floor(nMS / 1000) % 60) % 60;
            //��������

            opt.second.html(nS);
            opt.minute.html(nM);
            opt.hour.html(nH);
            nMS -= 1000;

            if (nH == 0 && nM == 0 && nS == 0) {
                clearInterval(setIntv);
                opt.callback(that);
            }
        }, 1000);
    }
});



