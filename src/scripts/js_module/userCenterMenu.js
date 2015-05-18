/**
 * @discription 该模版是用户中心的菜单栏
 * **/
(function () {
    'use strict';
    var id = "ycm-user-ListHeaderActive";
    var classStyle = "ycm-user-LinkFocus";
    var data = {
        spanLiveTrade: "",
        spanUserAd: "",
        spanService: "",
        myOrder: "",
        myBuy: "",
        myCar: "",
        userInformation: "",
        modifyPwd: "",
        suggestion: ""
    };
    //获取文件名
    function GetFileName() {
        var url = location.href,
            dir = url.split('/'),
            fileName = dir[dir.length - 1].split(".");
        return fileName[0];
    }

    //初始化数据
    function initData(data) {
        var filename = GetFileName();
        switch (filename) {
            case "userCar":
                data.myCar = classStyle;
                data.spanLiveTrade = id;
                break;
            case "userIndent":
                data.myOrder = classStyle;
                data.spanLiveTrade = id;
                break;
            case "userModifyPassword":
                data.modifyPwd = classStyle;
                data.spanUserAd = id;
                break;
            case "userService":
                data.spanService = id;
                data.suggestion = classStyle;
                break;
            case "userInfomation":
                data.userInfomation = classStyle;
                data.spanUserAd = id;
                break;
            case "userEditInformation":
                data.userInfomation = classStyle;
                data.spanUserAd = id;
                break;
            case "userPublishCar":
                data.myCar = classStyle;
                data.spanLiveTrade = id;
                break;
            case "userWant":
                data.myBuy = classStyle;
                data.spanLiveTrade = id;
                break;
            case "userPublishWantCar":
                data.myBuy = classStyle;
                data.spanLiveTrade = id;
                break;
            default :
                data.myOrder = classStyle;
                data.spanLiveTrade = id;
        }
    }

    function renderCont() {
        var js_html = '<div class="list-group">\
            <span class="list-group-item active" id="{{spanLiveTrade}}">\
            我的交易\
            </span>\
            <a href="userIndent.html" class="list-group-item {{myOrder}}">我的订单</a>\
            <a href="userWant.html" class="list-group-item  {{myBuy}}">我的求购</a>\
            <a href="userCar.html" class="list-group-item {{myCar}}">我的车源</a>\
            <span  class="list-group-item active" id="{{spanUserAd}}">\
            账号管理\
            </span>\
            <a href="userInfomation.html" class="list-group-item {{userInfomation}}">账户信息</a>\
            <a href="userModifyPassword.html" class="list-group-item  {{modifyPwd}}">修改密码</a>\
            <span class="list-group-item active" id="{{spanService}}">服务\
            </span>\
            <a href="userService.html" class="list-group-item {{suggestion}}">投诉建议</a>\
            </div>';

        initData(data);
        var render = template.compile(js_html);
        var html = render(data);
        document.getElementById("jsUserMenu").innerHTML = html;
    }

    renderCont();
}());