/**
 * Created by weixiong.zhao on 2015/5/4.
 */

(function(){
    function renderCont() {
        var js_html = ' <div class="panel panel-default">\
        <div class="panel-body" >\
        <span>选择车型  </span>\
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
                <li><a data-id="{{i}}" data-value="{{value.brand_id || value.value_code}}">{{value.name}}</a></li>\
            {{/each}}';
        var render = template.compile(js_html);
        //var html = render({data:[1,2]});
        var html = render({
            list:data
        });

        document.getElementById(ulId).innerHTML = html;
    }

    var that={
        carSource:{},
        brandId:0,
        moduleId:0,
        seatType:0,
        page:1,
        ids:{
            bid:0,
            mid:0,
            sid:0
        }
    }

    function bindEvents(){
        $('#js_pp').delegate('li','click',function(e){
            var $target = $(e.target);
            var text = $target.text();
            $target.parents('ul').prev().text(text);
            var idx = $target.data('value');
            var id = $target.data('id');
            that.brandId  = idx;
            that.ids.bid = id;
            communicationGet({
                brandId:idx,
                moduleId:0,
                statesType:0
            });
            var data = that.carSource[id].models;
            renderUl('js_cx',data);
            $('#js_cx').prev().html('请选择车系');
        });
        $('#js_cx').delegate('li','click',function(e){
            var $target = $(e.target);
            var text = $target.text();
            $target.parents('ul').prev().text(text);
            var idx = $target.data('value');
            var id = $target.data('id');
            that.modelId  = idx;
            that.ids.mid = id;
            communicationGet({
                brandId:that.brandId,
                moduleId:idx,
                statesType:0
            });
            var data = that.carSource[that.ids.bid].models[id].statestype;
            renderUl('js_cg',data);
            $('#js_cg').prev().html('请选择车规')
        });
        $('#js_cg').delegate('li','click',function(e){
            var $target = $(e.target);
            var text = $target.text();
            $target.parents('ul').prev().text(text);
            var idx = $target.data('value');
            that.moduleId  = idx;
            communicationGet({
                brandId:that.brandId,
                moduleId:that.moduleId,
                statesType:idx
            });
        })
    }
    renderCont();

    function communicationGet(data){
//        $(document).bind('dropdownGroupChange',function(event,data){
//            console.log(data);
//        })
        $(document).trigger('changeDPData',data);
    }

    communicationGet()
    $.ajax({
        type: "GET",
        url: "http://182.254.179.11/buyShop/s1/gateway.php",
        data: {
            cmd:10001//

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