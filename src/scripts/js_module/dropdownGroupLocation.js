/**
 * Created by weixiong.zhao on 2015/5/4.
 */

(function(){
    var  globalVar  =  window._globalV;
    function renderCont() {
        var js_html = ' <div class="panel panel-default">\
        <div class="panel-body" >\
        <span>选择车辆状态  </span>\
        <div class="btn-group">\
        <button id="js_locationf" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">\
        状态 <span class="caret"></span>\
        </button>\
        <ul class="dropdown-menu" role="menu" id="js_location"></ul>\
        </div>\
    </div>\
    </div>';

        var render = template.compile(js_html);
        var html = render();
        document.getElementById('js_dropdownGroupLocation').innerHTML = html;

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
        location_id:0
    }

    function bindEvents(){
        $('#js_location').delegate('li','click',function(e){
            var $target = $(e.target);
            var text = $target.text();
            $('#js_locationf').text(text);
            var idx = $target.data('value');
            that.location_id  = idx;
            communicationGet({
                location_id:idx
            });
        });
    }
    renderCont();

    function communicationGet(data){
        $(document).trigger('changeLocationData',data);
    }

    communicationGet()
    $.ajax({
        type: "GET",
        url: globalVar.reqUrl,
        data: {
            cmd:10020

        },
        dataType: "jsonp"
    }).done(function(req){
        if(req.result && req.result.req){
            that.carSource = req.result.data;
        }
        var brand = that.carSource;
        renderUl('js_location',brand);
        bindEvents();
    })
})();