// JavaScript Document

/********************************************************************************************************
 * 전역 함수모음
 *********************************************************************************************************/
$(function() {
    try {
        $('.answerArea .stateBar').each(function() {
            var y = $(this).parent('.partition').height();
            $(this).height(y);
        });
    } catch (e) {

    }
});

$(function() {
    try {
        $('.replyArea .stateBar').each(function() {
            var y = $(this).parent('.partition').height();
            $(this).height(y);
        });
    } catch (e) {

    }
});

/********** LNB Accodian 함수 스크립트 **********/
/*
$(function() {
	$(".lnb h3").click(function()
	{
		var arr = $(".lnb h3");
		var current_index = $(".lnb h3").index(this);
		$.each(arr, function(index) {
			var displayValue = $(this).next(".menuSub").css("display");
			if (displayValue == "block" && current_index != index) {
				$(this).next(".menuSub").slideToggle(300).siblings(".menuSub").slideUp("slow");
			}
		});

		$(this).next(".menuSub").slideToggle(300).siblings(".menuSub").slideUp("slow");
	});
});

*/

/********** LNB Accodian 함수 스크립트 **********/
var isLnbOpening = false;
$(function() {
    try {
        $(".lnb h3").click(function() {
            //2014.12
            var arr = $(".lnb h3");
            var current_index = $(".lnb h3").index(this);
            $.each(arr, function(index) {
                if (current_index != index) {
                    $(this).removeClass("open");
                }
            })

            // odious 추가 (활성화된 Left Submenu 처리)
            if (!isLnbOpening) {
                isLnbOpening = true;
                $(this).parent("li").siblings().removeClass("on");

                $(this).siblings().removeClass("open");
                $(".lnb li:not(.on) h3").next(".menuSub").slideUp(300);

                $(this).parent("li").toggleClass("on");
                $(this).toggleClass("open");
                $(this).next(".menuSub").slideToggle(300, function() {
                    isLnbOpening = false;
                });
            }
        });

        // odious 추가 (페이지 오픈시 활성화된 Left Submenu 처리)
        $(".lnb li .menuSub:visible").parent("li").addClass("on");
    } catch (e) {

    }
});

/* portfolio LNB 메뉴 추가 (160216) */
$(function() {
    // on 붙은 게 포커싱
    twoNum = jQuery("ul.pf_lnb>li").index(jQuery("ul.pf_lnb>li.on"));

    // on 붙은 게 포커싱
    curTwoNum = twoNum;
    if (twoNum > -1) {
        jQuery("ul.pf_lnb>li").eq(twoNum).find(".lnbTwo").slideToggle(0);
        jQuery("ul.pf_lnb>li").eq(twoNum).addClass("on");
    }
    jQuery("ul.pf_lnb>li").each(function(q) {
        jQuery(this).children("a").click(function(e) {
            // 하위 메뉴가 없을 경우 링크를 태우고
            // 하위 메뉴가 있을 경우 링크 X
            if (jQuery(this).next("div").size() > 0) {
                e.preventDefault();

                if (q != curTwoNum) {
                    if (curTwoNum > -1) {
                        jQuery("ul.pf_lnb>li").eq(curTwoNum).removeClass("on");
                        jQuery("ul.pf_lnb>li").eq(curTwoNum).find(".lnbTwo").hide();
                    }
                    curTwoNum = q;
                    jQuery("ul.pf_lnb>li").eq(curTwoNum).addClass("on");
                    jQuery("ul.pf_lnb>li").eq(curTwoNum).find(".lnbTwo").slideToggle(0);
                }
            }
        })
    })
})


$(function() {


    try {
        $.fn.autowidth = function(width) {
            var n = $("ul.lnb > li").length;

            if (width > 1200 || navigator.userAgent.indexOf("MSIE 8") > -1) {
                $('ul.lnb > li').css({
                    'width': 100 + '%'
                })
            } else {
                $('ul.lnb > li').css({
                    'width': (100 / $('ul.lnb > li').length) + '%'
                });
                if (n >= 6) {
                    $('ul.lnb > li').css({
                        'width': '25%'
                    })
                }
            }
        };
        /*var i = $(window).width();*/
        //$('ul.lnb').autowidth();
        $('ul.lnb').autowidth($(window).innerWidth());
    } catch (e) {}


    try {
        $.fn.autowidth3 = function(width) {
            $('ul.gnbList2 > li').css({
                'width': (100 / $('ul.gnbList2 > li').length) + '%'
            });
        };
    } catch (e) {}

    var i = $(window).width();

    try {
        $('ul.gnbList2').autowidth3(i);
    } catch (e) {}
});


$(window).resize(function() {
    try {
        //$('ul.lnb').autowidth();
        $('ul.lnb').autowidth($(window).innerWidth());
    } catch (e) {}
});


/* portfolio LNB 메뉴 */
$(function() {
    try {
        $.fn.autowidth_pf = function(width) {
            var n = $("ul.pf_lnb > li").length;

            if (width > 1200 || navigator.userAgent.indexOf("MSIE 8") > -1) {
                $('ul.pf_lnb > li').css({
                    'width': 100 + '%'
                })
            } else {
                $('ul.pf_lnb > li').css({
                    'width': (100 / $('ul.pf_lnb > li').length) + '%'
                });
                if (n >= 6) {
                    $('ul.pf_lnb > li').css({
                        'width': '25%'
                    })
                }
            }
        };
        $('ul.pf_lnb').autowidth_pf($(window).innerWidth());
    } catch (e) {}
});
$(window).resize(function() {
    $('ul.pf_lnb').autowidth_pf($(window).innerWidth());
});


