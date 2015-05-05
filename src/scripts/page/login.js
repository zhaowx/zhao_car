/**
 * Created by luomingzhong on 2015/5/4.
 * ����ǵ�¼����
 */
(function () {
    'use strict';
    var elementObject = {};
    elementObject.email = $('#email');//email
    elementObject.submitButton = $("#submit");
    elementObject.password = $("#password");
    elementObject.checkCode = $("#checkCode");
    elementObject.errorText = $('.ycm-form-error');//������Ϣ��ʾ
    elementObject.regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;//����У��
    elementObject.remember = 1; //�Ƿ��ס��
    elementObject.checkBox = $("#remember");
    var errorTextConfig = {
        email: {
            empty: "���䲻��Ϊ�գ�",
            errorRule: "���䲻���Ϲ���"
        },
        checkCode: {
            empty: "��֤�벻��Ϊ�գ�"
        },
        password: {
            empty: "���벻��Ϊ�գ�"
        }
    };
    var Login = (function () {
        var Login = {};
        //��֤�ֻ���
        Login.checkEmail = function (email) {
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

        Login.checkPassword = function (password) {
            var passwordValue = $.trim(password.val());
            if (passwordValue.length <= 0) {
                return "empty"
            }
            return true;
        };

        Login.checkCoding = function (checkCode) {
            var code = $.trim(checkCode.val());
            if (code.length <= 0) {
                return "empty"
            }
            return true;
        };
        //submit �ύ����
        Login.submit = function (e) {
            e.preventDefault();
            var errorArray = new Array();
            errorArray[0] = new Array();
            errorArray[1] = new Array();
            var returnValueEmail = this.checkEmail(elementObject.email),
                returnValuePassWord = this.checkPassword(elementObject.password),
                returnCheckCode = this.checkCoding(elementObject.checkCode);

            //�����ȷ
            if (returnValueEmail === true &&
                returnValuePassWord === true && returnCheckCode === true) {
                //�������� ajax
                this.ajaxSend();
            }

            //�������
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
                if (returnCheckCode === "empty") {
                    errorArray[0].push(elementObject.checkCode);
                    errorArray[1].push(errorTextConfig.checkCode.empty);
                }
                this.showErrorText(errorArray);
                this.errorInputAnimate(errorArray);
            }
        };

        Login.ajaxSend = function () {
            elementObject.email.blur();
            elementObject.password.blur();
            window.scrollTo(0, 0);
            this.clearErrorText();
            loading.show();
            $.ajax({
                url: "login.php",//���͵ĵ�ַ
                data: this.informationIntegrated(elementObject),//�����ȥ������
                dataType: 'json',
                type: 'post',
                success: function (data) {
                    loading.hide();
                    //data �ɹ� ��ʾ�󶨳ɹ�
                    if (data.status === 200) {
                        // ת�¸�ҳ��
                    }
                    //��Ϣ����ʧ��
                    if (data.status === "xxx") {
                        elementObject.errorText.text(data.error);
                    }
                },
                error: function (data) {
                    loading.hide();
                    elementObject.errorText.text("�ύʧ�ܣ�������ϣ����Ժ�����");
                }
            });
        };

        //��ʾ������Ϣ
        Login.showErrorText = function (errorTextArray) {
            var i = 0,
                length = errorTextArray[0].length,
                errorTexts = "";
            for (i; i < length; i += 1) {
                errorTexts += errorTextArray[1][i];
                break;
            }
            elementObject.errorText.text(errorTexts);
        };
        //���������Ϣ
        Login.clearErrorText = function () {
            elementObject.errorText.text("");
        }

        //����������۽�
        Login.errorInputAnimate = function (errorTextArray) {
            var i = 0,
                length = errorTextArray[0].length;
            for (i; i < length; i += 1) {
                this.warningShow(errorTextArray[0][i]);
                break;
            }
        };

        //��ʾ�����Լ������־
        Login.warningShow = function (elmentObject) {
            elmentObject.addClass("errorInput");
        };

        //ȡ�������Լ������־
        Login.clearWaringShow = function (elementObject) {
            elementObject.removeClass("errorInput");
        };
        //������ϢΪjson��ʽ���ַ���
        Login.informationIntegrated = function (elementObject) {
            var message = {};
            message.email = $.trim(elementObject.email.val());
            message.password = $.trim(elementObject.password.val());
            message.checkCode = $.trim(elementObject.checkCode.val());
            message.remember = elementObject.checkBox.attr('checked') ? 1 : 0;
            return message;
        };
        return Login;
    }());

//����ύ��ť
    elementObject.submitButton.on("submit", function (e) {
        Login.submit(e);
    });
    elementObject.password.on('focus', function (e) {
        Login.clearErrorText();
        Login.clearWaringShow(elementObject.password);
    });
    elementObject.email.on('focus', function (e) {
        Login.clearErrorText();
        Login.clearWaringShow(elementObject.email);
    });
    elementObject.checkCode.on('focus', function (e) {
        Login.clearErrorText();
        Login.clearWaringShow(elementObject.checkCode);
    });
}());




