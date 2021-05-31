/**
 * SCORM Client API Adapter
 * CMI Core Data 처리
 */


/**
 * Get CMI Core
 */
function ApiGetCmiCore(cmiCoreDTO) {
    var result = "";
    var errorCode = "0";
    var parameter = cmiCoreDTO.parameter;

    if (parameter == "cmi._version") {
        result = cmiCoreDTO.version;
    } else if (parameter == "cmi.completion_status") {
        result = cmiCoreDTO.completionStatus;
    } else if (parameter == "cmi.completion_threshold") {
        result = cmiCoreDTO.completionThreshold;
    } else if (parameter == "cmi.credit") {
        result = cmiCoreDTO.credit;
    } else if (parameter == "cmi.entry") {
        result = cmiCoreDTO.entry;

        if (cmiCoreDTO.exit == "time-out" || cmiCoreDTO.exit == "suspend" ||
            cmiCoreDTO.exit == "logout") {
            result = "resume";
        }

    } else if (parameter == "cmi.exit") {
        result = "";
        errorCode = "405";
    } else if (parameter == "cmi.launch_data") {
        result = cmiCoreDTO.launchData;
        if (result == null) {
            result = "";
        }
    } else if (parameter == "cmi.learner_id") {
        result = cmiCoreDTO.userId;
    } else if (parameter == "cmi.learner_name") {
        result = cmiCoreDTO.learnerName;
    } else if (parameter == "cmi.learner_preference._children") {
        result = cmiCoreDTO.learnerPreferenceChildren;
    } else if (parameter == "cmi.learner_preference.audio_level") {
        result = cmiCoreDTO.learnerAudioLevel;
    } else if (parameter == "cmi.learner_preference.language") {
        result = cmiCoreDTO.learnerLanguage;
    } else if (parameter == "cmi.learner_preference.delivery_speed") {
        result = cmiCoreDTO.learnerDeliverySpeed;
    } else if (parameter == "cmi.learner_preference.audio_captioning") {
        result = cmiCoreDTO.learnerAudioCaptioning;
        if (result == null) {
            result = "0";
        }
    } else if (parameter == "cmi.location") {
        result = cmiCoreDTO.location;
        if (result == null) {
            result = "";
            errorCode = "403";
        }
    } else if (parameter == "cmi.max_time_allowed") {
        result = cmiCoreDTO.maxTimeAllowed;
        if (ApiNullToString(result) == "") {
            result = "";
            errorCode = "403";
        }
    } else if (parameter == "cmi.mode") {
        result = cmiCoreDTO.cmiMode;
    } else if (parameter == "cmi.progress_measure") {
        result = cmiCoreDTO.progressMeasure;
        if (parseFloat(result) == -999) {
            result = "";
            errorCode = "403";
        }
    } else if (parameter == "cmi.scaled_passing_score") {
        result = cmiCoreDTO.scaledPassingScore;
        if (parseFloat(result) == -999) {
            result = "";
            errorCode = "403";
        }
    } else if (parameter == "cmi.score._children") {
        result = cmiCoreDTO.scoreChildren;
    } else if (parameter == "cmi.score.scaled") {
        result = cmiCoreDTO.scoreScaled;
        if (parseFloat(result) == -999) {
            result = "";
            errorCode = "403";
        }
    } else if (parameter == "cmi.score.raw") {
        result = cmiCoreDTO.scoreRaw;
        if (ApiNullToString(result) == "") {
            result = "";
            errorCode = "403";
        }
    } else if (parameter == "cmi.score.max") {
        result = cmiCoreDTO.scoreMax;
        if (ApiNullToString(result) == "") {
            result = "";
            errorCode = "403";
        }
    } else if (parameter == "cmi.score.min") {
        result = cmiCoreDTO.scoreMin;
        if (ApiNullToString(result) == "") {
            result = "";
            errorCode = "403";
        }
    } else if (parameter == "cmi.session_time") {
        result = "";
        errorCode = "405";
    } else if (parameter == "cmi.success_status") {
        result = cmiCoreDTO.successStatus;
    } else if (parameter == "cmi.suspend_data") {
        result = cmiCoreDTO.suspendData;
        if (result == null) {
            result = "";
            errorCode = "403";
        }
    } else if (parameter == "cmi.time_limit_action") {
        result = cmiCoreDTO.timeLimitAction;
        if (ApiNullToString(result) == "") {
            result = "";
            errorCode = "403";
        }
    } else if (parameter == "cmi.total_time") {
        result = cmiCoreDTO.totalTime;
    } else if (parameter == "adl.nav.request") {
        result = cmiCoreDTO.navRequest;
    } else if (parameter == "adl.nav.request_valid.continue") {
        // 임시로 설정
        result = "unknown";
    } else if (parameter == "adl.nav.request_valid.previous") {
        // 임시로 설정
        result = "unknown";
    } else if (parameter.indexOf("adl.nav.request_valid.choice") > -1) {
        result = "unknown";
    } else {
        errorCode = "401";
    }

    cmiCoreDTO.result = result;
    cmiCoreDTO.errorCode = errorCode;

    return cmiCoreDTO;
}