/* portfolio TAB 메뉴 */
$(function() {
    try {
        $.fn.autowidth_tab = function(width) {
            var n = $("ul.tab_menu_type01 > li").length;

            if ($(this)) {
                $('ul.tab_menu_type01 > li').css({
                    'width': (100 / $('ul.tab_menu_type01 > li').length) + '%'
                });
                if (n >= 8) {
                    $('ul.tab_menu_type01 > li').css({
                        'width': '25%'
                    })
                }
            }
        };
        $('ul.tab_menu_type01').autowidth_tab($(window).innerWidth());
    } catch (e) {}
});
$(window).resize(function() {
    try {
        $('ul.tab_menu_type01').autowidth_tab($(window).innerWidth());
    } catch (e) {}
});
$(function() {
    try {
        $.fn.autowidth2 = function(width) {
            $('ul.gnbList > li').css({
                'width': (100 / $('ul.gnbList > li').length) + '%'
            });
        };
        var i = $(window).width();
        $('ul.gnbList').autowidth2(i);
    } catch (e) {

    }
});

$(window).resize(function() {
    //$('ul.gnbList').autowidth2();
    $('ul.gnbList2').autowidth3($(window).innerWidth());
});

$(window).resize(function() {
    try {
        //$('ul.gnbList').autowidth2();
        $('ul.gnbList').autowidth2($(window).innerWidth());
    } catch (e) {

    }
});


/********** toggle-Switch 함수 스크립트 **********/
/*
$(function() {
	$("input[type=checkbox].switch").each(function() {
	$(this).before(
	'<span class="switch">' +
	'<span class="mask" /><span class="background" />' +
	'</span>'
	);	
	$(this).hide();
	if (!$(this)[0].checked) {
	$(this).prev().find(".background").css({left: "-27px"});
	}
	});
	$("span.switch").click(function() {
	if ($(this).next()[0].checked) {
	$(this).find(".background").animate({left: "-27px"}, 200);
	} else {
	$(this).find(".background").animate({left: "0px"}, 200);
	}
	$(this).next()[0].checked = !$(this).next()[0].checked;
	});

	$("input[type=checkbox].switch_use").each(function() {
	$(this).before(
	'<span class="switch_use">' +
	'<span class="mask" /><span class="background" />' +
	'</span>'
	);	
	$(this).hide();
	if (!$(this)[0].checked) {
	$(this).prev().find(".background").css({left: "-60px"});
	}
	});
	$("span.switch_use").click(function() {
	if ($(this).next()[0].checked) {
	$(this).find(".background").animate({left: "-60px"}, 200);
	} else {
	$(this).find(".background").animate({left: "-4px"}, 200);
	}
	$(this).next()[0].checked = !$(this).next()[0].checked;
	});
	
	$("input[type=checkbox].switch_line").each(function() {
	$(this).before(
	'<span class="switch_line">' +
	'<span class="mask" /><span class="background" />' +
	'</span>'
	);	
	$(this).hide();
	if (!$(this)[0].checked) {
	$(this).prev().find(".background").css({left: "-27px"});
	}
	});
	$("span.switch_line").click(function() {
	if ($(this).next()[0].checked) {
	$(this).find(".background").animate({left: "-27px"}, 200);
	} else {
	$(this).find(".background").animate({left: "0px"}, 200);
	}
	$(this).next()[0].checked = !$(this).next()[0].checked;
	});
});
*/
/********** Select Box 함수 스크립트 **********/
$(function() {
    enableSelectBoxes();
});

function enableSelectBoxes() {
    try {
        $('div.selectBox, .selectButton').each(function() {
            $(this).children('span.selected').html($(this).children('ul').children('li').html());

            $(this).children('span.selected,span.selectArrow').click(function() {
                if ($(this).parent().children('ul').css('display') == 'none') {
                    $(this).parent().children('ul').css('display', 'block');
                } else {
                    $(this).parent().children('ul').css('display', 'none');
                }
            });
            $('div.selectBox, .selectButton').mouseleave(function() {
                $(this).children('ul').hide();
            });
            var inputId = $(this).attr('id');
            $(this).find('li').click(function() {
                $(this).parent().css('display', 'none');
                $(this).closest('div.selectBox, .selectButton').attr('value', $(this).attr('value'));
                if (typeof inputId != 'undefined') {
                    $("input[name='" + inputId + "']").val($(this).attr('value'));
                }
                //				$(this).parent().siblings('span.selected').html($(this).html());
            });
        });
    } catch (e) {

    }
}

