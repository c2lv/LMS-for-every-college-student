// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (CourseWork == null) var CourseWork = {};
CourseWork._path = '/dwr';
CourseWork.classroomOpen = function(callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'classroomOpen', false, callback);
}
CourseWork.classroomClose = function(callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'classroomClose', false, callback);
}
CourseWork.viewNextCourseId = function(callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'viewNextCourseId', false, callback);
}
CourseWork.viewCourseQnaList = function(p0, callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'viewCourseQnaList', p0, false, callback);
}
CourseWork.viewNextBoardInfoId = function(callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'viewNextBoardInfoId', false, callback);
}
CourseWork.moveBoardOrder = function(p0, callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'moveBoardOrder', p0, false, callback);
}
CourseWork.moveChangeMenu = function(p0, callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'moveChangeMenu', p0, false, callback);
}
CourseWork.getClassroomMenu = function(callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'getClassroomMenu', false, callback);
}
CourseWork.syncDepartment = function(callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'syncDepartment', false, callback);
}
CourseWork.syncUsers = function(p0, callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'syncUsers', p0, false, callback);
}
CourseWork.syncCourse = function(p0, callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'syncCourse', p0, false, callback);
}
CourseWork.syncCourseMi = function(p0, callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'syncCourseMi', p0, false, callback);
}
CourseWork.syncCourseOwner = function(p0, callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'syncCourseOwner', p0, false, callback);
}
CourseWork.syncCourseLearner = function(p0, callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'syncCourseLearner', p0, false, callback);
}
CourseWork.syncLearnerCancel = function(p0, callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'syncLearnerCancel', p0, false, callback);
}
CourseWork.syncNoLearnerCancel = function(p0, callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'syncNoLearnerCancel', p0, false, callback);
}
CourseWork.processShareCourse = function(p0, callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'processShareCourse', p0, false, callback);
}
CourseWork.transferPds = function(p0, callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'transferPds', p0, false, callback);
}
CourseWork.clearBoardContents = function(p0, callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'clearBoardContents', p0, false, callback);
}
CourseWork.viewCourseCntList = function(p0, callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'viewCourseCntList', p0, false, callback);
}
CourseWork.viewCourseConnectInfo = function(p0, callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'viewCourseConnectInfo', p0, false, callback);
}
CourseWork.compressDownloadAttachFile = function(p0, callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'compressDownloadAttachFile', p0, false, callback);
}
CourseWork.syncOfflineElements = function(p0, callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'syncOfflineElements', p0, false, callback);
}
CourseWork.viewCourseTermList = function(p0, p1, callback) {
    dwr.engine._execute(CourseWork._path, 'CourseWork', 'viewCourseTermList', p0, p1, false, callback);
}