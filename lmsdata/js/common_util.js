/*******************************************************************************
	DHTML 관련 공통 유틸리티

	Author: Kim Kyoung shil
*******************************************************************************/

//var browserType			= checkBrowserType();	// 사용자 브라우져 타입
var browserType = checkBrowserType(); // 사용자 브라우져 타입
var browserTypeNew = checkBrowserType_New(); // 사용자 브라우져 타입
var ieVersion = checkIEVersion(); // IE 브라우져 

/**
 * 사용자 브라우져 체크
 */
function checkBrowserType() {
    var brType = "IE";
    if (document.all) {
        brType = "IE";
    } else if (document.getElementById) {
        brType = "NE";
    } else if (document.layers) {
        brType = "NE4";
    }

    return brType;
}


function checkBrowserType_New() {

    var agt = navigator.userAgent.toLowerCase();
    if (agt.indexOf("chrome") != -1) return 'Chrome';
    if (agt.indexOf("opera") != -1) return 'Opera';
    if (agt.indexOf("firefox") != -1) return 'Firefox';
    if (agt.indexOf("safari") != -1) return 'Safari';
    if (agt.indexOf("netscape") != -1) return 'Netscape';
    if (agt.indexOf('msie') != -1 || agt.indexOf('trident') != -1) {
        return getInternetExplorerVersion();
    }
}


/**
 * ms ie 버전 리턴
 * **/
function getInternetExplorerVersion() {

    var agent = navigator.userAgent.toLowerCase();

    if (agent.indexOf('msie 7') > -1) {
        return "msie_7";
    } else if (agent.indexOf('msie 8') > -1) {
        return "msie_8";
    } else if (agent.indexOf('msie 9') > -1) {
        return "msie_9";
    } else {
        //msie가 없으면 11
        if (agent.indexOf('msie') == -1) return "msie_11";
        //아니면 msie 옆에 있는 버전을 리턴
        return checkIEVersion();
    }

}


/**
 * 인터넷 익스플로러 버전 체크
 */
function checkIEVersion() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return "msie_" + rv;
}

/**
 * 마우스 X 위치
 */
function checkMouseX(evt) {
    var xCoord = 0;
    if (browserType == "IE") {
        xCoord = event.clientX;
    } else if (browserType == "NE") {
        xCoord = evt.pageX;
    }
    return xCoord;
}


/**
 * 마우스 Y 위치
 */
function checkMouseY(evt) {
    var yCoord = 0;
    if (browserType == "IE") {
        yCoord = event.clientY;
    } else if (browserType == "NE") {
        yCoord = evt.pageY;
    }
    return yCoord;
}


/**
 * 마우스 버튼값 구하기
 * @return left,center,right
 */
function getMouseButton(evt) {
    var button = "left";
    var mouseKey = 1;
    if (browserType == "IE") {
        mouseKey = event.button
        if (mouseKey == 1) {
            button = "left";
        } else if (mouseKey == 2) {
            button = "right";
        } else if (mouseKey == 4) {
            button = "center";
        }
    } else {
        mouseKey = evt.which;
        if (mouseKey == 1) {
            button = "left";
        } else if (mouseKey == 2) {
            button = "center";
        } else if (mouseKey == 3) {
            button = "right";
        }
    }
    return button;
}


/**
 * 객체의 넓이 구하기
 */
function getWidth(obj) {
    if (obj) {
        var objWidth = obj.offsetWidth;
        return objWidth;
    }
}


/**
 * 객체의 높이 구하기
 */
function getHeight(obj) {
    if (obj) {
        var objHeight = obj.offsetHeight;
        return objHeight;
    }
}


/**
 * 윈도우 넓이 구하기
 */
function getWindowWidth() {
    var winWidth = 0;
    if (browserType == "IE") {
        winWidth = document.body.offsetWidth;
    } else if (browserType == "NE") {
        winWidth = window.innerWidth;
    }
    return winWidth;
}


/**
 * 윈도우 높이 구하기
 */
function getWindowHeight() {
    var winHeight = 0;
    if (browserType == "IE") {
        winHeight = document.body.offsetHeight;
    } else if (browserType == "NE") {
        winHeight = window.innerHeight;
    }
    return winHeight;
}


/**
 * 스크롤값(X) 구하기
 */
function getScrollX() {
    var scrollX = 0;

    if (browserType == "NE") {
        scrollX = window.pageXOffset;
    } else {
        scrollX = document.body.scrollLeft;
    }

    return scrollX;
}


/**
 * 스크롤값(Y) 구하기
 */
function getScrollY() {
    var scrollY = 0;

    if (browserType == "NE") {
        scrollY = window.pageYOffset;
    } else {
        scrollY = document.body.scrollTop;
    }

    return scrollY;
}


/**
 * 객체 가져오기
 * @param objName(객체명)
 */
function getObject(objName) {
    return document.getElementById(objName);
}


/**
 * 객체 DISPLAY 변경
 */
function changeDisplay(obj) {
    if (obj) {
        var displayStyle = obj.style.display;
        if (displayStyle == "block") {
            offDisplay(obj);
        } else if (displayStyle == "none") {
            onDisplay(obj);
        }
    }
}


/**
 * DISPLAY on
 */
function onDisplay(obj) {
    if (obj) {
        obj.style.display = "block";
    }
}


/**
 * DISPLAY off
 */
function offDisplay(obj) {
    if (obj) {
        obj.style.display = "none";
    }
}


/**
 * 객체 보이기
 */
function visibleObject(obj) {
    if (obj) {
        obj.style.visibility = "visible";
    }
}


/**
 * 객체 숨기기
 */
function hiddenObject(obj) {
    if (obj) {
        obj.style.visibility = "hidden";
    }
}


/**
 * 객체 선택시 색상 반전
 */
function onSelectColor(obj) {
    if (obj) {
        obj.style.backgroundColor = "highlight";
        obj.style.color = "highlighttext";
    }
}


/**
 * 객체 선택 비활성 색상 복원
 */
function offSelectColor(obj, color, bgColor) {
    if (obj) {
        if (color == null) {
            color = "";
        }
        if (bgColor == null) {
            bgColor = "";
        }
        obj.style.color = color;
        obj.style.backgroundColor = bgColor;
    }
}


/*
 * 객체 사이즈 설정
 */
function resizeObject(obj, newWidth, newHeight) {
    if (obj) {
        if (nullToEmpty(newWidth) != "") {
            obj.style.width = newWidth + "px";
        }
        if (nullToEmpty(newHeight) != "") {
            obj.style.height = newHeight + "px";
        }
    }
}


/**
 * 객체 넓이 설정
 */
function resizeWidth(obj, newWidth) {
    if (obj) {
        obj.style.width = newWidth + "px";
    }
}


/**
 * 객체 높이 설정
 */
function resizeHeight(obj, newHeight) {
    if (obj) {
        obj.style.height = newHeight + "px";
    }
}


/**
 * 객체 이동 설정 (위치)
 */
function moveObject(obj, topPosition, leftPosition) {
    if (obj) {
        if (nullToEmpty(topPosition) != "") {
            obj.style.top = topPosition + "px";
        }
        if (nullToEmpty(leftPosition) != "") {
            obj.style.left = leftPosition + "px";
        }
    }
}


/**
 * 객체의 위치 (document 내에서 절대적인 위치)
 */
function getPosition(obj) {
    var pos = {
        x: 0,
        y: 0
    };

    if (document.layers) {
        pos.x = obj.x;
        pos.y = obj.y;
    } else {
        do {
            pos.x += parseInt(obj.offsetLeft);
            pos.y += parseInt(obj.offsetTop);
            obj = obj.offsetParent;
        } while (obj);
    }
    return pos;
}


/**
 * 객체의 왼쪽 위치 (상대위치)
 */
function getLeftPosition(obj) {
    var value = 0;
    if (obj) {
        if (browserType == "IE") {
            if (obj.currentStyle.left == "auto") {
                value = 0;
            } else {
                value = parseInt(obj.currentStyle.left);
            }
        } else {
            value = parseInt(obj.style.left);
        }
    }
    return value;
}


/**
 * 객체 위쪽 위치 (상대위치)
 */
function getTopPosition(obj) {
    var value = 0;
    if (obj) {
        if (browserType == "IE") {
            if (obj.currentStyle.top == "auto") {
                value = 0;
            } else {
                value = parseInt(obj.currentStyle.top);
            }
        } else {
            value = parseInt(obj.style.top);
        }
    }
    return value;
}


/**
 * 객체의 속성값 구하기
 */
function getObjectAttribute(obj, attrName) {
    var attrValue = null;

    if (obj) {
        attrValue = obj.getAttribute(attrName);
    }
    return attrValue;
}


/**
 * 객체ID 구하기
 */
function getObjectId(obj) {
    var objectId = getObjectAttribute(obj, "id");
    return objectId;
}


/**
 * 객체를 맨 위로 위치하기
 */
var makeOnTopCount = 0;

function makeOnTop(obj) {
    if (obj) {
        var daiz;
        var max = 0;
        var da = null;
        if (browserType == "IE") {
            da = document.all;
        } else if (browserType == "NE") {
            da = document.getElementsByTagName("div");
        }

        makeOnTopCount += 1;
        obj.style.zIndex = da.length + makeOnTopCount;
    }
}


/**
 * Attribute의 Value 추출 (name=value 에서 value 추출
 */
function getAttributeValue(attr, name) {
    attr = nullToEmpty(attr).toLowerCase();
    var value = "";
    if (attr.length > 1) {
        var idx1 = attr.indexOf(name);
        if (idx1 != -1) {
            var idx2 = attr.indexOf("=", idx1);
            if (idx2 != -1) {
                var idx3 = attr.indexOf(",", idx2);
                var oValue = "";
                if (idx3 == -1) {
                    oValue = attr.substring(idx2 + 1);
                } else {
                    oValue = attr.substring(idx2 + 1, idx3);
                }
                for (var i = 0; i < oValue.length; i++) {
                    if (oValue.charCodeAt(i) != 32) {
                        value += oValue.charAt(i);
                    }
                }

            }
        }

    }
    return value;
}


/**
 * 이미지 변경
 */
function changeImage(imgObj, imgSrc) {
    imgObj.src = imgSrc;
}


/**
 * 문자열에서 구분자로 분자열 분리하기
 * @param str		문자열
 * @param idx		구분자를 기준으로 n번째 문자열 추출
 * @param divideStr 구분문자
 */
function getDivideString(str, idx, divideChar) {
    var result = "";
    if (nullToEmpty(str) != "") {
        var strArr = str.split(divideChar);
        result = strArr[idx - 1];
    }

    if (!result) {
        result = "";
    }

    return result;
}


/**
 * null 값을 ""으로 변환
 */
function nullToEmpty(value) {
    if (value == null) {
        value = "";
    }
    return value;
}


/**
 * URL 엔코딩
 */
function getUrlEncode(url) {
    var result = "";
    if (nullToEmpty(url) != "") {
        result = encodeURIComponent(url);
        result = result.replace(/\%/g, '*');
    }
    return result;
}


/**
 * URL 디코딩
 */
function getUrlDecode(url) {
    var result = "";
    if (nullToEmpty(url) != "") {
        result = url.replace(/\*/g, '%');
        result = decodeURIComponent(result);
    }
    return result;
}


/**
 * 파일의 확장명 반환
 */
function getFileExtention(fileName) {
    var ext = "";

    if (nullToEmpty(fileName) != "") {
        var idx = fileName.lastIndexOf(".");
        if (idx > -1) {
            ext = (fileName.substring(idx + 1)).toLowerCase();
        }
    }

    return ext;
}

/**
 * 이미지 width 변경
 * 호출방법
	onload = goComplete;
	var imgObjId = "attach_picture";
	var maxImgWidth = 675;
	function goComplete() {
		imgReSize();
	}
 */
