/**
 * 작업결과 메시지를 출력하기 위한 스크립트
 *
 * Author:shil
 */

//common.jsp 에 정의
//var localeKey			= "ko";

var resultMessageBox = null; // 메시지 박스 객체
var messageBoxWidth = 400; // 메시지 박스 넓이
var messageBoxHeight = 150; // 메시지 박스 높이
var messageBoxFontSize = "9pt";
var messageBoxCloseBttn = "확 인";
/*if (localeKey == "en") messageBoxCloseBttn = "OK";
else if (localeKey == "jp") messageBoxCloseBttn = "確 認";
else if (localeKey == "cn") messageBoxCloseBttn = "确 认";*/

var workProgressBox = null; // 작업중 박스 객체
var workProgressBoxWidth = 150;
var workProgressBoxHeight = 150;

/**
 * 메시지 표시 호출
 */
function displayMessage() {
    if (commonResultMessage.toLowerCase() != "null" && commonResultMessage != "") {
        alert(commonResultMessage);
    }
}


/**
 * 메시지 표시창 생성
 */
function createMessageBox(resultMessageKey, closeButton) {
    closeButton = nullToEmpty(closeButton);

    var winWidth = getWindowWidth();
    var winHeight = getWindowHeight();

    var winLeft = (winWidth - messageBoxWidth) / 2;
    var winTop = ((winHeight - messageBoxHeight) / 2) - 50;
    if (winTop < 0 || winTop == 0) {
        winTop = 100;
    }

    resultMessageBox = document.createElement("div");
    resultMessageBox.id = "resultMessageBoxId";
    resultMessageBox.className = "msgbox";
    resultMessageBox.style.position = "absolute";
    resultMessageBox.style.left = winLeft + "px";
    resultMessageBox.style.top = winTop + "px";
    resultMessageBox.style.display = "none";

    var boxContent = "" +
        "	<div class='msg-left'>" +
        "		<div class='msg-table'><div class='msg-cell'><div class='msg-text'>" +
        resultMessageKey +
        "		</div></div></div>" +
        "		<div class='msg-btn'>" +
        "			<button style='border:1px solid;font-size:9pt;' onclick='closeMessageBox()'>" + messageBoxCloseBttn + "</button>" +
        "		</div>" +
        "	</div>" +
        "	<div class='msg-right'></div>" +
        "	<div class='msg-bleft'></div>" +
        "	<div class='msg-bright'></div>";

    resultMessageBox.innerHTML = boxContent;
    document.body.appendChild(resultMessageBox);

    resultMessageBox.style.display = "block";
}


/**
 * 메시지 표시창 닫기
 */
function closeMessageBox() {
    if (resultMessageBox != null) {
        document.body.removeChild(resultMessageBox);
        resultMessageBox = null;
    }
}


/**
 * 작업중 박스 표시
 */
function displayWorkProgress(message, winTop, winLeft) {
    message = nullToEmpty(message);
    if (workProgressBox == null) {
        var winWidth = getWindowWidth();
        var winHeight = getWindowHeight();

        if (nullToEmpty(winLeft) == "") {
            winLeft = (winWidth - workProgressBoxWidth) / 2;
        }
        if (nullToEmpty(winTop) == "") {
            var winTop = (winHeight - workProgressBoxHeight) / 2;
        }

        if (winTop < 0 || winTop == 0) {
            winTop = 100;
        }

        workProgressBox = document.createElement("div");
        workProgressBox.style.position = "absolute";
        workProgressBox.style.display = "block";
        workProgressBox.style.left = winLeft + "px";
        workProgressBox.style.top = winTop + "px";

        workProgressBox.style.backgroundColor = "white";
        workProgressBox.style.border = "1px solid #B8BDED";
        workProgressBox.style.zIndex = "999";

        var boxContent = "" +
            "<table border=0 cellapcing=0 cellpadding=0>" +
            "<tr>" +
            "  <td align=center>" +
            " <img src='/lmsdata/img/common/ajax-big-loader.gif'/>" +
            "  </td>" +
            "</tr>" +
            "<tr>" +
            "  <td id='workProgressMessageTd' style='font-size:9pt;padding-left:10px;padding-right:10px;z-index:999;' align=center>" + message + "</td>" +
            "</tr>" +
            "</table>";

        workProgressBox.innerHTML = boxContent;
        document.body.appendChild(workProgressBox);
    } else {
        var messageObj = getObject("workProgressMessageTd");
        if (message != "") {
            messageObj.innerHTML = message;
        } else {
            messageObj.innerHTML = "";
        }
        onDisplay(workProgressBox);
        makeOnTop(workProgressBox);
    }
}


/**
 * 작업중 박스 닫기
 */
function closeWorkProgress() {
    if (workProgressBox != null) {
        offDisplay(workProgressBox);
    }
}

/**
 * 로딩 표시 시작
 */
function startLoading() {
    if ($(".loading-modal").length == 0) {
        var loadingObj = document.createElement("div");
        loadingObj.setAttribute("class", "loading-modal");
        document.body.appendChild(loadingObj);
    }

    $("body").addClass("loading");
}


/**
 * 로딩 표시 중지
 */
function stopLoading() {
    $("body").removeClass("loading");
}

/**
 * 로딩 표시 시작
 */
function startBigLoading() {
    if ($(".loading-modal").length == 0) {
        var loadingObj = document.createElement("div");
        loadingObj.setAttribute("class", "loading-modal");
        document.body.appendChild(loadingObj);
    }

    $("body").addClass("loading");
}


/**
 * 로딩 표시 중지
 */
function stopBigLoading() {
    $("body").removeClass("loading");
}