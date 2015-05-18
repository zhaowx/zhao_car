/**
 * Created by luomingzhong on 2015/5/12.
 */
(function () {
    'use strict';
    var token = getCookie('token');
    var information = {};
    $.ajax({
        url: window._globalV.reqUrl,//发送的地址
        data: {
            cmd: 10027,
            token: token,
            dataPacket: {}
        },
        timeout: window._globalV.ajaxTimeOut,
        dataType: 'jsonp',
        type: 'GET'
    }).done(function (data) {
        if (data.result.req === true) {
            information = data.result.data;
            renderCont();
        }
        else if (data.result.req === false) {
            alert("服务异常，请刷新重试！");
        }
    }).fail(function () {
        alert("网络异常");
    });
    function initData(data) {
        var defaultInformation = "未填写";
        if (!data.nickname) {
            data.nickname = defaultInformation;
        }
        if (data.gender === "0") {
            data.gender = '男';
        }
        if (data.gender === "1") {
            data.gender = '女';
        }
        if (!data.mobile) {
            data.mobile = defaultInformation;
        }
        if (!data.cert_no) {
            data.cert_no = defaultInformation;
        }
    }

    function renderCont() {
        var js_html = '<div class="panel panel-default">\
            <div class="panel-heading">用户信息</div>\
            <div class="panel-body">\
            <h4>用户姓名：<small>{{nickname}}</small></h4>\
        <h4>性别：<small>{{gender}}</small></h4>\
        <h4>身份证号码：<small>{{cert_no}}</small></h4>\
        <h4>注册邮箱：<small>{{login_email}}</small></h4>\
        <h4>联系方式:\
    <small>{{mobile}}</small>\
        </h4>\
        <h4>收货邮编：<small>430525</small></h4>\
        <h4>收货地址：<small>湖南省洞口县高沙镇深塘村白沙组</small></h4>\
        </div>\
        </div>\
        <div class="panel panel-default" name="checkStatus">\
            <div class="panel-heading">用户状态</div>\
            <div class="panel-body">\
            {{if verify_sts == "0"}}\
            <h4>审核状态：<small class="verifying">审核中</small></h4>\
            {{else if verify_sts == "1"}}\
            <h4>审核状态：<small class="verifyPassed">审核通过</small></h4>\
            {{else if verify_sts == "2"}}\
            <h4>审核状态：<small class="verifyNoPassed">审核未通过,请联系客服！</small></h4>\
            {{/if}}\
        </div>\
        </div>';
        initData(information);
        var render = template.compile(js_html);
        var html = render(information);
        document.getElementById('userInformation').innerHTML = html;
    }
}());