function imgReSize() {
    while (true) {
        var imgObj = getObject(imgObjId);
        if (imgObj.length) {
            for (var i = 0; i < imgObj.length; i++) {
                var imgPerObj = imgObj[i];
                if (imgPerObj == null) {
                    setTimeout("imgReSize", 500);
                } else {
                    if (imgPerObj.width >= maxImgWidth) {
                        imgPerObj.width = maxImgWidth;
                    }
                }
            }
            break;
        } else {
            if (imgObj == null) {
                setTimeout("imgReSize", 500);
            } else {
                if (imgObj.width >= maxImgWidth) {
                    imgObj.width = maxImgWidth;
                }
                break;
            }
        }
    }
}

/**
 * 쿠키값 처리
 */
function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) {
        endstr = document.cookie.length;
    }
    return unescape(document.cookie.substring(offset, endstr));
}

function GetCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            return getCookieVal(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) {
            break;
        }
    }
    return null;
}

function setCookie(name, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

/***********************************************************************************************
 *  Project         : Edutrack LMS2007
 *  File Name       : common.js
 *  Description     : 공통으로 사용하는 js
 *  Arguement       : 
 *  Written Date    :                   Written By  : 
 *  Modified Date   :                   Modified By : 
 **********************************************************************************************/

String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/gi, "");
};

String.prototype.replaceAll = function(str1, str2) {
    var temp_str = "";
    if (this.trim() !== "" && str1 != str2) {
        temp_str = this.trim();
        while (temp_str.indexOf(str1) > -1) {
            temp_str = temp_str.replace(str1, str2);
        }
    }
    return temp_str;
};

/**
 * 문자열의 byte length를 얻는다.
 *
 * @param   str 문자열
 * @return  byte length
 * @author  marie
 */
function jsByteLength(str) {
    if (str == "") {
        return 0;
    }

    var len = 0;

    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 128) {
            len++;
        }
        len++;
    }

    return len;
}

function jsByteLength_2(s, b, i, c) {
    // 2048로 나누었을때 몫이 있으면 2048보다 큰 유니코드이므로 3바이트 
    // 그보다 작은데 128로 나누었을 때 몫이 있으면 128보다 큰 유니코드이므로 2바이트 
    // 나머지 경우엔 1바이트를 할당
    // 비트연산으로 속도가 빠르다.
    // 오라클 DB - UTF-8 문자집합일 때 한글은 3BYTE로 인식
    for (b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
    return b;

}


/**
 * Object에 값을 세팅한다.
 *
 * @param   obj
 * @param   value
 */
function jsSetValue(obj, value) {
    if (obj) {
        if (obj.type == "text") {
            obj.value = value;
        } else if (obj.tagName == "SELECT") {
            for (var i = 0; i < obj.length; i++) {
                if (obj.options[i].value == value) {
                    obj.options[i].selected = true;
                    break;
                }
            }
        }
    }
}

/**
 * 주민등록번호를 체크한다.
 *
 * @param   obj 주민등록번호 필드
 * @return  true - 올바른 번호
 *          false - 틀린 번호
 */
function jsCheckJumin1(obj) {
    var str = deleteHyphen(obj.value); // 필드에 있는 주민번호에서 '-'제거

    if (!jsCheckJumin(str)) {
        alert(getCommonMessage("msg05"));
        obj.value = "";
        //obj.focus();
        if (window.event) {
            window.event.returnValue = false;
        }
        return false;
    }

    obj.value = str;
    return true;
}

/**
 * 주민등록번호를 체크한다.
 *
 * @param   str 주민등록번호
 * @return  true - 올바른 번호
 *          false - 틀린 번호
 */
function jsCheckJumin(str) {
    var tmp = 0;
    var sex = str.substring(6, 7);
    var birthday;

    if (str.length != 13) {
        return false;
    }

    if (sex == 1 || sex == 2) {
        birthday = "19" + str.substring(0, 6);
    } else if (sex == 3 || sex == 4) {
        birthday = "20" + str.substring(0, 6);
    } else {
        return false;
    }

    if (!isDate(birthday)) {
        return false;
    }

    for (var i = 0; i < 12; i++) {
        tmp = tmp + ((i % 8 + 2) * parseInt(str.substring(i, i + 1)));
    }

    tmp = 11 - (tmp % 11);
    tmp = tmp % 10;

    if (tmp != str.substring(12, 13)) {
        return false;
    }

    return true;
}

/**
 * 주민번호를 체크한다.
 *
 * @param       주민번호(앞자리뒷자리 합친)
 * @param       주민번호 앞자리
 * @param       주민번호 뒷자리
 * @param       다음으로 이동할 포커스
 * @author      강병곤
 * @since       2003-12-04
 */
function checkJuminNo(juminNo, juminNo1, juminNo2, nextFocus) {
    var form = document.form1;
    var flag = true;

    var juminNoElm = eval(form.elements[juminNo]);
    var juminNo1Elm = eval(form.elements[juminNo1]);
    var juminNo2Elm = eval(form.elements[juminNo2]);
    var nextFocusElm = eval(form.elements[nextFocus]);
    //alert("juminNo ::"+ juminNoElm.value +"/ juminNo1 ::"+ juminNo1Elm.value +"/ juminNo2 ::"+ juminNo2Elm.value +"/ nextFocus ::"+ nextFocusElm.value);

    if (juminNo2Elm.value == "" || juminNo2Elm.value.length < 7) {
        jsRange(7, 7);
        juminNo2Elm.focus();
        return;
    }

    if (!jsCheckJumin(juminNo1Elm.value + juminNo2Elm.value)) {
        alert(getCommonMessage("msg05"));
        juminNo1Elm.value = "";
        juminNo2Elm.value = "";
        juminNo1Elm.focus();
    } else {
        juminNoElm.value = juminNo1Elm.value + juminNo2Elm.value;
        nextFocusElm.focus();
    }
}

/**
 * 사용자(USR ID, 사용자명) 검색 팝업창을 띄운다.
 *
 * @param   column 컬럼명
 *          USR_IDNO USR ID
 *          USR_NAME 사용자명
 * @param   keyWord 검색어
 * @param   fn 펑션명
 * @use     function setSmusr(usrId, usrName) { }
 */
function jsSmusr(column, keyWord, fn) {
    var url = "/SystemServlet?cmd=LssmusrPopup&column=" + column + "&keyWord=" + keyWord + "&fn=" + fn;
    var name = "";
    var features = "width=600,height=550,scrollbars=yes,top=100,left=100";
    var popupWin = window.open(url, name, features);
    centerSubWindow(popupWin, 600, 550);
    popupWin.focus();
}

/**
 * 오직 숫자로만 이루어져 있는지 체크 한다.
 *
 * @param   num
 * @return  boolean
 */
function isNumber(num) {
    var reg = RegExp(/^(\d|-)?(\d|,)*\.?\d*$/);

    if (reg.test(num)) {
        return true;
    }

    return false;
}

/**
 * 정수 체크
 *
 * 1. +, - 부호를 생략하거나 넣을 수 있다 : ^[\+-]?
 * 2. 0에서 9까지 숫자가 0번 이상 올 수 있다 : [0-9]*
 * 3. 마지막은 숫자로 끝나야 한다 : [0-9]$
 *
 * @param   num
 * @return  boolean
 */
function isInteger(num) {
    re = /^[\+-]?[0-9]*[0-9]$/;

    if (re.test(num)) {
        return true;
    }

    return false;
}

/**
 * 유리수 체크
 *
 * 1. +, - 부호를 생략하거나 넣을 수 있다 : ^[\+-]?
 * 2. 0에서 9까지 숫자가 0번 이상 올 수 있다 : [0-9]*
 * 3. 소수점을 넣을 수 있다 : [.]?
 * 4. 소수점 이하 자리에 0에서 9까지 숫자가 올 수 있다 : [0-9]*
 * 5. 마지막은 숫자로 끝나야 한다 : [0-9]$
 *
 * @param   num
 * @return  boolean
 */
function isFloat(num) {
    re = /^[\+-]?[0-9]*[.]?[0-9]*[0-9]$/;

    if (re.test(num)) {
        return true;
    }

    return false;
}

/**
 * 이메일 체크
 *
 * @param   email
 * @return  boolean
 */
function isEmail(email) {
    re = /[^@]+@[A-Za-z0-9_-]+[.]+[A-Za-z]+/;

    if (re.test(email)) {
        return true;
    }

    return false;
}

/**
 * 이메일 주소 체크 - 정밀하게
 */
function emailCheck(emailStr) {
    var checkTLD = 1;
    var knownDomsPat = /^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum)$/;
    var emailPat = /^(.+)@(.+)$/;
    var specialChars = "\\(\\)><@,;:\\\\\\\"\\.\\[\\]";
    var validChars = "\[^\\s" + specialChars + "\]";
    var quotedUser = "(\"[^\"]*\")";
    var ipDomainPat = /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
    var atom = validChars + '+';
    var word = "(" + atom + "|" + quotedUser + ")";
    var userPat = new RegExp("^" + word + "(\\." + word + ")*$");
    var domainPat = new RegExp("^" + atom + "(\\." + atom + ")*$");
    var matchArray = trim(emailStr).match(emailPat);

    if (matchArray == null) {
        alert(getCommonMessage("msg06"));
        return false;
    }
    var user = matchArray[1];
    var domain = matchArray[2];
    for (i = 0; i < user.length; i++) {
        if (user.charCodeAt(i) > 127) {
            alert(getCommonMessage("msg06"));
            return false;
        }
    }
    for (i = 0; i < domain.length; i++) {
        if (domain.charCodeAt(i) > 127) {
            alert(getCommonMessage("msg08"));
            return false;
        }
    }
    if (user.match(userPat) == null) {
        alert(getCommonMessage("msg06"));
        return false;
    }
    var IPArray = domain.match(ipDomainPat);
    if (IPArray != null) {
        for (var i = 1; i <= 4; i++) {
            if (IPArray[i] > 255) {
                alert(getCommonMessage("msg07"));
                return false;
            }
        }
        return true;
    }
    var atomPat = new RegExp("^" + atom + "$");
    var domArr = domain.split(".");
    var len = domArr.length;
    for (i = 0; i < len; i++) {
        if (domArr[i].search(atomPat) == -1) {
            alert(getCommonMessage("msg08"));
            return false;
        }
    }
    /*
    국가 도메인은 계속 추가되는 사항이기 때문에 제한할 수 없음. 따라서 아래 부분은 주석처리
    2008.12.18 이한찬K
    if (checkTLD && domArr[domArr.length-1].length!=2 && 
    		domArr[domArr.length-1].search(knownDomsPat)==-1) {
    	alert("도메인 국가지정이 잘못 기제 되었습니다." + domArr[domArr.length-1]);
    	return false;
    }
    */
    if (len < 2) {
        alert(getCommonMessage("msg08"));
        return false;
    }
    return true;
}

/**
 * 날짜 체크
 *
 * @param   date
 * @return  boolean
 */
function isDate(date) {
    if (date == null || date.length != 8) {
        return false;
    }

    if (!isNumber(date)) {
        return false;
    }

    var year = eval(date.substring(0, 4));
    var month = eval(date.substring(4, 6));
    var day = eval(date.substring(6, 8));

    if (year == "0000") {
        return false;
    }

    if (month > 12 || month == "00") {
        return false;
    }

    var totalDays;

    switch (eval(month)) {

        case 1:
            totalDays = 31;
            break;
        case 2:
            if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
                totalDays = 29;
            else
                totalDays = 28;
            break;
        case 3:
            totalDays = 31;
            break;
        case 4:
            totalDays = 30;
            break;
        case 5:
            totalDays = 31;
            break;
        case 6:
            totalDays = 30;
            break;
        case 7:
            totalDays = 31;
            break;
        case 8:
            totalDays = 31;
            break;
        case 9:
            totalDays = 30;
            break;
        case 10:
            totalDays = 31;
            break;
        case 11:
            totalDays = 30;
            break;
        case 12:
            totalDays = 31;
            break;
    }

    if (day > totalDays) {
        return false;
    }

    if (day == "00") {
        return false;
    }

    return true;
}


/**
 * 데이터 유효성을 체크한다.
 * @param   form
 */
