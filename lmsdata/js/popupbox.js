/*******************************************************************************
팝업박스 생성 스크립트

	사용법:
	1. 팝업박스 객체를 생성한다. 
		var popupboxname = new PopupBox(title, onload, onclose, attribute);
			popupboxname:	생성된 테이블 객체
			title:		타이틀
			onload:		팝업박스를 표시할때 실행할 함수
			onclose:	팝업박스를 닫을때 실행할 함수
			attribute;	속성
				style:		박스 스타일(normal: 이미지 디자인 적용 박스, simple:이미지 없는 박스)
				width: 		박스 넓이
				height: 	박스 높이
				bgcolor:	배경색 (기본값은 white)
				modal:		모달창 형식(yes/no)
				resizable:	박스 크기 변경 가능 여부(yes/no)
				move:		박스 이동 가능 여부(yes/no)
				titlebar:	타이틀바 표시 여부(yes/no)
				position:	박스를 표시할 위치(center:가운데, absolute:위치지정, mouse:마우스 클릭위치)
				top:		박스의 위쪽 위치(position=absolute 일 경우만 유효)
				left:		박스의 왼쪽 위치(position=absolute 일 경우만 유효)
				createtype;	박스 생성 타입 (0: body에 즉시 생성(기본값), 1: 동적으로 생성)
		ex) var popupboxname = new PopupBox("타이틀", "", "", "style=mormal,width=300,height=200,bgcolor=white,
				modal=yes,resizable=yes,move=yes,titlebar=yes,position=center,top=100,left=200");

	2. 팝업박스에 내용을 추가한다.
		popupboxname.addContents("박스에 내용을 추가합니다.<br>");

	3. 팝업창을 화면에 표시한다.
		popupboxname.show()
		or
		showPopupBox(popupboxname);
			
	3. 팝업박스 내용을 모두 지운다.
		popupboxname.clear();

	4. 팝업박스를 닫는다.
		popupboxname.close();

	*주의:마우스로 클릭하여 팝업박스를 호출하지 않고 함수에 의해 자동으로 박스를 
	      호출할 경우에는 "position" 속성을 "center" 또는 "absolute"로 지정해야 한다.

	Author: Kim Kyoung shil
*******************************************************************************/

// 이미지 경로
var popupBoxImgPath = "/lmsdata/popupbox/";


// 윈도우 폰트 지정
var popupBoxFontSize = "14px";
var popupBoxFontFamily = "fontB";;

var popupBoxAddCount = 0;
var curPopupBox = null;
var popupMoveBox = null;
var popupMoveBoxHide = null;
var popupBackBox = null;

// 이미지 정의
var popupBoxTopLeftImg = new Image();
var popupBoxTopCenterImg = new Image();
var popupBoxTopRightImg = new Image();
var popupBoxTitleCenterImg = new Image();
var popupBoxTitleLeftImg = new Image();
var popupBoxTitleRightImg = new Image();
var popupBoxLineLeftImg = new Image();
var popupBoxLineRightImg = new Image();
var popupBoxBottomLeftImg = new Image();
var popupBoxBottomCenterImg = new Image();
var popupBoxBottomRightImg = new Image();
var popupBoxWinCloseOnImg = new Image();
var popupBoxWinCloseOffImg = new Image();
var popupBoxBlankImg = new Image();
popupBoxTopLeftImg.path = popupBoxImgPath + "popupbox_top_left.gif";
popupBoxTopCenterImg.path = popupBoxImgPath + "popupbox_top_center.gif";
popupBoxTopRightImg.path = popupBoxImgPath + "popupbox_top_right.gif";
popupBoxTitleLeftImg.path = popupBoxImgPath + "popupbox_title_left.gif";
popupBoxTitleCenterImg.path = popupBoxImgPath + "popupbox_title_center.gif";
popupBoxTitleRightImg.path = popupBoxImgPath + "popupbox_title_right.gif";
popupBoxLineLeftImg.path = popupBoxImgPath + "popupbox_line_left.gif";
popupBoxLineRightImg.path = popupBoxImgPath + "popupbox_line_right.gif";
popupBoxBottomLeftImg.path = popupBoxImgPath + "popupbox_bottom_left.gif";
popupBoxBottomCenterImg.path = popupBoxImgPath + "popupbox_bottom_center.gif";
popupBoxBottomRightImg.path = popupBoxImgPath + "popupbox_bottom_right.gif";
popupBoxWinCloseOnImg.path = popupBoxImgPath + "win_close_on.png";
popupBoxWinCloseOffImg.path = popupBoxImgPath + "win_close_off.png";
popupBoxBlankImg.path = popupBoxImgPath + "blank.gif";

