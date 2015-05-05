/**
 * Created by weixiong.zhao on 2015/5/4.
 */

(function(){
    function renderCont() {
        var js_html = ' <div class="panel panel-default">\
        <div class="panel-body" >\
        <span>筛选条件  </span>\
        <div class="btn-group">\
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">\
        请选择品牌 <span class="caret"></span>\
        </button>\
        <ul class="dropdown-menu" role="menu" id="js_pp"></ul>\
        </div>\
    <div class="btn-group">\
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">\
        请选择车系 <span class="caret"></span>\
        </button>\
        <ul class="dropdown-menu" role="menu" id="js_cx"></ul>\
    </div>\
    <div class="btn-group">\
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">\
        请选择车规 <span class="caret"></span>\
        </button>\
        <ul class="dropdown-menu" role="menu" id="js_cg"></ul>\
    </div>\
    </div>\
    </div>';

        var render = template.compile(js_html);
        var html = render();
        document.getElementById('js_dropdownGroup').innerHTML = html;

    }

    function renderUl(ulId,data){
        var js_html = '{{each list as value i}}\
                <li><a data-value="{{i}}">{{value.name}}</a></li>\
            {{/each}}';
        var render = template.compile(js_html);
        //var html = render({data:[1,2]});
        var html = render({
            list:data
        });

        document.getElementById(ulId).innerHTML = html;
    }

    function bindEvents(){
        $('#js_pp').delegate('li','click',function(e){
            var idx = $(e.target).data('value');
            that.brandId  = idx;
            var data = that.carSource[idx].models;
            renderUl('js_cx',data);
        });
        $('#js_cx').delegate('li','click',function(e){
            var idx = $(e.target).data('value');
            that.modelId  = idx;
            var data = that.carSource[that.brandId].models[idx].statestype;
            renderUl('js_cg',data)
        });
        $('#js_cg').delegate('li','click',function(e){

        })
    }
    renderCont();
    var that = {
        carSource:{},
        brandId:0,
        modelId:0
    };
    $.ajax({
        type: "GET",
        url: "http://182.254.179.11/buyShop/s1/gateway.php",
        data: {
            cmd:10002//

        },
        dataType: "jsonp"
    }).done(function(req){
        if(req.result && req.result.req){
            that.carSource = req.result.data.configInfo.brand;
        }
        var brand = that.carSource;
        renderUl('js_pp',brand);
        bindEvents();
    })
})();