function validate(form) {
    var obj;
    var dispName;
    var dataType;
    var minValue;
    var maxValue;
    var isValid;
    var value;
    var message;
    var messageAdd;
    var nvarchar2Check;

    for (i = 0; i < form.elements.length; i++) {

        obj = form.elements[i];
        dispName = obj.getAttribute("dispName");

        if (dispName == "" || dispName == null) continue;
        obj.value = trim(obj.value);
        dataType = obj.getAttribute("dataType");
        minValue = obj.getAttribute("minValue");
        maxValue = obj.getAttribute("maxValue");
        len = obj.getAttribute("len");
        lenCheck = obj.getAttribute("lenCheck");
        nvarchar2Check = obj.getAttribute("nvarchar2Check");
        message = obj.getAttribute("message"); /// notNull 일때 사용자가 정의한 메세지를 보여주기 위해서
        messageAdd = obj.getAttribute("messageAdd"); /// notNull 일때 기본메세지 + 사용자정의메세지를 보여준다.
        value = obj.value;

        if (dispName == null) {
            dispName = obj.name;
        }

        // 필수 입력 항목 체크
        if (obj.getAttribute("isNull") == "N") {
            isValid = false;

            if (obj.type == "radio" || obj.type == "checkbox" || obj.type == "select") {
                if (form.elements(obj.name).length) {
                    for (j = 0; j < form.elements(obj.name).length; j++) {
                        if (form.elements(obj.name)[j].checked) {
                            isValid = true;
                            break;
                        }
                    }
                } else {
                    if (obj.checked) {
                        isValid = true;
                    }
                }
            } else {
                if (value != "") {
                    isValid = true;
                } else {
                    if (obj.getAttribute("comma") != null) {
                        obj.value = 0;
                        isValid = true;
                    }
                }
            }

            if (!isValid) {
                if (message == "" || message == null)
                    alert(getCommonMessage("msg10", dispName) + ((messageAdd == "" || messageAdd == null) ? "" : "\n" + messageAdd));
                else
                    alert(message);
                if (obj.type != "hidden" && obj.style.visibility != "hidden")
                    obj.focus();
                if (window.event) {
                    window.event.returnValue = false;
                }
                return false;
            }
        } else {
            //        	continue;
        }

        // 데이터 길이 체크
        if (len != null) {
            if (jsByteLength(value) != eval(len)) {
                alert(getCommonMessage("msg11", dispName, len));
                obj.focus();
                if (window.event) {
                    window.event.returnValue = false;
                }
                return false;
            }
        }

        if (lenCheck != null) {

            if (jsByteLength(value) > eval(lenCheck)) {
                alert(getCommonMessage("msg12", dispName, lenCheck, jsByteLength(value)));
                obj.focus();
                if (window.event) {
                    window.event.returnValue = false;
                }

                return false;
            }
        }

        // 1. lenCheck는 한글을 2바이트로 계수 -> 오라클에서는 한글이 3바이트
        // 2. 메세지가 "글자수"로 되어 있어 분리
        // 3. nvarchar2 일때 사용
        if (nvarchar2Check != null) {
            if (!nvarchar2Chk(value, nvarchar2Check, dispName)) {
                return false;
            }
        }

        if (obj.type == "text") {
            // 데이터 타입 체크
            if (dataType == null) { // 2002.01.30 추가
                if (obj.readOnly == false && obj.maxLength != -1 && jsByteLength(value) > (obj.maxLength * 2)) {
                    alert(getCommonMessage("msg13", dispName, obj.maxLength));
                    obj.focus();
                    if (window.event) {
                        window.event.returnValue = false;
                    }

                    return false;
                }
            } else if ((value != "") && (dataType != null)) {
                isValid = true;
                checkValue = false;

                if (dataType == "date") {
                    value = deleteDateFormatStr(value);
                    isValid = isDate(value);
                    checkValue = true;
                } else if (dataType == "email") {
                    isValid = isEmail(value);
                } else if (dataType == "float") {
                    value = deleteCommaStr(value);
                    isValid = isFloat(value);
                    checkValue = true;
                } else if (dataType == "integer") {
                    value = deleteCommaStr(value);
                    isValid = isInteger(value);
                    checkValue = true;
                } else if (dataType == "number") {
                    value = deleteCommaStr(value);
                    isValid = isNumber(value);
                    checkValue = true;
                } else if (dataType == "double") {
                    value = deleteCommaStr(value);
                    isValid = isNumber(value);
                    checkValue = true;
                }

                if (!isValid) {
                    alert(getCommonMessage("msg14", dispName));
                    if (dataType == "float" || dataType == "integer" || dataType == "number" || dataType == "double") {
                        obj.value = "0";
                    }

                    obj.focus();

                    if (window.event) {
                        window.event.returnValue = false;
                    }
                    return false;
                }

                if (checkValue) {
                    if (minValue != null) {
                        if (eval(minValue) > eval(value)) {
                            alert(getCommonMessage("msg15", dispName, minValue));
                            obj.focus();
                            if (window.event) {
                                window.event.returnValue = false;
                            }
                            return false;
                        }
                    }

                    if (isValid && (maxValue != null)) {
                        if (eval(maxValue) < eval(value)) {
                            alert(getCommonMessage("msg17", dispName, maxValue));
                            obj.focus();
                            if (window.event) {
                                window.event.returnValue = false;
                            }
                            return false;
                        }
                    }
                }
            }
        }

    } /// end of for()

    return true;
}

/**
 * 숫자에 comma를 붙인다.
 *
 * @param   obj
 */
function addComma(obj) {
    obj.value = trim(obj.value);
    var value = obj.value;

    if (value == "") {
        return;
    }

    value = deleteCommaStr(value);

    if (!isFloat(value)) {
        dispName = obj.getAttribute("dispName");

        if (dispName == null) {
            dispName = "";
        }

        alert(getCommonMessage("msg14", dispName));
        obj.value = "0";
        obj.focus();
        if (window.event) {
            window.event.returnValue = false;
        }
        return;
    }

    obj.value = addCommaStr(value);
}

/**
 * 숫자에 comma를 붙인다.
 */
function addComma2() {
    var obj = window.event.srcElement;
    addComma(obj);
}

/**
 * 숫자에 comma를 붙인다.
 *
 * @param   str
 */
function addCommaStr(str) {
    var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
    var arrNumber = str.split('.');
    arrNumber[0] += '.';
    do {
        arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2');
    } while (rxSplit.test(arrNumber[0]));

    if (arrNumber.length > 1) {
        replaceStr = arrNumber.join("");
    } else {
        replaceStr = arrNumber[0].split(".")[0];
    }
    return replaceStr;
}

/**
 * 숫자에서 comma를 없앤다.
 *
 * @param   obj
 */
function deleteComma(obj) {
    obj.value = deleteCommaStr(obj.value);
}

/**
 * 숫자에서 comma를 없앤다.
 */
function deleteComma2() {
    var obj = window.event.srcElement;
    deleteComma(obj);
    obj.select();
}

/**
 * 숫자에서 comma를 없앤다.
 *
 * @param   str
 */
function deleteCommaStr(str) {
    var temp = '';

    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) == ',') {
            continue;
        } else {
            temp += str.charAt(i);
        }
    }

    return temp;
}

/**
 * 날짜에 "/"를 붙인다.
 *
 * @param   obj
 */
function addDateFormat(obj) {
    var value = obj.value;

    if (trim(value) == "") {
        return;
    }

    value = deleteDateFormatStr(value);

    if (!isDate(value)) {
        dispName = obj.getAttribute("dispName");

        if (dispName == null) {
            dispName = "";
        }

        alert(getCommonMessage("msg14", dispName));
        obj.focus();

        return;
    }

    obj.value = addDateFormatStr(value);
}

/**
 * 날짜(년월)에 "/"를 붙인다.
 *
 * @param   obj
 */
function addYmFormat(obj) {
    var value = obj.value;

    if (trim(value) == "") {
        return;
    }

    value = deleteDateFormatStr(value);

    if (!isDate(value + "01")) {
        dispName = obj.getAttribute("dispName");

        if (dispName == null) {
            dispName = "";
        }

        alert(getCommonMessage("msg14", dispName));
        obj.focus();

        return;
    }

    obj.value = addYmFormatStr(value);
}

/**
 * 날짜에 "/"를 붙인다.
 */
function addDateFormat2() {
    var obj = window.event.srcElement;
    addDateFormat(obj);
}

/**
 * 날짜에 "/"를 붙인다.
 */
function addYmFormat2() {
    var obj = window.event.srcElement;
    addYmFormat(obj);
}

/**
 * 날짜에 "-"를 붙인다.
 *
 * @param   str
 */
function addDateFormatStr(str, locale) {
    if (str == null || str == "") {
        return "";
    }
    var dateStr = "";
    if (locale == "en") {
        dateStr = str.substring(4, 6) + "-" + str.substring(6, 8) + "-" + str.substring(0, 4);
    } else {
        dateStr = str.substring(0, 4) + "-" + str.substring(4, 6) + "-" + str.substring(6, 8);
    }
    return dateStr;
}

/**
 * 날짜에 "-"를 붙이고 시간에 ":"를 붙인다.
 *
 * @param   str
 */
function addDateTimeFormatStr(str, locale) {
    if (str == null || str == "") {
        return "";
    }

    var dateStr = "";
    if (locale == "en") {
        dateStr = str.substring(4, 6) + "-" + str.substring(6, 8) + "-" + str.substring(0, 4) +
            " " + str.substring(8, 10) + ":" + str.substring(10, 12) + ":" + str.substring(12, 14);
    } else {
        dateStr = str.substring(0, 4) + "-" + str.substring(4, 6) + "-" + str.substring(6, 8) +
            " " + str.substring(8, 10) + ":" + str.substring(10, 12) + ":" + str.substring(12, 14);
    }

    return dateStr;
}

/**
 * 날짜에 "-"를 붙이고 시간에 "( :)"를 붙인다.
 *
 * @param   str
 */
function addDateTimeShortFormatStr(str) {
    if (str == null || str == "") {
        return "";
    }
    return str.substring(4, 6) + "-" + str.substring(6, 8) + " " + str.substring(8, 10) + ":" + str.substring(10, 12);
}


/**
 * 날짜(년월)에 "-"를 붙인다.
 *
 * @param   str
 */
function addYmFormatStr(str) {
    return str.substring(0, 4) + "-" + str.substring(4, 6);
}

/**
 * 날짜(월일)에 "-"를 붙인다.
 *
 * @param   str
 */
function addMdFormatStr(str) {
    return str.substring(4, 6) + "-" + str.substring(6, 8);
}

/**
 * 날짜에서 "/"를 없앤다.
 *
 * @param   obj
 */
function deleteDateFormat(obj) {
    obj.value = deleteDateFormatStr(obj.value);
}

/**
 * 날짜에서 "/"를 없앤다.
 */
function deleteDateFormat2() {
    var obj = window.event.srcElement;
    deleteDateFormat(obj);
    obj.select();
}

/**
 * 날짜에서 "/"를 없앤다.
 *
 * @param   str
 */
function deleteDateFormatStr(str) {
    var temp = '';

    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) == '-') {
            continue;
        } else {
            temp += str.charAt(i);
        }
    }

    return temp;
}

/**
 * trim
 *
 * @param   text
 * @return  string
 */
function trim(text) {
    if (text == "") {
        return text;
    }

    var len = text.length;
    var st = 0;

    while ((st < len) && (text.charAt(st) <= ' ')) {
        st++;
    }

    while ((st < len) && (text.charAt(len - 1) <= ' ')) {
        len--;
    }

    return ((st > 0) || (len < text.length)) ? text.substring(st, len) : text;
}

/**
 * ltrim
 *
 * @param   text
 * @return  string
 */
function ltrim(text) {
    if (text == "") {
        return text;
    }

    var len = text.length;
    var st = 0;

    while ((st < len) && (text.charAt(st) <= ' ')) {
        st++;
    }

    return (st > 0) ? text.substring(st, len) : text;
}

/**
 * rtrim
 *
 * @param   text
 * @return  string
 */
