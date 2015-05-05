/**
 * Created by luomingzhong on 2015/5/4.
 * 这个是登录代码
 */
(function () {
    'use strict';
    var elementObject = {};
    elementObject.email = $('#email');//email
    elementObject.submitButton = $("#submit");
    elementObject.password = $("#password");
    elementObject.rePassword = $("#repassword");
    elementObject.checkCode = $("#checkCode");
    elementObject.errorText = $('.ycm-form-error');//错误信息提示
    elementObject.regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;//邮箱校验
    elementObject.remember = 1; //是否记住;
    elementObject.checkBox = $("#remember");
    var errorTextConfig = {
        email: {
            empty: "邮箱不能为空！",
            errorRule: "邮箱不符合规则！"
        },
        checkCode: {
            empty: "验证码不能为空！"
        },
        password: {
            empty: "密码不能为空！",
            errorRule: "密码长度至少为6位"
        },
        rePassword: {
            empty: "重复密码不能为空",
            errorRule: "密码不一致"
        }
    };
    var Register = (function () {
        var Register = {};
        //验证手机号
        Register.checkEmail = function (email) {
            var emailValue = $.trim(email.val());
            if ((elementObject.regEmail.test(emailValue))) {
                return true;
            }
            else if (emailValue.length === 0) {
                return "empty";
            }
            else {
                return false;
            }
        };

        Register.checkPassword = function (password) {
            var passwordValue = $.trim(password.val());
            if (passwordValue.length <= 0) {
                return "empty"
            }
            if(passwordValue.length<=6){
                return false;
            }
            return true;
        };
        Register.checkRePassWord = function (repassWord) {
            var repasswordValue = $.trim(repassWord.val());
            var passValue = $.trim(elementObject.password.val());
            if (repasswordValue.length <= 0) {
                return "empty";
            }
            if (passValue !== repasswordValue) {
                return false;
            }
            return true;

        };
        Register.checkCoding = function (checkCode) {
            var code = $.trim(checkCode.val());
            if (code.length <= 0) {
                return "empty"
            }
            return true;
        };
        //submit 提交动作
        Register.submit = function (e) {
            e.preventDefault();
            var errorArray = new Array();
            errorArray[0] = new Array();
            errorArray[1] = new Array();
            var returnValueEmail = this.checkEmail(elementObject.email),
                returnValuePassWord = this.checkPassword(elementObject.password),
                returnValueRePassWord = this.checkRePassWord(elementObject.rePassword),
                returnCheckCode = this.checkCoding(elementObject.checkCode);

            //结果正确
            if (returnValueEmail === true &&
                returnValuePassWord === true &&
                returnValueRePassWord === true &&
                returnCheckCode === true) {
                //传输数据 ajax
                this.ajaxSend();
            }

            //结果错误
            else {

                if (returnValueEmail === false) {
                    errorArray[0].push(elementObject.email);
                    errorArray[1].push(errorTextConfig.email.errorRule);
                }
                if (returnValueEmail === "empty") {
                    errorArray[0].push(elementObject.email);
                    errorArray[1].push(errorTextConfig.email.empty);

                }
                if (returnValuePassWord === "empty") {
                    errorArray[0].push(elementObject.password);
                    errorArray[1].push(errorTextConfig.password.empty);

                }
                if (returnValuePassWord === false) {
                    errorArray[0].push(elementObject.password);
                    errorArray[1].push(errorTextConfig.password.errorRule);

                }

                if (returnValueRePassWord === "empty") {
                    errorArray[0].push(elementObject.rePassword);
                    errorArray[1].push(errorTextConfig.rePassword.empty);

                }
                if (returnValueRePassWord === false) {
                    errorArray[0].push(elementObject.rePassword);
                    errorArray[1].push(errorTextConfig.rePassword.errorRule);

                }
                if (returnCheckCode === "empty") {
                    errorArray[0].push(elementObject.checkCode);
                    errorArray[1].push(errorTextConfig.checkCode.empty);

                }
                this.showErrorText(errorArray);
                this.errorInputAnimate(errorArray);
            }
        };

        Register.ajaxSend = function () {
            elementObject.email.blur();
            elementObject.password.blur();
            window.scrollTo(0, 0);
            this.clearErrorText();
            loading.show();
            $.ajax({
                url: "Register.php",//发送的地址
                data: this.informationIntegrated(elementObject),//传输过去的数据
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    loading.hide();
                    //data 成功 显示绑定成功
                    if (data.status === 200) {
                        // 转下个页面
                    }
                    //信息错误失败
                    if (data.status === "xxx") {
                        elementObject.errorText.text(data.error);
                    }
                },
                error: function (data) {
                    loading.hide();
                    elementObject.errorText.text("提交失败，网络故障，请稍后再试");
                }
            });
        };

        //显示错误信息
        Register.showErrorText = function (errorTextArray) {
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
        Register.clearErrorText = function () {
            elementObject.errorText.text("");
        }

        //错误的输入框聚焦
        Register.errorInputAnimate = function (errorTextArray) {
            var i = 0,
                length = errorTextArray[0].length;

            for (i; i < length; i += 1) {
                this.warningShow(errorTextArray[0][i]);
                break;
            }
        };

        //显示红线以及警告标志
        Register.warningShow = function (elmentObject) {
            elmentObject.addClass("errorInput");
        };

        //取消红线以及警告标志
        Register.clearWaringShow = function (elementObject) {
            elementObject.removeClass("errorInput");
        };
        //整合信息为json格式的字符串
        Register.informationIntegrated = function (elementObject) {
            var message = {};
            message.email = $.trim(elementObject.email.val());
            message.password = $.trim(elementObject.password.val());
            message.checkCode = $.trim(elementObject.checkCode.val());
            message.remember = elementObject.checkBox.attr('checked') ? 1 : 0;
            return message;
        };
        return Register;
    }());

//点击提交按钮
    elementObject.submitButton.on("submit", function (e) {
        Register.submit(e);
    });
    elementObject.password.on('focus', function (e) {
        Register.clearErrorText();
        Register.clearWaringShow(elementObject.password);
    });
    elementObject.rePassword.on('focus', function (e) {
        Register.clearErrorText();
        Register.clearWaringShow(elementObject.rePassword);
    });
    elementObject.email.on('focus', function (e) {
        Register.clearErrorText();
        Register.clearWaringShow(elementObject.email);
    });
    elementObject.checkCode.on('focus', function (e) {
        Register.clearErrorText();
        Register.clearWaringShow(elementObject.checkCode);
    });
}());




