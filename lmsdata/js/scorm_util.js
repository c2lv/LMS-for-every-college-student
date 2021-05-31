/**
 * SCORM Client API Adapter
 * Utilities
 */


var ApiErrorCode = new Array(
    "0", "101", "102", "103", "104",
    "111", "112", "113", "122", "123",
    "132", "133", "142", "143", "201",
    "301", "351", "391", "401", "402",
    "403", "404", "405", "406", "407",
    "408"
);

var ApiErrorMessage = new Array(
    "No Error",
    "General Exception",
    "General Initialization Error",
    "Already Initialized",
    "Content Instance Terminated",
    "General Termination Failure",
    "Termination Before Initialization",
    "Termination After Termination",
    "Retrieve Data Before Initialization",
    "Retrieve Data After Termination",
    "Store Data Before Initialization",
    "Store Data After Termination",
    "Commit Before Initialization",
    "Commit After Termination",
    "General Argument Error",
    "General Get Failure",
    "General Set Failure",
    "General Commit Failure",
    "Undefined Data Model Element",
    "Unimplemented Data Model Element",
    "Data Model Element Value Not Initialized",
    "Data Model Element Is Read Only",
    "Data Model Element Is Write Only",
    "Data Model Element Type Mismatch",
    "Data Model Element Value Out Of Range",
    "Data Model Dependency Not Established"
);

var ApiDiagnosticCode = new Array(
    "0", "101", "102", "103", "104",
    "111", "112", "113", "122", "123",
    "132", "133", "142", "143", "201",
    "301", "351", "391", "401", "402",
    "403", "404", "405", "406", "407",
    "408", "1000", "1001", "1002", "1003",
    "1004", "1005", "1006", "1007", "1008",
    "2000", "9000"
);

var ApiDiagnosticMessage = new Array(
    "No Error",
    "General Exception",
    "General Initialization Error",
    "Already Initialized",
    "Content Instance Terminated",
    "General Termination Failure",
    "Termination Before Initialization",
    "Termination After Termination",
    "Retrieve Data Before Initialization",
    "Retrieve Data After Termination",
    "Store Data Before Initialization",
    "Store Data After Termination",
    "Commit Before Initialization",
    "Commit After Termination",
    "General Argument Error",
    "General Get Failure",
    "General Set Failure",
    "General Commit Failure",
    "Undefined Data Model Element",
    "Unimplemented Data Model Element",
    "Data Model Element Value Not Initialized",
    "Data Model Element Is Read Only",
    "Data Model Element Is Write Only",
    "Data Model Element Type Mismatch",
    "Data Model Element Value Out Of Range",
    "Data Model Dependency Not Established",
    "Data Model Element does not have Children",
    "Data Model Element does not have Count",
    "Data Model Element does not have Version",
    "Data Model Array Set out of Order",
    "Value Out of Range",
    "No Element Specified",
    "Value is not Unique",
    "Error - Maximum Exceeded",
    "Invalid Argument Error",
    "Data Model Element Is a Keyword",
    "Request was Invalid"
);


/**
 * parameter의 첫번째 문자열 구하기 (cmi 제외)
 */
function ApiGetFirstParam(parameter) {
    var result = "";

    if (parameter != null) {
        var idx = parameter.indexOf(".");
        if (idx > 0) {
            var idx2 = parameter.indexOf(".", idx + 1);
            if (idx2 > 0) {
                result = parameter.substring(idx + 1, idx2);
            } else {
                result = parameter.substring(idx + 1);
            }
        } else {
            result = parameter;
        }
    }

    return result;
}


/**
 * parameter의 마지막 문자열 구하기
 */
function ApiGetLastParam(parameter) {
    var result = "";

    if (parameter != null) {
        var idx = parameter.lastIndexOf(".");
        if (idx > 0) {
            result = parameter.substring(idx + 1);
        } else {
            result = parameter;
        }
    }

    return result;
}


/**
 * parameter에 n값 구하기
 */
function ApiGetNValue(parameter, idxStr) {
    var nValue = -1;
    var nValueStr = "";
    var idx = idxStr.length;
    var nIdx = 0;

    if (idx >= parameter || parameter.indexOf(idxStr) < 0) {
        return nValue;
    }

    while (parameter.substring(idx + nIdx, idx + nIdx + 1) != ".") {
        nValueStr = nValueStr + parameter.substring(idx + nIdx, idx + nIdx + 1);
        nIdx = nIdx + 1;
    }

    if (nValueStr.length > 1 && nValueStr.indexOf("0") == 0) {
        nValue = -2;
    } else if (ApiIsIntegerValue(nValueStr)) {
        nValue = parseInt(nValueStr);
    }


    return nValue;
}


/**
 * 문자열의 값이 정수형인지 확인
 */
