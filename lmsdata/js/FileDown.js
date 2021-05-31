/**
 * 파일 다운로드
 */
function fileDown(rfileName, sfileName, filePath) {
    var loc = "fileDown?rFileName=" + rfileName + "&sFileName=" + sfileName + "&filePath=" + filePath;
    hiddenFrame.location.href = loc;
}