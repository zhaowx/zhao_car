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
            <h4>用户姓名：{{nickname}}</h4>\
        <h4>性别：{{gender}}</h4>\
        <h4>身份证号码：{{cert_no}}</h4>\
        <h4>注册邮箱：{{login_email}}</h4>\
        <h4>联系方式: {{mobile}}</h4>\
        </div>\
        </div>\
        <div class="panel panel-default" name="checkStatus">\
            <div class="panel-heading">用户状态</div>\
            <div class="panel-body">\
            {{if verify_sts=="0" || verify_sts=="2"}}\
            <div class="alert alert-success" role="alert">审核通过之后才可以进行车源信息和求购信息的发布</div>\
            {{/if}}\
            {{if verify_sts == "0"}}\
            <h4>审核状态：<span class="verifying">审核中</span></h4>\
            {{else if verify_sts == "1"}}\
            <h4>审核状态：<span class="verifyPassed">审核通过</sp></h4>\
            {{else if verify_sts == "2"}}\
            <h4>审核状态：<span class="verifyNoPassed">审核未通过,请联系客服！</sp></h4>\
            {{/if}}\
        </div>\
        </div>';
        initData(information);
        var render = template.compile(js_html);
        var html = render(information);
        document.getElementById('userInformation').innerHTML = html;
    }
}());