var popupBoxTitleColor = "white";
var popupBoxTitleColorSimple = "#ffffff";

// 박스 테두리 설정 (style=simple 일 경우만 유효)
var popupBoxBorderColor = "#fff"; // 박스 테두리 라인 색상
var popupBoxBorderBgColor = "#7d96bf"; // 테두리 배경색
var popupBoxBorderWidth = 0; // 테두리 두께	

// 박스 배경색
var popupBoxBgColor = "white";

/**
 * 팝업박스 생성
 */
function PopupBox(title, onload, onclose, attribute) {
    onload = nullToEmpty(onload);
    onclose = nullToEmpty(onclose);
    var width = getAttributeValue(attribute, "width");
    var height = getAttributeValue(attribute, "height");
    var bgcolor = getAttributeValue(attribute, "bgcolor");
    var resizable = getAttributeValue(attribute, "resizable");
    var moveYn = getAttributeValue(attribute, "move");
    var modal = "yes";
    var position = getAttributeValue(attribute, "position");
    var top = getAttributeValue(attribute, "top");
    var left = getAttributeValue(attribute, "left");
    var titlebar = getAttributeValue(attribute, "titlebar");
    var style = "gray";
    var createtype = getAttributeValue(attribute, "createtype");

    if (resizable == "yes" || resizable == "y" || resizable == "true") {
        resizable = "yes";
    }
    if (bgcolor == "") {
        bgcolor = popupBoxBgColor;
    }
    if (position == "") {
        position = "center";
    }
    if (top == "") {
        top = "0";
    }
    if (left == "") {
        left = "0";
    }
    if (moveYn == "yes" || moveYn == "y" || moveYn == "true") {
        moveYn = "yes";
    }
    if (modal == "yes" || modal == "y" || modal == "true") {
        modal = "yes";
    }
    if (titlebar == "yes" || titlebar == "y" || titlebar == "true") {
        titlebar = "yes";
    }
    if (style == "") {
        style = "normal";
    }
    if (createtype == "") {
        createtype = "0";
    }

    popupBoxAddCount += 1;
    var popupBoxId = "POPUPBOX" + popupBoxAddCount;;
    var newPopupBox = null;

    if (createtype == "1") {
        newPopupBox = document.createElement("div");
        document.body.appendChild(newPopupBox);
    } else {

        document.write("<div id='" + popupBoxId + "' style='z-index:9999 !important; overflow:hidden; height:auto !important; border-radius:6px; box-shadow:#333 1px 1px 8px;'></div>");
        newPopupBox = getObject(popupBoxId);
    }

    newPopupBox.id = popupBoxId;
    newPopupBox.style.display = "none";
    newPopupBox.style.position = "absolute";
    newPopupBox.width = width;
    newPopupBox.height = height;
    newPopupBox.positionX = 0;
    newPopupBox.positionY = 0;
    newPopupBox.positionValue = position;
    newPopupBox.top = top;
    newPopupBox.left = left;
    newPopupBox.moveYn = moveYn;
    newPopupBox.modal = modal;
    newPopupBox.titlebar = titlebar;
    newPopupBox.boxStyle = style;
    newPopupBox.onloadFunc = onload;
    newPopupBox.oncloseFunc = onclose;
    newPopupBox.remove = removePopupBox;

    var wResize = "default";
    var eResize = "default";
    var sResize = "default";
    var swResize = "default";
    var seResize = "default";
    if (resizable == "yes") {
        wResize = "w-resize";
        eResize = "e-resize";
        sResize = "s-resize";
        swResize = "sw-resize";
        seResize = "se-resize'";
    }

    var popupBoxContent = "";
    var contentsWidth = parseInt(width);
    var contentsHeight = parseInt(height);
    if (style == "normal") {
        var titleHeight = popupBoxTitleCenterImg.height;
        if (titlebar != "yes") {
            titleHeight = popupBoxTopCenterImg.height;
        }
        contentsWidth = contentsWidth - popupBoxLineLeftImg.width - popupBoxLineRightImg.width;
        contentsHeight = contentsHeight - titleHeight - popupBoxBottomCenterImg.height;
        var titleWidth = contentsWidth;

        newPopupBox.modHeight = titleHeight + popupBoxBottomCenterImg.height;
        newPopupBox.modWidth = popupBoxLineLeftImg.width + popupBoxLineRightImg.width;
        popupBoxContent = "<table border=0 cellspacing=0 cellpadding=0>" +
            "<tr>";
        if (titlebar == "yes") {
            popupBoxContent += "<td width='5' background='" + getPopupboxImgSrc(popupBoxTitleLeftImg) + "'>" +
                "<img src='" + getPopupboxImgSrc(popupBoxBlankImg) + "' width='5' height='1'></td>" +
                "<td height='22' " +
                "  background='" + getPopupboxImgSrc(popupBoxTitleCenterImg) + "'>" +
                "  <table id='" + popupBoxId + "_title' border=0 cellspacing=0 cellpadding=0 " +
                "    style='table-layout:fixed;width:" + titleWidth + "px;cursor:default;'>" +
                "  <tr>" +
                "    <td id='" + popupBoxId + "_titleText' style='height:22px;padding-top:3px;font-size:" + popupBoxFontSize + ";font-family:" + popupBoxFontFamily + ";" +
                "      color:" + popupBoxTitleColor + ";font-weight:bold;vertical-align:middle;overflow:hidden;' nowrap" +
                "      onmousedown=\"startPopupBoxReset(this, '" + popupBoxId + "', 'move')\">" + title + "</td>" +
                "    <td align=right width=20><img src='" + getPopupboxImgSrc(popupBoxWinCloseOffImg) + "' " +
                "        onMouseOver='changeImage(this, \"" + getPopupboxImgSrc(popupBoxWinCloseOnImg) + "\");' " +
                "        onMouseOut='changeImage(this, \"" + getPopupboxImgSrc(popupBoxWinCloseOffImg) + "\");' " +
                "      border=0 onclick='closePopupBox(\"" + popupBoxId + "\")'></td>" +
                "  </tr>" +
                "  </table>" +
                "</td>" +
                "<td width='5' background='" + getPopupboxImgSrc(popupBoxTitleRightImg) + "'>" +
                "<img src='" + getPopupboxImgSrc(popupBoxBlankImg) + "' width='5' height='1'></td>";

        } else {
            popupBoxContent += "<td width='5' background='" + getPopupboxImgSrc(popupBoxTopLeftImg) + "'>" +
                "<img src='" + getPopupboxImgSrc(popupBoxBlankImg) + "' width='5' height='1'></td>" +
                "<td height='8' background='" + getPopupboxImgSrc(popupBoxTopCenterImg) + "' " +
                "  onmousedown=\"startPopupBoxReset(this, '" + popupBoxId + "', 'move')\"></td>" +
                "<td width='5' background='" + getPopupboxImgSrc(popupBoxTopRightImg) + "'>" +
                "<img src='" + getPopupboxImgSrc(popupBoxBlankImg) + "' width='5' height='1'></td>";
        }

        popupBoxContent += "</tr>" +
            "<tr>" +
            "  <td width='5' background='" + getPopupboxImgSrc(popupBoxLineLeftImg) + "'" +
            "    style='cursor:" + wResize + ";' onmousedown='startPopupBoxReset(this, \"" + popupBoxId + "\")'>" +
            "  </td>" +
            "  <td>" +
            "    <div id='" + popupBoxId + "_contents' style='width:" + contentsWidth + "px;height:" + contentsHeight + "px;" +
            "      font-size:" + popupBoxFontSize + ";font-family:" + popupBoxFontFamily + ";" +
            "      background-color:" + bgcolor + ";overflow:auto;'></div>" +
            "  </td>" +
            "  <td width='5' background='" + getPopupboxImgSrc(popupBoxLineRightImg) + "'" +
            "    style='cursor:" + eResize + ";' onmousedown='startPopupBoxReset(this, \"" + popupBoxId + "\")'>" +
            "  </td>" +
            "</tr>" +
            "<tr>" +
            "  <td width='5' background='" + getPopupboxImgSrc(popupBoxBottomLeftImg) + "'" +
            "    style='cursor:" + swResize + ";' onmousedown='startPopupBoxReset(this, \"" + popupBoxId + "\")'>" +
            "  </td>" +
            "  <td height='8' style='cursor:" + sResize + ";'" +
            "    background='" + getPopupboxImgSrc(popupBoxBottomCenterImg) + "' " +
            "    onmousedown='startPopupBoxReset(this, \"" + popupBoxId + "\")'>" +
            "  </td>" +
            "  <td width='5' background='" + getPopupboxImgSrc(popupBoxBottomRightImg) + "' " +
            "    style='cursor:" + seResize + ";' onmousedown='startPopupBoxReset(this, \"" + popupBoxId + "\")'>" +
            "  </td>" +
            "</tr>" +
            "</table>";
    } else if (style == "noframe") {
        popupBoxContent = "" +
            "    <div id='" + popupBoxId + "_contents' style='width:" + contentsWidth + "px;height:" + contentsHeight + "px;" +
            "      font-size:" + popupBoxFontSize + ";font-family:" + popupBoxFontFamily + ";"
        if (bgcolor != "transparent") {
            popupBoxContent += "background-color:" + bgcolor + ";"
        }
        popupBoxContent += "overflow:auto;'></div>"

    } else {
        newPopupBox.style.border = "3px solid " + popupBoxBorderColor;
        newPopupBox.style.backgroundColor = popupBoxBorderBgColor;
        newPopupBox.style.width = width + "px";
        newPopupBox.style.height = height + "px";
        var contentsWidth = parseInt(width) - (popupBoxBorderWidth * 2);
        var contentsHeight = parseInt(height);
        if (titlebar == "yes") {
            contentsHeight = contentsHeight - popupBoxBorderWidth - 20;
            if (browserType == "NE") {
                contentsHeight -= 1;
            }
            popupBoxContent += "<table border=0 cellspacing=0 cellpadding=0 width=100% style='table-layout:fixed;'><tr>"
                //	+ "<td width="+popupBoxBorderWidth+"><img src='"+getPopupboxImgSrc(popupBoxBlankImg)+"' width='"+popupBoxBorderWidth+"' height='1'></td>"
                +
                "<td id='" + popupBoxId + "_title' height=28 style='font-size:" + popupBoxFontSize + ";font-family:" + popupBoxFontFamily + ";cursor:default;padding-left:2%;" +
                "  color:" + popupBoxTitleColorSimple + ";font-weight:bold;vertical-align:middle;overflow:hidden;white-space:nowrap;'" +
                "  onmousedown=\"startPopupBoxReset(this, '" + popupBoxId + "', 'move')\"><span id='" + popupBoxId + "_titleText'>" + title + "</span></td>" +
                "<td align=left width=20><img src='" + getPopupboxImgSrc(popupBoxWinCloseOffImg) + "' " +
                "  onMouseOver='changeImage(this, \"" + getPopupboxImgSrc(popupBoxWinCloseOnImg) + "\");' " +
                "  onMouseOut='changeImage(this, \"" + getPopupboxImgSrc(popupBoxWinCloseOffImg) + "\");' " +
                "  border=0 onclick='closePopupBox(\"" + popupBoxId + "\")'></td>"
                //	+ "<td width="+popupBoxBorderWidth+"><img src='"+getPopupboxImgSrc(popupBoxBlankImg)+"' width='"+popupBoxBorderWidth+"' height='1'></td>"
                +
                "</tr></table>";
        } else {
            contentsHeight = contentsHeight - (popupBoxBorderWidth * 2);
            if (browserType == "NE") {
                contentsHeight -= 1;
            }

            popupBoxContent += "<table border=0 cellspacing=0 cellpadding=0 width=100% style='table-layout:fixed;'" +
                "  onmousedown=\"startPopupBoxReset(this, '" + popupBoxId + "', 'move')\"><tr>" +
                "<td width=" + popupBoxBorderWidth + " height=" + popupBoxBorderWidth + ">" +
                "<img src='" + getPopupboxImgSrc(popupBoxBlankImg) + "' width='" + popupBoxBorderWidth + "' height='1'></td>" +
                "<td id='" + popupBoxId + "_title' height=" + popupBoxBorderWidth + "></td>" +
                "<td width=" + popupBoxBorderWidth + " height=" + popupBoxBorderWidth + ">" +
                "<img src='" + getPopupboxImgSrc(popupBoxBlankImg) + "' width='" + popupBoxBorderWidth + "' height='1'></td>" +
                "</tr></table>"
        }

        popupBoxContent += "<table border=0 cellspacing=0 cellpadding=0 width=100%><tr>" +
            "<td width=" + popupBoxBorderWidth + " style='cursor:" + wResize + ";' " +
            "  onmousedown='startPopupBoxReset(this, \"" + popupBoxId + "\")'></td>" +
            "<td>" +
            "  <div id='" + popupBoxId + "_contents' style='width:" + contentsWidth + "px;height:" + contentsHeight + "px;" +
            "    font-size:" + popupBoxFontSize + ";font-family:" + popupBoxFontFamily + ";" +
            "    background-color:" + bgcolor + ";border:0px solid " + popupBoxBorderColor + ";overflow:auto;'></div>" +
            "</td>" +
            "<td width=" + popupBoxBorderWidth + " style='cursor:" + eResize + ";' " +
            "  onmousedown='startPopupBoxReset(this, \"" + popupBoxId + "\")'></td>" +
            "</tr></table>" +
            "<table border=0 cellspacing=0 cellpadding=0 width=100% style='table-layout:fixed;'><tr>" +
            "<td width=" + popupBoxBorderWidth + " height=" + popupBoxBorderWidth + " style='cursor:" + swResize + ";'" +
            "  onmousedown='startPopupBoxReset(this, \"" + popupBoxId + "\")'></td>" +
            "<td width=90% height=" + popupBoxBorderWidth + " style='cursor:" + sResize + ";'" +
            "  onmousedown='startPopupBoxReset(this, \"" + popupBoxId + "\")'></td>" +
            "<td width=" + popupBoxBorderWidth + " height=" + popupBoxBorderWidth + " style='cursor:" + seResize + ";'" +
            "  onmousedown='startPopupBoxReset(this, \"" + popupBoxId + "\")'></td>" +
            "</tr></table>";

    }

    newPopupBox.innerHTML = popupBoxContent;

    newPopupBox.titleObj = getObject(popupBoxId + "_title");
    if (newPopupBox.titleObj != null) {
        newPopupBox.titleObj.onselectstart = function() {
            return false
        }
        newPopupBox.titleObj.ondragstart = function() {
            return false
        }
    }

    newPopupBox.titleText = getObject(popupBoxId + "_titleText");
    newPopupBox.contents = getObject(popupBoxId + "_contents");
    newPopupBox.contents.style.scrollbarFaceColor = "#FFFFFF";
    newPopupBox.contents.style.scrollbarShadowColor = "#FFFFFF";
    newPopupBox.contents.style.scrollbarHighlightColor = "#FFFFFF";
    newPopupBox.contents.style.scrollbarTrackColor = "#E9E9E9";
    newPopupBox.contents.style.scrollbarArrowColor = "#A3A3A3";

    newPopupBox.addContents = addPopupBoxContents;
    newPopupBox.addObject = addPopupBoxObject;
    newPopupBox.clear = clearPopupBoxContents;
    newPopupBox.show = showPopupBox;
    newPopupBox.close = closePopupBox;
    newPopupBox.resize = resizePopupBox;
    newPopupBox.move = movePopupBox;
    newPopupBox.setTitle = setPopupBoxTitle;
    newPopupBox.modWidth = parseInt(width) - contentsWidth;
    newPopupBox.modHeight = parseInt(height) - contentsHeight;

    initPopupBackBox(createtype);
    initPopupMoveBox(createtype);


    return newPopupBox;
}