/********** DropBox 함수 스크립트 **********/
$(function() {
    try {
        $(".dropBox").each(function() {
            var _this = $(this);
            $(this).hover(function() {
                    $(this).addClass("on");
                    $(this).children(".option").fadeIn();
                    if (_this.children(".option").css("display") == "block") {
                        var image = $(this).children().children("img");
                        var imgsrc = $(image).attr("src");
                        //$(".dropBox img").each(function () { this.src = this.src.replace("_on", "_off") })
                        //image.attr("src", imgsrc.replace("_off.gif", "_on.gif"))
                    }
                },
                function() {
                    $(this).removeClass("on");
                    $(this).children(".option").hide();;
                    var image = $(this).children().children("img");
                    var imgsrc = $(image).attr("src");
                    //image.attr("src", imgsrc.replace("_on.gif", "_off.gif"))
                })
        });
    } catch (e) {

    }
});

/********** 테이블 ODD-ROW 함수 스크립트 **********/
$(function() {
    try {
        /* For zebra striping */
        $("table tr:nth-child(odd)").addClass("odd-row");
        /* For cell text alignment */
        $("table td:first-child, table th:first-child").addClass("first");
        /* For removing the last border */
        $("table td:last-child, table th:last-child").addClass("last");
        /***** OPEN 함수 스크립트 추가 *****/
    } catch (e) {

    }
});

/********** #modal_popup **********/
$(function() {
    try {
        $('#siteLayer').on('click', function() {
            $.fn.custombox(this, {
                overlay: true,
                effect: 'fadein'
            });
            return false;
        });
    } catch (e) {

    }
});

/**********  ToggleClass 함수 스크립트 **********/
$(function() {
    try {
        $('.handleTop img').click(function() {
            $("#headerContent").slideToggle(300);
            var imgsrc = $(this).attr("src");
            if (imgsrc.indexOf("_on.png") > 0) {
                $(this).attr("src", imgsrc.replace("_on.png", "_off.png"));
                CourseWork.classroomClose(classroomCloseCallback);
            } else if (imgsrc.indexOf("_off.png") > 0) {
                $(this).attr("src", imgsrc.replace("_off.png", "_on.png"));
                CourseWork.classroomOpen(classroomOpenCallback);
            }
        });

        $('.handleTable img').click(function() {
            $(this).parent().parent().children(".element").find("dd:last").toggle();
            var imgsrc = $(this).attr("src");
            if (imgsrc.indexOf("_on.png") > 0) {
                $(this).attr("src", imgsrc.replace("_on.png", "_off.png"));
            } else if (imgsrc.indexOf("_off.png") > 0) {
                $(this).attr("src", imgsrc.replace("_off.png", "_on.png"));
            }
        });
    } catch (e) {

    }
});

/********** 관리자 LNB CONTROL **********/
/**
 * depth1: 대메뉴 번호(start:0)
 * depth2: 소메뉴 번호(start:0)
 */
function admin_sub_menu(depth1, depth2) {
    try {
        $('.lnb h3')
            .eq(depth1).addClass('open')
            .next().show()
            .children()
            .eq(depth2)
            .children().css({
                color: '#fff',
                backgroundPosition: '0px -34px'
            });
    } catch (e) {

    }
}

function menufold() {
    try {
        $('.menu-icon').click(function() {
            $('#aside, #bodyContent, #aside h3 [class^="icon-"], #aside h3 span, ul.menuSub, .menuSubHover ul').toggleClass('on');
        });
    } catch (e) {

    }
};

/********** 할일목록 메뉴 **********/
$(function() {
    try {
        $("#todayList .next_btn").click(function() {
            $("#todayList .listBox").animate(100, function() {
                $("ul.listNum").eq(0).clone(true).appendTo(this);
                $("ul.listNum").eq(0).remove();
                $("#todayList .listBox");
            });
            return false;
        });
        $("#todayList .prev_btn").click(function() {
            var leg = $("ul.listNum").length;
            $("ul.listNum").eq(leg - 1).clone(true).prependTo("#todayList .listBox");
            $("ul.listNum").eq(leg).remove();
            $("#todayList .listBox");
            $("#todayList .listBox").animate(100, function() {});
            return false;
        });
    } catch (e) {

    }
});

/********** footerFamily 메뉴 **********/
$(function() {
    try {
        $(".footerFamilySel").each(function() {
            var _this = $(this);
            $(this).hover(function() {
                $(this).addClass("on");
                $(this).children(".footerFamilyList").fadeIn();
                if (_this.children(".footerFamilyList").css("display") == "block") {
                    var image = $(this).children().children("img");
                    var imgsrc = $(image).attr("src");

                    $(".footerFamilySel img").each(function() {
                        this.src = this.src.replace("_on", "_off")
                    })
                    image.attr("src", imgsrc.replace("_off.gif", "_on.gif"))
                }
            }, function() {
                $(this).removeClass("on");
                $(this).children(".footerFamilyList").hide();;

                var image = $(this).children().children("img");
                var imgsrc = $(image).attr("src");
                image.attr("src", imgsrc.replace("_on.gif", "_off.gif"))
            });
        });
    } catch (e) {

    }
});


/********** SCROLL TOP 함수 스크립트 **********/
$(window).scroll(function() {
    try {
        if ($(this).scrollTop()) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    } catch (e) {

    }

});

