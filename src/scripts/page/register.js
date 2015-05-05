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
    elementObject.rePassword = $("#repassword");
    elementObject.checkCode = $("#checkCode");
    elementObject.errorText = $('.ycm-form-error');//������Ϣ��ʾ
    elementObject.regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;//����У��
    elementObject.remember = 1; //�Ƿ��ס;
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
            empty: "���벻��Ϊ�գ�",
            errorRule: "���볤������Ϊ6λ"
        },
        rePassword: {
            empty: "�ظ����벻��Ϊ��",
            errorRule: "���벻һ��"
        }
    };
    var Register = (function () {
        var Register = {};
        //��֤�ֻ���
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
        //submit �ύ����
        Register.submit = function (e) {
            e.preventDefault();
            var errorArray = new Array();
            errorArray[0] = new Array();
            errorArray[1] = new Array();
            var returnValueEmail = this.checkEmail(elementObject.email),
                returnValuePassWord = this.checkPassword(elementObject.password),
                returnValueRePassWord = this.checkRePassWord(elementObject.rePassword),
                returnCheckCode = this.checkCoding(elementObject.checkCode);

            //�����ȷ
            if (returnValueEmail === true &&
                returnValuePassWord === true &&
                returnValueRePassWord === true &&
                returnCheckCode === true) {
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
                url: "Register.php",//���͵ĵ�ַ
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
        //���������Ϣ
        Register.clearErrorText = function () {
            elementObject.errorText.text("");
        }

        //����������۽�
        Register.errorInputAnimate = function (errorTextArray) {
            var i = 0,
                length = errorTextArray[0].length;

            for (i; i < length; i += 1) {
                this.warningShow(errorTextArray[0][i]);
                break;
            }
        };

        //��ʾ�����Լ������־
        Register.warningShow = function (elmentObject) {
            elmentObject.addClass("errorInput");
        };

        //ȡ�������Լ������־
        Register.clearWaringShow = function (elementObject) {
            elementObject.removeClass("errorInput");
        };
        //������ϢΪjson��ʽ���ַ���
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

//����ύ��ť
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