/**
 * Set CMI Core
 */
function ApiSetCmiCore(cmiCoreDTO) {
    var result = "false";
    var errorCode = "0";
    var parameter = cmiCoreDTO.parameter;
    var value = cmiCoreDTO.value;

    if (parameter == "cmi._version") {
        errorCode = "404";
    } else if (parameter == "cmi.completion_status") {
        if (ApiCheckCompletionStatus(value) == false) {
            errorCode = "406";
        } else {
            var completionThreshold = parseFloat(cmiCoreDTO.completionThreshold);
            var progressMeasure = parseFloat(cmiCoreDTO.progressMeasure);
            if (completionThreshold != -999 && progressMeasure != -999) {
                if (progressMeasure >= completionThreshold) {
                    value = "completed";
                } else if (progressMeasure < completionThreshold) {
                    value = "incomplete";
                }
            } else if (completionThreshold != -999 && progressMeasure == -999) {
                value = "unknown";
            }

            cmiCoreDTO.completionStatus = value;
            result = "true";
        }
    } else if (parameter == "cmi.completion_threshold") {
        errorCode = "404";
    } else if (parameter == "cmi.credit") {
        errorCode = "404";
    } else if (parameter == "cmi.entry") {
        errorCode = "404";
    } else if (parameter == "cmi.exit") {
        if (ApiCheckExit(value) == false) {
            errorCode = "406";
        } else {
            cmiCoreDTO.exit = value;
            result = "true";

            if (value == "suspend" || value == "logout") {
                cmiCoreDTO.entry = "resume";
            }
        }
    } else if (parameter == "cmi.launch_data") {
        errorCode = "404";
    } else if (parameter == "cmi.learner_id") {
        errorCode = "404";
    } else if (parameter == "cmi.learner_name") {
        errorCode = "404";
    } else if (parameter == "cmi.learner_preference._children") {
        errorCode = "404";
    } else if (parameter == "cmi.learner_preference.audio_level") {
        if (ApiIsFloatValue(value) == false) {
            errorCode = "406";
        } else if (parseFloat(value) < 0 || parseFloat(value) > 100) {
            errorCode = "407";
        } else {
            cmiCoreDTO.learnerAudioLevel = value;
            result = "true";
        }
    } else if (parameter == "cmi.learner_preference.language") {
        if (value == "" || ApiCheckLanguage(value) == true) {
            cmiCoreDTO.learnerLanguage = value;
            result = "true";
        } else {
            errorCode = "406";
        }
    } else if (parameter == "cmi.learner_preference.delivery_speed") {
        if (ApiIsFloatValue(value) == false) {
            errorCode = "406";
        } else if (parseFloat(value) < 0) {
            errorCode = "407";
        } else {
            cmiCoreDTO.learnerDeliverySpeed = value;
            result = "true";
        }
    } else if (parameter == "cmi.learner_preference.audio_captioning") {
        if (value != "-1" && value != "0" && value != "1") {
            errorCode = "406";
        } else {
            cmiCoreDTO.learnerAudioCaptioning = value;
            result = "true";
        }
    } else if (parameter == "cmi.location") {
        cmiCoreDTO.location = value;
        result = "true";
    } else if (parameter == "cmi.max_time_allowed") {
        errorCode = "404";
    } else if (parameter == "cmi.mode") {
        errorCode = "404";
    } else if (parameter == "cmi.progress_measure") {
        if (ApiIsFloatValue(value) == false) {
            errorCode = "406";
        }
        if (parseFloat(value) < 0 || parseFloat(value) > 1) {
            errorCode = "407";
        } else {
            var completionThreshold = parseFloat(cmiCoreDTO.completionThreshold);
            var progressMeasure = parseFloat(value);
            if (completionThreshold != -999 && progressMeasure != -999) {
                if (progressMeasure >= completionThreshold) {
                    cmiCoreDTO.completionStatus = "completed";
                } else if (progressMeasure < completionThreshold) {
                    cmiCoreDTO.completionStatus = "incomplete";
                }
            } else if (completionThreshold != -999 && progressMeasure == -999) {
                value = "unknown";
            }

            cmiCoreDTO.progressMeasure = value;
            result = "true";
        }
    } else if (parameter == "cmi.scaled_passing_score") {
        errorCode = "404";
    } else if (parameter == "cmi.score._children") {
        errorCode = "404";
    } else if (parameter == "cmi.score.scaled") {
        if (ApiIsFloatValue(value) == false) {
            errorCode = "406";
        } else if (parseFloat(value) < -1 || parseFloat(value) > 1) {
            errorCode = "407";
        } else {
            var scoreScaled = parseFloat(value);
            var scaledPassingScore = parseFloat(cmiCoreDTO.scaledPassingScore);
            if (scoreScaled != -999 && scaledPassingScore != -999) {
                if (scoreScaled >= scaledPassingScore) {
                    cmiCoreDTO.successStatus = "passed";
                } else if (scoreScaled < scaledPassingScore) {
                    cmiCoreDTO.successStatus = "failed";
                }
            }

            cmiCoreDTO.scoreScaled = value;
            result = "true";
        }
    } else if (parameter == "cmi.score.raw") {
        if (ApiIsFloatValue(value) == false) {
            errorCode = "406";
        } else {
            cmiCoreDTO.scoreRaw = value;
            result = "true";
        }
    } else if (parameter == "cmi.score.max") {
        if (ApiIsFloatValue(value) == false) {
            errorCode = "406";
        } else {
            cmiCoreDTO.scoreMax = value;
            result = "true";
        }
    } else if (parameter == "cmi.score.min") {
        if (ApiIsFloatValue(value) == false) {
            errorCode = "406";
        } else {
            cmiCoreDTO.scoreMin = value;
            result = "true";
        }
    } else if (parameter == "cmi.session_time") {
        if (ApiCheckTimeFormat(value) == false) {
            errorCode = "406";
        } else {
            cmiCoreDTO.sessionTime = value;
            cmiCoreDTO.tempTotalTime = ApiAddTime(cmiCoreDTO.tempTotalTime, value);
            result = "true";
        }
    } else if (parameter == "cmi.success_status") {
        if (ApiCheckSuccessStatus(value) == false) {
            errorCode = "406";
        } else {
            var scoreScaled = parseFloat(cmiCoreDTO.scoreScaled);
            var scaledPassingScore = parseFloat(cmiCoreDTO.scaledPassingScore);
            if (scoreScaled != -999 && scaledPassingScore != -999) {
                if (scoreScaled >= scaledPassingScore) {
                    value = "passed";
                } else if (scoreScaled < scaledPassingScore) {
                    value = "failed";
                }
            } else if (scoreScaled == -999 && scaledPassingScore != -999) {
                value = "unknown";
            }

            cmiCoreDTO.successStatus = value;
            result = "true";
        }
    } else if (parameter == "cmi.suspend_data") {
        cmiCoreDTO.suspendData = value;
        result = "true";
    } else if (parameter == "cmi.time_limit_action") {
        errorCode = "404";
    } else if (parameter == "cmi.total_time") {
        errorCode = "404";
    } else if (parameter == "adl.nav.request") {
        cmiCoreDTO.navRequest = value;

        if (value == "suspend" || value == "suspendAll") {
            cmiCoreDTO.exit = "suspend";
            cmiCoreDTO.entry = "resume";
        }

        result = "true";
    } else {
        errorCode = "401";
    }

    cmiCoreDTO.result = result;
    cmiCoreDTO.errorCode = errorCode;

    return cmiCoreDTO;
}


