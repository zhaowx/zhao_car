/**
 * Created by luomingzhong on 2015/5/4.
 * ����ǵ�¼����
 */
/**
 * Created by creditease on 2014/10/16.
 * @author ������
 * @��Լ���ģʽ��ע�����
 */
var elementObject = {};


elementObject.haveCard = document.querySelectorAll(".Card")[0];//�п�
elementObject.noCard = document.querySelectorAll(".Card")[1];//�޿�

elementObject.iphone = $('#iphoneNumber');//�绰
elementObject.name = $('#peopleName');//����
elementObject.age = document.querySelector("#age");//����
elementObject.city = document.querySelector("#record_city");//���ڳ���
elementObject.submitButton = document.querySelector(".submit");
elementObject.errorText = $('#errorText');//������Ϣ��ʾ


elementObject.showWindow = document.querySelector(".shade");//չ�ִ���
elementObject.upLoadDialog = document.querySelector(".upload");
elementObject.otherDialog = document.querySelector(".other");
elementObject.laterDond = document.querySelector(".laterDond");
elementObject.nowDond = document.querySelector(".nowDond");
elementObject.reguName = /^[a-zA-Z]{6,}$|^[\u4e00-\u9fa5]{2,}$/;//����У�����
elementObject.reguIphone = /^1[3|4|5|8|7][0-9]\d{4,8}$/;//�绰У�����
elementObject.card = 1; //Ĭ�����п�����־λΪ1���޿���־λ0��
elementObject.responseText = document.querySelector(".responseText");
elementObject.trips = document.querySelector(".trips");
elementObject.canSubmit = false;