/**
 * 팝업박스 타이틀 설정
 */
function setPopupBoxTitle(title) {
    if (this.titlebar == "yes") {
        this.titleText.innerHTML = title;
    }
}


/**
 * 팝업박스 내용 추가
 */
function addPopupBoxContents(content) {
    var oldContent = this.contents.innerHTML;
    this.contents.innerHTML = oldContent + content;
}


/**
 * 팝업박스에 객체 추가
 */
function addPopupBoxObject(obj) {
    this.contents.appendChild(obj);
}


/**
 * 팝업박스 내용 삭제
 */
function clearPopupBoxContents() {
    this.contents.innerHTML = "";
}


/**
 * 팝업박스 이동/사이즈 변경 시작
 */
function startPopupBoxReset(obj, popupBoxId, type) {
    type = nullToEmpty(type);
    if (type == "") {
        type = "resize";
    }

    curPopupBox = getObject(popupBoxId);

    if (type == "resize") {
        var resizeStyle = obj.style.cursor;
        if (resizeStyle.indexOf("resize") < 1) {
            return false;
        }

        resizeStyle = resizeStyle.substring(0, resizeStyle.indexOf("-"));
        curPopupBox.resizeStyle = resizeStyle;
        document.onmousemove = resizePopupBoxByMouse;
        document.onmouseup = stopPopupBoxResize;
        popupMoveBox.onmouseup = stopPopupBoxResize;
    } else {
        if (curPopupBox.moveYn != "yes") {
            return false;
        }

        document.onmousemove = startPopupBoxMove;
        document.onmouseup = stopPopupBoxMove;
        popupMoveBox.onmouseup = stopPopupBoxMove;
    }

    makeOnTop(curPopupBox);
    document.onselectstart = function() {
        return false
    }
    document.ondragstart = function() {
        return false
    }

    var width = getWidth(curPopupBox);
    var height = getHeight(curPopupBox);
    if (browserType == "NE") {
        width -= 6;
        height -= 6;
    }

    var pos = getPosition(curPopupBox);
    curPopupBox.positionX = pos.x;
    curPopupBox.positionY = pos.y;
    curPopupBox.positionX2 = pos.x + width;
    curPopupBox.positionY2 = pos.y + height;

    popupMoveBox.style.cursor = obj.style.cursor;
    moveObject(popupMoveBox, pos.y, pos.x);
    resizeObject(popupMoveBox, width, height);
    popupMoveBox.addPosX = 0;
    popupMoveBox.addPosY = 0;
    popupMoveBox.moveStart = false;
    popupMoveBox.resizeStart = false;

    if (browserType == "IE") {
        var mouseX = checkMouseX();
        var mouseY = checkMouseY();
        popupMoveBox.addPosX = mouseX - curPopupBox.positionX;
        popupMoveBox.addPosY = mouseY - curPopupBox.positionY;
        popupMoveBox.moveStart = true;
        popupMoveBox.resizeStart = true;
    }

    popupMoveBoxHide.style.cursor = obj.style.cursor;
    moveObject(popupMoveBoxHide, pos.y, pos.x);
    resizeObject(popupMoveBoxHide, width, height);

    makeOnTop(popupMoveBoxHide);
    makeOnTop(popupMoveBox);
    onDisplay(popupMoveBoxHide);
    onDisplay(popupMoveBox);
}