function ApiIsIntegerValue(value) {
    var reg = RegExp(/^[\+-]?[0-9]*[0-9]$/);
    if (reg.test(value)) {
        return true;
    }

    return false;
}


/**
 * 문자열의 값이 실수형인지 확인
 */
function ApiIsFloatValue(value) {
    var reg = RegExp(/^[\+-]?[0-9]*[.]?[0-9]*[0-9]$/);

    if (reg.test(value)) {
        return true;
    }

    return false;
}


/**
 * null을 공백으로 변경
 */
function ApiNullToString(value) {
    if (value == null) {
        return "";
    }
    return value;
}


/**
 * 두개의 Time 더하기
 */
function ApiAddTime(iTimeOne, iTimeTwo) {
    if (iTimeOne == null) {
        iTimeOne = "PT0H0M0S";
    }
    var mTimeString = null;

    var mYear1 = 0;
    var mMonth1 = 0;
    var mDay1 = 0;
    var mHour1 = 0;
    var mMinute1 = 0;
    var mSecond1 = 0;

    var mYear2 = 0;
    var mMonth2 = 0;
    var mDay2 = 0;
    var mHour2 = 0;
    var mMinute2 = 0;
    var mSecond2 = 0;

    var multiple = 1;

    var mFirstTime = new Array(0, 0, 0, 0, 0, 0, 0);
    var mSecondTime = new Array(0, 0, 0, 0, 0, 0, 0);

    ApiTimeStringParse(iTimeOne, mFirstTime);
    ApiTimeStringParse(iTimeTwo, mSecondTime);

    // add first and second time arrays  
    for (var i = 0; i < 7; i++) {
        if (i == 6) {
            mFirstTime[i] += mSecondTime[i];
            if (mFirstTime[i] > 10 && (mFirstTime[i] % 10) == 0) {
                mFirstTime[i] = mFirstTime[i] / 10;
            }
        } else {
            mFirstTime[i] += mSecondTime[i];
        }
    }

    // adjust seconds, minutes, hours, and days if addition
    // results in too large a number
    if (mFirstTime[6] > 99) {
        multiple = mFirstTime[6] / 100;
        mFirstTime[6] = mFirstTime[6] % 100;
        mFirstTime[5] += parseInt(multiple);
    }

    if (mFirstTime[5] > 59) {
        multiple = (mFirstTime[5] / 60);
        mFirstTime[5] = mFirstTime[5] % 60;
        mFirstTime[4] += parseInt(multiple);
    }
    if (mFirstTime[4] > 59) {
        multiple = mFirstTime[4] / 60;
        mFirstTime[4] = mFirstTime[4] % 60;
        mFirstTime[3] += parseInt(multiple);
    }

    if (mFirstTime[3] > 23) {
        multiple = mFirstTime[3] / 24;
        mFirstTime[3] = mFirstTime[3] % 24;
        mFirstTime[2] += parseInt(multiple);
    }

    // create the new timeInterval string
    mTimeString = "P";
    if (mFirstTime[0] != 0) {
        mTimeString += mFirstTime[0];
        mTimeString += "Y";
    }
    if (mFirstTime[1] != 0) {
        mTimeString += mFirstTime[1];
        mTimeString += "M";
    }

    if (mFirstTime[2] != 0) {
        mTimeString += mFirstTime[2];
        mTimeString += "D";
    }

    if ((mFirstTime[3] != 0) || (mFirstTime[4] != 0) || (mFirstTime[5] != 0) || (mFirstTime[6] != 0)) {
        mTimeString += "T";
    }

    if (mFirstTime[3] != 0) {
        mTimeString += mFirstTime[3];
        mTimeString += "H";
    }

    if (mFirstTime[4] != 0) {
        mTimeString += mFirstTime[4];
        mTimeString += "M";
    }

    if (mFirstTime[5] != 0) {
        mTimeString += mFirstTime[5];
    }

    if (mFirstTime[6] != 0) {
        if (mFirstTime[5] == 0) {
            mTimeString += "0";
        }
        mTimeString += ".";
        mTimeString += mFirstTime[6];
    }

    if ((mFirstTime[5] != 0) || (mFirstTime[6] != 0)) {
        mTimeString += "S";
    }

    return mTimeString;
}


/**
 * 시간 문자열 분리
 */
