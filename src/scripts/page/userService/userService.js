/**
 * Created by luomingzhong on 2015/5/4.
 * 这个是登录代码
 */
(function () {
    'use strict';
    var elementObject = {};
    elementObject.submitButton = $("#submit");
    elementObject.adviceText = $("#advice");
    elementObject.errorText = $('.ycm-form-error');//错误信息提示
    var errorTextConfig = {
        text: {
           empty:"回复信息不能为空！",
            errorRule:"回复信息字数至少为15个字符！"
        }
    };
    var Advice = (function () {
        var Advice = {};
        //验证手机号
        Advice.checkText = function (text) {
            var textValue = $.trim(text.val());
            if (textValue.length>14) {
                return true;
            }
            else if(textValue.length===0)
                return "empty";
            else
               return false;
        };

        //submit 提交动作
        Advice.submit = function (e) {
            e.preventDefault();
            var errorArray = [];
            errorArray[0] = [];
            errorArray[1] = [];
            var checkTextValue = this.checkText(elementObject.adviceText);

            //结果正确
            if (checkTextValue === true) {
                //传输数据 ajax
                this.ajaxSend();
            }

            //结果错误
            else {


                if (checkTextValue === "empty") {
                    errorArray[0].push(elementObject.adviceText);
                    errorArray[1].push(errorTextConfig.text.empty);

                }
                if (checkTextValue === false) {
                    errorArray[0].push(elementObject.adviceText);
                    errorArray[1].push(errorTextConfig.text.errorRule);

                }

                this.showErrorText(errorArray);
                this.errorInputAnimate(errorArray);
            }
        };

        Advice.ajaxSend = function () {
            elementObject.adviceText.blur();
            window.scrollTo(0, 0);
            this.clearErrorText();
            loading.show();
            $.ajax({
                url: window._globalV.reqUrl,
                data: {
                    cmd: 10030,
                    token:getCookie('token'),
                    dataPacket: {
                        data: Advice.informationIntegrated(elementObject)
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
                    alert("意见提交成功！");
                    location.href = 'userIndent.html';
                }
                //信息错误失败
                if (result.req === false) {
                    elementObject.errorText.text(result.msg);
                }
            });
        };

        //显示错误信息
        Advice.showErrorText = function (errorTextArray) {
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
        Advice.clearErrorText = function () {
            elementObject.errorText.text("");
        };

        //错误的输入框聚焦
        Advice.errorInputAnimate = function (errorTextArray) {
            var i = 0,
                length = errorTextArray[0].length;

            for (i; i < length; i += 1) {
                this.warningShow(errorTextArray[0][i]);
                break;
            }
        };

        //显示红线以及警告标志
        Advice.warningShow = function (elmentObject) {
            elmentObject.addClass("errorInput");
        };

        //取消红线以及警告标志
        Advice.clearWaringShow = function (elementObject) {
            elementObject.removeClass("errorInput");
        };
        //整合信息为json格式的字符串
        Advice.informationIntegrated = function (elementObject) {
            var message = {};
            message.text = $.trim(elementObject.adviceText.val());
            return message;
        };
        return Advice;
    }());

//点击提交按钮
    elementObject.submitButton.on("submit", function (e) {
        Advice.submit(e);
    });
    elementObject.adviceText.on('focus', function (e) {
        Advice.clearErrorText();
        Advice.clearWaringShow(elementObject.adviceText);
    });
}());
