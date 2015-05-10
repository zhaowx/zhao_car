/**
 * Created by luomingzhong on 2015/5/4.
 * 这个是登录代码
 */
(function () {
    'use strict';
    var elementObject = {};
    elementObject.submitButton = $("#submit");
    elementObject.primaryPassword = $("#primaryPassword");
    elementObject.newPassWord = $("#newPassWord");
    elementObject.errorText = $('.ycm-form-error');//错误信息提示
    elementObject.checkNewPassword = $("#checkNewPassword");
    var errorTextConfig = {
        password: {
            empty: "密码不能为空！"
        },
        newPassWord: {
            empty: "新密码不能为空！",
            errorRule: "新密码长度至少为6位!"
        },
        rePassword: {
            empty: "重复密码不能为空",
            errorRule: "密码不一致"
        }
    };
    var ModifyPwd = (function () {
        var ModifyPwd = {};
        //验证手机号
        ModifyPwd.oldPassWord = function (oldPassword) {
            var oldPasswordValue = $.trim(oldPassword.val());
            if (oldPasswordValue.length>0) {
                return true;
            }
            else
                return "empty";
        };

        ModifyPwd.checkNewPassword = function (password) {
            var passwordValue = $.trim(password.val());
            if (passwordValue.length <= 0) {
                return "empty"
            }
            if (passwordValue.length <= 5) {
                return false;
            }
            return true;
        };
        ModifyPwd.checkRePassWord = function (repassWord) {
            var repasswordValue = $.trim(repassWord.val());
            var passValue = $.trim(elementObject.newPassWord.val());
            if (repasswordValue.length <= 0) {
                return "empty";
            }
            if (passValue !== repasswordValue) {
                return false;
            }
            return true;
        };
        //submit 提交动作
        ModifyPwd.submit = function (e) {
            e.preventDefault();
            var errorArray = [];
            errorArray[0] = [];
            errorArray[1] = [];
            var returnOldPassWord = this.oldPassWord(elementObject.primaryPassword),
                returnValuePassWord = this.checkNewPassword(elementObject.newPassWord),
                returnValueRePassWord = this.checkRePassWord(elementObject.checkNewPassword);

            //结果正确
            if (returnOldPassWord === true &&
                returnValuePassWord === true &&
                returnValueRePassWord === true) {
                //传输数据 ajax
                this.ajaxSend();
            }

            //结果错误
            else {


                if (returnOldPassWord === "empty") {
                    errorArray[0].push(elementObject.primaryPassword);
                    errorArray[1].push(errorTextConfig.password.empty);

                }
                if (returnValuePassWord === "empty") {
                    errorArray[0].push(elementObject.newPassWord);
                    errorArray[1].push(errorTextConfig.newPassWord.empty);

                }
                if (returnValuePassWord === false) {
                    errorArray[0].push(elementObject.newPassWord);
                    errorArray[1].push(errorTextConfig.newPassWord.errorRule);

                }

                if (returnValueRePassWord === "empty") {
                    errorArray[0].push(elementObject.checkNewPassword);
                    errorArray[1].push(errorTextConfig.rePassword.empty);

                }
                if (returnValueRePassWord === false) {
                    errorArray[0].push(elementObject.checkNewPassword);
                    errorArray[1].push(errorTextConfig.rePassword.errorRule);

                }
                this.showErrorText(errorArray);
                this.errorInputAnimate(errorArray);
            }
        };

        ModifyPwd.ajaxSend = function () {
            elementObject.primaryPassword.blur();
            elementObject.newPassWord.blur();
            elementObject.checkNewPassword.blur();
            window.scrollTo(0, 0);
            this.clearErrorText();
            loading.show();
            $.ajax({
                url: window._globalV.reqUrl,
                data: {
                    cmd: 10003,
                    dataPacket: {
                        data: ModifyPwd.informationIntegrated(elementObject)
                    }
                },//传输过去的数据
                timeout: window._globalV.ajaxTimeOut,
                dataType: 'jsonp',
                type: 'GET'
            }).done(function (data) {
                //隐藏加载条
                var result = data.result;
                loading.hide();
                //成功
                if (result.req === true) {
                    alert("密码修改成功");
                }
                //信息错误失败
                if (data.status === "xxx") {
                    elementObject.errorText.text(data.error);
                }
            });
        };

        //显示错误信息
        ModifyPwd.showErrorText = function (errorTextArray) {
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
        ModifyPwd.clearErrorText = function () {
            elementObject.errorText.text("");
        };

        //错误的输入框聚焦
        ModifyPwd.errorInputAnimate = function (errorTextArray) {
            var i = 0,
                length = errorTextArray[0].length;

            for (i; i < length; i += 1) {
                this.warningShow(errorTextArray[0][i]);
                break;
            }
        };

        //显示红线以及警告标志
        ModifyPwd.warningShow = function (elmentObject) {
            elmentObject.addClass("errorInput");
        };

        //取消红线以及警告标志
        ModifyPwd.clearWaringShow = function (elementObject) {
            elementObject.removeClass("errorInput");
        };
        //整合信息为json格式的字符串
        ModifyPwd.informationIntegrated = function (elementObject) {
            var message = {};
            message.oldPwd = $.trim(elementObject.primaryPassword.val());
            message.newPwd = $.trim(elementObject.newPassWord.val());
            message.token  =getCookie('token');
            return message;
        };
        return ModifyPwd;
    }());

//点击提交按钮
    elementObject.submitButton.on("submit", function (e) {
        ModifyPwd.submit(e);
    });
    elementObject.primaryPassword.on('focus', function (e) {
        ModifyPwd.clearErrorText();
        ModifyPwd.clearWaringShow(elementObject.primaryPassword);
    });
    elementObject.newPassWord.on('focus', function (e) {
        ModifyPwd.clearErrorText();
        ModifyPwd.clearWaringShow(elementObject.newPassWord);
    });
    elementObject.checkNewPassword.on('focus', function (e) {
        ModifyPwd.clearErrorText();
        ModifyPwd.clearWaringShow(elementObject.checkNewPassword);
    });
}());
