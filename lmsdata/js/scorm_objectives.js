/**
 * SCORM Client API Adapter
 * Objectives Data 처리
 */


/**
 * Get Objectives
 */
function ApiGetObjectives(cmiCoreDTO) {
    var result = "";
    var errorCode = "0";
    var parameter = cmiCoreDTO.parameter;
    var objectivesList = cmiCoreDTO.objectivesList;

    // cmi.objectives._children
    if (parameter == "cmi.objectives._children") {
        result = cmiCoreDTO.objectivesChildren;
    }
    // cmi.objectives
    else if (parameter == "cmi.objectives") {
        result = "";
        errorCode = "401";
    }
    // cmi.objectives._count
    else if (parameter == "cmi.objectives._count") {
        result = objectivesList.length;
    } else {
        var nValue = ApiGetNValue(parameter, "cmi.objectives.");
        if (nValue == -1) {
            errorCode = "403";
        } else if (nValue >= objectivesList.length) {
            errorCode = "301";
        } else {
            var cmiObjectivesDTO = objectivesList[nValue];
            var lastParam = ApiGetLastParam(parameter);
            var noParam = false;

            if (!cmiObjectivesDTO) {
                errorCode = "301";
            } else if (parameter.indexOf("score.") > -1) {
                // cmi.objectives.n.score._chindren
                if (lastParam == "_children") {
                    result = cmiCoreDTO.objectivesScoreChildren;
                }
                // cmi.objectives.n.score.scaled
                else if (lastParam == "scaled") {
                    result = cmiObjectivesDTO.scoreScaled;
                    if (parseFloat(result) == -999) {
                        result = "";
                        errorCode = "403";
                    }
                }
                // cmi.objectives.n.score.raw
                else if (lastParam == "raw") {
                    result = cmiObjectivesDTO.scoreRaw;
                }
                // cmi.objectives.n.score.min
                else if (lastParam == "min") {
                    result = cmiObjectivesDTO.scoreMin;
                }
                // cmi.objectives.n.score.max
                else if (lastParam == "max") {
                    result = cmiObjectivesDTO.scoreMax;
                } else {
                    errorCode = "201";
                }
            }
            // cmi.objectives.n.id
            else if (lastParam == "id") {
                result = cmiObjectivesDTO.objId;
            }
            // cmi.objectives.n.success_status
            else if (lastParam == "success_status") {
                result = cmiObjectivesDTO.successStatus;
            }
            // cmi.objectives.n.completion_status
            else if (lastParam == "completion_status") {
                result = cmiObjectivesDTO.completionStatus;
            }
            // cmi.objectives.n.progress_measure
            else if (lastParam == "progress_measure") {
                result = cmiObjectivesDTO.progressMeasure;
            }
            // cmi.objectives.n.description
            else if (lastParam == "description") {
                result = cmiObjectivesDTO.objDescription;
                if (result == null) {
                    result = "";
                    errorCode = "403";
                }
            } else {
                noParam = true;
            }

            if (lastParam != "description" && (result == null || result == "")) {
                errorCode = "403";
                if (noParam == true) {
                    errorCode = "201";
                }
                result = "";
            }
        }

    }

    cmiCoreDTO.result = result;
    cmiCoreDTO.errorCode = errorCode;

    return cmiCoreDTO;
}


/**
 * Set Objectives
 */
