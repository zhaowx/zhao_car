/**
 * Created by luomingzhong on 2015/5/4.
 * 这个是登录代码
 */
(function () {
    'use strict';
    var elementObject = {},
        token = getCookie('token'),
        userInformation = null;
    elementObject.userName = $('#userName');//email
    elementObject.nameReg = /^[a-zA-Z]{6,}$|^[\u4e00-\u9fa5]{2,}$|^([\u4e00-\u9fa5]{2,}.){1,}[\u4e00-\u9fa5]{2,}$/;
    elementObject.submitButton = $("#js_publish");
    elementObject.phoneNumber = $("#phoneNumber");//电话号码
    elementObject.userId = $("#userId");//身份证号码
    elementObject.address = $("#address");//收货地址
    elementObject.postCode = $("#code");//邮编号码
    elementObject.codeReg = /\d{6}/;//验证邮编
    elementObject.errorText = $('.ycm-form-error');//错误信息提示
    elementObject.phoneReg = /^1[3|4|5|8|7][0-9]\d{8}$/;//手机号码
    elementObject.genderVlaue= $('input:radio[name="gender"]:checked').val();
    elementObject.woman =$("#woman");
    elementObject.man = $("#man");

    var errorTextConfig = {
        name: {
            empty: "姓名不能为空！",
            errorRule: "姓名格式不对！"
        },
        userId: {
            empty: "身份证号码不能为空！",
            errorRule: "身份证号码格式不对！"
        },
        phone: {
            empty: "手机号码不能为空！",
            errorRule: "手机号码格式不对！"
        },
        address: {
            empty: "收货地址不能为空！"
        },
        code: {
            empty: "邮编号码不能为空！",
            errorRule: "邮编号码格式不对！"
        }
    };
    var EditUserInformation = (function () {
        var EditUserInformation = {};
        //验证手机号
        EditUserInformation.checkPhone = function (phoneNumber) {
            var phoneValue = $.trim(phoneNumber.val());
            if ((elementObject.phoneReg.test(phoneValue))) {
                return true;
            }
            else if (phoneValue.length === 0) {
                return "empty";
            }
            else {
                return false;
            }
        };

        EditUserInformation.checkUserName = function (userName) {
            var userName = $.trim(userName.val());
            if (userName.length <= 0) {
                return "empty"
            }
            if (elementObject.nameReg.test(userName)) {
                return true;
            }
            return false;
        };

        EditUserInformation.checkUserId = function (userId) {
            var userId = $.trim(userId.val());
            return IdentityCodeValid(userId);
        };

        EditUserInformation.checkAddress = function (adrress) {
            var adrress = $.trim(adrress.val());
            if (adrress.length === 0) {
                return 'empty';
            }
            return true;
        };

        EditUserInformation.checkCode = function (code) {
            var code = $.trim(code.val());
            if (code.length === 0) {
                return 'empty';
            }
            else if (elementObject.codeReg.test(code)) {
                return true;
            }
            else
                return false;

        };
        //submit 提交动作
        EditUserInformation.submit = function (e) {
            e.preventDefault();
            var errorArray = [];
            errorArray[0] = [];
            errorArray[1] = [];
            var returnValueName = this.checkUserName(elementObject.userName),
                returnUserId = this.checkUserId(elementObject.userId),
                returnValueAddress = this.checkAddress(elementObject.address),
                returnValuePhone = this.checkPhone(elementObject.phoneNumber),
                returnValueCode = this.checkCode(elementObject.postCode);

            //结果正确
            if (returnValueName === true &&
                returnUserId === true &&
                returnValueAddress === true &&
                returnValuePhone === true &&
                returnValueCode === true) {
                //传输数据 ajax
                this.ajaxSend();
            }

            //结果错误
            else {

                if (returnValueName === false) {
                    errorArray[0].push(elementObject.userName);
                    errorArray[1].push(errorTextConfig.name.errorRule);
                }
                if (returnValueName === "empty") {
                    errorArray[0].push(elementObject.userName);
                    errorArray[1].push(errorTextConfig.name.empty);
                }
                if (returnValuePhone === false) {
                    errorArray[0].push(elementObject.phoneNumber);
                    errorArray[1].push(errorTextConfig.phone.errorRule);
                }
                if (returnValuePhone === 'empty') {
                    errorArray[0].push(elementObject.phoneNumber);
                    errorArray[1].push(errorTextConfig.phone.empty);
                }
                if (returnUserId === false) {
                    errorArray[0].push(elementObject.userId);
                    errorArray[1].push(errorTextConfig.userId.errorRule);
                }
                if (returnUserId === 'empty') {
                    errorArray[0].push(elementObject.userId);
                    errorArray[1].push(errorTextConfig.userId.empty);
                }
                if (returnValueAddress === 'empty') {
                    errorArray[0].push(elementObject.address);
                    errorArray[1].push(errorTextConfig.address.empty);
                }
                if(returnValueCode === 'empty'){
                    errorArray[0].push(elementObject.postCode);
                    errorArray[1].push(errorTextConfig.code.empty);
                }
                if(returnValueCode === false) {
                    errorArray[0].push(elementObject.postCode);
                    errorArray[1].push(errorTextConfig.code.errorRule);
                }
                this.showErrorText(errorArray);
                this.errorInputAnimate(errorArray);
            }
        };

        EditUserInformation.ajaxSend = function () {
            document.activeElement.blur();
            window.scrollTo(0, 0);
            this.clearErrorText();
            loading.show();
            $.ajax({
                url: window._globalV.reqUrl,//发送的地址
                data: {
                    cmd: 10006,
                    token:token,
                    dataPacket: {
                        data: this.informationIntegrated(elementObject)
                    }
                },
                timeout: window._globalV.ajaxTimeOut,
                dataType: 'jsonp',
                type: 'GET'
            }).done(function (data) {
                var result = data.result;
                loading.hide();
                //data 成功 显示绑定成功
                if (result.req === true) {
                    alert("提交信息成功！");
                    location.href = "userInfomation.html";
                }
                //信息错误失败
                else if (result.req === false) {
                    elementObject.errorText.text(result.msg);
                }
            }).fail(function (data) {
                loading.hide();
                elementObject.errorText.text("提交失败，网络故障，请稍后再试");
            });

        };

        //显示错误信息
        EditUserInformation.showErrorText = function (errorTextArray) {
            var i = 0,
                length = errorTextArray[0].length,
                errorTexts = "";
            for (i; i < length; i += 1) {
                errorTexts += errorTextArray[1][i];
                break;
            }
            elementObject.errorText.text(errorTexts);
        };
        //清除错误信息
        EditUserInformation.clearErrorText = function () {
            elementObject.errorText.text("");
        };

        //错误的输入框聚焦
        EditUserInformation.errorInputAnimate = function (errorTextArray) {
            var i = 0,
                length = errorTextArray[0].length;
            for (i; i < length; i += 1) {
                this.warningShow(errorTextArray[0][i]);
                break;
            }
        };

        //显示红线以及警告标志
        EditUserInformation.warningShow = function (elmentObject) {
            elmentObject.addClass("errorInput");
        };

        //取消红线以及警告标志
        EditUserInformation.clearWaringShow = function (elementObject) {
            elementObject.removeClass("errorInput");
        };
        //整合信息为json格式的字符串
        EditUserInformation.informationIntegrated = function (elementObject) {
            var message = {};
            message.nickname = $.trim(elementObject.userName.val());
            message.gender = $('input:radio[name="gender"]:checked').val();
            message.cert_type ="1";
            message.cert_no = $.trim(elementObject.userId.val());
            message.mobile = $.trim(elementObject.phoneNumber.val());
            message.address = $.trim(elementObject.address.val());
            message.code = $.trim(elementObject.postCode.val());
            alert(message.gender);
            return message;
        };
        return EditUserInformation;
    }());

//点击提交按钮
    elementObject.submitButton.on("click", function (e) {
        EditUserInformation.submit(e);
    });
    elementObject.userId.on('focus', function (e) {
        EditUserInformation.clearErrorText();
        EditUserInformation.clearWaringShow(elementObject.userId);
    });
    elementObject.phoneNumber.on('focus', function (e) {
        EditUserInformation.clearErrorText();
        EditUserInformation.clearWaringShow(elementObject.phoneNumber);
    });
    elementObject.postCode.on('focus', function (e) {
        EditUserInformation.clearErrorText();
        EditUserInformation.clearWaringShow(elementObject.postCode);
    });
    elementObject.userName.on('focus', function (e) {
        EditUserInformation.clearErrorText();
        EditUserInformation.clearWaringShow(elementObject.userName);
    });
    elementObject.address.on('focus', function (e) {
        EditUserInformation.clearErrorText();
        EditUserInformation.clearWaringShow(elementObject.address);
    });
    function getUserInformation(token) {
        $.ajax({
            url: window._globalV.reqUrl,//发送的地址
            data: {
                cmd: 10027,
                token:token,
                dataPacket: {}
            },
            timeout: window._globalV.ajaxTimeOut,
            dataType: 'jsonp',
            type: 'GET'
        }).done(function (data) {
            if (data.result.req === true) {
                userInformation = data.result.data;
                publishUserInformation();
            }
            else if (data.result.req === false) {
                elementObject.errorText.text(data.result.msg)
            }
        }).fail(function () {
            alert("网络异常");
        });
    }

    function publishUserInformation() {
        elementObject.userName.val(userInformation.nickname);
        elementObject.userId.val(userInformation.cert_no);
        elementObject.phoneNumber.val(userInformation.mobile);
        if(userInformation.gender === '0'){
            elementObject.man.attr('checked',"checked");
        }
        else {
            elementObject.woman.attr('checked',"checked");
        }
        elementObject.address.val(userInformation.address);
        elementObject.postCode.val(userInformation.code);
    }

    function IdentityCodeValid(code) {
        var pass = true;
        if (code.length === 0) {
            return "empty";
        }
        var city = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        };


        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
            pass = false;
        }

        else if (!city[code.substr(0, 2)]) {
            pass = false;
        }
        else {
            //18位身份证需要验证最后一位校验位
            if (code.length == 18) {
                code = code.split('');
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if (parity[sum % 11] != code[17]) {
                    pass = false;
                }
            }
        }
        return pass;
    }
    getUserInformation(token);
}());




