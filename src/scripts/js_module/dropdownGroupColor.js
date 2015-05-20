/**
 * Created by weixiong.zhao on 2015/5/4.
 */

(function(){
    var  globalVar  =  window._globalV;
    function renderCont() {
        var js_html = ' <div class="panel panel-default">\
        <div class="panel-body" >\
        <span>选择外观/内饰颜色  </span>\
        <div class="btn-group">\
        <button id="js_wgf" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">\
        外观 <span class="caret"></span>\
        </button>\
        <ul class="dropdown-menu" role="menu" id="js_wg"></ul>\
        </div>\
    <div class="btn-group">\
        <button  id="js_nsf" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">\
        内饰 <span class="caret"></span>\
        </button>\
        <ul class="dropdown-menu" role="menu" id="js_ns"></ul>\
    </div>\
    </div>\
    </div>';

        var render = template.compile(js_html);
        var html = render();
        document.getElementById('js_dropdownGroupColor').innerHTML = html;

    }

    function renderUl(ulId,data){
        var js_html = '{{each list as value i}}\
                <li><a data-value="{{value.value_code}}">{{value.name}}</a></li>\
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
        color_id:0,
        //innerColor
        innerColor:0
    }

    function bindEvents(){
        $('#js_wg').delegate('li','click',function(e){
            var $target = $(e.target);
            var text = $target.text();
            $('#js_wgf').text(text);
            var idx = $target.data('value');
            that.color_id  = idx;
            communicationGet({
                color_id:idx,
                innerColor:that.innerColor
            });
        });
        $('#js_ns').delegate('li','click',function(e){
            var $target = $(e.target);
            var text = $target.text();
            $('#js_nsf').text(text);
            var idx = $target.data('value');
            that.innerColor  = idx;
            communicationGet({
                color_id:that.color_id,
                innerColor:idx
            });
        });
    }
    renderCont();

    function communicationGet(data){
        $(document).trigger('changeColorData',data);
    }

    communicationGet()
    $.ajax({
        type: "GET",
        url: globalVar.reqUrl,
        data: {
            cmd:10018

        },
        dataType: "jsonp"
    }).done(function(req){
        if(req.result && req.result.req){
            that.carSource = req.result.data;
        }
        var brand = that.carSource;
        renderUl('js_wg',brand);
        renderUl('js_ns',brand);
        bindEvents();
    })
})();