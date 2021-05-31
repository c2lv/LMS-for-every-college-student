/**
 * SCORM Client API Adapter
 * Comments from Learner Data 처리
 * Comments from LMS Data 처리
 */


/**
 * Get Comments from Learner
 */
function ApiGetCommentsFromLearner(cmiCoreDTO) {
    var result = "";
    var errorCode = "0";
    var parameter = cmiCoreDTO.parameter;
    var commentsLearnerList = cmiCoreDTO.commentsLearnerList;

    if (parameter == "cmi.comments_from_learner._children") {
        result = cmiCoreDTO.commentsFromLearnerChildren;
    } else if (parameter == "cmi.comments_from_learner._count") {
        result = commentsLearnerList.length;
    } else if (parameter == "cmi.comments_from_learner") {
        errorCode = "401";
    } else {
        var nValue = ApiGetNValue(parameter, "cmi.comments_from_learner.");
        if (nValue == -1) {
            errorCode = "403";
        } else if (nValue >= commentsLearnerList.length) {
            errorCode = "301";
        } else {
            var cmiCommentsLearnerDTO = commentsLearnerList[nValue];
            var lastParam = ApiGetLastParam(parameter);

            // cmi.comments_from_learner.n.comment
            if (lastParam == "comment") {
                result = cmiCommentsLearnerDTO.learnerComment;
            }
            // cmi.comments_from_learner.n.location
            else if (lastParam == "location") {
                result = cmiCommentsLearnerDTO.learnerLocation;
            }
            // cmi.comments_from_learner.n.timestamp
            else if (lastParam == "timestamp" || lastParam == "date_time") {
                result = cmiCommentsLearnerDTO.learnerTimestamp;
            } else {
                errorCode = "201";
            }

            if (result == null) {
                result = "";
                errorCode = "403";
            }
        }
    }

    cmiCoreDTO.result = result;
    cmiCoreDTO.errorCode = errorCode;

    return cmiCoreDTO;
}


/**
 * Set Comments from Learner
 */
function ApiSetCommentsFromLearner(cmiCoreDTO) {
    var result = "false";
    var errorCode = "0";
    var parameter = cmiCoreDTO.parameter;
    var value = cmiCoreDTO.value;
    var commentsLearnerList = cmiCoreDTO.commentsLearnerList;

    if (parameter == "cmi.comments_from_learner._children") {
        errorCode = "404";
    } else if (parameter == "cmi.comments_from_learner._count") {
        errorCode = "404";
    } else if (parameter == "cmi.comments_from_learner") {
        errorCode = "401";
    } else {
        var nValue = ApiGetNValue(parameter, "cmi.comments_from_learner.");

        if (nValue == -1) {
            errorCode = "403";
        } else if (nValue > commentsLearnerList.length) {
            errorCode = "351";
        } else {
            var cmiCommentsLearnerDTO = null;
            var isExist = false;

            if (commentsLearnerList.length == nValue) {
                cmiCommentsLearnerDTO = new Object();
                cmiCommentsLearnerDTO.commentNum = nValue;
                cmiCommentsLearnerDTO.learnerTimestamp = null;
                cmiCommentsLearnerDTO.learnerLocation = null;
                cmiCommentsLearnerDTO.learnerComment = null;
            } else {
                isExist = true;
                cmiCommentsLearnerDTO = commentsLearnerList[nValue];
            }

            var lastParam = ApiGetLastParam(parameter);

            // cmi.comments_from_learner.n.comment
            if (lastParam == "comment") {
                if (ApiCheckLangString(value, true, 4000) == true) {
                    cmiCommentsLearnerDTO.learnerComment = value;
                    result = "true";
                } else {
                    errorCode = "406";
                }
            }
            // cmi.comments_from_learner.n.location
            else if (lastParam == "location") {
                cmiCommentsLearnerDTO.learnerLocation = value;
                result = "true";
            }
            // cmi.comments_from_learner.n.timestamp
            else if (lastParam == "timestamp" || lastParam == "date_time") {
                if (ApiCheckTimestampFormat(value) == false) {
                    errorCode = "406";
                } else {
                    cmiCommentsLearnerDTO.learnerTimestamp = value;
                    result = "true";
                }
            } else {
                errorCode = "201";
            }

            if (result == "true") {
                commentsLearnerList[nValue] = cmiCommentsLearnerDTO;
                cmiCoreDTO.commentsLearnerList = commentsLearnerList;
            }

        }
    }

    cmiCoreDTO.result = result;
    cmiCoreDTO.errorCode = errorCode;

    return cmiCoreDTO;
}


/**
 * Get Comments from LMS
 */
function ApiGetCommentsFromLms(cmiCoreDTO) {
    var result = "";
    var errorCode = "0";
    var parameter = cmiCoreDTO.parameter;
    var commentsLmsList = cmiCoreDTO.commentsLmsList;

    if (parameter == "cmi.comments_from_lms._children") {
        result = cmiCoreDTO.commentsFromLmsChildren;
    } else if (parameter == "cmi.comments_from_lms._count") {
        result = commentsLmsList.length;
    } else if (parameter == "cmi.comments_from_lms") {
        errorCode = "401";
    } else {
        var nValue = ApiGetNValue(parameter, "cmi.comments_from_lms.");
        if (nValue == -1) {
            errorCode = "403";
        } else if (nValue >= commentsLmsList.length) {
            errorCode = "301";
        } else {
            var cmiCommentsLmsDTO = commentsLmsList[nValue];
            var lastParam = ApiGetLastParam(parameter);

            // cmi.comments_from_lms.n.comment
            if (lastParam == "comment") {
                result = cmiCommentsLmsDTO.lmsComment;
            }
            // cmi.comments_from_lms.n.location
            else if (lastParam == "location") {
                result = cmiCommentsLmsDTO.lmsLocation;
            }
            // cmi.comments_from_lms.n.timestamp
            else if (lastParam == "timestamp" || lastParam == "date_time") {
                result = cmiCommentsLmsDTO.lmsTimestamp;
            } else {
                errorCode = "201";
            }

            if (result == null) {
                errorCode = "403";
                result = "";
            }
        }
    }

    cmiCoreDTO.result = result;
    cmiCoreDTO.errorCode = errorCode;

    return cmiCoreDTO;
}


/**
 * Set Comments from Lms
 */
function ApiSetCommentsFromLms(cmiCoreDTO) {
    var result = "false";
    var errorCode = "0";
    var parameter = cmiCoreDTO.parameter;

    if (parameter == "cmi.comments_from_lms") {
        errorCode = "401";
    } else {
        errorCode = "404";
    }

    cmiCoreDTO.result = result;
    cmiCoreDTO.errorCode = errorCode;

    return cmiCoreDTO;
}