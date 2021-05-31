/**
 * SCORM Client API Adapter
 * 
 * Mediopia Tech Corp.
 */


/**
 * SCORM Client API Adapter
 */
function ScormAPIAdapter() {
    this.isInitialized = false;
    this.isTerminated = true;
    this.errorCode = "0";

    // CMI Core
    this.CmiCoreDTO = new Object();
    this.CmiCoreDTO.courseId = "";
    this.CmiCoreDTO.lessonContentsId = "";
    this.CmiCoreDTO.lessonElementId = "";
    this.CmiCoreDTO.learnerId = "";
    this.CmiCoreDTO.learnerName = "";
    this.CmiCoreDTO.errorCode = "0";
    this.CmiCoreDTO.result = "";
    this.CmiCoreDTO.completionThreshold = "0";
    this.CmiCoreDTO.navRequest = "_none_";
    this.CmiCoreDTO.learningControl = "";

    this.Initialize = ApiInitialize;
    this.Terminate = ApiTerminate;
    this.Commit = ApiCommit;
    this.GetValue = ApiGetValue;
    this.SetValue = ApiSetValue;
    this.GetErrorString = ApiGetErrorString;
    this.GetDiagnostic = ApiGetDiagnostic;
    this.GetLastError = ApiGetLastError;

    this.SetCourseId = ApiSetCourseId;
    this.SetLessonContentsId = ApiSetLessonContentsId;
    this.SetLessonElementId = ApiSetLessonElementId;
    this.SetScoId = ApiSetScoId;
    this.SetLearnerId = ApiSetLearnerId;
    this.SetLearnerName = ApiSetLearnerName;
    this.SetLearningControl = ApiSetLearningControl;
    this.SetCredit = ApiSetCredit;
    this.SetMode = ApiSetMode;
    this.SetMaxTimeAllowed = ApiSetMaxTimeAllowed;
    this.SetTimeLimitAction = ApiSetTimeLimitAction;
    this.SetScaledPassingScore = ApiSetScaledPassingScore;
    this.SetCompletionThreshold = ApiSetCompletionThreshold;
    this.topObj = null;
    this.version = "1.0";
}


/**
 * Initialize
 */
function ApiInitialize(parameter) {
    var result = "false";

    if (parameter != null && parameter != "") {
        this.errorCode = "201";
    } else {
        if (this.isInitialized == true) {
            this.errorCode = "103";
        } else {
            var cmiCoreDTO = this.CmiCoreDTO;

            // dwr 동기화
            DWREngine.setAsync(false);

            // Cmi Core 가져오기			
            ScormWork.getCmiData(cmiCoreDTO, {
                callback: function(outCmiCoreDTO) {
                    cmiCoreDTO = outCmiCoreDTO;

                    result = outCmiCoreDTO.result;
                }
            });

            if (result == "true") {
                this.CmiCoreDTO = cmiCoreDTO;
                this.isInitialized = true;
                this.isTerminated = false;
                this.errorCode = "0";

                this.CmiCoreDTO.tempTotalTime = "PT0H0M0S";
            }
        }
    }

    return result;
}


/**
 * Terminate
 */
function ApiTerminate(parameter) {
    var result = "false";

    if (parameter != null && parameter != "") {
        this.errorCode = "201";
    } else if (this.isTerminated == true) {
        this.errorCode = "113";
    } else if (this.isInitialized == false) {
        this.errorCode = "112";
    } else if (this.isInitialized == true) {
        // Terminate 처리
        result = this.Commit("");

        this.isTerminated = true;
        this.isInitialized = false;
        this.errorCode = "0";
    }

    if (this.CmiCoreDTO.navRequest != "_none_") {
        this.topObj.doNavRequest(this.CmiCoreDTO.navRequest);
    }

    return result;
}


/**
 * Commit
 */
