/**
 * Created by luomingzhong on 2015/5/24.
 */
(function () {
    'use strict';
    function renderCont() {
        var js_html = '<div id="iphoneList" class="visible-xs">\
            <div class="index-questionContent">\
            <a class="index-questionItem" href="carlist.html">\
            <div class="index-questionLogo index-speed-mode"></div>\
            <i class="index-question-word">在卖车源</i></a>\
        <a class="index-questionItem" href="wantlist.html">\
            <div class="index-questionLogo index-normal-mode"></div>\
            <i class="index-question-word">求购列表</i></a>\
        <a class="index-questionItem index-border-bottom" href="userIndent.html">\
            <div class="index-questionLogo index-check-and-loan"></div>\
            <i class="index-question-word">用户中心</i></a>\
        <a class="index-questionItem" href="">\
            <div class="index-questionLogo index-repayment"></div>\
            <i class="index-question-word">物流信息</i></a>\
        <a class="index-questionItem" href="">\
            <div class="index-questionLogo index-account"></div>\
            <i class="index-question-word">购车流程</i></a>\
        <a class="index-questionItem" href="">\
            <div class="index-questionLogo index-safe-guarantee"></div>\
            <i class="index-question-word">质量保证</i></a>\
        </div>\
        </div>'
        if(isPC){
            var render = template.compile(js_html);
            var html = render();
            document.getElementById('phoneOrPC').innerHTML = html;
        }
    };
    renderCont();
}());