function ApiTimeStringParse(iTime, ioArray) {
    var mInitArray = new Array();
    var mTempArray2 = new Array("0", "0", "0");
    var mDate = "0";
    var mTime = "0";

    if (iTime == null) {
        return;
    }

    if ((iTime.length == 1) || (iTime.indexOf("P") == -1)) {
        return;
    }

    mInitArray = iTime.split("P");

    if (mInitArray[1].indexOf("T") != -1) {
        mTempArray2 = mInitArray[1].split("T");
        mDate = mTempArray2[0];
        mTime = mTempArray2[1];
    } else {
        mDate = mInitArray[1];
    }

    // Y is present so get year
    if (mDate.indexOf("Y") != -1) {
        mInitArray = mDate.split("Y");
        ioArray[0] = ApiTimeIntValue(mInitArray[0]);
    } else {
        mInitArray[1] = mDate;
    }

    // M is present so get month
    if (mDate.indexOf("M") != -1) {
        mTempArray2 = mInitArray[1].split("M");
        ioArray[1] = ApiTimeIntValue(mTempArray2[0]);
    } else {
        if (mInitArray.length != 2) {
            mTempArray2[1] = "";
        } else {
            mTempArray2[1] = mInitArray[1];
        }
    }

    // D is present so get day
    if (mDate.indexOf("D") != -1) {
        mInitArray = mTempArray2[1].split("D");
        ioArray[2] = ApiTimeIntValue(mInitArray[0]);
    } else {
        mInitArray = new Array(2);
    }

    // if string has time portion
    if (mTime != "0") {
        // H is present so get hour
        if (mTime.indexOf("H") != -1) {
            mInitArray = mTime.split("H");
            ioArray[3] = ApiTimeIntValue(mInitArray[0]);
        } else {
            mInitArray[1] = mTime;
        }

        // M is present so get minute
        if (mTime.indexOf("M") != -1) {
            mTempArray2 = mInitArray[1].split("M");
            ioArray[4] = ApiTimeIntValue(mTempArray2[0]);
        } else {
            if (mInitArray.length != 2) {
                mTempArray2[1] = "";
            } else {
                mTempArray2[1] = mInitArray[1];
            }
        }

        // S is present so get seconds
        if (mTime.indexOf("S") != -1) {
            mInitArray = mTempArray2[1].split("S");

            if (mTime.indexOf(".") != -1) {
                // split requires this regular expression for "."
                mTempArray2 = mInitArray[0].split(".");
                var ms = mTempArray2[1];
                if (ms.length == 1) {
                    ms += "0";
                }

                ioArray[5] = ApiTimeIntValue(mTempArray2[0]);
                ioArray[6] = ApiTimeIntValue(ms);
            } else {
                ioArray[5] = ApiTimeIntValue(mInitArray[0]);
            }
        }
    }
}


/**
 * 시간 문자열을 정수값으로 반환
 */
function ApiTimeIntValue(value) {
    if (value == "0" || value == "") {
        return 0;
    }
    for (var i = 0; i < value.length; i++) {
        if (value.substring(0, 1) == "0") {
            value = value.substring(1);
        } else {
            break;
        }
    }
    return parseInt(value);
}


/**
 * Timestamp 포맷 체크
 */