/**
 * 팝업박스 이동 (마우스 이동 이벤트)
 */
function startPopupBoxMove(evt) {
    var mouseX = checkMouseX(evt);
    var mouseY = checkMouseY(evt);

    if (popupMoveBox.moveStart == false) {
        popupMoveBox.addPosX = mouseX - curPopupBox.positionX;
        popupMoveBox.addPosY = mouseY - curPopupBox.positionY;
        popupMoveBox.moveStart = true;
    }

    var posX = mouseX - popupMoveBox.addPosX;
    var posY = mouseY - popupMoveBox.addPosY;
    moveObject(popupMoveBox, posY, posX);
}


/**
 * 팝업박스 이동 완료
 */
function stopPopupBoxMove(evt) {
    if (popupMoveBox.moveStart == true) {
        var pos = getPosition(popupMoveBox);
        moveObject(curPopupBox, pos.y, pos.x);
        offDisplay(popupMoveBox);
        offDisplay(popupMoveBoxHide);

        popupMoveBox.moveStart = false;
        popupMoveBox.onmouseup = null;
        document.onmousemove = null;
        document.onmouseup = null;
        document.body.focus();
    }
}


/**
 * 팝업박스 사이즈 변경 완료
 */
function stopPopupBoxResize() {
    if (popupMoveBox.resizeStart == true) {
        var pos = getPosition(popupMoveBox);
        var boxWidth = getWidth(popupMoveBox);
        var boxHeight = getHeight(popupMoveBox);
        var width = boxWidth - curPopupBox.modWidth;
        var height = boxHeight - curPopupBox.modHeight;
        var titleWidth = width;

        if (curPopupBox.boxStyle == "normal") {
            resizeWidth(curPopupBox.titleObj, titleWidth);
        } else {
            height -= 2;
            if (browserType == "NE") {
                width -= 2;
                boxWidth -= 2;
                boxHeight -= 2;
            }
            resizeObject(curPopupBox, boxWidth, boxHeight);
        }

        resizeObject(curPopupBox.contents, width, height);

        moveObject(curPopupBox, pos.y, pos.x);
        offDisplay(popupMoveBox);
        offDisplay(popupMoveBoxHide);

        curPopupBox.width = width;
        curPopupBox.height = height;

        popupMoveBox.resizeStart = false;
        popupMoveBox.onmouseup = null;
        document.onmousemove = null;
        document.onmouseup = null;
        document.body.focus();
    }
}