/********** TREEVIEW 함수 스크립트 **********/
this.sitemapstyler = function() {
    var sitemap = document.getElementById("treeview");
    if (sitemap) {
        this.listItem = function(li) {
            if (li.getElementsByTagName("ul").length > 0) {
                var ul = li.getElementsByTagName("ul")[0];
                ul.style.display = "none";
                var span = document.createElement("span");
                span.className = "collapsed";
                span.onclick = function() {
                    ul.style.display = (ul.style.display == "none") ? "block" : "none";
                    this.className = (ul.style.display == "none") ? "collapsed" : "expanded";
                };
                li.appendChild(span);
            };
        };
        var items = sitemap.getElementsByTagName("li");
        for (var i = 0; i < items.length; i++) {
            listItem(items[i]);
        };
    };
};
window.onload = sitemapstyler;

$(function() {
    try {
        $('#treeview li').click(function() {
            var temp = $(this).attr("title");
            if (temp == "adminFavorate") {
                var classs = $(this).attr("class");
                if (classs != "" && classs.indexOf("select") > -1) {
                    $(this).removeClass('select');
                } else {
                    $(this).addClass('select');
                }
            } else {
                $(this).parent().children('.select').removeClass('select');

                $(this).parent().children('.select').removeClass('select');
                $(this).addClass('select');
            }
        });
    } catch (e) {

    }

});


/********** MYPAGE sortable 레이아웃 [jquery-ui]  **********/
/*
$(function() {
	$( ".column" ).sortable({
	  items: ".portlet:not(.disabled)",
	  containment: "#bodyContent", 
	  connectWith: ".column",
	  handle: ".portlet-header",
	  cancel: ".portlet-toggle",
	  revert: true,
	  opacity: 0.6
	  //placeholder: "portlet-placeholder ui-corner-all"
	});
	$(".sortable").disableSelection();
	$( ".portlet" )
	  .find( ".portlet-header" )
		.prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span><span class='ui-icon ui-icon-closethick portlet-disabled'></span>");
	$( ".portlet-toggle" ).click(function() {
	  var icon = $( this );
	  icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
	  icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
	});
	$( ".portlet-disabled" ).click(function() {
	  if(confirm('선택하신 요소를 삭제하시겠습니까?')) {
		  var parents = $( this );
		  parents.closest( ".portlet" ).remove();
		}
	});
});
*/

/********** File Upload 버튼  **********/
function getName(str) {
    if (str.lastIndexOf('\\')) {
        var i = str.lastIndexOf('\\') + 1;
    } else {
        var i = str.lastIndexOf('/') + 1;
    }
    var filename = str.slice(i);
    var uploaded = document.getElementById("fileformlabel");
    uploaded.innerHTML = filename;
}

function getNamea(str) {
    if (str.lastIndexOf('\\')) {
        var i = str.lastIndexOf('\\') + 1;
    } else {
        var i = str.lastIndexOf('/') + 1;
    }
    var filename = str.slice(i);
    var uploaded = document.getElementById("fileformlabela");
    uploaded.innerHTML = filename;
}

/********** input radio, checkbox 이미지 적용 **********/
$(function() {
    $("input[type='radio']:checked").next("label").addClass("on");
    $("input[type='checkbox']:checked").next("label").addClass("on");
    $("label.radio").click(function() {
        $(this).parent().find("label.radio").removeClass("on");
        $(this).addClass("on");
    });
    $("label.checkbox").click(function() {
        if ($(this).siblings("input").prop("checked") === false) {
            $(this).addClass("on");
        } else {
            $(this).removeClass("on");
        }
    });
});


/********** 강의실/데모 설정 이미지 메뉴 **********/


$(function() {
    try {
        $("ul.designLayout label").click(function() {
            $(this).addClass("on").parent().siblings().find(".on").removeClass("on");
            if ($(this).attr("for") != "")
                $("#" + $(this).attr("for")).click();
        });
    } catch (e) {

    }
});



$(function() {
    try {
        $("ul.designImg li label").click(function() {
            $(this).addClass("on").parent().siblings().find(".on").removeClass("on");

            if ($(this).attr("for") != "")
                $("#" + $(this).attr("for")).click();


            //document.courseForm.uploadTopFileNames.value ="";
            //document.getElementById("showPaletteOnly1").value="";
        });
    } catch (e) {

    }

});

$(function() {
    try {
        $("ul.designImga li label").click(function() {
            $(this).addClass("on").parent().siblings().find(".on").removeClass("on");

            if ($(this).attr("for") != "")
                $("#" + $(this).attr("for")).click();

            //document.courseForm.uploadBgFileNames.value ="";
            //document.getElementById("showPaletteOnly3").value="";
        });
    } catch (e) {

    }

});
/*
$(function() {
	$("ul.designImg li img").click(function(){
		$("ul.designImg li img").each(function(){
		$(this).attr("src",$(this).attr("src").replace("_on.jpg","_off.jpg"));
	});
	$(this).attr("src",$(this).attr("src").replace("_off.jpg","_on.jpg"));
	});
});
*/


/********** selectbox CSS 적용 **********/
$(function() {
    var config = {
        '.default-search': {
            width: "100%"
        },
        '.default-deselect': {
            allow_single_deselect: true
        },
        '.default': {
            disable_search_threshold: 10,
            search_contains: true
        },
        '.default-no-results': {
            no_results_text: 'Oops, nothing found!'
        },
        '.default-width': {
            width: "100%"
        }
    }
    try {
        for (var selector in config) {
            $(selector).chosen(config[selector]);
        }
    } catch (e) {}
});