/**
 * Completion Status Data
 */
var ApiCompletionStatusData = new Array(
    "completed",
    "incomplete",
    "not attempted",
    "unknown"
);


/**
 * Completion Status 값 체크
 */
function ApiCheckCompletionStatus(value) {
    for (var i = 0; i < ApiCompletionStatusData.length; i++) {
        if (ApiCompletionStatusData[i] == value) {
            return true;
        }
    }
    return false;
}


/**
 * Exit Data
 */
var ApiExitData = new Array(
    "time-out",
    "suspend",
    "logout",
    "normal",
    ""
);


/**
 * Exit 값 체크
 */
function ApiCheckExit(value) {
    for (var i = 0; i < ApiExitData.length; i++) {
        if (ApiExitData[i] == value) {
            return true;
        }
    }
    return false;
}


/**
 * Success Status Data
 */
var ApiSuccessStatusData = new Array(
    "passed",
    "failed",
    "unknown"
);


/**
 * Success Status 값 체크
 */
function ApiCheckSuccessStatus(value) {
    for (var i = 0; i < ApiSuccessStatusData.length; i++) {
        if (ApiSuccessStatusData[i] == value) {
            return true;
        }
    }
    return false;
}


/**
 * adl.nav.request Data
 */
var ApiNavRequestData = new Array(
    "continue",
    "previous",
    "choice",
    "exit",
    "exitAll",
    "abandon",
    "abandonAll",
    "_none"
);


/**
 * adl.nav.request 값 체크
 */
function ApiCheckNavResuest(value) {
    for (var i = 0; i < ApiNavRequestData.length; i++) {
        if (ApiNavRequestData[i] == value) {
            return true;
        }
    }
    return false;
}