/**
 * 팝업박스 이동 (위치 재설정)
 */
function movePopupBox(top, left) {
    moveObject(this, top, left);
    this.top = top;
    this.left = left;
}


/**
 * 마우스 이동에 따라 팝업박스 사이즈 변경
 */
function resizePopupBoxByMouse(evt) {
    if (popupMoveBox.resizeStart == false) {
        popupMoveBox.resizeStart = true;
    }

    var mouseX = checkMouseX(evt);
    var mouseY = checkMouseY(evt);
    var posX = curPopupBox.positionX;
    var posY = curPopupBox.positionY;

    var width = getWidth(curPopupBox);
    var height = getHeight(curPopupBox);
    if (browserType == "NE") {
        width -= 6;
        height -= 6;
    }

    if (curPopupBox.resizeStyle.indexOf("e") > -1) {
        width = mouseX - curPopupBox.positionX;
    }
    if (curPopupBox.resizeStyle.indexOf("s") > -1) {
        height = mouseY - curPopupBox.positionY;
    }
    if (curPopupBox.resizeStyle.indexOf("w") > -1) {
        width = curPopupBox.positionX2 - mouseX;
    }

    if (width > 100) {
        resizeWidth(popupMoveBox, width);
    }
    if (height > 50) {
        resizeHeight(popupMoveBox, height);
    }
    if (width > 100 && height > 50 && curPopupBox.resizeStyle.indexOf("w") > -1) {
        moveObject(popupMoveBox, posY, mouseX);
    }
}


