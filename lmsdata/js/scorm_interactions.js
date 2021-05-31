/**
 * SCORM Client API Adapter
 * Interactions Data 처리
 */

/**
 * Get Interactions
 */
function ApiGetInteractions(cmiCoreDTO) {
    var result = "";
    var errorCode = "0";
    var parameter = cmiCoreDTO.parameter;
    var interactionsList = cmiCoreDTO.interactionsList;

    // cmi.interactions._children
    if (parameter == "cmi.interactions._children") {
        result = cmiCoreDTO.interactionsChildren;
    }
    // cmi.interactions._count
    else if (parameter == "cmi.interactions._count") {
        result = interactionsList.length;
    } else if (parameter == "cmi.interactions") {
        errorCode = "401";
    } else {
        var nValue = ApiGetNValue(parameter, "cmi.interactions.");

        if (nValue == -1) {
            errorCode = "403";
        } else if (nValue >= interactionsList.length) {
            errorCode = "301";
        } else {
            var lastParam = ApiGetLastParam(parameter);
            var cmiInteractionsDTO = interactionsList[nValue];

            var interactionsObjList = cmiInteractionsDTO.interactionsObjList;
            var interactionsResList = cmiInteractionsDTO.interactionsResList;

            // Interactions Objectives
            if (parameter.indexOf("objectives.") > -1) {
                var parameter2 = parameter.substring(parameter.indexOf("objectives."));

                // cmi.interactions.n.objectives._count
                if (parameter2 == "objectives._count") {
                    result = interactionsObjList.length;
                } else {
                    var nValue2 = ApiGetNValue(parameter2, "objectives.");
                    var cmiInteractionsObjDTO = interactionsObjList[nValue2];

                    if (nValue2 == -1) {
                        errorCode = "403";
                    } else if (nValue2 >= interactionsObjList.length) {
                        errorCode = "301";
                    } else {
                        // cmi.interactions.n.objectives.n.id
                        if (lastParam == "id") {
                            result = cmiInteractionsObjDTO.intObjId;
                        } else {
                            errorCode = "201";
                        }
                    }
                }
            }
            // Interactions Correct Responses
            else if (parameter.indexOf("correct_responses.") > -1) {
                var parameter2 = parameter.substring(parameter.indexOf("correct_responses."));

                // cmi.interactions.n.correct_responses._count
                if (parameter2 == "correct_responses._count") {
                    result = interactionsResList.length;
                } else {
                    var nValue2 = ApiGetNValue(parameter2, "correct_responses.");
                    var cmiInteractionsResDTO = interactionsResList[nValue2];

                    if (nValue2 == -1) {
                        errorCode = "403";
                    } else if (nValue2 >= interactionsResList.length) {
                        errorCode = "301";
                    } else {
                        // cmi.interactions.n.correct_responses.n.pattern
                        if (lastParam == "pattern") {
                            result = cmiInteractionsResDTO.pattern;
                        } else {
                            errorCode = "201";
                        }
                    }
                }
            }
            // cmi.interactions.n.id
            else if (lastParam == "id") {
                result = cmiInteractionsDTO.intId;
            }
            // cmi.interactions.n.type
            else if (lastParam == "type") {
                result = cmiInteractionsDTO.intType;
                if (result == "") {
                    errorCode = "403";
                }
            }
            // cmi.interactions.n.timestamp
            else if (lastParam == "timestamp") {
                result = cmiInteractionsDTO.intTimestamp;
            }
            // cmi.interactions.n.weighting
            else if (lastParam == "weighting") {
                result = cmiInteractionsDTO.intWeighting;
            }
            // cmi.interactions.n.learner_response
            else if (lastParam == "learner_response") {
                result = cmiInteractionsDTO.intLearnerResponse;
            }
            // cmi.interactions.n.result
            else if (lastParam == "result") {
                result = cmiInteractionsDTO.intResult;
            }
            // cmi.interactions.n.latency
            else if (lastParam == "latency") {
                result = cmiInteractionsDTO.intLatency;
            }
            // cmi.interactions.n.description
            else if (lastParam == "description") {
                result = cmiInteractionsDTO.intDescription;
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
 * Set Interactions
 */
function ApiSetInteractions(cmiCoreDTO) {
    var result = "false";
    var errorCode = "0";
    var parameter = cmiCoreDTO.parameter;
    var value = cmiCoreDTO.value;
    var interactionsList = cmiCoreDTO.interactionsList;

    if (parameter == "cmi.interactions._children") {
        errorCode = "404";
    } else if (parameter == "cmi.interactions._count") {
        errorCode = "404";
    } else if (parameter == "cmi.interactions") {
        errorCode = "401";
    } else {
        var nValue = ApiGetNValue(parameter, "cmi.interactions.");

        if (nValue == -1) {
            errorCode = "403";
        } else if (nValue == -2) {
            errorCode = "351";
        } else if (nValue > interactionsList.length) {
            errorCode = "351";
        } else {
            var lastParam = ApiGetLastParam(parameter);
            var cmiInteractionsDTO = null;
            if (interactionsList.length == nValue) {
                cmiInteractionsDTO = new Object();
                cmiInteractionsDTO.intNum = nValue;
                cmiInteractionsDTO.intId = "";
                cmiInteractionsDTO.intType = "";
                cmiInteractionsDTO.intTimestamp = null;
                cmiInteractionsDTO.intWeighting = null;
                cmiInteractionsDTO.intLearnerResponse = null;
                cmiInteractionsDTO.intResult = null;
                cmiInteractionsDTO.intLatency = null;
                cmiInteractionsDTO.intDescription = null;
                cmiInteractionsDTO.interactionsObjList = new Array();
                cmiInteractionsDTO.interactionsResList = new Array();
            } else {
                cmiInteractionsDTO = interactionsList[nValue];
            }

            var intType = cmiInteractionsDTO.intType;

            // Interactions Objectives
            if (parameter.indexOf("objectives.") > -1) {
                var parameter2 = parameter.substring(parameter.indexOf("objectives."));

                // cmi.interactions.n.objectives._count
                if (parameter2 == "objectives._count") {
                    errorCode = "404";
                } else {
                    var nValue2 = ApiGetNValue(parameter2, "objectives.");
                    var interactionsObjList = cmiInteractionsDTO.interactionsObjList;

                    if (nValue2 == -1) {
                        errorCode = "403";
                    } else if (nValue2 > interactionsObjList.length) {
                        errorCode = "351";
                    } else {
                        var cmiInteractionsObjDTO = null;

                        if (interactionsObjList.length == nValue2) {
                            cmiInteractionsObjDTO = new Object();
                            cmiInteractionsObjDTO.intNum = nValue;
                            cmiInteractionsObjDTO.intObjNum = nValue2;
                            cmiInteractionsObjDTO.intObjId = "";

                        } else {
                            cmiInteractionsObjDTO = interactionsObjList[nValue2];
                        }

                        if (cmiInteractionsDTO.intId == "") {
                            errorCode = "408";
                        }
                        // cmi.interactions.n.objectives.n.id
                        else if (lastParam == "id") {
                            var isExistObjId = false;
                            // 기존에 ID가 있는지 확인
                            if (interactionsObjList.length > 0) {
                                for (var i = 0; i < interactionsObjList.length; i++) {
                                    var intObjDTO = interactionsObjList[i];
                                    if (intObjDTO && intObjDTO.intObjNum != nValue2 && value == intObjDTO.intObjId) {
                                        isExistObjId = true;
                                        break;
                                    }
                                }
                            }

                            if (ApiCheckIdFormat(value) == false) {
                                errorCode = "406";
                            } else if (isExistObjId != true) {
                                cmiInteractionsObjDTO.intObjId = value;
                                result = "true";
                            } else {
                                errorCode = "351";
                            }
                        } else {
                            errorCode = "406";
                        }

                        if (result == "true") {
                            interactionsObjList[nValue2] = cmiInteractionsObjDTO;
                            cmiInteractionsDTO.interactionsObjList = interactionsObjList;
                        }
                    }
                }
            }
            // Interactions Correct Responses
            else if (parameter.indexOf("correct_responses.") > -1) {
                var parameter2 = parameter.substring(parameter.indexOf("correct_responses."));

                // cmi.interactions.n.correct_responses._count
                if (parameter2 == "correct_responses._count") {
                    errorCode = "404";
                } else {
                    var nValue2 = ApiGetNValue(parameter2, "correct_responses.");
                    var interactionsResList = cmiInteractionsDTO.interactionsResList;

                    if (nValue2 == -1) {
                        errorCode = "403";
                    }
                    if (cmiInteractionsDTO.intId == "" || cmiInteractionsDTO.intType == "") {
                        errorCode = "408";
                    } else if (nValue2 > interactionsResList.length) {
                        errorCode = "351";
                    } else if ((intType == "true-false" || intType == "numeric") && nValue2 > 0) {
                        errorCode = "351";
                    } else if (intType == "choice" && (ApiCheckResChoiceExist(value, interactionsResList) == false)) {
                        errorCode = "351";
                    } else {
                        var cmiInteractionsResDTO = null;

                        if (interactionsResList.length == nValue2) {
                            cmiInteractionsResDTO = new Object();
                            cmiInteractionsResDTO.intNum = nValue;
                            cmiInteractionsResDTO.intResNum = nValue2;
                            cmiInteractionsResDTO.pattern = null;
                        } else {
                            cmiInteractionsResDTO = interactionsResList[nValue2];
                        }

                        // cmi.interactions.n.correct_responses.n.pattern
                        if (lastParam == "pattern") {
                            if (ApiCheckLearnerResponse(cmiInteractionsDTO.intType, value, true) == true) {
                                cmiInteractionsResDTO.pattern = value;
                                result = "true";
                            } else {
                                errorCode = "406";
                            }
                        } else {
                            errorCode = "406";
                        }

                        if (result == "true") {
                            interactionsResList[nValue2] = cmiInteractionsResDTO;
                            cmiInteractionsDTO.interactionsResList = interactionsResList;
                        }
                    }
                }
            }
            // cmi.interactions.n.id
            else if (lastParam == "id") {
                if (value == "") {
                    errorCode = "406";
                } else if (ApiCheckIdFormat(value) == false) {
                    errorCode = "406";
                } else {
                    cmiInteractionsDTO.intId = value;
                    result = "true";
                }
            } else if (cmiInteractionsDTO.intId == "") {
                errorCode = "408";
            }
            // cmi.interactions.n.type
            else if (lastParam == "type") {
                if (ApiCheckInteractionsType(value) == false) {
                    errorCode = "406";
                } else {
                    cmiInteractionsDTO.intType = value;
                    result = "true";
                }
            }
            // cmi.interactions.n.timestamp
            else if (lastParam == "timestamp") {
                if (ApiCheckTimestampFormat(value) == false) {
                    errorCode = "406";
                } else {
                    cmiInteractionsDTO.intTimestamp = value;
                    result = "true";
                }
            }
            // cmi.interactions.n.weighting
            else if (lastParam == "weighting") {
                if (ApiIsFloatValue(value) == false) {
                    errorCode = "406";
                } else {
                    cmiInteractionsDTO.intWeighting = value;
                    result = "true";
                }
            }
            // cmi.interactions.n.learner_response
            else if (lastParam == "learner_response") {
                if (cmiInteractionsDTO.intType == "") {
                    errorCode = "408";
                } else {
                    if (ApiCheckLearnerResponse(cmiInteractionsDTO.intType, value) == true) {
                        cmiInteractionsDTO.intLearnerResponse = value;
                        result = "true";
                    } else {
                        errorCode = "406";
                    }
                }
            }
            // cmi.interactions.n.result
            else if (lastParam == "result") {
                if (ApiCheckInteractionsResult(value) == false && ApiIsFloatValue(value) == false) {
                    errorCode = "406";
                } else {
                    cmiInteractionsDTO.intResult = value;
                    result = "true";
                }
            }
            // cmi.interactions.n.latency
            else if (lastParam == "latency") {
                if (ApiCheckTimeFormat(value) == false) {
                    errorCode = "406";
                } else {
                    cmiInteractionsDTO.intLatency = value;
                    result = "true";
                }
            }
            // cmi.interactions.n.description
            else if (lastParam == "description") {
                cmiInteractionsDTO.intDescription = value;
                result = "true";
            } else {
                errorCode = "201";
            }

            //  결과가 성공일때 리스트 추가
            if (result == "true") {
                interactionsList[nValue] = cmiInteractionsDTO;
                cmiCoreDTO.interactionsList = interactionsList;
            }
        }
    }

    cmiCoreDTO.result = result;
    cmiCoreDTO.errorCode = errorCode;

    return cmiCoreDTO;
}


/**
 * Interactions Type Data
 */
var ApiInteractionsTypeData = new Array(
    "true-false",
    "choice",
    "fill-in",
    "long-fill-in",
    "matching",
    "performance",
    "sequencing",
    "likert",
    "numeric",
    "other"
);


/**
 * Interactions Type 값 체크
 */
function ApiCheckInteractionsType(value) {
    for (var i = 0; i < ApiInteractionsTypeData.length; i++) {
        if (ApiInteractionsTypeData[i] == value) {
            return true;
        }
    }
    return false;
}


/**
 * Interactions Result Data
 */
var ApiInteractionsResultData = new Array(
    "correct",
    "incorrect",
    "unanticipated",
    "neutral"
);


/**
 * Interactions Result 값 체크
 */
function ApiCheckInteractionsResult(value) {
    for (var i = 0; i < ApiInteractionsResultData.length; i++) {
        if (ApiInteractionsResultData[i] == value) {
            return true;
        }
    }
    return false;
}


/**
 * Learner Response true-false Data
 */
var ApiResTrueFalse = new Array(
    "true",
    "false",
    "agree",
    "disagree",
    "yes",
    "no"
);

/**
 * Learner Response 값 체크
 */
function ApiCheckLearnerResponse(type, value, pattern) {
    if (pattern == null) {
        pattern = false;
    }

    if (type == "true-false") {
        for (var i = 0; i < ApiResTrueFalse.length; i++) {
            if (ApiResTrueFalse[i] == value) {
                return true;
            }
        }
    } else if (type == "choice") {
        if (value == "") {
            return true;
        } else if (value.indexOf("{}") > -1 || value.indexOf("[]") > -1) {
            return false;
        }

        var values = value.split("[,]");
        for (var i = 0; i < values.length; i++) {
            if (values[i].length > 250 || values[i] == "") {
                return false;
            }

            for (var j = i + 1; j < values.length; j++) {
                if (values[i] == values[j]) {
                    return false;
                }
            }
        }
        return true;
    } else if (type == "fill-in" || type == "long-fill-in") {
        var values = value.split("[,]");
        for (var i = 0; i < values.length; i++) {
            var addLength = 0;
            var langIdx = values[i].indexOf("{lang=");
            if (langIdx > -1) {
                var langIdx2 = values[i].indexOf("}", langIdx + 6);
                if (langIdx > -1 && langIdx2 > -1) {
                    addLength += langIdx2 - langIdx + 1;
                }
            }

            if (pattern == true) {
                var idx = values[i].indexOf("{case_matters=");
                if (idx > -1 && (type == "fill-in" && (langIdx == -1 || langIdx > idx) || type == "long-fill-in")) {
                    var idx2 = values[i].indexOf("}", idx + 14);
                    var matter = values[i].substring(idx + 14, idx2);
                    if (matter != "true" && matter != "false") {
                        return false;
                    } else {
                        addLength += idx2 - idx + 1;
                    }
                }

                idx = values[i].indexOf("{order_matters=");
                if (idx > -1 && (type == "fill-in" && (langIdx == -1 || langIdx > idx) || type == "long-fill-in")) {
                    var idx2 = values[i].indexOf("}", idx + 15);
                    var matter = values[i].substring(idx + 15, idx2);
                    if (matter != "true" && matter != "false") {
                        return false;
                    } else {
                        addLength += idx2 - idx + 1;
                    }
                }
            }
            var maxLength = 250;
            if (type == "long-fill-in") {
                maxLength = 4000;
            }

            if (ApiCheckLangString(values[i], true, maxLength + addLength) != true) {
                return false;
            }
        }

        return true;
    } else if (type == "likert") {
        if (value.indexOf("{}") > -1 || value.indexOf("[]") > -1 || value.indexOf("[.]") > -1) {
            return false;
        }

        return true;
    } else if (type == "matching") {
        if (value.indexOf("{}") > -1 || value.indexOf("[]") > -1) {
            return false;
        }

        var values = value.split("[,]");
        if (values.length == 1) {
            var values2 = value.split("[.]");
            if (values2.length == 1 || values2.length > 2) {
                return false;
            }
            if (values2.length > 1) {
                for (var i = 0; i < values2.length; i++) {
                    if (values2[i] == "") {
                        return false;
                    }
                }
            }
        } else if (values.length > 1) {
            for (var i = 0; i < values.length; i++) {
                if (values[i] == "") {
                    return false;
                }
                var values2 = values[i].split("[.]");
                if (values2.length > 2) {
                    return false;
                }
                if (values2.length > 1) {
                    for (var j = 0; j < values2.length; j++) {
                        if (values2[j] == "" || values2[j].indexOf(".") > -1) {
                            return false;
                        }
                    }
                }
            }
        }

        return true;
    } else if (type == "performance") {
        if (value.indexOf("{}") > -1 || value.indexOf("[]") > -1) {
            return false;
        }

        var values = value.split("[,]");
        if (values.length == 1) {
            if (pattern == true) {
                var idx = value.indexOf("{order_matters=");
                if (idx > -1) {
                    var idx2 = value.indexOf("}", idx + 15);
                    var matter = value.substring(idx + 15, idx2);
                    if (matter != "true" && matter != "false") {
                        return false;
                    }
                }
            }

            var values2 = value.split("[.]");
            if (values2.length > 2) {
                return false;
            }
            if (values2.length > 1) {
                for (var i = 0; i < values2.length; i++) {
                    if (values2[i].indexOf(".") > -1) {
                        return false;
                    }
                }
            }
        } else if (values.length > 1) {
            for (var i = 0; i < values.length; i++) {
                if (values[i] == "") {
                    return false;
                }

                if (pattern == true) {
                    var idx = values[i].indexOf("{order_matters=");
                    if (idx > -1) {
                        var idx2 = values[i].indexOf("}", idx + 15);
                        var matter = values[i].substring(idx + 15, idx2);
                        if (matter != "true" && matter != "false") {
                            return false;
                        }
                    }
                }

                var values2 = values[i].split("[.]");
                if (values2.length > 2) {
                    return false;
                }
                if (values2.length > 1) {
                    for (var j = 0; j < values2.length; j++) {
                        if (values2[j].indexOf(".") > -1) {
                            return false;
                        }
                    }
                }

            }
        }

        return true;
    } else if (type == "sequencing") {
        if (value.indexOf("{}") > -1 || value.indexOf("[]") > -1) {
            return false;
        }
        var values = value.split("[,]");
        if (values.length == 0) {
            return false;
        }

        if (value.lastIndexOf("[,]") == value.length - 3) {
            return false;
        }

        if (!(values.length == 1 && values[0].length == 0)) {
            for (var i = 0; i < values.length; i++) {
                if (values[i] == "" || values[i].indexOf("[.]") > -1) {
                    return false;
                }
            }
        } else {
            return false;
        }

        return true;
    } else if (type == "numeric") {
        var values = value.split("[:]");
        if (pattern == false && values.length > 1) {
            return false;
        }

        if (values.length == 1) {
            if (ApiIsFloatValue(value) != true) {
                return false;
            }
        } else if (values.length == 2) {
            var min = values[0];
            var max = values[1];
            if (min != "" && ApiIsFloatValue(min) != true) {
                return false;
            }
            if (min != "" && ApiIsFloatValue(max) != true) {
                return false;
            }
            if (min != "" && max != "" && parseFloat(min) > parseFloat(max)) {
                return false;
            }
        } else {
            return false;
        }
        return true;
    } else if (type == "other") {
        if (value.length <= 4000) {
            return true;
        }
    }

    return false;
}


/**
 * Response choice 형식에 이전에 같은 pattern이 있는지 체크
 */
function ApiCheckResChoiceExist(value, interactionsResList) {
    for (var i = 0; i < interactionsResList.length; i++) {
        var resDTO = interactionsResList[i];
        if (resDTO.pattern == value) {
            return false;
        }
    }
    return true;
}