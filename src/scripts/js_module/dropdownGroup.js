/**
 * Created by weixiong.zhao on 2015/5/4.
 */

(function(){
    var  globalVar  =  window._globalV;
    function renderCont() {
        var js_html = ' <div class="panel panel-default">\
        <div class="panel-body" >\
        <span>选择车型  </span>\
        <div class="btn-group">\
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">\
        品牌 <span class="caret"></span>\
        </button>\
        <ul class="dropdown-menu" role="menu" id="js_pp"></ul>\
        </div>\
    <div class="btn-group">\
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">\
        车系 <span class="caret"></span>\
        </button>\
        <ul class="dropdown-menu" role="menu" id="js_cx"></ul>\
    </div>\
    <div class="btn-group">\
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">\
        车规 <span class="caret"></span>\
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
        brand_id:0,
        model_id:0,
        standard_id:0,
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
            that.brand_id  = idx;
            that.ids.bid = id;
            communicationGet({
                brand_id:idx,
                model_id:0,
                standard_id:0
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
            that.model_id  = idx;
            that.ids.mid = id;
            communicationGet({
                brand_id:that.brand_id,
                model_id:idx,
                standard_id:0
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
            that.standard_id  = idx;
            communicationGet({
                brand_id:that.brand_id,
                model_id:that.model_id,
                standard_id:idx
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

    //communicationGet()
    function autoFilter(){
        var fliters = location.search.substring(1);
        var match = fliters.match(/brand_id=(\d*)&model_id=(\d*)&standard_id=(\d*)/);
        if(match){
            that.brand_id = match[1];
            that.model_id = match[2];
            that.standard_id = match[3];

            communicationGet({
                brand_id:that.brand_id,
                model_id:that.model_id,
                standard_id:that.standard_id
            });

            //根据id进行文字填写
            var brand = that.carSource;
            $.each(brand,function(i,item){
                if(item.brand_id == match[1]){
                    $('#js_pp').prev().text(item.name);
                    var m = item.models;
                    $.each(m,function(ii,itemm){
                        if(itemm.brand_id == match[2]){
                            $('#js_cx').prev().text(itemm.name);
                            var s = itemm.statestype;
                            $.each(s,function(iii,itemmm){
                                if(itemmm.value_code == match[3]){
                                    $('#js_cg').prev().text(itemmm.name);
                                }
                            })
                        }
                    })
                }
            })
        }
    }

    $.ajax({
        type: "GET",
        url: globalVar.reqUrl,
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
        autoFilter();
    })
})();