/**
 * 팝업박스 사이즈 변경
 */
function resizePopupBox(width, height) {
    var titleHeight = popupBoxTitleCenterImg.height;
    if (this.titlebar != "yes") {
        titleHeight = popupBoxTopCenterImg.height;
    }
    var contentsWidth = width - popupBoxLineLeftImg.width - popupBoxLineRightImg.width;
    var contentsHeight = height - titleHeight - popupBoxBottomCenterImg.height;
    var titleWidth = contentsWidth;

    //	var conWidth 		= width - this.modWidth;
    //	var conHeight		= height - this.modHeight;

    if (this.boxStyle == "normal") {
        resizeWidth(this.titleObj, titleWidth);
    } else {
        contentsHeight -= 2;
        if (browserType == "NE") {
            contentsWidth -= 2;
            width -= 2;
            height -= 2;
        }
        resizeObject(this, width, height);
    }

    resizeObject(this.contents, contentsWidth, contentsHeight);

    //	this.width			= conWidth;
    //	this.height			= conHeight;
}


/**
 * 팝업박스 닫기
 */
function closePopupBox(objId) {
    if (objId) {
        var popupBoxObj = getObject(objId);
        offDisplay(popupBoxObj);

        // 박스를 닫을때 실행할 함수 호출
        if (popupBoxObj.oncloseFunc != "") {
            eval(popupBoxObj.oncloseFunc);
        }
    } else {
        offDisplay(this);

        // 박스를 닫을때 실행할 함수 호출
        if (this.oncloseFunc != "") {
            eval(this.oncloseFunc);
        }
    }
    offDisplay(popupBackBox);
}