var errorTextConfig = {
    iphone: {
        empty: "�ֻ����벻��Ϊ�գ�",
        errorRule: "�ֻ����벻���Ϲ���"
    },
    name: {
        empty: "��������Ϊ�գ�",
        errorRule: "���������Ļ�Ӣ�ģ���������2���ַ���Ӣ������6���ַ�����"
    }
};
var AddEventListener = function (element, eventype, callfunc) {
    if (element.addEventListener) {
        element.addEventListener(eventype, callfunc);
    }
    else {
        eventype = "on" + eventype;
        element.attachEvent(eventype, callfunc);
    }
};
var Login = (function () {
    var Login = {};
    //��֤�ֻ���
    Login.checkPhoneNumber = function (iphone) {
        var iphoneValue = $.trim(iphone.val());
        if ((elementObject.reguIphone.test(iphoneValue)) && iphoneValue.length === 11) {
            return true;
        }
        else if (iphoneValue.length === 0) {
            return "empty";
        }
        else {
            return false;
        }
    };
    //�������
    Login.checkChineseName = function (name) {
        var nameText = $.trim(name.val());
        if (nameText.length === 0) {
            return "empty";
        }
        else if (elementObject.reguName.test(nameText)) {
            return true;
        }
        return false;
    };
    //submit �ύ����
    Login.submit = function (e) {
        var errorArray = new Array();
        errorArray[0] = new Array();
        errorArray[1] = new Array();

        e.preventDefault();
        var returnValueName = this.checkChineseName(elementObject.name),
            returnValueIphoneNumber = this.checkPhoneNumber(elementObject.iphone);

        //�����ȷ
        if (returnValueName === true &&
            returnValueIphoneNumber === true) {
            //�������� ajax
            this.ajaxSend();
        }

        //�������
        else {

            if (returnValueName === false) {
                errorArray[0].push(elementObject.name);
                errorArray[1].push(errorTextConfig.name.errorRule);
            }
            if (returnValueName === "empty") {
                errorArray[0].push(elementObject.name);
                errorArray[1].push(errorTextConfig.name.empty);
            }
            if (returnValueIphoneNumber === false) {
                errorArray[0].push(elementObject.iphone);
                errorArray[1].push(errorTextConfig.iphone.errorRule);
            }
            if (returnValueIphoneNumber === "empty") {
                errorArray[0].push(elementObject.iphone);
                errorArray[1].push(errorTextConfig.iphone.empty);
            }
            this.showErrorText(errorArray);
            this.errorInputAnimate(errorArray);
        }
    };

    Login.ajaxSend = function () {
        elementObject.name.blur();
        elementObject.iphone.blur();
        window.scrollTo(0,0);
        this.clearErrorText();
        this.showWindow(elementObject.upLoadDialog);
        $.ajax({
            url: "register.php",//���͵ĵ�ַ
            data: this.informationIntegrated(elementObject),//�����ȥ������
            dataType: 'json',
            Type: 'post',
            success: function (data) {

                Login.closeWindow(elementObject.upLoadDialog);
                //data �ɹ� ��ʾ�󶨳ɹ�
                if (data.status === 200) {
                    // ת�¸�ҳ��

                    elementObject.responseText.innerHTML = data.text;
                    Login.showWindow(elementObject.otherDialog);
                }
                //��Ϣ����ʧ��
                if (data.status === "xxx") {
                    elementObject.responseText.innerHTML = data.text;
                    Login.showWindow(elementObject.otherDialog);
                }
            },
            error: function (data) {
                Login.closeWindow(elementObject.upLoadDialog);
                elementObject.responseText.innerHTML ="�ύʧ�ܣ�������ϣ����Ժ�����"
                Login.showWindow(elementObject.otherDialog);
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
            this.triggerAnimation(errorTextArray[0][i]);
            this.warningShow(errorTextArray[0][i]);
        }
    };


    //ѡ��
    Login.chooseCard = function (elementObject) {
        //������п�
        if (elementObject.card) {
            elementObject.card = 0;

            elementObject.haveCard.classList.remove("checked");
            elementObject.haveCard.classList.add("nochecked");
            elementObject.noCard.classList.add("checked");
            elementObject.noCard.classList.remove("nochecked");
        }
        else if (!elementObject.card) {
            elementObject.card = 1;

            elementObject.haveCard.classList.add("checked");
            elementObject.haveCard.classList.remove("nochecked");
            elementObject.noCard.classList.remove("checked");
            elementObject.noCard.classList.add("nochecked");
        }
    };

    //���ѡ��ť
    Login.tapCard = function (elementObject) {
        this.chooseCard(elementObject);
    };

    //��������
    Login.triggerAnimation = function (elementbject) {
        elementbject.parent(".formLi").addClass("animated shake");
    };

    //ɾ������
    Login.clearAnimation = function (elementbject) {
        elementbject.parent(".formLi").removeClass("animated shake");
    }

    //��ʾ�����Լ������־

    Login.warningShow = function (elmentObject) {
        elmentObject.parent(".formLi").addClass("formLiWarn");
        console.log(elmentObject);
        elmentObject.addClass("notice");
    };
    //ȡ�������Լ������־
    Login.clearWaringShow = function (elementObject) {
        elementObject.parent(".formLi").removeClass("formLiWarn");
        elementObject.removeClass("notice");
    };

    //չ�ִ���
    Login.showWindow = function (element) {
        element.style.display = "block";
        elementObject.showWindow.style.display = "block";
        window.addEventListener("touchmove",Login.stopMove);
    };
    //��ʧ����
    Login.closeWindow = function (element) {
        element.style.display = "none";
        elementObject.showWindow.style.display = "none";
        window.removeEventListener('touchmove',Login.stopMove);
    };

    Login.stopMove = function(e){
        e.preventDefault();
    };
    //
    //������ϢΪjson��ʽ���ַ���
    Login.informationIntegrated = function (elementObject) {
        var message = {};
        message.uname = $.trim(elementObject.name.val);
        message.phone = $.trim(elementObject.iphone.val);
        message.record_city = elementObject.city.value;
        message.age = elementObject.age.value;
        message.card = 1;
        return message;
    };

    Login.showNormalSubmit = function () {
        elementObject.submitButton.classList.add("nomarl");
    };

    Login.cursorBlur = function (elmentObject) {
        if (Login.informationIsEmpty()) {
            elementObject.canSubmit = true;
            Login.showNormalSubmit();
        }
    };

    //��Ϣ�Ƿ�����
    Login.informationComplete = function () {
        var isComplete = (this.checkChineseName(elementObject.name) === true) &&
            (this.checkPhoneNumber(elementObject.iphone) === true);
        return isComplete;
    };
    //��Ϣ�Ƿ�
    Login.informationIsEmpty = function () {
        var isComplete = (this.checkChineseName(elementObject.name)!=="empty") &&
            (this.checkPhoneNumber(elementObject.iphone)!=="empty");
        return isComplete;
    };

    //�����������
    Login.tapLaterDownLoad  = function(){
        elementObject.closeWindow(elementObject.otherDialog);
    };

    Login.fadeInout  = function(){
        elementObject.trips.style.display ="block";
        var opacity=1;
        var fadeOut = setInterval(function(){

            opacity -=0.02;
            if(opacity<=0){
                elementObject.trips.style.display ="none";
                clearInterval(fadeOut);
            }
            elementObject.trips.style.opacity = opacity;
        },50);
    }
    return Login;
}());

//����ύ��ť
AddEventListener(elementObject.submitButton, "touchstart", function (e) {
    if (elementObject.canSubmit) {
        Login.submit(e);
    }
});

elementObject.iphone.on("focus change keyup", function (e) {
    Login.clearWaringShow(elementObject.iphone);
    Login.clearAnimation(elementObject.iphone);
    Login.clearErrorText();
});
elementObject.name.on("focus change keyup", function (e) {
    Login.clearWaringShow(elementObject.name);
    Login.clearAnimation(elementObject.name);
    Login.clearErrorText();
});
AddEventListener(elementObject.haveCard, "click", function (e) {
    Login.chooseCard(elementObject);
});
AddEventListener(elementObject.noCard, "click", function (e) {
    Login.chooseCard(elementObject);
});

elementObject.iphone.on("keyup", function (e) {
    Login.cursorBlur(elementObject.iphone)
});

elementObject.name.on("keyup", function (e) {
    Login.cursorBlur(elementObject.name);
});
$(".formLi").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){
    Login.clearAnimation(elementObject.iphone);
    Login.clearAnimation(elementObject.name);
});
elementObject.submitButton.addEventListener("touchstart",function(){
    if(elementObject.canSubmit){
        elementObject.submitButton.classList.add("nomarlClick");
    }
});
elementObject.submitButton.addEventListener("touchend",function(){
    elementObject.submitButton.classList.remove("nomarlClick");
});

AddEventListener(elementObject.laterDond,'click',function(){
    Login.tapLaterDownLoad();
});