function ApiCheckTimestampFormat(timestamp) {
    var result = true;

    var reg = /[0-9]/g;
    var formatStr = timestamp.replace(reg, "X");

    if (formatStr == "XXXX" ||
        formatStr == "XXXX-XX" ||
        formatStr == "XXXX-XX-XX" ||
        formatStr == "XXXX-XX-XXTXX" ||
        formatStr == "XXXX-XX-XXTXX:XX" ||
        formatStr == "XXXX-XX-XXTXX:XX:XX" ||
        formatStr == "XXXX-XX-XXTXX:XX:XX.X" ||
        formatStr == "XXXX-XX-XXTXX:XX:XX.XX" ||
        formatStr == "XXXX-XX-XXTXX:XX:XX.XXZ" ||
        formatStr == "XXXX-XX-XXTXX:XX:XX.XX+XX" ||
        formatStr == "XXXX-XX-XXTXX:XX:XX.XX+XX:XX" ||
        formatStr == "XXXX-XX-XXTXX:XX:XX.XX-XX" ||
        formatStr == "XXXX-XX-XXTXX:XX:XX.XX-XX:XX") {

        // 년
        if (formatStr == "XXXX") {
            if (parseInt(timestamp.substring(0, 4)) < 1970 ||
                parseInt(timestamp.substring(0, 4)) >= 2039) {
                result = false;
            }
        }
        // 년-월
        else if (formatStr == "XXXX-XX") { //년-월
            if (parseInt(timestamp.substring(0, 4)) < 1970 ||
                parseInt(timestamp.substring(0, 4)) >= 2039 ||
                parseInt(timestamp.substring(5, 7)) < 1 ||
                parseInt(timestamp.substring(5, 7)) > 12) {
                result = false;
            }
        }
        // 년-월-일
        else if (formatStr == "XXXX-XX-XX") {
            if (parseInt(timestamp.substring(0, 4)) < 1970 ||
                parseInt(timestamp.substring(0, 4)) >= 2039 ||
                parseInt(timestamp.substring(5, 7)) < 1 ||
                parseInt(timestamp.substring(5, 7)) > 12 ||
                parseInt(timestamp.substring(8, 10)) < 1 ||
                parseInt(timestamp.substring(8, 10)) > 31) {
                result = false;
            }
        }
        // 년-월-일T시
        else if (formatStr == "XXXX-XX-XXTXX") {
            if (parseInt(timestamp.substring(0, 4)) < 1970 ||
                parseInt(timestamp.substring(0, 4)) >= 2039 ||
                parseInt(timestamp.substring(5, 7)) < 1 ||
                parseInt(timestamp.substring(5, 7)) > 12 ||
                parseInt(timestamp.substring(8, 10)) < 1 ||
                parseInt(timestamp.substring(8, 10)) > 31 ||
                parseInt(timestamp.substring(11, 13)) < 0 ||
                parseInt(timestamp.substring(11, 13)) > 23) {
                result = false;
            }
        }
        // 년-월-일T시:분
        else if (formatStr == "XXXX-XX-XXTXX:XX") {
            if (parseInt(timestamp.substring(0, 4)) < 1970 ||
                parseInt(timestamp.substring(0, 4)) >= 2039 ||
                parseInt(timestamp.substring(5, 7)) < 1 ||
                parseInt(timestamp.substring(5, 7)) > 12 ||
                parseInt(timestamp.substring(8, 10)) < 1 ||
                parseInt(timestamp.substring(8, 10)) > 31 ||
                parseInt(timestamp.substring(11, 13)) < 0 ||
                parseInt(timestamp.substring(11, 13)) > 23 ||
                parseInt(timestamp.substring(14, 16)) < 0 ||
                parseInt(timestamp.substring(14, 16)) > 59) {
                result = false;
            }
        }
        // 년-월-일T시:분:초
        else if (formatStr == "XXXX-XX-XXTXX:XX:XX") {
            if (parseInt(timestamp.substring(0, 4)) < 1970 ||
                parseInt(timestamp.substring(0, 4)) >= 2039 ||
                parseInt(timestamp.substring(5, 7)) < 1 ||
                parseInt(timestamp.substring(5, 7)) > 12 ||
                parseInt(timestamp.substring(8, 10)) < 1 ||
                parseInt(timestamp.substring(8, 10)) > 31 ||
                parseInt(timestamp.substring(11, 13)) < 0 ||
                parseInt(timestamp.substring(11, 13)) > 23 ||
                parseInt(timestamp.substring(14, 16)) < 0 ||
                parseInt(timestamp.substring(14, 16)) > 59 ||
                parseInt(timestamp.substring(17, 19)) < 0 ||
                parseInt(timestamp.substring(17, 19)) > 59) {
                result = false;
            }
        }
        // 년-월-일T시:분:초
        else if (formatStr == "XXXX-XX-XXTXX:XX:XX.XX+XX" ||
            formatStr == "XXXX-XX-XXTXX:XX:XX.XX-XX") {
            if (parseInt(timestamp.substring(0, 4)) < 1970 ||
                parseInt(timestamp.substring(0, 4)) >= 2039 ||
                parseInt(timestamp.substring(5, 7)) < 1 ||
                parseInt(timestamp.substring(5, 7)) > 12 ||
                parseInt(timestamp.substring(8, 10)) < 1 ||
                parseInt(timestamp.substring(8, 10)) > 31 ||
                parseInt(timestamp.substring(11, 13)) < 0 ||
                parseInt(timestamp.substring(11, 13)) > 23 ||
                parseInt(timestamp.substring(14, 16)) < 0 ||
                parseInt(timestamp.substring(14, 16)) > 59 ||
                parseInt(timestamp.substring(17, 19)) < 0 ||
                parseInt(timestamp.substring(17, 19)) > 59 ||
                parseInt(timestamp.substring(23, 25)) < 0 ||
                parseInt(timestamp.substring(23, 25)) > 23) {
                result = false;
            }
        }
        // 년-월-일T시:분:초
        else if (formatStr == "XXXX-XX-XXTXX:XX:XX.XX+XX:XX" ||
            formatStr == "XXXX-XX-XXTXX:XX:XX.XX-XX:XX") {
            if (parseInt(timestamp.substring(0, 4)) < 1970 ||
                parseInt(timestamp.substring(0, 4)) >= 2039 ||
                parseInt(timestamp.substring(5, 7)) < 1 ||
                parseInt(timestamp.substring(5, 7)) > 12 ||
                parseInt(timestamp.substring(8, 10)) < 1 ||
                parseInt(timestamp.substring(8, 10)) > 31 ||
                parseInt(timestamp.substring(11, 13)) < 0 ||
                parseInt(timestamp.substring(11, 13)) > 23 ||
                parseInt(timestamp.substring(14, 16)) < 0 ||
                parseInt(timestamp.substring(14, 16)) > 59 ||
                parseInt(timestamp.substring(17, 19)) < 0 ||
                parseInt(timestamp.substring(17, 19)) > 59 ||
                parseInt(timestamp.substring(23, 25)) < 0 ||
                parseInt(timestamp.substring(23, 25)) > 23 ||
                parseInt(timestamp.substring(26, 28)) < 0 ||
                parseInt(timestamp.substring(26, 28)) > 59) {
                result = false;
            }
        }
    } else {
        result = false;
    }
    return result;
}