/**
 * 이동박스 초기화
 */
function initPopupMoveBox(createtype) {
    if (popupMoveBox == null) {
        if (createtype == "1") {
            popupMoveBox = document.createElement("div");
            document.body.appendChild(popupMoveBox);
        } else {
            document.write("<div id='popupMoveBox'></div>");
            popupMoveBox = getObject("popupMoveBox");
        }

        popupMoveBox.style.position = "absolute";
        popupMoveBox.style.border = "3px black solid";
        popupMoveBox.style.background = "white";
        popupMoveBox.style.display = "none";
        if (popupMoveBox.filters) {
            popupMoveBox.style.filter = "alpha(opacity=30)";
        } else {
            popupMoveBox.style.MozOpacity = 0.3;
        }
        popupMoveBox.addPosX = 0;
        popupMoveBox.addPosY = 0;
        popupMoveBox.moveStart = false;

        if (createtype == "1") {
            popupMoveBoxHide = document.createElement("div");
            document.body.appendChild(popupMoveBoxHide);
        } else {
            document.write("<div id='popupMoveBoxHide'></div>");
            popupMoveBoxHide = getObject("popupMoveBoxHide");
        }

        popupMoveBoxHide.style.position = "absolute";
        popupMoveBoxHide.style.background = "white";
        popupMoveBoxHide.style.display = "none";
        if (popupMoveBoxHide.filters) {
            popupMoveBoxHide.style.filter = "alpha(opacity=0)";
        } else {
            popupMoveBoxHide.style.MozOpacity = 0.0;
        }
    }
}