/********** Tooltip 적용 **********/
$(function() {
    try {
        var targets = $('[rel~=tooltip]'),
            target = false,
            tooltip = false,
            title = false;

        targets.bind('mouseenter', function() {
            target = $(this);
            tip = target.attr('title');
            tooltip = $('<div id="tooltip"></div>');

            if (!tip || tip == '')
                return false;

            target.removeAttr('title');
            tooltip.css('opacity', 0)
                .html(tip)
                .appendTo('body');

            var init_tooltip = function() {
                if ($(window).width() < tooltip.outerWidth() * 1.5)
                    tooltip.css('max-width', $(window).width() / 2);
                else
                    tooltip.css('max-width', 340);

                var pos_left = target.offset().left + (target.outerWidth() / 2) - (tooltip.outerWidth() / 2),
                    pos_top = target.offset().top - tooltip.outerHeight() - 20;

                if (pos_left < 0) {
                    pos_left = target.offset().left + target.outerWidth() / 2 - 20;
                    tooltip.addClass('left');
                } else
                    tooltip.removeClass('left');

                if (pos_left + tooltip.outerWidth() > $(window).width()) {
                    pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
                    tooltip.addClass('right');
                } else
                    tooltip.removeClass('right');

                if (pos_top < 0) {
                    var pos_top = target.offset().top + target.outerHeight();
                    tooltip.addClass('top');
                } else
                    tooltip.removeClass('top');

                tooltip.css({
                        left: pos_left,
                        top: pos_top
                    })
                    .animate({
                        top: '+=10',
                        opacity: 1
                    }, 50);
            };

            init_tooltip();
            $(window).resize(init_tooltip);

            var remove_tooltip = function() {
                tooltip.animate({
                    top: '-=10',
                    opacity: 0
                }, 50, function() {
                    $(this).remove();
                });

                target.attr('title', tip);
            };

            target.bind('mouseleave', remove_tooltip);
            tooltip.bind('click', remove_tooltip);
        });
    } catch (e) {

    }
});

/********** Click addclass 적용 **********/
$(function() {
    try {
        $('.opt').click(function() {
            $('.opt').removeClass('fcw');
            $(this).addClass('fcw');
        });
    } catch (e) {

    }
});