function rtrim(text) {
    if (text == "") {
        return text;
    }

    var len = text.length;
    var st = 0;

    while ((st < len) && (text.charAt(len - 1) <= ' ')) {
        len--;
    }

    return (len < text.length) ? text.substring(st, len) : text;
}

/**
 * 이벤트 핸들러를 등록한다.
 */
function setEventHandler() {
    for (i = 0; i < document.forms.length; i++) {

        var elements = document.forms(i).elements;

        for (j = 0; j < elements.length; j++) {
            // INPUT 객체의 onblur 이벤트에 핸들러를 등록한다.
            if (elements(j).tagName == "INPUT") {

                dataType = elements(j).getAttribute("dataType");

                if (dataType == "date") {
                    elements(j).onblur = addDateFormat2;
                    elements(j).onfocus = deleteDateFormat2;
                    addDateFormat(elements(j));
                } else if (dataType == "number" || dataType == "integer" || dataType == "float" || dataType == "double") {
                    if (elements(j).getAttribute("comma") != null) {
                        elements(j).onblur = addComma2;
                        elements(j).onfocus = deleteComma2;
                        addComma(elements(j));
                    }
                } else if (dataType == "yyyymm") {
                    elements(j).onblur = addYmFormat2;
                    elements(j).onfocus = deleteDateFormat2;
                    addYmFormat(elements(j));
                }
            }
        }
    }
}

/**
 * 자리수의 최소값, 최대값
 *
 * 최소값만 체크 : jsRange(2, -1)
 * 최대값만 체크 : jsRange(-1, 10)
 * 최소값, 최대값 모두 체크 : jsRange(2, 10)
 * 최소값, 최대값 둘다 체크 안함 : jsRange(-1, -1)
 * 
 */
function jsRange(minValue, maxValue) {
    jsMinLength(minValue);
    jsMaxLength(maxValue);
}

/**
 * 최대값
 */
function jsMaxLength(maxValue) {
    var obj = window.event.srcElement;
    var dispName = obj.getAttribute("dispName");
    //var maxValue    = obj.getAttribute("maxValue");
    var val = jsByteLength(obj.value);

    if (val > (maxValue * 2)) {
        alert(getCommonMessage("msg18", dispName, maxValue, (val - (maxValue * 2))));
        //obj.value = "0";
        obj.focus();
        if (window.event) {
            window.event.returnValue = false;
        }
        return;
    }
}

/**
 * 최소값
 */
function jsMinLength(minValue) {
    var obj = window.event.srcElement;
    var dispName = obj.getAttribute("dispName");
    //var minValue    = obj.getAttribute("minValue");
    var val = jsByteLength(obj.value);
    if (minValue != -1 && val < minValue) {
        alert(getCommonMessage("msg16", dispName, minValue, (minValue - val)));
        //obj.value = "0";
        obj.focus();
        if (window.event) {
            window.event.returnValue = false;
        }
        return;
    }
}

/**
 * 숫자이면 숫자, 숫자가 아니면 0
 */
function nvlNumber(val) {
    if (val == "" || isNaN(val) || val == "undefined")
        return 0;

    return Number(val);
}

/**
 * 숫자형식에서 comma를 없애고, 날짜형식에서 "/" 를 없앤다.
 *
 * @param   form
 */
function makeValue(form) {
    for (i = 0; i < form.elements.length; i++) {
        obj = form.elements(i);

        if (obj.tagName == "INPUT") {
            dataType = obj.getAttribute("dataType");

            if (dataType == "date") {
                deleteDateFormat(obj);
            } else if (dataType == "number" || dataType == "integer" || dataType == "float" || dataType == "double") {
                if (obj.getAttribute("comma") != null) {
                    deleteComma(obj);
                }
            } else if (dataType == "yyyymm") {
                deleteDateFormat(obj);
            }
            /// notHyphen 이라고 선언했다면 하이픈을 모두 제거한다.
            if (obj.getAttribute("notHyphen") != null) {
                deleteHyphenObj(obj);
            }
        }
    }
}

/**
 * 문자에서 Hyphen을 없앤다.
 *
 * @param  obj
 */
function deleteHyphenObj(obj) {
    obj.value = deleteHyphen(obj.value);
}

/**
 * 데이터 유효성을 체크한다.
 * 하나의 오브젝트에 대한 것임.
 *
 * @param   form
 * @param   obj
 */
function validateObj(form, obj) {

    var dispName;
    var dataType;
    var minValue;
    var maxValue;
    var isValid;
    var value;

    obj.value = trim(obj.value);
    dispName = obj.getAttribute("dispName");
    dataType = obj.getAttribute("dataType");
    minValue = obj.getAttribute("minValue");
    maxValue = obj.getAttribute("maxValue");
    len = obj.getAttribute("len");
    value = obj.value;

    if (dispName == null) {
        dispName = obj.name;
    }

    // 필수 입력 항목 체크
    if (obj.getAttribute("notNull") != null) {
        isValid = false;

        if (obj.type == "radio" || obj.type == "checkbox") {
            if (form.elements(obj.name).length) {
                for (j = 0; j < form.elements(obj.name).length; j++) {
                    if (form.elements(obj.name)[j].checked) {
                        isValid = true;
                        break;
                    }
                }
            } else {
                if (obj.checked) {
                    isValid = true;
                }
            }
        } else {
            if (value != "") {
                isValid = true;
            } else {
                if (obj.getAttribute("comma") != null) {
                    obj.value = 0;
                    isValid = true;
                }
            }
        }

        if (!isValid) {
            alert(getCommonMessage("msg10", dispName));
            obj.focus();
            if (window.event) {
                window.event.returnValue = false;
            }
            return false;
        }
    }

    // 데이터 길이 체크
    if (len != null) {
        if (jsByteLength(value) != eval(len)) {
            alert(getCommonMessage("msg11", dispName, len));
            obj.focus();
            if (window.event) {
                window.event.returnValue = false;
            }
            return false;
        }
    }

    if (obj.type == "text") {
        // 데이터 타입 체크
        if ((value != "") && (dataType != null)) {
            isValid = true;
            checkValue = false;

            if (dataType == "date") {
                value = deleteDateFormatStr(value);
                isValid = isDate(value);
                checkValue = true;
            } else if (dataType == "email") {
                isValid = isEmail(value);
            } else if (dataType == "float") {
                value = deleteCommaStr(value);
                isValid = isFloat(value);
                checkValue = true;
            } else if (dataType == "integer") {
                value = deleteCommaStr(value);
                isValid = isInteger(value);
                checkValue = true;
            } else if (dataType == "number") {
                value = deleteCommaStr(value);
                isValid = isNumber(value);
                checkValue = true;
            } else if (dataType == "double") {
                value = deleteCommaStr(value);
                isValid = isNumber(value);
                checkValue = true;
            }

            if (!isValid) {
                alert(getCommonMessage("msg14", dispName, len));
                if (dataType == "float" || dataType == "integer" || dataType == "number" || dataType == "double") {
                    obj.value = "0";
                }
                obj.focus();
                if (window.event) {
                    window.event.returnValue = false;
                }
                return false;
            }

            if (checkValue) {
                if (minValue != null) {
                    if (eval(minValue) > eval(value)) {
                        alert(getCommonMessage("msg15", dispName, minValue));
                        obj.focus();
                        if (window.event) {
                            window.event.returnValue = false;
                        }
                        return false;
                    }
                }

                if (isValid && (maxValue != null)) {
                    if (eval(maxValue) < eval(value)) {
                        alert(getCommonMessage("msg17", dispName, maxValue));
                        obj.focus();
                        if (window.event) {
                            window.event.returnValue = false;
                        }
                        return false;
                    }
                }
            }
        }
    }

    return true;
}

/**
 * 숫자형식에서 comma를 없애고, 날짜형식에서 "/" 를 없앤다.
 * 하나의 오브젝트에 대한 것임.
 *
 * @param   form
 * @param   obj
 */
function makeValueObj(form, obj) {
    if (obj.tagName == "INPUT") {
        dataType = obj.getAttribute("dataType");

        if (dataType == "date") {
            deleteDateFormat(obj);
        } else if (dataType == "number" || dataType == "integer" || dataType == "float" || dataType == "double") {
            if (obj.getAttribute("comma") != null) {
                deleteComma(obj);
            }
        }
    }
}

/**
 * 문자에서 Hyphen을 없앤다.
 *
 * @param   str
 */
function deleteHyphen(str) {
    var temp = '';

    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) == '-') {
            continue;
        } else {
            temp += str.charAt(i);
        }
    }

    return temp;
}

/**
 * 주민등록번호&사업자번호에 '-'넣기
 */
function setJuminHyphen(obj) {
    var str = deleteHyphen(obj.value);

    if (str.length == 13) { // 주민등록번호  6-7
        str = str.substring(0, 6) + "-" + str.substring(6);
    } else if (str.length == 10) { // 사업자번호 3-2-5
        str = str.substring(0, 3) + "-" + str.substring(3, 5) + "-" + str.substring(5);
    }
    obj.value = str;
}

/** 
 * 법인번호 에 '-'넣기
 */
function setPupinHyphen(obj) {
    var str = deleteHyphen(obj.value);

    if (str.length == 13) { // 주민등록번호  6-7
        str = str.substring(0, 6) + "-" + str.substring(6);
    }
    obj.value = str;
}

/**
 * 납입주기에 따른 이율을 계산한다.
 * (소수로 반환한다.)
 *
 * @param   currencyCd 통화
 * @param   yRate 년이율
 * @param   term 납입주기
 * @return  소수 이율
 */
function jsRateCalc(currencyCd, yRate, term) {

    var yday = jsYdayCalc(currencyCd);
    var rate = eval((yRate / 100) * (term / 12) * (365 / yday));

    return rate;
}

/**
 * 금액을 단수 처리한다.
 *
 * 원화(WON)
 *
 *  단수단위
 *      0 - 원미만
 *      1 - 십원미만
 *      2 - 백원미만
 *      3 - 천원미만
 *      4 - 만원미만
 *
 *  단수처리
 *      1 - 반올림
 *      2 - 절상
 *      3 - 절사
 *
 * 외화
 *
 *  단수단위
 *      0 - 소수점 0 미만
 *      1 - 소수점 1 미만
 *      2 - 소수점 2 미만
 *
 *  단수처리
 *      1 - 반올림
 *      2 - 절상
 *      3 - 절사
 * @param   currency 통화 (text)
 * @param   amt 금액 (text)
 * @param   unit 단수단위 (text)
 * @param   method 단수처리 (text)
 */
function jsTruncAmt(currency, amt, unit, method) {

    var after = eval(amt);

    if (currency == "WON") {

        after /= Math.pow(10, eval(unit));

        if (method == "1") {
            after = Math.round(after);
        } else if (method == "2") {
            after = Math.ceil(after);
        } else if (method == "3") {
            after = Math.floor(after);
        }

        after *= Math.pow(10, eval(unit));
    } else {
        after *= Math.pow(10, eval(unit));

        if (method == "1") {
            after = Math.round(after);
        } else if (method == "2") {
            after = Math.ceil(after);
        } else if (method == "3") {
            after = Math.floor(after);
        }

        after /= Math.pow(10, eval(unit));
    }

    return after;
}

/**
 * String이 null인 경우 '0'으로 바꾸어 준다.
 *
 * @param   string
 * @return  String
 */
function jsNumnvl(str) {
    if (str == null || str == "") {
        return "0";
    }
    return str;
}

function jsNvl(str) {
    if (str == null) {
        return "";
    }
    return str;
}

/**
 * 폼 안의 숫자 오브젝트에 콤마를 붙여준다.
 */
function setComma() {

    for (i = 0; i < document.forms.length; i++) {
        var elements = document.forms(i).elements;
        for (j = 0; j < elements.length; j++) {
            if (elements(j).tagName == "INPUT") {
                dataType = elements(j).getAttribute("dataType");
                if (dataType == "number" || dataType == "integer" ||
                    dataType == "float" || dataType == "double") {
                    if (elements(j).getAttribute("comma") != null) {
                        addComma(elements(j));
                    }
                }
            }
        }
    }
}