/**
 * Time 포맷 체크
 */
function ApiCheckTimeFormat(time) {
    var result = true;
    var tempStr = "";
    var subStr = "";
    var existTime = false;
    var existDot = false;

    var year = "";
    var mon = "";
    var day = "";
    var hour = "";
    var min = "";
    var sec1 = "";
    var sec2 = "";

    time = time.toUpperCase();

    if (time.substring(0, 1) == "P") {
        for (var i = 1; i < time.length; i++) {
            subStr = time.substring(i, i + 1);
            if (ApiIsIntegerValue(subStr) == true) {
                tempStr = tempStr + subStr;
            } else {
                if (subStr == "Y") {
                    year = tempStr;
                    tempStr = "";
                } else if (subStr == "M") {
                    if (existTime == false) {
                        mon = tempStr;
                    } else {
                        min = tempStr;
                    }
                    tempStr = "";
                } else if (subStr == "D") {
                    day = tempStr;
                    tempStr = "";
                } else if (subStr == "T") {
                    existTime = true;
                } else if (subStr == "H") {
                    hour = tempStr;
                    tempStr = "";
                    if (existTime == false) {
                        result = false;
                    }
                } else if (subStr == ".") {
                    sec1 = tempStr;
                    tempStr = "";
                    existDot = true;
                    if (existTime == false) {
                        result = false;
                    }
                } else if (subStr == "S") {
                    if (existDot == true) {
                        sec2 = tempStr;
                    } else {
                        sec1 = tempStr;
                    }
                    tempStr = "";
                    if (existTime == false) {
                        result = false;
                    }
                } else {
                    result = false;
                }
            }
        }

        if (existTime == true && hour == "" && min == "" && sec1 == "" && sec2 == "") {
            result = false;
        }
        if (existDot == true && sec1 == "" && sec2 == "") {
            result = false;
        }
    } else {
        result = false;
    }

    return result;
}


/**
 * ID 형식 체크
 */
function ApiCheckIdFormat(value) {
    var result = true;

    var urnIdx = value.indexOf("urn:");
    if (value.length == 0 || value.length > 4000) {
        result = false;
    } else if (urnIdx == 0) {
        if (value == "urn:" || value.indexOf(" ") > -1) {
            result = false;
        }
    }

    return result;
}

/**
 * Describes the set of all 2 and 3 character country codes and their 
 * corresponding 3 digit country code.
 */
