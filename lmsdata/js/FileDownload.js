/**
 * 파일 다운로드
 */
var dblClick = "N";

function fileDownload(rfileName, sfileName, filePath) {
    if (dblClick == rfileName) {
        alert("다운로드 중입니다.");
    } else {
        var loc = "https://eclass.dongguk.edu/fileDownServlet?rFileName=" + rfileName + "&sFileName=" + sfileName + "&filePath=" + filePath;
        //var loc = "fileDownServlet?rFileName="+rfileName+"&sFileName="+sfileName+"&filePath="+filePath;
        hiddenFrame.location.href = loc;
        dblClick = rfileName;
    }
}

/**
 * 파일 다운로드 (학습자료실 용 - 다운로드 기록을 남김)
 */
function fileDownload_log(rfileName, sfileName, filePath, fileId, contentsId, userId) {
    if (dblClick == rfileName) {
        alert("다운로드 중입니다.");
    } else {
        var loc = "https://eclass.dongguk.edu/fileDownServlet?rFileName=" + rfileName + "&sFileName=" + sfileName + "&filePath=" + filePath + "&fileId=" + fileId + "&contentsId=" + contentsId + "&userId=" + userId;
        //var loc = "fileDownServlet?rFileName="+rfileName+"&sFileName="+sfileName+"&filePath="+filePath+"&fileId="+fileId+"&contentsId="+contentsId;
        hiddenFrame.location.href = loc;
        dblClick = rfileName;
    }
}