/**
 * 일수를 계산한다.(초일산입 말일불산입)
 *
 * @param   from 시작일
 * @param   to 종료일
 * @return  일수
 */
function jsGetDays(from, to) {

    var fromDt = deleteDateFormatStr(from);
    var toDt = deleteDateFormatStr(to);
    var days = 0;

    var fromYy = eval(fromDt.substring(0, 4));
    var fromMm = eval(fromDt.substring(4, 6) - 1);
    var fromDd = eval(fromDt.substring(6, 8));

    var toYy = eval(toDt.substring(0, 4));
    var toMm = eval(toDt.substring(4, 6) - 1);
    var toDd = eval(toDt.substring(6, 8));

    var fromDate = new Date(fromYy, fromMm, fromDd);
    var toDate = new Date(toYy, toMm, toDd);

    days = ((toDate - fromDate) / 60 / 60 / 24 / 1000);

    return days;
}

/**
 * 비밀번호 체크
 */
function passChk(p_id, p_pass, obj) {

    var cnt = 0;
    var cnt2 = 1;
    var cnt3 = 1;
    var temp = "";

    /* 비밀번호에에 숫자만 입력되는것을 체크 - 이혁*/
    regNum = /^[0-9]+$/gi;
    bNum = regNum.test(p_pass);
    if (bNum) {
        alert('비밀번호는 숫자만으로 구성하실수는 없습니다.');
        obj.focus();
        return false;
    }
    /* 비밀번호에에 문자만 입력되는것을 체크 - 이혁*/
    regNum = /^[a-zA-Z]+$/gi;
    bNum = regNum.test(p_pass);
    if (bNum) {
        alert('비밀번호는 문자만으로 구성하실수는 없습니다.');
        obj.focus();
        return false;
    }

    for (var i = 0; i < p_id.length; i++) {
        temp_id = p_id.charAt(i);

        for (var j = 0; j < p_pass.length; j++) {
            if (cnt > 0) {
                j = tmp_pass_no + 1;
            }

            if (temp == "r") {
                j = 0;
                temp = "";
            }

            temp_pass = p_pass.charAt(j);

            if (temp_id == temp_pass) {
                cnt = cnt + 1;
                tmp_pass_no = j;
                break;
            } else if (cnt > 0 && j > 0) {
                temp = "r";
                cnt = 0;
            } else {
                cnt = 0;
            }
        }

        if (cnt > 3) {
            break;
        }
    }

    if (cnt > 3) {
        alert("비밀번호가 ID와 4자 이상 중복되거나, \n연속된 글자나 순차적인 숫자를 4개이상 사용해서는 안됩니다.");
        obj.focus();
        return false;
    }

    for (var i = 0; i < p_pass.length; i++) {
        temp_pass1 = p_pass.charAt(i);
        next_pass = (parseInt(temp_pass1.charCodeAt(0))) + 1;
        temp_p = p_pass.charAt(i + 1);
        temp_pass2 = (parseInt(temp_p.charCodeAt(0)));

        if (temp_pass2 == next_pass) {
            cnt2 = cnt2 + 1;
        } else {
            cnt2 = 1;
        }

        if (temp_pass1 == temp_p) {
            cnt3 = cnt3 + 1;
        } else {
            cnt3 = 1;
        }

        if (cnt2 > 3) {
            break;
        }

        if (cnt3 > 3) {
            break;
        }
    }

    if (cnt2 > 3) {
        alert("비밀번호에 연속된 글이나 순차적인 숫자를 4개이상 사용해서는 안됩니다.");
        obj.focus();
        return false;
    }

    if (cnt3 > 3) {
        alert("비밀번호에 반복된 문자/숫자를 4개이상 사용해서는 안됩니다.");
        obj.focus();
        return false;
    }

    return true;
}

/**
 * 브라우저의 버전을 체크한다.
 *
 * @param   none
 * @return  none
 */
function objDetectBrowser() {
    var strUA, s, i;
    this.isIE = false; // 인터넷 익스플로러인지를 나타내는 속성
    this.isNS = false; // 넷스케이프인지를 나타내는 속성
    this.version = null; // 브라우저 버전을 나타내는 속성

    // Agent 정보를 담고 있는 문자열.
    strUA = navigator.userAgent;

    s = "MSIE";
    // Agent 문자열(strUA) "MSIE"란 문자열이 들어 있는지 체크

    if ((i = strUA.indexOf(s)) >= 0) {
        this.isIE = true;
        // 변수 i에는 strUA 문자열 중 MSIE가 시작된 위치 값이 들어있고,
        // s.length는 MSIE의 길이 즉, 4가 들어 있다.
        // strUA.substr(i + s.length)를 하면 strUA 문자열 중 MSIE 다음에 
        // 나오는 문자열을 잘라온다.
        // 그 문자열을 parseFloat()로 변환하면 버전을 알아낼 수 있다.
        this.version = parseFloat(strUA.substr(i + s.length));
        return;
    }

    s = "Netscape6/";
    // Agent 문자열(strUA) "Netscape6/"이란 문자열이 들어 있는지 체크

    if ((i = strUA.indexOf(s)) >= 0) {
        this.isNS = true;
        this.version = parseFloat(strUA.substr(i + s.length));
        return;
    }

    // 다른 "Gecko" 브라우저는 NS 6.1로 취급.

    s = "Gecko";
    if ((i = strUA.indexOf(s)) >= 0) {
        this.isNS = true;
        this.version = 6.1;
        return;
    }
}

/**
 * 화면 크기를 1024*768로 고정 시킨다.
 */
function fixScreen() {
    if ((screen.availWidth >= 1024) & (screen.availHeight >= 768)) {
        availX = 1024;
        availY = 768;
        screenX = screen.availWidth;
        screenY = screen.availHeight;
        windowX = (screenX - availX) / 2;
        windowY = (screenY - availY) / 2;
    } else {
        //availX = 1024;
        //availY = 768;
        availX = screen.availWidth;
        availY = screen.availHeight;
        windowX = 0;
        windowY = 0;
    }
    moveTo(windowX, windowY);
    resizeTo(availX, availY);
}

/**
 * sub 화면을 가운데에 위치 시킨다.
 * centerSubWindow(winName, wx, wy)
 * winName : 서브윈도우의 이름
 * ww : 서브윈도우로 열 창의 너비
 * wh : 서브윈도우로 열 창의 높이
 */
function centerSubWindow(winName, ww, wh) {
    if (document.layers) {
        sw = screen.availWidth;
        sh = screen.availHeight;
    }
    if (document.all) {
        sw = screen.width;
        sh = screen.height;
    }

    w = (sw - ww) / 2;
    h = (sh - wh) / 2;
    winName.moveTo(w, h);
}

/**
 * 문자열에서 삭제를 원하는 문자를 삭제한다.
 *
 * @param   val 문자열
 * @param   str 삭제할 문자
 */
function jsTrim(val, str) {
    var temp = val.value;
    temp = temp.split(str);

    val.value = temp.join("");
}

/**
 * 폼 전체를 읽기전용으로 만든다.
 *
 * @param    form명
 */
function setAllDisabled(tform) {
    var len = tform.elements.length;
    for (i = 0; i < len; i++) {
        if (tform.elements[i].type == "text" || tform.elements[i].type == "select-one" ||
            tform.elements[i].type == "textarea" || tform.elements[i].type == "file" ||
            tform.elements[i].type == "radio" || tform.elements[i].type == "checkbox") {
            tform.elements[i].disabled = true;
        }
    }
}

/**
 * 폼 전체를 읽기전용을 정상으로 돌려 놓는다.
 *
 * @param    form명
 */
function setAllEnabled(tform) {
    var len = tform.elements.length;
    for (i = 0; i < len; i++) {
        if (tform.elements[i].type == "text" || tform.elements[i].type == "select-one" ||
            tform.elements[i].type == "textarea" || tform.elements[i].type == "file" ||
            tform.elements[i].type == "radio" || tform.elements[i].type == "checkbox") {
            tform.elements[i].disabled = false;
        }
    }
}

/**
 * tokenCommaPatt
 *
 * @param    val
 * @param    patt
 * @ String val을 String patt로 구분하여배열로 리턴한다.
 * example
 *  var TestArray = tokenCommaPatt( "abcd efgh ijkl", " ")
 *  TestArray[0] = "abcd";
 *  TestArray[1] = "efgh";
 *  TestArray[2] = "ijkl";
 */
function tokenCommaPatt(val, patt) {
    var i = 0,
        iFst = 0;
    var sCheckValue = val;
    var arrRst = new Array();
    while ((iFst = sCheckValue.indexOf(patt)) >= 0) {
        arrRst[i++] = sCheckValue.substring(0, iFst);
        sCheckValue = sCheckValue.substring(iFst + patt.length, sCheckValue.length);
    }
    arrRst[i] = sCheckValue;
    return arrRst;
}

/**
 * 숫자로만 이루어져 있는지 체크 한다.
 *
 * @param    num
 * @return   boolean
 */
function isNumber2(num) {
    var inText = num.value;
    var ret;

    for (var i = 0; i < inText.length; i++) {
        ret = inText.charCodeAt(i);
        if (!((ret > 47) && (ret < 58))) {
            alert(getCommonMessage("msg20"));
            num.value = "";
            num.focus();
            return false;
        }
    }
    return true;
}

/**
 * 한글로만 이루어져 있는지 체크 한다.
 *
 * @param    han
 * @return   boolean
 */
function isHangul(han) {
    var inText = han.value;
    var ret;

    ret = inText.charCodeAt();
    if (ret > 31 && ret < 127) {
        alert(getCommonMessage("msg21"));
        han.value = "";
        han.focus();
        return false;
    }

    return true;
}

/**
 * 영문캐릭터인지 체크(대문자)
 *
 * param obj
 * return 
 */
function checkChar(obj) {
    var strValue = obj.value

    var retChar = strValue.toUpperCase();

    if (retChar < "A" || retChar > "Z") {
        alert(getCommonMessage("msg22"));
        obj.value = "";
        obj.focus();
        return;
    }
    obj.value = retChar;
}

/**
 * 키보드 입력시 숫자만 입력 가능
 */
function onlyNumber() {
    if (window.event) {
        var result = window.event.keyCode;
        if ((result >= 32 && result < 48) ||
            (result > 57 && result < 65) ||
            (result > 90 && result < 97) ||
            (result >= 97 && result <= 122) ||
            (result >= 65 && result <= 90))
            window.event.returnValue = false;
    }
}

/**
 * 키보드 입력시 수자 및 ','가 입력 가능
 */
function AmtNumber(event) {
    if ((event.keyCode >= 32 && event.keyCode < 44) ||
        (event.keyCode >= 45 && event.keyCode < 48) ||
        (event.keyCode > 57 && event.keyCode < 65) ||
        (event.keyCode > 90 && event.keyCode < 97) ||
        (event.keyCode >= 97 && event.keyCode <= 122) ||
        (event.keyCode >= 65 && event.keyCode <= 90))
        event.returnValue = false;
}

/**
 * 키보드 입력시 수자 및 '.'가 입력 가능
 */
function RateNumber(event) {
    if ((event.keyCode >= 32 && event.keyCode < 46) ||
        (event.keyCode >= 47 && event.keyCode < 48) ||
        (event.keyCode > 57 && event.keyCode < 65) ||
        (event.keyCode > 90 && event.keyCode < 97) ||
        (event.keyCode >= 97 && event.keyCode <= 122) ||
        (event.keyCode >= 65 && event.keyCode <= 90))
        event.returnValue = false;
}

/**
 * 숫자형식에 null이 입력되면 0으로 셋팅한다.
 *
 * @param   form
 */
function setZero(form) {
    for (i = 0; i < form.elements.length; i++) {
        obj = form.elements(i);

        if (obj.tagName == "INPUT") {
            dataType = obj.getAttribute("dataType");

            if (dataType == "number" || dataType == "integer" || dataType == "float" || dataType == "double") {
                if (obj.value == null || obj.value == "") {
                    obj.value = "0";
                }
            }
        }
    }
}