var ApiISOCountries = "" +
    ",AD.020AND,AE.784ARE,AF.004AFG,AG.028ATG,AI.660AIA,AM.051ARM,AN.530ANT" +
    ",AO.024AGO,AQ.010ATA,AR.032ARG,AT.040AUT,AU,036AUS,AZ.031AZE,AL.008ALB" +
    ",AS.016ASM,AW.533ABW,BA.070BIH,BI.108BDI,BB.052BRB,BE.056BEL,BF.854BFA" +
    ",BG.100BGR,BH.048BHR,BS.044BHS,BJ.204BEN,BM.060BMU,BN.096BRN,BO.068BOL" +
    ",BR.076BRA,BD.050BGD,BT.064BTN,BV.074BVT,BW.072BWA,BY.112BLR,BZ.084BLZ" +
    ",CA.124CAN,CC.166CCK,CD.180COD,CF.140CAF,CG.178COG,CH.756CHE,CI.384CIV" +
    ",CK.184COK,CL.152CHL,CM.120CMR,CN.156CHN,CO.170COL,CR.188CRI,CU.192CUB" +
    ",CV.132CPV,CX.162CXR,CY.196CYP,CZ.203CZE,DE.276DEU,DJ.262DJI,DK.208DNK" +
    ",DM.212DMA,DO.214DOM,DZ.012DZA,EC.218ECU,EE.233EST,EG.818EGY,EH.732ESH" +
    ",ER.232ERI,ES.724ESP,ET.231ETH,FI.246FIN,FJ.242FJI,FK.238FLK,FM.583FSM" +
    ",FO.234FRO,FR.250FRA,FX.249FXX,GA.266GAB,GB.826GBR,GD.308GRD,GE.268GEO" +
    ",GF.254GUF,GH.288GHA,GI.292GIB,GL.304GRL,GM.270GMB,GN.324GIN,GP.312GLP" +
    ",GQ.226GNQ,GR.300GRC,GS.239SGS,GT.320GTM,GU.316GUM,GW.624GNB,GY.328GUY" +
    ",HK.344HKG,HM.334HMD,HN.340HND,HR.191HRV,HT.332HTI,HU.348HUN,ID.360IDN" +
    ",IE.372IRL,IL.376ISR,IN.356IND,IO.086IOT,IQ.368IRQ,IR.364IRN,IS.352ISL" +
    ",IT.380ITA,JM.388JAM,JO.400JOR,JP.392JPN,KE.404KEN,KG.417KGZ,KH.116KHM" +
    ",KI.296KIR,KM.174COM,KN.659KNA,KP.408PRK,KR.410KOR,KW.414KWT,KY.136CYM" +
    ",KZ.398KAZ,LA.418LAO,LB.422LBN,LC.662LCA,LI.438LIE,LK.144LKA,LR.430LBR" +
    ",LS.426LSO,LT.440LTU,LU.442LUX,LV.428LVA,LY.434LBY,MA.504MAR,MC.492MCO" +
    ",MD.498MDA,MG.450MDG,MH.584MHL,MK.807MKD,ML.466MLI,MM.104MMR,MN.496MNG" +
    ",MO.446MAC,MP.580MNP,MQ.474MTQ,MR.478MRT,MS.500MSR,MT.470MLT,MU.480MUS" +
    ",MV.462MDV,MW.454MWI,MX.484MEX,MY.458MYS,MZ.508MOZ,NA.516NAM,NC.540NCL" +
    ",NE.562NER,NF.574NFK,NG.566NGA,NI.558NIC,NL.528NLD,NO.578NOR,NP.524NPL" +
    ",NR.520NRU,NU.570NIU,NZ.554NZL,OM.512OMN,PA.591PAN,PE.604PER,PF.258PYF" +
    ",PG.598PNG,PH.608PHL,PK.586PAK,PL.616POL,PM.666SPM,PR.630PRI,PS.275PSE" +
    ",PT.620PRT,PW.585PLW,PN.612PCN,PY.600PRY,QA.634QAT,RE.638REU,RO.642ROU" +
    ",RU.643RUS,RW.646RWA,SA.682SAU,SB.090SLB,SC.690SYC,SD.736SDN,SE.752SWE" +
    ",SG.702SGP,SH.654SHN,SI.705SVN,SJ.744SJM,SK.703SVK,SL.694SLE,SM.674SMR" +
    ",SN.686SEN,SO.706SOM,SR.740SUR,ST.678STP,SV.222SLV,SY.760SYR,SZ.748SWZ" +
    ",TC.796TCA,TD.148TCD,TF.260ATF,TG.768TGO,TH.764THA,TJ.762TJK,TL.626TLS" +
    ",TK.772TKL,TM.795TKM,TN.788TUN,TO.776TON,TR.792TUR,TT.780TTO,TV.798TUV" +
    ",TW.158TWN,TZ.834TZA,UA.804UKR,UG.800UGA,UM.581UMI,US.840USA,UY.858URY" +
    ",UZ.860UZB,VA.336VAT,VC.670VCT,VE.862VEN,VG.092VGB,VI.850VIR,VN.704VNM" +
    ",VU.548VUT,WF.876WLF,WS.882WSM,YE.887YEM,YT.175MYT,YU.891YUG,ZA.710ZAF" +
    ",ZM.894ZMB,ZW.716ZWE,";

/**
 * Describes the set of valid 2 and 3 character language codes.
 */
