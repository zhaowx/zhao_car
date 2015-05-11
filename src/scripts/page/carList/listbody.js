/**
 * Created by weixiong.zhao on 2015/5/6.
 */

(function(){
    var  globalVar  =  window._globalV;
    function renderCont(data) {
        var js_html = '<table class="table table-hover">\
            <thead><tr>\
                <th>车型</th>\
                <th>车辆信息</th>\
                <th>车辆颜色</th>\
                <th>售卖价格</th>\
                <th>车辆状态</th>\
                <th>发布日期</th>\
            </tr>\
            </thead>\
            <tbody>\
            {{each list as value i}}\
            <tr   data-href="carOne.html?carId={{value.car_id}}">\
                <td>{{value.brandName}} {{value.modelName}} {{value.statesTypeName}}</td>\
                <td>{{value.title}}</td>\
                <td>{{value.colorName}}</td>\
                <td>￥{{value.price}}</td>\
                <td>{{value.locationName}}</td>\
                <td>{{value.publish_time.split(" ")[0]}}</td>\
            </tr>\
            {{/each}}\
            </tbody></table>\
         <nav>\
            <ul class="pager">\
            <li><a href="#" class="js_prevPage">上一页</a></li>\
            <li><a href="#" class="js_nextPage">下一页</a></li>\
            </ul>\
        </nav>';

        var  fabu_html = '<div class="alert alert-info" role="alert">暂时找不到对应车型，您可以登陆之后进行求购！</div>';
        if(!data || data.length==0){
            var render = template.compile(fabu_html);
        }else{
            var render = template.compile(js_html);
        }

        //var html = render({data:[1,2]});
        var html = render({
            list:data
        });

        document.getElementById('js_listTable').innerHTML = html;
        bindEvents();
        jumpPage();
    }


    function bindEvents(){
        $('#js_listTable').delegate('tr','click',function(e){
            //todo 跳转到detail页
            var url = $(e.target).parent().data('href');
            location.href = url;

        })
    }

    var that = {
        dataParams: {
            num: 10,
            pageIndex: 0
        }
    }

    function communicationSet(){
        $(document).bind('changeDPData',function(event,data){
            console.log(data);
            that.dataParams.pageIndex = 0;
            var d = $.extend({},that.dataParams,data);
            that.dataParams = d;
            getData(d);
        })
    }

    function jumpPage(){
        $('.js_prevPage').bind('click',function(){
            var idx = that.dataParams.pageIndex;
            if(idx==0){
                //return  false;
            }
            idx--;
            that.dataParams.pageIndex = idx;
            getData(that.dataParams)
        })
        $('.js_nextPage').bind('click',function(){
            var idx = that.dataParams.pageIndex;
            if(idx==0){
                //return  false;
            }
            idx++;
            that.dataParams.pageIndex = idx;
            getData(that.dataParams)
        })
    }

    function getData(params){
        $.ajax({
            type: "GET",
            url: globalVar.reqUrl,
            data: {
                cmd:10002,
                dataPacket: {
                    data: $.extend({},params,that.dataParams)
                }
            },
            dataType: "jsonp"
        }).done(function(req){
            if(req.result && req.result.req) {

                var data = req.result.data.data;
                renderCont(data);
            }
        })
    }

    function init(){
        if(!$('#js_listTable')){
            return;
        }
        getData();

        communicationSet();
    }

   init();


})();