/* 날짜관련 *******************************************************************************/
var dateBase = new Date();

/**
 * 년
 */
function getYear() {
    return dateBase.getFullYear();
}

/**
 * 월
 */
function getMonth() {
    var month = dateBase.getMonth() + 1;
    if (("" + month).length == 1)
        month = "0" + month;
    return month;
}

/**
 * 일
 */
function getDay() {
    var day = dateBase.getDate();
    if (("" + day).length == 1)
        day = "0" + day;
    return day;
}

/**
 * 현재일부터 특정일자 이전(0), 이후(1)의 날짜를 리턴한다.(YYYYMMDD)
 */
function getIntervalDate(term, isPrevNext) {
    var year2, month2, day2;
    var dt = new Date(getMonth() + "-" + getDay() + "-" + getYear());
    var anyTime;
    var anyDate;
    if (isPrevNext == "0") /// 이전
        anyTime = dt.getTime() - (term) * 1000 * 3600 * 24;
    else /// 이후
        anyTime = dt.getTime() + (term) * 1000 * 3600 * 24;
    anyDate = new Date();
    anyDate.setTime(anyTime);
    year2 = ((anyDate.getYear() < 100) ? "19" + anyDate.getYear() : anyDate.getYear());
    month2 = anyDate.getMonth() + 1;
    day2 = anyDate.getDate();
    if (("" + month2).length == 1)
        month2 = "0" + month2;
    if (("" + day2).length == 1)
        day2 = "0" + day2;
    //alert("["+ year2 +"/"+ month2 +"/"+ day2 +"]");

    return year2 + "" + month2 + "" + day2;
}

/**
 * 기준일부터 특정일자 이전(0), 이후(1)의 날짜를 리턴한다.(YYYYMMDD)
 */
function getIntervalDate2(kijunDate, term, isPrevNext) {
    var year2, month2, day2;
    var dt = toTimeObject(deleteDateFormatStr(kijunDate) + "0000");
    var anyTime;
    var anyDate;
    if (isPrevNext == "0") /// 이전
        anyTime = dt.getTime() - (term) * 1000 * 3600 * 24;
    else /// 이후
        anyTime = dt.getTime() + (term) * 1000 * 3600 * 24;
    anyDate = new Date();
    anyDate.setTime(anyTime);
    year2 = ((anyDate.getYear() < 100) ? "19" + anyDate.getYear() : anyDate.getYear());
    month2 = anyDate.getMonth() + 1;
    day2 = anyDate.getDate();
    if (("" + month2).length == 1)
        month2 = "0" + month2;
    if (("" + day2).length == 1)
        day2 = "0" + day2;
    //alert("["+ year2 +"/"+ month2 +"/"+ day2 +"]");

    return year2 + "" + month2 + "" + day2;
}

/**
 * 기준일부터 특정일자 이전(0), 이후(1)의 개월수 만큼 차이나는 날짜를 리턴한다.(YYYYMMDD)
 */
function getIntervalMonth(kijunDate, term, isPrevNext) {
    var kijunDate = deleteDateFormatStr(kijunDate);
    var year = kijunDate.substring(0, 4); /// 년
    var month = kijunDate.substring(4, 6); /// 월
    var date = kijunDate.substring(6, 8); /// 일
    var addMonth;
    var addYear;
    var tempYear;
    var tempMonth;
    var rtnDate;

    if (isPrevNext == "0") /// 이전
    {
        addMonth = eval(month) - eval(term);
        addYear = Math.floor(eval(addMonth / 12)); /// 빼줄 년도 계산
        tempYear = eval(addYear) + eval(addMonth % 12);
        if (tempYear > 0) {
            tempMonth = eval(tempYear % 13);
        } else {
            tempMonth = eval(12 + addMonth % 12);
            if (tempYear == 0)
                addYear = addYear - 1;
        }
    } else /// 이후
    {
        addMonth = eval(month) + eval(term);
        addYear = Math.floor(eval(addMonth / 13)); /// 더해줄 년도 계산
        tempYear = eval(addYear) + eval(addMonth % 13);

        if (tempYear < 13) {
            tempMonth = eval(tempYear % 13);
        } else {
            tempMonth = eval(tempYear % 13 + 1);
            addYear = addYear + 1;
        }
    }

    tempMonth = tempMonth + ""; /// 길이를 알아보기위해 string으로 바꿔줌.
    if (tempMonth.length == 1) {
        tempMonth = "0" + tempMonth;
    }
    /// 해당월에 해당일이 존재하는지 체크하고 존재하지 않는다면 마지막 일을 가져온다.
    if (!isValidDay(eval(year) + eval(addYear), tempMonth, date))
        date = getLastDay(eval(year) + eval(addYear), tempMonth);

    rtnDate = eval(year) + eval(addYear) + "" + tempMonth + "" + date;
    //alert(">날짜 ::"+ rtnDate);

    return rtnDate;
}

/**
 * Time 스트링을 자바스크립트 Date 객체로 변환
 *
 * parameter time: Time 형식의 String
 */
function toTimeObject(time) { //parseTime(time)
    var year = time.substr(0, 4);
    var month = time.substr(4, 2) - 1; // 1월=0,12월=11
    var day = time.substr(6, 2);
    var hour = time.substr(8, 2);
    var min = time.substr(10, 2);

    return new Date(year, month, day, hour, min);
}


/**
 * 시분초 +,- 계산
 *
 * parameter preTime ,operator(연산자) , nextTime
 */
function timeCalculable(preTime, operator, nextTime) {
    var pre_hour = parseInt(preTime.substring(0, 2));
    var pre_min = parseInt(preTime.substring(2, 4));
    var pre_sec = parseInt(preTime.substring(4, 6));

    var next_hour = parseInt(nextTime.substring(0, 2));
    var next_min = parseInt(nextTime.substring(2, 4));
    var next_sec = parseInt(nextTime.substring(4, 6));

    var pre_total = (pre_hour * 3600) + (pre_min * 60) + (pre_sec);
    var next_total = (next_hour * 3600) + (next_min * 60) + (next_sec);

    var result_time = "";
    if (operator == "+") result_time = next_total + pre_total;
    else if (operator == "-") result_time = next_total - pre_total;

    return result_time;
}

/**
 * 자바스크립트 Date 객체를 Time 스트링으로 변환
 *
 * parameter date: JavaScript Date Object
 */
function toTimeString(date) { //formatTime(date)
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // 1월=0,12월=11이므로 1 더함
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();

    if (("" + month).length == 1) {
        month = "0" + month;
    }
    if (("" + day).length == 1) {
        day = "0" + day;
    }
    if (("" + hour).length == 1) {
        hour = "0" + hour;
    }
    if (("" + min).length == 1) {
        min = "0" + min;
    }

    return ("" + year + month + day + hour + min)
}

/**
 * 유효한(존재하는) 월(月)인지 체크
 */
function isValidMonth(mm) {
    var m = parseInt(mm, 10);
    return (m >= 1 && m <= 12);
}

/**
 * 유효한(존재하는) 일(日)인지 체크
 */
function isValidDay(yyyy, mm, dd) {
    var m = parseInt(mm, 10) - 1;
    var d = parseInt(dd, 10);

    var end = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if ((yyyy % 4 == 0 && yyyy % 100 != 0) || yyyy % 400 == 0) {
        end[1] = 29;
    }

    return (d >= 1 && d <= end[m]);
}

/**
 * 해당 월의 마지막 일을 가져온다.
 */
function getLastDay(yyyy, mm) {
    var m = parseInt(mm, 10) - 1;
    var d;

    var end = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if ((yyyy % 4 == 0 && yyyy % 100 != 0) || yyyy % 400 == 0) {
        end[1] = 29;
    }
    for (var i = 0; i < end.length; i++) {
        if (m == i)
            d = end[i];
    }
    //alert("d ::"+ d);

    return d;
}

/**
 * 유효한(존재하는) 시(時)인지 체크
 */
function isValidHour(hh) {
    var h = parseInt(hh, 10);
    return (h >= 1 && h <= 24);
}

/**
 * 유효한(존재하는) 분(分)인지 체크
 */
function isValidMin(mi) {
    var m = parseInt(mi, 10);
    return (m >= 1 && m <= 60);
}

/**
 * 현재날짜를 리턴한다.
 *
 */
function getCurDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // 1월=0,12월=11이므로 1 더함
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();

    if (("" + month).length == 1) {
        month = "0" + month;
    }
    if (("" + day).length == 1) {
        day = "0" + day;
    }
    if (("" + hour).length == 1) {
        hour = "0" + hour;
    }
    if (("" + min).length == 1) {
        min = "0" + min;
    }

    return ("" + year + month + day)
}
/* 날짜관련 *******************************************************************************/

/**
 * 날짜를 체크하여 금월을 return
 *
 * @param       날짜
 */
function jsThisMonth(nowDate) {
    var form = document.form1;

    var nowYear = nowDate.substring(0, 4);
    var nowMonth = nowDate.substring(4, 6);
    var nowDay = nowDate.substring(6, 8);
    var newDay = "";

    for (var i = 28; i <= 31; i++) {
        if (isDate(nowYear + nowMonth + i)) {
            newDay = i + "";
        }
    }

    form.fromDate.value = addDateFormatStr(nowYear + nowMonth + "01");
    form.toDate.value = addDateFormatStr(nowYear + nowMonth + newDay);
}

/**
 * 날짜를 체크하여 금주를 return
 *
 * @param       날짜
 */
function jsThisWeek(nowDate) {
    var form = document.form1;

    var dateWeek = getDateWeek(nowDate);
    var monday = Number(nowDate) - dateWeek + 1;
    var sunday = monday + 6;

    form.fromDate.value = addDateFormatStr(monday + "");
    form.toDate.value = addDateFormatStr(sunday + "");
}

/**
 * 날짜를 체크하여 금일를 return
 *
 * @param       날짜
 */
function jsThisDay(nowDate) {
    var form = document.form1;

    form.fromDate.value = addDateFormatStr(nowDate);
    form.toDate.value = addDateFormatStr(nowDate);
}

/**
 * 지정한 날짜의 요일(1 -> 월, ~ 7 -> 일)
 *
 * @param       날짜
 */
function getDateWeek(val) {
    var day;
    var d = new Date();

    d.setUTCFullYear(Number(val.substring(0, 4)));
    d.setUTCMonth(Number(val.substring(4, 6)) - 1);
    d.setUTCDate(Number(val.substring(6, 8)));

    day = d.getDay();

    return day;
}

/**
 * 엔터키 누르면 자동으로 다음 필드로 이동
 */
function enterNextField(field, event) {
    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;

    if (keyCode == 13) {
        var i;
        for (i = 0; i < field.form.elements.length; i++) {
            if (field == field.form.elements[i])
                break;
        }

        i = (i + 1) % field.form.elements.length;
        field.form.elements[i].focus();
        return false;
    } else
        return true;
}

/**
 * 화면의 첫번째 TextField에 포커스 이동
 */
function firstTextFocus() {
    var elements;
    var obj;

    for (var j = 0; j < document.forms.length; j++) {
        elements = document.elements[j].elements;

        for (var i = 0; i < elements.length; i++) {
            obj = elements[i];

            if (obj.tagName == "INPUT") {
                if (obj.type == "text" && obj.disabled == false) {
                    obj.focus();
                    endFocus(obj);
                    return;
                }
            }
        }
    } /// end of for()
}

/**
 * 화면의 원하는 TextField 나 TextArea에 포커스 이동
 */
function firstTextFocus(formName) {
    var elements;
    var obj;

    for (var j = 0; j < document.forms.length; j++) {
        elements = document.forms[j].elements;

        for (var i = 0; i < elements.length; i++) {
            obj = elements[i];

            if (obj.name == formName) {
                if (obj.tagName == "INPUT" || obj.tagName.toUpperCase() == "TEXTAREA") {
                    //alert("obj.name ::"+ obj.name +"/ obj.tagName ::"+ obj.tagName +"/ formName ::"+ formName +"/ obj.type ::"+ obj.type);
                    if ((obj.type == "text" || obj.type == "textarea") && obj.disabled == false) {
                        obj.focus();
                        endFocus(obj);
                        return;
                    }
                }
            } else if (formName == "" || formName == null) {
                if (obj.tagName == "INPUT") {
                    if (obj.type == "text" && obj.disabled == false) {
                        obj.focus();
                        endFocus(obj);
                        return;
                    }
                }
            }
        }
    } /// end of for()
}