function inputCheckSpecial(obj) {

    var special_str = /[`~!@#$%^&*|\\\'\";:<>\/?]/gi;
    if (special_str.test(obj.value)) {
        alert("특수문자는 입력하실수 없습니다.");
        obj.value = "";
    }
}

$(function() {
    try {
        $('.toggle_btn').click(function() {
            $('.blind_box').toggleClass('on');


            var box = $('.blind_box').attr("class");
            if (box.indexOf("on") > -1) {
                document.getElementById("showGubun").value = "Y"
            } else {
                document.getElementById("showGubun").value = "N"
            }
        });
    } catch (e) {

    }
});


/********** toggle-Switch 함수 스크립트 **********/
/*
$(function() {
	$("span.switch").click(function() {
	if ($(this).next()[0].checked) {
	$(this).find(".background").animate({left: "-27px"}, 200);
	} else {
	$(this).find(".background").animate({left: "0px"}, 200);
	}
	$(this).next()[0].checked = !$(this).next()[0].checked;
	});

	$("input[type=checkbox].switch_use").each(function() {
	$(this).before(
	'<span class="switch_use">' +
	'<span class="mask" /><span class="background" />' +
	'</span>'
	);	
	$(this).hide();
	if (!$(this)[0].checked) {
	$(this).prev().find(".background").css({left: "-60px"});
	}
	});
	$("span.switch_use").click(function() {
	if ($(this).next()[0].checked) {
	$(this).find(".background").animate({left: "-60px"}, 200);
	} else {
	$(this).find(".background").animate({left: "-4px"}, 200);
	}
	$(this).next()[0].checked = !$(this).next()[0].checked;
	});
	
	$("input[type=checkbox].switch_line").each(function() {
	$(this).before(
	'<span class="switch_line">' +
	'<span class="mask" /><span class="background" />' +
	'</span>'
	);	
	$(this).hide();
	if (!$(this)[0].checked) {
	$(this).prev().find(".background").css({left: "-27px"});
	}
	});
	$("span.switch_line").click(function() {
	if ($(this).next()[0].checked) {
	$(this).find(".background").animate({left: "-27px"}, 200);
	} else {
	$(this).find(".background").animate({left: "0px"}, 200);
	}
	$(this).next()[0].checked = !$(this).next()[0].checked;
	});
	

});
*/

/********** Star Rating Plugin 적용 **********/
/*# AVOID COLLISIONS #*/
;
if (window.jQuery)(function($) {
    /*# AVOID COLLISIONS #*/

    // IE6 Background Image Fix
    if ((!$.support.opacity && !$.support.style)) try {
        document.execCommand("BackgroundImageCache", false, true)
    } catch (e) {};
    // Thanks to http://www.visualjquery.com/rating/rating_redux.html

    // plugin initialization
    $.fn.rating = function(options) {
        if (this.length == 0) return this; // quick fail

        // Handle API methods
        if (typeof arguments[0] == 'string') {
            // Perform API methods on individual elements
            if (this.length > 1) {
                var args = arguments;
                return this.each(function() {
                    $.fn.rating.apply($(this), args);
                });
            };
            // Invoke API method handler
            $.fn.rating[arguments[0]].apply(this, $.makeArray(arguments).slice(1) || []);
            // Quick exit...
            return this;
        };

        // Initialize options for this call
        var options = $.extend({} /* new object */ ,
            $.fn.rating.options /* default options */ ,
            options || {} /* just-in-time options */
        );

        // Allow multiple controls with the same name by making each call unique
        $.fn.rating.calls++;

        // loop through each matched element
        this
            .not('.star-rating-applied')
            .addClass('star-rating-applied')
            .each(function() {

                // Load control parameters / find context / etc
                var control, input = $(this);
                var eid = (this.name || 'unnamed-rating').replace(/\[|\]/g, '_').replace(/^\_+|\_+$/g, '');
                var context = $(this.form || document.body);

                // FIX: http://code.google.com/p/jquery-star-rating-plugin/issues/detail?id=23
                var raters = context.data('rating');
                if (!raters || raters.call != $.fn.rating.calls) raters = {
                    count: 0,
                    call: $.fn.rating.calls
                };
                var rater = raters[eid] || context.data('rating' + eid);

                // if rater is available, verify that the control still exists
                if (rater) control = rater.data('rating');

                if (rater && control) //{// save a byte!
                    // add star to control if rater is available and the same control still exists
                    control.count++;

                //}// save a byte!
                else {
                    // create new control if first star or control element was removed/replaced

                    // Initialize options for this rater
                    control = $.extend({} /* new object */ ,
                        options || {} /* current call options */ ,
                        ($.metadata ? input.metadata() : ($.meta ? input.data() : null)) || {}, /* metadata options */ {
                            count: 0,
                            stars: [],
                            inputs: []
                        }
                    );

                    // increment number of rating controls
                    control.serial = raters.count++;

                    // create rating element
                    rater = $('<span class="star-rating-control"/>');
                    input.before(rater);

                    // Mark element for initialization (once all stars are ready)
                    rater.addClass('rating-to-be-drawn');

                    // Accept readOnly setting from 'disabled' property
                    if (input.attr('disabled') || input.hasClass('disabled')) control.readOnly = true;

                    // Accept required setting from class property (class='required')
                    if (input.hasClass('required')) control.required = true;

                    // Create 'cancel' button
                    rater.append(
                        control.cancel = $('<div class="rating-cancel"><a title="' + control.cancel + '">' + control.cancelValue + '</a></div>')
                        .on('mouseover', function() {
                            $(this).rating('drain');
                            $(this).addClass('star-rating-hover');
                            //$(this).rating('focus');
                        })
                        .on('mouseout', function() {
                            $(this).rating('draw');
                            $(this).removeClass('star-rating-hover');
                            //$(this).rating('blur');
                        })
                        .on('click', function() {
                            $(this).rating('select');
                        })
                        .data('rating', control)
                    );

                }; // first element of group

                // insert rating star (thanks Jan Fanslau rev125 for blind support https://code.google.com/p/jquery-star-rating-plugin/issues/detail?id=125)
                var star = $('<div role="text" aria-label="' + this.title + '" class="star-rating rater-' + control.serial + '"><a title="' + (this.title || this.value) + '">' + this.value + '</a></div>');
                rater.append(star);

                // inherit attributes from input element
                if (this.id) star.attr('id', this.id);
                if (this.className) star.addClass(this.className);

                // Half-stars?
                if (control.half) control.split = 2;

                // Prepare division control
                if (typeof control.split == 'number' && control.split > 0) {
                    var stw = ($.fn.width ? star.width() : 0) || control.starWidth;
                    var spi = (control.count % control.split),
                        spw = Math.floor(stw / control.split);
                    star
                        // restrict star's width and hide overflow (already in CSS)
                        .width(spw)
                        // move the star left by using a negative margin
                        // this is work-around to IE's stupid box model (position:relative doesn't work)
                        .find('a').css({
                            'margin-left': '-' + (spi * spw) + 'px'
                        })
                };

                // readOnly?
                if (control.readOnly) //{ //save a byte!
                    // Mark star as readOnly so user can customize display
                    star.addClass('star-rating-readonly');
                //}  //save a byte!
                else //{ //save a byte!
                    // Enable hover css effects
                    star.addClass('star-rating-live')
                    // Attach mouse events
                    .on('mouseover', function() {
                        $(this).rating('fill');
                        $(this).rating('focus');
                    })
                    .on('mouseout', function() {
                        $(this).rating('draw');
                        $(this).rating('blur');
                    })
                    .on('click', function() {
                        $(this).rating('select');
                    });
                //}; //save a byte!

                // set current selection
                if (this.checked) control.current = star;

                // set current select for links
                if (this.nodeName == "A") {
                    if ($(this).hasClass('selected'))
                        control.current = star;
                };

                // hide input element
                input.hide();

                // backward compatibility, form element to plugin
                input.on('change.rating', function(event) {
                    if (event.selfTriggered) return false;
                    $(this).rating('select');
                });

                // attach reference to star to input element and vice-versa
                star.data('rating.input', input.data('rating.star', star));

                // store control information in form (or body when form not available)
                control.stars[control.stars.length] = star[0];
                control.inputs[control.inputs.length] = input[0];
                control.rater = raters[eid] = rater;
                control.context = context;

                input.data('rating', control);
                rater.data('rating', control);
                star.data('rating', control);
                context.data('rating', raters);
                context.data('rating' + eid, rater); // required for ajax forms
            }); // each element

        // Initialize ratings (first draw)
        $('.rating-to-be-drawn').rating('draw').removeClass('rating-to-be-drawn');

        return this; // don't break the chain...
    };

    /*--------------------------------------------------------*/

    /*
    	### Core functionality and API ###
    */
    $.extend($.fn.rating, {
        // Used to append a unique serial number to internal control ID
        // each time the plugin is invoked so same name controls can co-exist
        calls: 0,

        focus: function() {
            var control = this.data('rating');
            if (!control) return this;
            if (!control.focus) return this; // quick fail if not required
            // find data for event
            var input = $(this).data('rating.input') || $(this.tagName == 'INPUT' ? this : null);
            // focus handler, as requested by focusdigital.co.uk
            if (control.focus) control.focus.apply(input[0], [input.val(), $('a', input.data('rating.star'))[0]]);
        }, // $.fn.rating.focus

        blur: function() {
            var control = this.data('rating');
            if (!control) return this;
            if (!control.blur) return this; // quick fail if not required
            // find data for event
            var input = $(this).data('rating.input') || $(this.tagName == 'INPUT' ? this : null);
            // blur handler, as requested by focusdigital.co.uk
            if (control.blur) control.blur.apply(input[0], [input.val(), $('a', input.data('rating.star'))[0]]);
        }, // $.fn.rating.blur

        fill: function() { // fill to the current mouse position.
            var control = this.data('rating');
            if (!control) return this;
            // do not execute when control is in read-only mode
            if (control.readOnly) return;
            // Reset all stars and highlight them up to this element
            this.rating('drain');
            this.prevAll().addBack().filter('.rater-' + control.serial).addClass('star-rating-hover');
        }, // $.fn.rating.fill

        drain: function() { // drain all the stars.
            var control = this.data('rating');
            if (!control) return this;
            // do not execute when control is in read-only mode
            if (control.readOnly) return;
            // Reset all stars
            control.rater.children().filter('.rater-' + control.serial).removeClass('star-rating-on').removeClass('star-rating-hover');
        }, // $.fn.rating.drain

        draw: function() { // set value and stars to reflect current selection
            var control = this.data('rating');
            if (!control) return this;
            // Clear all stars
            this.rating('drain');
            // Set control value
            var current = $(control.current); //? control.current.data('rating.input') : null );
            var starson = current.length ? current.prevAll().addBack().filter('.rater-' + control.serial) : null;
            if (starson) starson.addClass('star-rating-on');
            // Show/hide 'cancel' button
            control.cancel[control.readOnly || control.required ? 'hide' : 'show']();
            // Add/remove read-only classes to remove hand pointer
            this.siblings()[control.readOnly ? 'addClass' : 'removeClass']('star-rating-readonly');
        }, // $.fn.rating.draw





        select: function(value, wantCallBack) { // select a value
            var control = this.data('rating');
            if (!control) return this;
            // do not execute when control is in read-only mode
            if (control.readOnly) return;
            // clear selection
            control.current = null;
            // programmatically (based on user input)
            if (typeof value != 'undefined' || this.length > 1) {
                // select by index (0 based)
                if (typeof value == 'number')
                    return $(control.stars[value]).rating('select', undefined, wantCallBack);
                // select by literal value (must be passed as a string
                if (typeof value == 'string') {
                    //return
                    $.each(control.stars, function() {
                        //console.log($(this).data('rating.input'), $(this).data('rating.input').val(), value, $(this).data('rating.input').val()==value?'BINGO!':'');
                        if ($(this).data('rating.input').val() == value) $(this).rating('select', undefined, wantCallBack);
                    });
                    // don't break the chain
                    return this;
                };
            } else {
                control.current = this[0].tagName == 'INPUT' ?
                    this.data('rating.star') :
                    (this.is('.rater-' + control.serial) ? this : null);
            };
            // Update rating control state
            this.data('rating', control);
            // Update display
            this.rating('draw');
            // find current input and its sibblings
            var current = $(control.current ? control.current.data('rating.input') : null);
            var lastipt = $(control.inputs).filter(':checked');
            var deadipt = $(control.inputs).not(current);
            // check and uncheck elements as required
            deadipt.prop('checked', false); //.removeAttr('checked');
            current.prop('checked', true); //.attr('checked','checked');
            // trigger change on current or last selected input
            $(current.length ? current : lastipt).trigger({
                type: 'change',
                selfTriggered: true
            });
            // click callback, as requested here: http://plugins.jquery.com/node/1655
            if ((wantCallBack || wantCallBack == undefined) && control.callback) control.callback.apply(current[0], [current.val(), $('a', control.current)[0]]); // callback event
            // don't break the chain
            return this;
        }, // $.fn.rating.select





        readOnly: function(toggle, disable) { // make the control read-only (still submits value)
            var control = this.data('rating');
            if (!control) return this;
            // setread-only status
            control.readOnly = toggle || toggle == undefined ? true : false;
            // enable/disable control value submission
            if (disable) $(control.inputs).attr("disabled", "disabled");
            else $(control.inputs).removeAttr("disabled");
            // Update rating control state
            this.data('rating', control);
            // Update display
            this.rating('draw');
        }, // $.fn.rating.readOnly

        disable: function() { // make read-only and never submit value
            this.rating('readOnly', true, true);
        }, // $.fn.rating.disable

        enable: function() { // make read/write and submit value
            this.rating('readOnly', false, false);
        } // $.fn.rating.select

    });

    /*--------------------------------------------------------*/

    /*
    	### Default Settings ###
    	eg.: You can override default control like this:
    	$.fn.rating.options.cancel = 'Clear';
    */
    $.fn.rating.options = { //$.extend($.fn.rating, { options: {
        cancel: 'Cancel Rating', // advisory title for the 'cancel' link
        cancelValue: '', // value to submit when user click the 'cancel' link
        split: 0, // split the star into how many parts?

        // Width of star image in case the plugin can't work it out. This can happen if
        // the jQuery.dimensions plugin is not available OR the image is hidden at installation
        starWidth: 16 //,

        //NB.: These don't need to be pre-defined (can be undefined/null) so let's save some code!
        //half:     false,         // just a shortcut to control.split = 2
        //required: false,         // disables the 'cancel' button so user can only select one of the specified values
        //readOnly: false,         // disable rating plugin interaction/ values cannot be.one('change',		//focus:    function(){},  // executed when stars are focused
        //blur:     function(){},  // executed when stars are focused
        //callback: function(){},  // executed when a star is clicked
    }; //} });

    /*--------------------------------------------------------*/


    // auto-initialize plugin
    $(function() {
        $('input[type=radio].star').rating();
    });


    /*# AVOID COLLISIONS #*/
})(jQuery);
/*# AVOID COLLISIONS #*/


/********** 접근성 바로가기 메뉴 **********/
$(function() {
    key_AccessMenu();

    function key_AccessMenu() {
        try {
            $("#key_access").find(">ul>li>a").bind({
                focusin: function(e) {
                    $("#key_access").css({
                        "z-index": "10000"
                    });
                    $(this).parent("li").addClass("select");
                },
                focusout: function(e) {
                    $("#key_access").css({
                        "z-index": "-1"
                    });
                    $(this).parent("li").removeClass("select");
                },
                click: function(e) {
                    $elm = $($(this).attr("href"));
                    $elm.focus();
                }
            });
        } catch (e) {}
    }

    try {
        $("a[href^='#']").click(function() {
            if ($($(this).attr("href")).size() > 0) {
                var $elm_viewTarget = $($(this).attr("href"));

                $elm_viewTarget.attr("tabindex", "0").show().focus();
            }
        });
    } catch (e) {}
});

Map = function() {
    this.map = new Object();
};
Map.prototype = {
    put: function(key, value) {
        this.map[key] = value;
    },
    get: function(key) {
        return this.map[key];
    },
    containsKey: function(key) {
        return key in this.map;
    },
    containsValue: function(value) {
        for (var prop in this.map) {
            if (this.map[prop] == value) return true;
        }
        return false;
    },
    isEmpty: function(key) {
        return (this.size() == 0);
    },
    clear: function() {
        for (var prop in this.map) {
            delete this.map[prop];
        }
    },
    remove: function(key) {
        delete this.map[key];
    },
    keys: function() {
        var keys = new Array();
        for (var prop in this.map) {
            keys.push(prop);
        }
        return keys;
    },
    values: function() {
        var values = new Array();
        for (var prop in this.map) {
            values.push(this.map[prop]);
        }
        return values;
    },
    size: function() {
        var count = 0;
        for (var prop in this.map) {
            count++;
        }
        return count;
    }
};



/********** NAV-M 메뉴 **********/
$(function() {
    $(".menu-list > li").append("<img src='/lmsdata/img/ko/template1/m_gnb_down.png' class='icon' alt=''>");
    $('.menu-list li').click(function() {
        if ($(this).hasClass("hover") != true) {
            $('.menu-list li').removeClass("on");
            $('.menu-list li').removeClass("hover");
            $(this).addClass("on");
            $(this).addClass("hover");
            $('.menu-list li img').each(function() {
                var Searchsrc = $(this).attr("src");
                $(this).attr('src', Searchsrc.replace('_up', '_down'));
            });
            var ImgSrc = $(this).find('img').attr("src");
            $(this).find('img').attr('src', ImgSrc.replace('_down', '_up'));
        } else {
            $('.menu-list li img').each(function() {
                var Searchsrc = $(this).attr("src");
                $(this).attr('src', Searchsrc.replace('_up', '_down'));
            });
            $('.menu-list li').removeClass("on");
            $('.menu-list li').removeClass("hover");
        }
    });
});

/** 
 *   스토리지 저장 
 */
function SaveStorage(key, val) {
    sessionStorage[key] = val; // 세션 스토리지에 데이타를 저장한다. 
}

/** 
 *   스토리지 삭제 
 */
function DeleteStorage(key) {
    delete sessionStorage[key]; // 세션 스토리지에 key값에 해당하는 데이타를 삭제한다. 
}

/** 
 *   스토리지 모든 데이타 삭제 
 */
function ClearStorage() {
    sessionStorage.clear(); // 세션 스토리지를 전부 지운다. 
}

/** 
 *   스토리지 출력 
 */
function ShowStorage(key) {
    return jsNvl(sessionStorage[key]);
}