var ApiISOLanguages = "" +
    ",aaaar,ababk,aeave,afafr,akaka,amamh,anarg,arara,asasm,avava,ayaym,azaze" +
    ",babak,bebel,bgbul,bhbih,bibis,bmbam,bnben,bobod,brbre,bsbos,cacat,ceche" +
    ",chcha,cocos,csces,crcre,cuchu,cvchv,cycym,dadan,dedeu,dvdiv,dzdzo,eeewe" +
    ",elell,eneng,eoepo,esspa,etest,eueus,fafas,ffful,fifin,fjfij,fofao,frfra" +
    ",fyfry,gagle,gdgla,glglg,gngrn,guguj,gvglv,hahau,heheb,hihin,hrhrv,hthat" +
    ",hohmo,huhun,hyhye,hzher,iaina,idind,ieile,igibo,iiiii,ikipk,ioido" +
    ",iuiku,jajpn,jvjav,kakat,kgkon,kikik,kjkua,kkkaz,klkal,isisl,itita,kmkhm" +
    ",knkan,kokor,krkau,kskas,kukur,kvkom,kwcor,kykir,lalat,lbltz,lilim,lglug" +
    ",lnlin,lolao,ltlit,lulub,lvlav,mgmlg,mhmah,mimri,mkmkd,mlmal,mnmon,momol" +
    ",mrmar,msmsa,mtmlt,mymya,nanau,nbnob,ndnde,nenep,ngndo,nlnld,nnnno,nonor" +
    ",nrnbl,nvnav,nynya,ococi,ojoji,omorm,orori,ososs,papan,pipli,plpol,pspus" +
    ",ptpor,quque,rmroh,rnrun,roron,rurus,rwkin,sasan,scsrd,sesme,sdsnd,sgsag" +
    ",sisin,skslk,slslv,smsmo,snsna,sosom,sqsqi,srsrp,ssssw,stsot,susun,svswe" +
    ",swswa,tatam,tetel,tgtgk,ththa,titir,tktuk,tltgl,tntsn,toton,trtur,tstso" +
    ",tttat,twtwi,tytah,uguig,ukukr,ururd,uzuzb,veven,vivie,vovol,wawln,wowol" +
    ",xhxho,yiyid,yoyor,zazha,zhzho,zuzul,";

/**
 * Describes the set of valid 3 character language codes
 */
var ApiISOExLanguages = "" +
    "ace,ach,ada,ady,afa,afh,akk,alb,ale,alg,ang,apa,arc,arm,arn,arp,art,arw," +
    "ast,ath,aus,awa,bad,bai,bal,ban,baq,bas,bat,bej,bem,ber,bho,bik,bin,bla," +
    "bnt,bra,btk,bua,bug,bur,byn,cad,cai,car,cau,ceb,cel,chb,chg,chi,chk,chm," +
    "chn,cho,chp,chr,chy,cmc,cop,cpe,cpf,cpp,crh,crp,csb,cus,cze,dak,dar,day," +
    "del,den,dgr,din,doi,dsb,dra,dua,dum,dut,dyu,efi,egy,eka,elx,enm,ewo,fan," +
    "fat,fiu,fon,fre,frm,fro,fur,gaa,gay,gba,gem,geo,ger,gez,gil,gmh,goh,gon," +
    "gor,got,grb,grc,gre,gwi,hai,haw,hil,him,hit,hmn,hsb,hup,iba,ice,ijo,ilo," +
    "inc,ine,inh,ira,iro,jbo,jpr,jrb,kaa,kab,kac,kam,kar,kaw,kbd,kha,khi,kho," +
    "kmb,kok,kos,kpe,krc,kro,kru,kum,kut,lad,lah,lam,lez,lol,loz,lua,lui,lun," +
    "luo,lus,mac,mad,mag,mai,mak,man,mao,map,mas,may,mdf,mdr,men,mga,mic,min," +
    "mis,mkh,mnc,mni,mno,moh,mos,mul,mun,mus,mwr,myn,myv,nah,nai,nap,nds,new," +
    "nia,nic,niu,nog,non,nso,nub,nwc,nym,nyn,nyo,nzi,osa,ota,oto,paa,pag,pal," +
    "pam,pap,pau,peo,per,phi,phn,pon,pra,pro,raj,rap,rar,roa,rom,rum,sad,sah," +
    "sai,sal,sam,sas,sat,scc,sco,scr,sel,sem,sga,sgn,shn,sid,sio,sit,sla,slo," +
    "sma,smi,smj,smn,sms,snk,sog,son,srr,ssa,suk,sus,sux,syr,tai,tem,ter,tet," +
    "tib,tig,tiv,tkl,tlh,tli,tmh,tog,tpi,tsi,tum,tup,tut,tvl,tyv,udm,uga,umb," +
    "und,vai,vot,wak,wal,war,was,wel,wen,xal,yao,yap,ypk,zap,zen,znd,zun," +
    "fil,mwl,scn,";

/**
 * Defines the set of IANA approved language codes.
 */
var ApiIANALangauges = "" +
    "i,x,art-lojban,az-arab,az-cyrl,az-latn,cel-gaulish,de-1901,de-1996," +
    "de-at-1901,de-at-1996,de-ch-1901,de-ch-1996,de-de-1901,de-de-1996," +
    "en-boont,en-ge-oed,en-scouse,i-ami,i-bnn,i-default,i-enochian,i-hak," +
    "i-klingon,i-lux,i-mingo,i-navajo,i-pwn,i-tao,i-tay,i-tsu,no-bok," +
    "no-nyn,sgn-be-fr,sgn-be-nl,sgn-br,sgn-ch-de,sgn-co,sgn-de,sgn-dk," +
    "sgn-es,sgn-fr,sgn-gb,sgn-gr,sgn-ie,sgn-it,sgn-jp,sgn-mx," +
    "sgn-nl,sgn-no,sgn-pt,sgn-se,sgn-us,sgn-za,sl-rozaj,sr-cyrl," +
    "sr-latn,uz-cyrl,uz-latn,yi-latn,zh-hans,zh-hant,zh-gan,zh-guoyu," +
    "zh-hakka,zh-min,zh-min-nan,zh-wuu,zh-xiang,";