/**
 * FM## - getFM(12, 4) -> 0012로 변경한다.
 * @param       val 원본 값
 * @param       len 사이즈 (0을 채울 갯수)
 */
function getFM(val, len) {
    if (val == "")
        return val;
    var str = "";
    var zero = "";
    var valLen = new String(val).length;
    var forLen = len - valLen;
    if (len <= valLen)
        return val;
    for (var i = 0; i < (forLen); i++) {
        zero += "0";
    }
    str = zero + val;

    return str;
}

/**
 * 퍼미션 체크
 * 하나의 오브젝트에 대한 것임.
 *
 * @param   form
 * @param   obj
 */
function permission(form, obj) {
    /// 버튼에 다음과 같이 정의해야 한다. perm permType="C" permCheck="<%= "C" %>"
    var permType = ""; /// 현재 버튼의 CRUD 타입
    var permCheck = ""; /// 사용자가 가진 퍼미션
    var dispName = ""; /// 디스플레이명
    var permCheckArr = new Array();

    for (i = 0; i < form.elements.length; i++) {
        if (obj.getAttribute("perm") != null) {
            if (obj.tagName == "INPUT" || obj.tagName == "IMG") {
                permType = obj.getAttribute("permType");
                permCheck = obj.getAttribute("permCheck");
                dispName = obj.getAttribute("dispName");
                if (permType != null && permType != "") {
                    if (permCheck != null && permCheck != "") {
                        permCheckArr = tokenCommaPatt(permCheck, "|");
                    }
                    /// CRUD 권한 체크
                    for (var j = 0; j < permCheckArr.length; j++) {
                        if (permType == permCheckArr[j]) {
                            break;
                        } else {
                            alert(getCommonMessage("msg09", dispName));
                            obj.focus();
                            if (window.event) {
                                window.event.returnValue = false;
                            }
                            return false;
                        }
                    }
                }
            }
            break;
        }
    }
    alert("permType ::" + permType + "/ permCheck ::" + permCheck);
}

/**
 * 텍스트필드의 맨 끝(오른쪽)으로 포커스 이동하기.
 * <input type="textfield" name="addr" onFocus="endFocus(this);">
 * 
 * @param   obj
 */
function endFocus(obj) {
    obj.value = obj.value + '';
}

/**
 * 라디오버튼의 선택되어진 개체의 값을 가져온다.
 * 
 * @param       frm document.form
 * @param       elem 라디오버튼 개체명
 */
function getRadioValue(frm, elem) {
    var val = "";

    if (elem == null || elem == "")
        return "";

    if (frm.elements[elem].length > 0) {

        for (var i = 0; i < frm.elements[elem].length; i++) {
            if (frm.elements[elem][i].checked) {
                val = frm.elements[elem][i].value;
                break;
            }
        } /// end of for()
    } else
        val = frm.elements[elem].value;

    return val;
}

/**
 * 체크박스가 하나라도 선택 되어 있는지를 체크한다.
 *
 **/
function Checkbox_Checked(obj) {
    isChk = false;
    if (obj == undefined) return isChk;

    if (obj.length == undefined) {
        if (obj.checked == true) {
            isChk = true;
        }
    } else {
        for (i = 0; i < obj.length; i++) {
            if (obj[i].checked == true) {
                isChk = true;
            }
        }
    }
    return isChk;
}

function Checkbox_Check(obj) {
    isChk = false;
    if (obj.length == undefined) {
        isChk = false;
    } else {
        isChk = true;
    }
    return isChk;
}

function Checkbox_Checked_Count(obj) {
    var checkCnt = 0;
    if (obj == undefined) return isChk;

    if (obj.length == undefined) {
        if (obj.checked == true) {
            checkCnt = 1;
        }
    } else {
        for (i = 0; i < obj.length; i++) {
            if (obj[i].checked == true) {
                checkCnt++;
            }
        }
    }
    return checkCnt;
}


// 창의 위치를 가운데 조정하고 사이즈고정
function Center_Fixed_Popup(s_url, s_val, s_name, s_width, s_height, s_scroll) {
    ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=no, scrollbars=" + s_scroll + ", status=yes width=400 height=400";
    wd_pop = window.open(s_url + "?" + s_val, s_name, ls_pri);
    if (wd_pop == null) {
        alert(getCommonMessage("msg23"));
        return;
    }
    wd_pop.blur();
    wd_pop.resizeTo(s_width, s_height);
    wd_pop.moveTo(((screen.availwidth - eval(s_width)) / 2), ((screen.availheight - eval(s_height)) / 2));
    wd_pop.focus();
    return wd_pop;
}

function Center_Fixed_Popup2(s_url, s_name, s_width, s_height, s_scroll) {
    ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=no, scrollbars=" + s_scroll + ", status=yes width=400 height=400";
    wd_pop = window.open(s_url, s_name, ls_pri);
    if (wd_pop == null) {
        alert(getCommonMessage("msg23"));
        return;
    }
    wd_pop.blur();
    wd_pop.resizeTo(s_width, s_height);
    wd_pop.moveTo(((screen.availwidth - eval(s_width)) / 2), ((screen.availheight - eval(s_height)) / 2));
    wd_pop.focus();
    return wd_pop;
}

/**
 * 입력된 숫자값을 지정된 소숫점 자릿수로 Round해서 값을 리턴한다.<p>
 * ex) fncRoundPrecision(300.12345678,3) <p>
 * Result ) 300.123
 */
function RoundPrecision(val, precision) {
    var p = Math.pow(10, precision);
    return Math.round(val * p) / p;
}

/**
 * 셀렉트 박스의 option을 모두 삭제한다.
 */
function selectbox_remove_all(obj) {
    for (i = 0; i < obj.length; i++) {
        if (obj.options[i].value == s_val) {
            obj.remove(i);
        }
    }
}

/**
 * 셀렉트 박스의 값과 일치하는 option을 삭제한다.
 */
function selectbox_remove(obj, s_val) {
    for (i = 0; i < obj.length; i++) {
        if (obj.options[i].value == s_val) {
            obj.remove(i);
        }
    }
}

/**
 * 셀렉트 박스의 option을 생성한다.
 */
function selectbox_insert(obj, s_text, s_val) {
    obj.options[obj.length] = new Option(s_text, s_val, false, false);
}

var checkbox_flag = true;

function checkBoxSelectAll(obj) {
    try {
        if (Checkbox_Check(obj)) {
            for (i = 0; i < obj.length; i++) {
                if (Checkbox_Checked(obj[i])) {
                    obj[i].checked = false;
                } else {
                    obj[i].checked = true;
                }
            }
        } else {
            if (Checkbox_Checked(obj)) {
                obj.checked = false;
            } else {
                obj.checked = true;
            }
        }
        if (checkbox_flag == true) {
            checkbox_flag = false;
        } else {
            checkbox_flag = true;
        }
    } catch (e) {
        window.status = "error";
    }
}

HashMap = function() {
    this.keys = new Array();
    this.values = new Array();
    /**
     * Removes all mappings from this map.
     */
    this.clear = function() {
        this.keys.splice(0, this.keys.length);
        this.values.splice(0, this.values.length);
    }
    /**
     * Returns true if this map contains a mapping for the specified key.
     */
    this.containsKey = function(key) {
        return this.indexKeyOf(key);
    }

    this.indexKeyOf = function(obj, startIndex) {
        if (startIndex == null) {
            startIndex = 0;
        }

        if (startIndex < this.keys.length && startIndex >= 0) {
            for (var i = startIndex; i < this.keys.length; i++) {
                if (this.keys[i] == obj) {
                    return i;
                }
            }
            return -1;
        } else {
            throw new Exception("Array Index Error. vector.indexOf()");
        }
    }

    /**
     * Returns true if this map maps one or more keys to the specified value.
     */
    this.containsValue = function(value) {
        return this.indexValueOf(value);
    }

    this.indexValueOf = function(obj, startIndex) {
        if (startIndex == null) {
            startIndex = 0;
        }

        if (startIndex < this.values.length && startIndex >= 0) {
            for (var i = startIndex; i < this.values.length; i++) {
                if (this.values[i] == obj) {
                    return i;
                }
            }
            return -1;
        } else {
            throw new Exception("Array Index Error. vector.indexOf()");
        }
    }

    /**
     * Returns true if this map contains no key-value mappings.
     */
    this.isEmpty = function() {
        return (this.size() == 0);
    }
    /**
     * Associates the specified value with the specified key in this map.
     */
    this.put = function(key, value) {
        this.keys[this.keys.length] = key;
        this.values[this.values.length] = value;
    }
    /**
     * Returns the value to which the specified key is mapped in this identity hash map, or null if the map contains no mapping for this key
     */
    this.get = function(key) {
        var value = null;
        for (var i = 0; i < this.keys.length; i++) {
            if (this.keys[i] == key) value = this.values[i];
        }
        return value;
    }
    /**
     * Returns the number of key-value mappings in this map.
     */
    this.size = function() {
        return this.keys.length;
    }

    this.toKeyString = function() {
        return this.keys.join(",");
    }

    this.toValueString = function() {
        return this.values.join(",");
    }

    this.remove = function(key) {
        for (var i = 0; i < this.keys.length; i++) {
            if (this.keys[i] == key) {
                this.values[i] = null;
                this.keys[i] = null;
            }
        }
    }
}


/**
 * 초를 시간형식(HHHH:MM:SS)으로 변환
 */
function convertSecondsToTime(ts) {
    var hour = 0;
    var min = 0;
    var sec = (ts % 60);

    ts -= sec;
    var tmp = (ts % 3600);
    ts -= tmp;

    if ((ts % 3600) != 0) {
        hour = 0;
    } else {
        hour = (ts / 3600);
    }

    if ((tmp % 60) != 0) {
        min = 0;
    } else {
        min = (tmp / 60);
    }

    if ((new String(hour)).length < 2) {
        hour = "0" + hour;
    }
    if ((new String(min)).length < 2) {
        min = "0" + min;
    }
    if ((new String(sec)).length < 2) {
        sec = "0" + sec;
    }

    var rtnVal = hour + ":" + min + ":" + sec;

    return rtnVal;
}


/**
 * 초를 분으로 계산하는 함수.
 */
function convertSecondsToMin(ts) {
    var hour = 0;
    var min = 0;
    var sec = (ts % 60);

    ts -= sec;
    var tmp = (ts % 3600);
    ts -= tmp;

    if ((ts % 3600) != 0) {
        hour = 0;
    } else {
        hour = (ts / 3600);
    }

    if ((tmp % 60) != 0) {
        min = 0;
    } else {
        min = (tmp / 60);
    }

    if ((new String(hour)).length < 2) {
        hour = "0" + hour;
    }

    min += (hour * 60);
    if ((new String(min)).length < 2) {
        min = "0" + min;
    }
    if ((new String(sec)).length < 2) {
        sec = "0" + sec;
    }

    var rtnVal = "";
    if (min != "00") {
        rtnVal += min;
    }

    return rtnVal;
}


/**
 * HTML 태그를 제거해준다.
 */
function stripHTMLtag(string) {
    var objStrip = new RegExp();
    objStrip = /[<][^>]*[>]/gi;
    return string.replace(objStrip, "");
}


/**
 * HTML 태그를 비활성화한다.
 */
function disableHtmlTag(value) {
    if (value == null || value == "") {
        return "";
    }

    value = value.replace(/</g, "&lt;");
    value = value.replace(/>/g, "&gt;");
    return value;
}

/**
 * 제목줄 문자열 자르기
 */
function substrByLength(str, length) {
    if (str.length > length) {
        return str.substring(0, length) + "..";
    } else {
        return str;
    }
}

/**
 * 날짜변환
 */