function ApiCommit(parameter) {
    var result = "false";

    if (parameter != null && parameter != "") {
        this.errorCode = "201";
    } else if (this.isInitialized == false) {
        this.errorCode = "142";
    } else if (this.isInitialized == true) {
        // credit 인 경우만 저장
        if (this.CmiCoreDTO.credit == "credit") {
            // total_time 계산
            this.CmiCoreDTO.totalTime = ApiAddTime(this.CmiCoreDTO.tempTotalTime, this.CmiCoreDTO.totalTime);

            // -- objectives
            // cmiObjectivesDTO 객체에 있는 값을 분리하여 각각의 배열에 넣는다.
            var objectivesList = this.CmiCoreDTO.objectivesList;

            for (var i = 0; i < objectivesList.length; i++) {
                var cmiObjectivesDTO = objectivesList[i];
                var objData = cmiObjectivesDTO.objId +
                    "[&]" + cmiObjectivesDTO.scoreScaled +
                    "[&]" + cmiObjectivesDTO.scoreRaw +
                    "[&]" + cmiObjectivesDTO.scoreMin +
                    "[&]" + cmiObjectivesDTO.scoreMax +
                    "[&]" + cmiObjectivesDTO.successStatus +
                    "[&]" + cmiObjectivesDTO.completionStatus +
                    "[&]" + cmiObjectivesDTO.objDescription;

                objectivesList[i] = objData;
            }
            this.CmiCoreDTO.objectivesList = objectivesList;
            // -- objectives

            // -- comments_from_learner
            // cmiCommentsLearnerDTO 객체에 있는 값을 분리하여 각각의 배열에 넣는다.
            var commentsLearnerList = this.CmiCoreDTO.commentsLearnerList;
            var commentsLearnerCommentList = new Array();

            for (var i = 0; i < commentsLearnerList.length; i++) {
                var cmiCommentsLearnerDTO = commentsLearnerList[i];
                var commentData = cmiCommentsLearnerDTO.learnerTimestamp +
                    "[&]" + cmiCommentsLearnerDTO.learnerLocation +
                    "[&]" + cmiCommentsLearnerDTO.learnerComment;

                commentsLearnerList[i] = commentData;
            }
            this.CmiCoreDTO.commentsLearnerList = commentsLearnerList;
            // -- comments_from_learner


            // -- interactions
            // cmiInteractionsDTO 객체에 있는 값을 분리하여 각각의 배열에 넣는다.
            var interactionsList = this.CmiCoreDTO.interactionsList;
            var interactionsObjList = new Array();
            var interactionsResList = new Array();

            for (var i = 0; i < interactionsList.length; i++) {
                var cmiInteractionsDTO = interactionsList[i];
                var intObjList = cmiInteractionsDTO.interactionsObjList;
                var intResList = cmiInteractionsDTO.interactionsResList;

                var intData = cmiInteractionsDTO.intId +
                    "[&]" + cmiInteractionsDTO.intType +
                    "[&]" + cmiInteractionsDTO.intTimestamp +
                    "[&]" + cmiInteractionsDTO.intWeighting +
                    "[&]" + cmiInteractionsDTO.intLearnerResponse +
                    "[&]" + cmiInteractionsDTO.intResult +
                    "[&]" + cmiInteractionsDTO.intLatency +
                    "[&]" + cmiInteractionsDTO.intDescription;
                interactionsList[i] = intData;

                if (intObjList.length > 0) {
                    for (var j = 0; j < intObjList.length; j++) {
                        var cmiInteractionsObjDTO = intObjList[j];
                        var intObjData = cmiInteractionsObjDTO.intNum +
                            "[&]" + cmiInteractionsObjDTO.intObjNum +
                            "[&]" + cmiInteractionsObjDTO.intObjId;

                        interactionsObjList[interactionsObjList.length] = intObjData;
                    }
                }

                if (intResList.length > 0) {
                    for (var j = 0; j < intResList.length; j++) {
                        var cmiInteractionsResDTO = intResList[j];
                        var intResData = cmiInteractionsResDTO.intNum +
                            "[&]" + cmiInteractionsResDTO.intResNum;

                        if (cmiInteractionsResDTO.pattern == "") {
                            intResData += "[&]null";
                        } else {
                            intResData += "[&]" + cmiInteractionsResDTO.pattern;
                        }

                        interactionsResList[interactionsResList.length] = intResData;
                    }
                }
            }

            this.CmiCoreDTO.interactionsList = interactionsList;
            this.CmiCoreDTO.interactionsObjList = interactionsObjList;
            this.CmiCoreDTO.interactionsResList = interactionsResList;
            // -- interactions


            // dwr 동기화
            DWREngine.setAsync(false);

            // Cmi Data를 LMS에 저장
            ScormWork.setCmiData(this.CmiCoreDTO, {
                callback: function(ProcessResultDTO) {
                    if (ProcessResultDTO.returnResult > -1) {
                        result = "true";
                    }
                }
            });
        } else {
            result = "true";
        }
        this.errorCode = "0";
    } else if (this.isTerminated == true) {
        this.errorCode = "143";
    }

    return result;
}



/**
 * Get Value
 */
function ApiGetValue(parameter) {
    var result = "";
    var firstParam = ApiGetFirstParam(parameter);

    if (this.isInitialized == false) {
        this.errorCode = "122";
        return result;
    }

    if (parameter == null || parameter == "") {
        this.errorCode = "301";
        return result;
    }

    this.CmiCoreDTO.parameter = parameter;

    var cmiCoreDTO = null;

    // Get cmi.comments_from_learner.
    if (firstParam == "comments_from_learner") {
        cmiCoreDTO = ApiGetCommentsFromLearner(this.CmiCoreDTO);
    }
    // Get cmi.comments_from_lms.
    else if (firstParam == "comments_from_lms") {
        cmiCoreDTO = ApiGetCommentsFromLms(this.CmiCoreDTO);
    }
    // Get cmi.interactions.
    else if (firstParam == "interactions") {
        cmiCoreDTO = ApiGetInteractions(this.CmiCoreDTO);
    }
    // Get cmi.objectives.
    else if (firstParam == "objectives") {
        cmiCoreDTO = ApiGetObjectives(this.CmiCoreDTO);
    }
    // Get CmiCore
    else {
        cmiCoreDTO = ApiGetCmiCore(this.CmiCoreDTO);
    }

    this.errorCode = cmiCoreDTO.errorCode;
    this.CmiCoreDTO = cmiCoreDTO;

    return cmiCoreDTO.result;
}