/**
 * 배경 박스 초기화
 */
function initPopupBackBox(createtype) {
    if (popupBackBox == null) {
        if (createtype == "1") {
            popupBackBox = document.createElement("div");
            document.body.appendChild(popupBackBox);
        } else {
            //			document.write("<div id='popupBackBox' style='opacity:0.5; z-index:30;'></div>");
            document.write("<div id='popupBackBox' style='opacity:0.5; z-index:10;'></div>");
            popupBackBox = getObject("popupBackBox");
        }
        popupBackBox.style.position = "fixed";
        popupBackBox.style.top = "0px";
        popupBackBox.style.left = "0px";
        popupBackBox.style.background = "black";
        popupBackBox.style.display = "none";
        popupBackBox.style.filter = "alpha(opacity=50)";
    }
}


/**
 * 팝업박스 호출
 */
function displayPopupBox(evt) {
    if (evt != "center" && evt != "absolute") {
        var mouseX = checkMouseX(evt);
        var mouseY = checkMouseY(evt)
        moveObject(curPopupBox, mouseY - 5, mouseX - 5);
    } else if (evt == "center") {
        var winLeft = (getWindowWidth() - curPopupBox.width) / 2;
        var winTop = (getWindowHeight() - curPopupBox.height) / 2;

        if (winLeft < 0) {
            winLeft = 0;
        }
        if (winTop < 0) {
            winTop = 0;
        }
        winTop = document.body.scrollTop + winTop;
        moveObject(curPopupBox, winTop, winLeft);
    } else if (evt == "absolute") {
        moveObject(curPopupBox, curPopupBox.top, curPopupBox.left);
    }
    //var bodyHeight = getHeight(window);
    //alert(bodyHeight + " / " + window.screen.height  + " / " + curPopupBox.modal);
    //var bodyHeight = getHeight(document.body);
    if (curPopupBox.modal == "yes") {
        resizeObject(popupBackBox, document.body.scrollWidth, window.screen.height);
        onDisplay(popupBackBox);
    }
    makeOnTop(curPopupBox);
    onDisplay(curPopupBox);
    curPopupBox.focus();
    document.onclick = null;
}


/**
 * 팝업박스 표시 호출
 */
function showPopupBox(popupBoxObj) {

    if (popupBoxObj == null) {
        popupBoxObj = this;
    }

    if (!popupBoxObj.id) {
        popupBoxObj = eval(popupBoxObj);
    }

    if (popupBoxObj != null) {
        curPopupBox = popupBoxObj;

        if (curPopupBox.positionValue == "mouse") {
            document.onclick = displayPopupBox;
        } else if (curPopupBox.positionValue == "absolute") {
            displayPopupBox("absolute");
        } else if (curPopupBox.positionValue == "center") {
            displayPopupBox("center");
        }

        // 시작시 실행 함수 호출
        if (popupBoxObj.onloadFunc != "") {
            eval(popupBoxObj.onloadFunc);
        }
    }
}


/**
 * 팝업박스 객체 제거
 */
function removePopupBox() {
    document.body.removeChild(this);
}


/**
 * 이미지 src 반환
 */
function getPopupboxImgSrc(imgObj) {
    if (imgObj.src == null || imgObj.src == "") {
        imgObj.src = imgObj.path;
    }
    return imgObj.src;
}