function transDateValue(formName, inputFieldName, hiddenFieldName) {
    var inputObj = document.forms[formName].elements[inputFieldName];
    var hiddenObj = document.forms[formName].elements[hiddenFieldName];
    hiddenObj.value = inputObj.value.replace(/-/g, "");
}

/**
 * 해당 날짜가 특정기간내에 있는지 확인
 */
function dateTermValidCheck(formObj, startDate, endDate, dateName) {
    if (formObj.value != "") {
        if (formObj.value < startDate || formObj.value > endDate) {
            alert(getCommonMessage("msg24", dateName, addDateFormatStr(startDate, localeKey), addDateFormatStr(endDate), dateName));
            return false;
        }
    }
    return true;
}

function isTermDate(date) {
    var str;
    if (date == null || date.length != 8) {
        return false;
    }

    if (!isNumber(date)) {
        return false;
    }

    var year = eval(date.substring(0, 4));
    var month = eval(date.substring(4, 6));
    var day = eval(date.substring(6, 8));

    if (year == "0000") {
        return false;
    }

    if (month > 12 || month == "00") {
        return false;
    }

    var totalDays;

    switch (eval(month)) {

        case 1:
            totalDays = 31;
            break;
        case 2:
            if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
                totalDays = 29;
            else
                totalDays = 28;
            break;
        case 3:
            totalDays = 31;
            break;
        case 4:
            totalDays = 30;
            break;
        case 5:
            totalDays = 31;
            break;
        case 6:
            totalDays = 30;
            break;
        case 7:
            totalDays = 31;
            break;
        case 8:
            totalDays = 31;
            break;
        case 9:
            totalDays = 30;
            break;
        case 10:
            totalDays = 31;
            break;
        case 11:
            totalDays = 30;
            break;
        case 12:
            totalDays = 31;
            break;
    }

    if (day > totalDays) {
        return false;
    }

    if (day == "00") {
        return false;
    }
    str = year + "년" + month + "월" + day + "일";
    return str;
}
/**
 * 해당 날짜가 특정기간내에 있는지 확인
 */
function dateTermCheck(formObj, startDate, endDate, dateName) {
    if (formObj.value != "") {
        if (formObj.value < startDate || formObj.value > endDate) {
            var sDate = isTermDate(startDate);
            var eDate = isTermDate(endDate);
            alert(getCommonMessage("msg24", dateName, sDate, eDate, dateName));
            return false;
        }
    }
    return true;
}
/**
 * 시스템 코드명 조회
 */
function getSystemCodeName(category, code) {
    var codeName = top.main_conf.getSystemCodeName(category, code);

    return codeName;
}

/**
 * 문자열의 길이 및 byte 체크 (nvarchar2 자료형 기준)
 */
function nvarchar2Chk(value, count, dispName) {

    // nvarchar2 자료형의 경우 nvarchar2(100)으로 설정시
    // 글자수는 최대 100, 용량은 최대 100 * 2 Byte 까지 입력이 가능하다.
    if (value.trim().length > count) {
        // 길이 체크
        alert(dispName + "은(는) " + count + "자를 넘을 수 없습니다. \n현재 길이 : " + value.trim().length);
        return false;
    } else if (jsByteLength_2(value, 0, 0, 0) > (count * 2)) {
        // 용량 체크
        alert(dispName + "은(는) " + (count * 2) + "Byte를 넘을 수 없습니다. \n현재 Byte : " + jsByteLength_2(value, 0, 0, 0));
        return false;
    }
    return true;
}

// common.jsp 파일에서 정의
// var localeKey = "ko"; 

/**
 * 메시지값 가져오기
 */
function getCommonMessage(key, arg0, arg1, arg2, arg3) {

    var message = "";
    if (localeKey == "ko") {
        message = commonMessage_ko[key];
    } else if (localeKey == "en") {
        message = commonMessage_en[key];
    } else if (localeKey == "jp") {
        message = commonMessage_en[key];
    } else if (localeKey == "cn") {
        message = commonMessage_en[key];
    } else {
        message = commonMessage_ko[key];
    }

    if (arg0 != null && arg0 != "") {
        var idx = message.indexOf("{0}", 0);
        var msg1 = message.substring(0, idx);
        var msg2 = message.substring(idx + 3);
        message = msg1 + arg0 + msg2;

        if (arg1 != null && arg1 != "") {
            idx = message.indexOf("{1}", 0);
            msg1 = message.substring(0, idx);
            msg2 = message.substring(idx + 3);
            message = msg1 + arg1 + msg2;

            if (arg2 != null && arg2 != "") {
                idx = message.indexOf("{2}", 0);
                msg1 = message.substring(0, idx);
                msg2 = message.substring(idx + 3);
                message = msg1 + arg2 + msg2;

                if (arg3 != null && arg3 != "") {
                    idx = message.indexOf("{3}", 0);
                    msg1 = message.substring(0, idx);
                    msg2 = message.substring(idx + 3);
                    message = msg1 + arg3 + msg2;
                }
            }
        }
    }

    return message;
}

// 메시지(한국어)
var commonMessage_ko = {
    msg01: "등록",
    msg02: "조회",
    msg03: "수정",
    msg04: "삭제",
    msg05: "잘못된 주민등록번호입니다.",
    msg06: "이메일 주소를 올바르지 않습니다.",
    msg07: "잘못된 IP주소 입니다.",
    msg08: "도메인 형식이 올바르지 않습니다.",
    msg09: "{0} 권한이 없습니다.",
    msg10: "{0}을(를) 입력하세요.",
    msg11: "{0}은(는) {1}자리를 입력해야 합니다.",
    msg12: "{0}은(는) {1}자리를 넘을 수 없습니다. \n현재 글자수: {2}",
    msg13: "{0} 길이가 {1}을 넘습니다.",
    msg14: "{0} 형식이 올바르지 않습니다.",
    msg15: "{0} 값이 최소값({1}) 미만입니다.",
    msg16: "{0} 값이 최소값({1}) 미만입니다. \n부족 길이: {2}",
    msg17: "{0} 값이 최대값({1})을 초과합니다.",
    msg18: "{0} 값이 최대값({1})을 초과합니다. \n초과 길이: {2}",
    msg19: "{0}은(는) {1}자리를 입력해야 합니다.",
    msg20: "숫자만 입력 가능합니다.",
    msg21: "한글만 입력 가능합니다.",
    msg22: "영문자만 입력이 가능합니다.",
    msg23: "현재 사이트의 팝업이 차단되어 있습니다. \n차단을 해제해 주십시요.",
    msg24: "{0}이 {1} ~ {2} 입니다. \n일자는 {3}내로 설정해 주십시오.",
    msg25: "{0}은(는) {1}Byte를 넘을 수 없습니다. \n현재 Byte: {2}"
};

// 메시지(영어)
var commonMessage_en = {
    msg01: "Register",
    msg02: "View",
    msg03: "Modify",
    msg04: "Delete",
    msg05: "Incorrect resident registration number.",
    msg06: "Incorrect emaill address provided.",
    msg07: "Incorrect IP address provided.",
    msg08: "Incorrect domain format provided.",
    msg09: "Insufficient permission for {0}.",
    msg10: "Please insert {0}.",
    msg11: "You must provide {1} digits for {0}",
    msg12: "{0} cannot exceed more than {1} digit. \nThe current digits: {2}",
    msg13: "The length of {0} has exceeded {1}.",
    msg14: "Incorrect format for {0}.",
    msg15: "The value for {0} is more than minimum value {1}.",
    msg16: "The value for {0} is less than the minimum value {1}. \nThe insufficient amount: {2}",
    msg17: "The value for {0} exceeds the maximum value {1}.",
    msg18: "The value for {0} exceeds the mamximum value {1}. \nThe amount exceeded: {2}",
    msg19: "{0} must be typed with {1} digit.",
    msg20: "Only digits are allowed for input.",
    msg21: "Only Korean is allowed for input.",
    msg22: "Only english is allowed for input.",
    msg23: "The pop-up for the current site has been blocked. \nPlease unblock the pop-up first.",
    msg24: "The value for {0} is in between {1} ~ {2}. /nPlease set the date within {3}.",
    msg25: "{0}은(는) {1}Byte를 넘을 수 없습니다. \n현재 Byte: {2}"
};

// 메시지(일본어)
var commonMessage_jp = {
    msg01: "登録",
    msg02: "照会",
    msg03: "修正",
    msg04: "削除",
    msg05: "間違った住民番号です。",
    msg06: "メールアドレスが間違っています。",
    msg07: "間違ったＩＰアドレスです。",
    msg08: "ドメイン形式が正しくはありません。",
    msg09: "{0} 権限がありません。",
    msg10: "{0}を入力してください。",
    msg11: "{0}は{1}字を入力しなければなりません。",
    msg12: "{0}は{1}字を超過できません。 \n現在字数: {2}",
    msg13: "{0}長さが{1}を越えます。",
    msg14: "{0}形式が正しくはありません。",
    msg15: "{0}の値段が最小値段({1})より小さいです。",
    msg16: "{0}の値段が最小値段({1})より小さいです。 \n不足の長さ: {2}",
    msg17: "{0}の値段が最大値段(1)を超過します。",
    msg18: "{0}の値段が最大値段(1)を超過します。 \n超過長のさ: {2}",
    msg19: "{0}は{1}字を入力しなければなりません。",
    msg20: "数字のみ入力できます。",
    msg21: "ハングルのみ入力できます。",
    msg22: "英文のみ入力できます。",
    msg23: "現在サイトのポップアップが遮断されています。 \n遮断を解除して下さい。",
    msg24: "{0}は {1} ~ {2} です。 \n日時は{3}内に設定して下さい。",
    msg25: "{0}은(는) {1}Byte를 넘을 수 없습니다. \n현재 Byte: {2}"
};

// 메시지(중국어)
var commonMessage_cn = {
    msg01: "注册",
    msg02: "查询",
    msg03: "修改",
    msg04: "删除",
    msg05: "无效身份证。",
    msg06: "E-MAIL格式错误。",
    msg07: "IP地址有误。",
    msg08: "无效域名。",
    msg09: "{0} 没有权限。",
    msg10: "请输入{0}。",
    msg11: "{0}，请输入{1}位。",
    msg12: "{0}，不能超过{1}位。\n现在字数为：{2}",
    msg13: "{0}，长度超过{1}。",
    msg14: "{0} 格式错误。",
    msg15: "{0} 的值小于指定长度{1}。",
    msg16: "{0} 的值小于指定长度{1}。\n小于： {2}",
    msg17: "{0} 的最大值超过{1}。",
    msg18: "{0} 的最大值超过{1}。\n超过：{2}",
    msg19: "{0}，请输入{1}位。",
    msg20: "请输入数字。",
    msg21: "请输入韩文。",
    msg22: "请输入英文。",
    msg23: "网站阻止了一个弹出窗口，要查看此弹出窗口，请解除该项。",
    msg24: "{0}的有效期为{1} 到 {2}。\n请把日期设定为{3}。",
    msg25: "{0}은(는) {1}Byte를 넘을 수 없습니다. \n현재 Byte: {2}"
};

function Show_Menu_Page(menuInfoId, url) {
    var menuUrl = "/Main.do?cmd=viewMenuPage&mainDTO.menuId=" + menuInfoId + "&mainDTO.returnUrl=-";
    document.location.href = menuUrl;
}

/*
 * 영문, 숫자 혼합하여 10~20자리 이내
 */
function chkPwd1(str) {
    var reg_pwd = /^.*(?=.{10,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;


    if (!reg_pwd.test(str)) {
        return false;
    }
    return true;
}


/*
 * 영문,숫자,특수문자 혼합하여 8자리~20자리 이내.(비밀번호 표준)
 */
function chkPwd2(str) {

    var pw = str;

    var num = pw.search(/[0-9]/g);

    var eng = pw.search(/[a-z]/ig);

    var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);


    if (pw.search(/₩s/) != -1) {
        alert("비밀번호는 공백업이 입력해주세요.");
        return false;
    }
    if (num < 0 || eng < 0 || spe < 0) {
        return false;
    }
    return true;
}