/**
 * Created by luomingzhong on 2015/5/4.
 * 这个是登录代码
 */
/**
 * Created by creditease on 2014/10/16.
 * @author 罗明忠
 * @针对极速模式的注册表单。
 */
var elementObject = {};


elementObject.haveCard = document.querySelectorAll(".Card")[0];//有卡
elementObject.noCard = document.querySelectorAll(".Card")[1];//无卡

elementObject.iphone = $('#iphoneNumber');//电话
elementObject.name = $('#peopleName');//姓名
elementObject.age = document.querySelector("#age");//年龄
elementObject.city = document.querySelector("#record_city");//所在城市
elementObject.submitButton = document.querySelector(".submit");
elementObject.errorText = $('#errorText');//错误信息提示


elementObject.showWindow = document.querySelector(".shade");//展现窗口
elementObject.upLoadDialog = document.querySelector(".upload");
elementObject.otherDialog = document.querySelector(".other");
elementObject.laterDond = document.querySelector(".laterDond");
elementObject.nowDond = document.querySelector(".nowDond");
elementObject.reguName = /^[a-zA-Z]{6,}$|^[\u4e00-\u9fa5]{2,}$/;//姓名校验规则
elementObject.reguIphone = /^1[3|4|5|8|7][0-9]\d{4,8}$/;//电话校验规则
elementObject.card = 1; //默认是有卡，标志位为1，无卡标志位0；
elementObject.responseText = document.querySelector(".responseText");
elementObject.trips = document.querySelector(".trips");
elementObject.canSubmit = false;


var errorTextConfig = {
    iphone: {
        empty: "手机号码不能为空！",
        errorRule: "手机号码不符合规则！"
    },
    name: {
        empty: "姓名不能为空！",
        errorRule: "请输入中文或英文（中文至少2个字符，英文至少6个字符）！"
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
    //验证手机号
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
    //检测姓名
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
    //submit 提交动作
    Login.submit = function (e) {
        var errorArray = new Array();
        errorArray[0] = new Array();
        errorArray[1] = new Array();

        e.preventDefault();
        var returnValueName = this.checkChineseName(elementObject.name),
            returnValueIphoneNumber = this.checkPhoneNumber(elementObject.iphone);

        //结果正确
        if (returnValueName === true &&
            returnValueIphoneNumber === true) {
            //传输数据 ajax
            this.ajaxSend();
        }

        //结果错误
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
            url: "register.php",//发送的地址
            data: this.informationIntegrated(elementObject),//传输过去的数据
            dataType: 'json',
            Type: 'post',
            success: function (data) {

                Login.closeWindow(elementObject.upLoadDialog);
                //data 成功 显示绑定成功
                if (data.status === 200) {
                    // 转下个页面

                    elementObject.responseText.innerHTML = data.text;
                    Login.showWindow(elementObject.otherDialog);
                }
                //信息错误失败
                if (data.status === "xxx") {
                    elementObject.responseText.innerHTML = data.text;
                    Login.showWindow(elementObject.otherDialog);
                }
            },
            error: function (data) {
                Login.closeWindow(elementObject.upLoadDialog);
                elementObject.responseText.innerHTML ="提交失败，网络故障，请稍后再试"
                Login.showWindow(elementObject.otherDialog);
            }
        });
    };

    //显示错误信息
    Login.showErrorText = function (errorTextArray) {
        var i = 0,
            length = errorTextArray[0].length,
            errorTexts = "";
        for (i; i < length; i += 1) {
            errorTexts += errorTextArray[1][i];
        }
        elementObject.errorText.text(errorTexts);
    };

    //清除错误信息
    Login.clearErrorText = function () {
        elementObject.errorText.text("");
    }

    //错误的输入框聚焦
    Login.errorInputAnimate = function (errorTextArray) {
        var i = 0,
            length = errorTextArray[0].length;

        for (i; i < length; i += 1) {
            this.triggerAnimation(errorTextArray[0][i]);
            this.warningShow(errorTextArray[0][i]);
        }
    };


    //选择卡
    Login.chooseCard = function (elementObject) {
        //如果是有卡
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

    //点击选择按钮
    Login.tapCard = function (elementObject) {
        this.chooseCard(elementObject);
    };

    //触发动画
    Login.triggerAnimation = function (elementbject) {
        elementbject.parent(".formLi").addClass("animated shake");
    };

    //删除动画
    Login.clearAnimation = function (elementbject) {
        elementbject.parent(".formLi").removeClass("animated shake");
    }

    //显示红线以及警告标志

    Login.warningShow = function (elmentObject) {
        elmentObject.parent(".formLi").addClass("formLiWarn");
        console.log(elmentObject);
        elmentObject.addClass("notice");
    };
    //取消红线以及警告标志
    Login.clearWaringShow = function (elementObject) {
        elementObject.parent(".formLi").removeClass("formLiWarn");
        elementObject.removeClass("notice");
    };

    //展现窗口
    Login.showWindow = function (element) {
        element.style.display = "block";
        elementObject.showWindow.style.display = "block";
        window.addEventListener("touchmove",Login.stopMove);
    };
    //消失窗口
    Login.closeWindow = function (element) {
        element.style.display = "none";
        elementObject.showWindow.style.display = "none";
        window.removeEventListener('touchmove',Login.stopMove);
    };

    Login.stopMove = function(e){
        e.preventDefault();
    };
    //
    //整合信息为json格式的字符串
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

    //信息是否完整
    Login.informationComplete = function () {
        var isComplete = (this.checkChineseName(elementObject.name) === true) &&
            (this.checkPhoneNumber(elementObject.iphone) === true);
        return isComplete;
    };
    //信息是否
    Login.informationIsEmpty = function () {
        var isComplete = (this.checkChineseName(elementObject.name)!=="empty") &&
            (this.checkPhoneNumber(elementObject.iphone)!=="empty");
        return isComplete;
    };

    //点击立即下载
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

//点击提交按钮
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