function ApiSetObjectives(cmiCoreDTO) {
    var result = "false";
    var errorCode = "0";
    var parameter = cmiCoreDTO.parameter;
    var value = cmiCoreDTO.value;
    var objectivesList = cmiCoreDTO.objectivesList;

    // cmi.objectives._children
    if (parameter == "cmi.objectives._children") {
        errorCode = "404";
    }
    // cmi.objectives._count
    else if (parameter == "cmi.objectives._count") {
        errorCode = "404";
    } else if (parameter == "cmi.objectives") {
        errorCode = "401";
    } else {
        var nValue = ApiGetNValue(parameter, "cmi.objectives.");
        if (nValue == -1) {
            errorCode = "403";
        } else if (nValue > objectivesList.length) {
            errorCode = "351";
        } else {
            var lastParam = ApiGetLastParam(parameter);
            var cmiObjectivesDTO = new Object();

            if (objectivesList.length <= nValue) {
                cmiObjectivesDTO = new Object();
                cmiObjectivesDTO.objNum = nValue;

                cmiObjectivesDTO.objId = "";
                cmiObjectivesDTO.scoreScaled = "";
                cmiObjectivesDTO.scoreRaw = "";
                cmiObjectivesDTO.scoreMin = "";
                cmiObjectivesDTO.scoreMax = "";
                cmiObjectivesDTO.successStatus = "unknown";
                cmiObjectivesDTO.completionStatus = "unknown";
                cmiObjectivesDTO.objDescription = null;
            } else {
                cmiObjectivesDTO = objectivesList[nValue];
                if (!cmiObjectivesDTO) {
                    cmiObjectivesDTO = new Object();
                    cmiObjectivesDTO.objNum = nValue;
                    cmiObjectivesDTO.objId = "";
                    cmiObjectivesDTO.scoreScaled = "";
                    cmiObjectivesDTO.scoreRaw = "";
                    cmiObjectivesDTO.scoreMin = "";
                    cmiObjectivesDTO.scoreMax = "";
                    cmiObjectivesDTO.successStatus = "unknown";
                    cmiObjectivesDTO.completionStatus = "unknown";
                    cmiObjectivesDTO.objDescription = null;
                }

            }

            if (parameter.indexOf("score.") > -1) {
                // cmi.objectives.n.score._chindren
                if (lastParam == "_children") {
                    errorCode = "404";
                } else if (ApiNullToString(cmiObjectivesDTO.objId) == "") {
                    errorCode = "408";
                }
                // cmi.objectives.n.score.scaled
                else if (lastParam == "scaled") {
                    if (ApiIsFloatValue(value) == false) {
                        errorCode = "406";
                    } else if (parseFloat(value) < -1.0 || parseFloat(value) > 1.0) {
                        errorCode = "407";
                    } else {
                        cmiObjectivesDTO.scoreScaled = value;
                        result = "true";
                    }
                }
                // cmi.objectives.n.score.raw
                else if (lastParam == "raw") {
                    if (ApiIsFloatValue(value) == false) {
                        errorCode = "406";
                    } else {
                        cmiObjectivesDTO.scoreRaw = value;
                        result = "true";
                    }
                }
                // cmi.objectives.n.score.min
                else if (lastParam == "min") {
                    if (ApiIsFloatValue(value) == false) {
                        errorCode = "406";
                    } else {
                        cmiObjectivesDTO.scoreMin = value;
                        result = "true";
                    }
                }
                // cmi.objectives.n.score.max
                else if (lastParam == "max") {
                    if (ApiIsFloatValue(value) == false) {
                        errorCode = "406";
                    } else {
                        cmiObjectivesDTO.scoreMax = value;
                        result = "true";
                    }
                } else {
                    errorCode = "201";
                }
            }
            // cmi.objectives.n.id
            else if (lastParam == "id") {
                var isExistId = false;

                // 기존에 ID가 있는지 확인
                if (objectivesList.length > 0) {
                    for (var i = 0; i < objectivesList.length; i++) {
                        var objDTO = objectivesList[i];
                        if (objDTO && objDTO.objNum != nValue && value == objDTO.objId) {
                            isExistId = true;
                            break;
                        }
                    }
                }

                if (isExistId != true && (cmiObjectivesDTO.objId == "" || cmiObjectivesDTO.objId == value)) {
                    if (ApiCheckIdFormat(value) == false) {
                        errorCode = "406";
                    } else {
                        cmiObjectivesDTO.objId = value;
                        result = "true";
                    }
                } else {
                    errorCode = "351";
                }
            }
            // cmi.objectives.n.success_status
            else if (lastParam == "success_status") {
                if (ApiNullToString(cmiObjectivesDTO.objId) == "") {
                    errorCode = "408";
                } else if (ApiCheckSuccessStatus(value) == false) {
                    errorCode = "406";
                } else {
                    cmiObjectivesDTO.successStatus = value;
                    result = "true";
                }
            }
            // cmi.objectives.n.completion_status
            else if (lastParam == "completion_status") {
                if (ApiNullToString(cmiObjectivesDTO.objId) == "") {
                    errorCode = "408";
                } else if (ApiCheckCompletionStatus(value) == false) {
                    errorCode = "406";
                } else {
                    cmiObjectivesDTO.completionStatus = value;
                    result = "true";
                }
            }
            // cmi.objectives.n.progress_measure
            else if (lastParam == "progress_measure") {
                if (ApiIsFloatValue(value) == false) {
                    errorCode = "406";
                } else if (value < 0 || value > 1) {
                    errorCode = "407";
                } else {
                    cmiObjectivesDTO.progressMeasure = value;
                    result = "true";
                }
            }
            // cmi.objectives.n.description
            else if (lastParam == "description") {
                if (ApiNullToString(cmiObjectivesDTO.objId) == "") {
                    errorCode = "408";
                } else {
                    cmiObjectivesDTO.objDescription = value;
                    result = "true";
                }
            } else {
                errorCode = "201";
            }

            //  결과가 성공일때 리스트 추가
            if (result == "true") {
                objectivesList[nValue] = cmiObjectivesDTO;
                cmiCoreDTO.objectivesList = objectivesList;
            }
        }
    }

    cmiCoreDTO.result = result;
    cmiCoreDTO.errorCode = errorCode;

    return cmiCoreDTO;
}