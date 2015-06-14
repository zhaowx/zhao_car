/**
 * Created by luomingzhong on 2015/5/24.
 */
(function () {
    'use strict';
    function renderContIsPC() {
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
        if (isPC) {
            var render = template.compile(js_html);
            var html = render();
            document.getElementById('phoneOrPC').innerHTML = html;
        }
    };

    function ShowHomeCarlist() {
        var datas = {};
        datas.updateCarlist = null;
        datas.picDefault = null,
            datas.lowPriceCarlist = null;

        var js_html = '<h3>新车首发</h3>\
            <div class="row">\
            {{each updateCarlist as carlist}}\
            <div class="col-md-3  col-sm-6 col-xs-6">\
            <div class="indexCarList">\
            <a href="carOne.html?carId={{carlist.car_id}}"> <img src="{{picDefault}}{{carlist.model_id}}.jpg" alt="" class="img-responsive"/>\
        </a>\
            <div><p>{{carlist.title}}</p>\
            <span class="btn btn-default">{{carlist.statesTypeName}}</span>\
            <span class="btn btn-success">{{carlist.confirmLocationName}}</span>\
            <p>价格:<strong>￥{{carlist.price.split(".")[0]}}</strong></p>\
            <p>发布日期:<strong>{{carlist.create_time.split(" ")[0]}}</strong></p>\
        </div>\
        </div>\
        </div>\
        {{/each}}\
        </div>\
        <h3>低价诱惑</h3>\
        <div class="row">\
        {{each lowPriceCarlist as lowcarlist}}\
        <div class="col-md-3 col-sm-6 col-xs-6">\
            <div class="indexCarList">\
            <a href="carOne.html?carId={{lowcarlist.car_id}}"> <img src="{{picDefault}}{{lowcarlist.model_id}}.jpg" alt="" class="img-responsive"/>\
             </a>\
            <div><p>{{lowcarlist.title}}</p>\
            <span class="btn btn-default">{{lowcarlist.statesTypeName}}</span>\
            <span class="btn btn-success">{{lowcarlist.statesTypeName}}</span>\
            <p>价格:<strong>￥{{lowcarlist.price}}</strong></p>\
            <p>发布日期:<strong>{{lowcarlist.create_time.split(" ")[0]}}</strong></p>\
        </div>\
        </div>\
        </div>\
        {{/each}}\
        </div>';
        //to modify 改为promise 模式最好，防止层层回调。
        $.ajax({
            url: window._globalV.reqUrl,
            data: {
                cmd: 10031
            },
            timeout: window._globalV.ajaxTimeOut,
            dataType: 'jsonp',
            type: 'GET'
        }).done(function (data) {
            var result = data.result.data;
            datas.updateCarlist = result.data;
            datas.picDefault = result.picDefault;
            $.ajax({
                url: window._globalV.reqUrl,
                data: {
                    cmd: 10032
                },
                timeout: window._globalV.ajaxTimeOut,
                dataType: 'jsonp',
                type: 'GET'
            }).done(function (data) {
                var result = data.result.data;
                datas.lowPriceCarlist = result.data;
                var render = template.compile(js_html);
                var html = render(datas);
                document.getElementById('carlist').innerHTML = html;
            }).fail(function () {
            });
        }).fail(function (data) {

        });
    }
    renderContIsPC();
    ShowHomeCarlist();
}());