/**
 * Set Value
 */
function ApiSetValue(parameter, value) {
    var firstParam = ApiGetFirstParam(parameter);

    if (this.isInitialized == false) {
        this.errorCode = "132";
        return "false";
    }

    if (parameter == null || parameter == "") {
        this.errorCode = "351";
        return "false";
    }

    this.CmiCoreDTO.parameter = parameter;
    this.CmiCoreDTO.value = value;

    var cmiCoreDTO = null;

    // Set cmi.comments_from_learner.
    if (firstParam == "comments_from_learner") {
        cmiCoreDTO = ApiSetCommentsFromLearner(this.CmiCoreDTO);
    }
    // Set cmi.comments_from_lms.
    else if (firstParam == "comments_from_lms") {
        cmiCoreDTO = ApiSetCommentsFromLms(this.CmiCoreDTO);
    }
    // Set cmi.interactions.
    else if (firstParam == "interactions") {
        cmiCoreDTO = ApiSetInteractions(this.CmiCoreDTO);
    }
    // Set cmi.objectives.
    else if (firstParam == "objectives") {
        cmiCoreDTO = ApiSetObjectives(this.CmiCoreDTO);
    }
    // Set CmiCore
    else {
        cmiCoreDTO = ApiSetCmiCore(this.CmiCoreDTO);
    }

    this.CmiCoreDTO = cmiCoreDTO;
    this.errorCode = cmiCoreDTO.errorCode;

    return cmiCoreDTO.result;
}


/**
 * Get ErrorString
 */
function ApiGetErrorString(errorCode) {
    var errorMessage = "";

    for (var i = 0; i < ApiErrorCode.length; i++) {
        if (errorCode == ApiErrorCode[i]) {
            errorMessage = ApiErrorMessage[i];
            break;
        }
    }

    return errorMessage;
}


/**
 * Get Diagnostic
 */
function ApiGetDiagnostic(diagnosticCode) {
    var diagnosticMessage = "";

    for (var i = 0; i < ApiDiagnosticCode.length; i++) {
        if (diagnosticCode == ApiDiagnosticCode[i]) {
            diagnosticMessage = ApiDiagnosticMessage[i];
            break;
        }
    }

    return diagnosticMessage;
}


/**
 * Get Last Error
 */
function ApiGetLastError() {
    return this.errorCode;
}


/**
 * Set CourseId
 */
function ApiSetCourseId(courseId) {
    this.CmiCoreDTO.courseId = courseId;
}


/**
 * Set LessonContentsId
 */
function ApiSetLessonContentsId(lessonContentsId) {
    this.CmiCoreDTO.lessonContentsId = lessonContentsId;
}


/**
 * Set LessonElementId
 */
function ApiSetLessonElementId(lessonElementId) {
    this.CmiCoreDTO.lessonElementId = lessonElementId;
}


/**
 * Set ScoId
 */
function ApiSetScoId(scoId) {
    this.CmiCoreDTO.scoId = scoId;
}


/**
 * Set LearnerId
 */
function ApiSetLearnerId(learnerId) {
    this.CmiCoreDTO.userId = learnerId;
}


/**
 * Set LearnerName
 */
function ApiSetLearnerName(learnerName) {
    this.CmiCoreDTO.learnerName = learnerName;
}


/**
 * Set learning_control
 */
function ApiSetLearningControl(learningControl) {
    this.CmiCoreDTO.learningControl = learningControl;
}


/**
 * Set credit
 */
function ApiSetCredit(credit) {
    this.CmiCoreDTO.credit = credit;
}

/**
 * Set mode
 */
function ApiSetMode(mode) {
    this.CmiCoreDTO.cmiMode = mode;
}

/**
 * Set max_time_allowed
 */
function ApiSetMaxTimeAllowed(maxTimeAllowed) {
    this.CmiCoreDTO.maxTimeAllowed = maxTimeAllowed;
}

/**
 * Set time_limit_action
 */
function ApiSetTimeLimitAction(timeLimitAction) {
    this.CmiCoreDTO.timeLimitAction = timeLimitAction;
}

/**
 * Set scaled_passing_score
 */
function ApiSetScaledPassingScore(scaledPassingScore) {
    this.CmiCoreDTO.scaledPassingScore = scaledPassingScore;
}

/**
 * Set completion_threshold
 */
function ApiSetCompletionThreshold(completionThreshold) {
    this.CmiCoreDTO.completionThreshold = completionThreshold;
}