/**
 * Language 체크
 */
function ApiCheckLanguage(iLang) {
    var lang = iLang;
    var iana = iLang.toLowerCase();
    var curDash = iana.indexOf("-");
    var valid = true;
    var done = false;

    if (curDash != -1) {
        lang = iana.substring(0, curDash);
        var secDash = iLang.indexOf("-", curDash + 1);

        if (secDash != -1) {
            iana = iLang.substring(0, secDash).toLowerCase();
        }
    }

    var toTest = true;
    var idx = -1;

    if (iana.length > 0) {
        iana += ",";
        idx = ApiIANALangauges.indexOf(iana);
    }

    if (idx != -1) {
        done = true;

        if (lang.toLowerCase() == "x") {
            if (iana.length > 1) {
                done = false;
            }
        } else if (lang.toLowerCase() == "i") {
            if (lang.length != 1) {
                valid = false;
            }
        } else if (lang.length == 1) {
            valid = false;
        }
    }

    if (!done && lang.toLowerCase() != "x") {
        if (lang.length == 2) {
            lang = "," + lang;
        } else if (lang.length == 3) {
            var temp = lang.toLowerCase();

            if (temp.charAt(0) == 'q') {
                if (temp.charAt(1) >= 'a' && temp.charAt(1) <= 't') {
                    if (temp.charAt(2) >= 'a' && temp.charAt(2) <= 'z') {
                        toTest = false;
                    }
                }
            }
            if (toTest) {
                lang = lang + ",";
            }
        } else {
            valid = false;

            toTest = false;
            done = true;
        }
    } else {
        toTest = false;
        done = true;
        curDash++;
        lang = iLang.substring(curDash);

        if (lang.length > 0) {
            curDash = lang.indexOf("-");
        } else {
            valid = false;
        }
    }

    if (toTest) {
        lang = lang.toLowerCase();
        var found = ApiISOLanguages.indexOf(lang);

        if (found == -1) {
            found = ApiISOExLanguages.indexOf(lang);

            if (found == -1) {
                valid = false;
                done = true;
            }
        }
    }

    if (curDash == -1) {
        done = true;
    }

    // Test the country code
    if (!done) {
        curDash++;
        var country = iLang.substring(curDash);

        if (country.length > 0) {
            curDash = country.indexOf("-");

            if (curDash != -1) {
                country = country.substring(0, curDash);
            }

            if (country.length == 2) {
                country = "," + country;
            } else if (country.length == 3) {
                valid = false;
                done = true;
            } else if (country.length == 0) {
                done = true;
            } else {
                valid = false;
                done = true;
            }

            if (!done) {
                country = country.toUpperCase();
                var found = ApiISOCountries.indexOf(country);

                if (found == -1) {
                    valid = false;
                    done = true;
                }
            }
        } else {
            valid = false;
            done = true;
        }
    }

    return valid;
}


/**
 * Lang String 체크
 */
function ApiCheckLangString(iValue, mAllowEmpty, maxLength) {
    if (mAllowEmpty == null) {
        mAllowEmpty = false;
    }
    if (maxLength == null) {
        maxLength = 250;
    }
    var valid = true;
    var done = false;
    var curDash = -1;

    if (iValue != null) {
        var langIdx = -1;
        var langIdx2 = -1;

        if (iValue == "") {
            if (!mAllowEmpty) {
                valid = false;
            }

            done = true;
        }

        // Test the lang code
        if (!done) {
            langIdx = iValue.indexOf("{lang=");
            langIdx2 = -1;

            if (langIdx == -1) {
                if (iValue > maxLength) {
                    return false;
                } else {
                    return true;
                }
            } else {
                langIdx2 = iValue.indexOf("}", langIdx + 6);
                if (langIdx2 <= 6) {
                    return false;
                }
            }

            var iLang = iValue.substring(langIdx + 6, langIdx2);
            valid = ApiCheckLanguage(iLang);
            if (valid == false) {
                done = true;
            }
        }

        // Test the SPM
        if (!done) {
            if (langIdx2 > -1) {
                maxLength += langIdx2 + 1;
            }
            if (iValue.length > maxLength) {
                valid = false;
            }
        }
    } else {
        valid = false;
    }

    return valid;
}