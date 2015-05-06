/**
 * Created by weixiong.zhao on 2015/5/6.
 */

(function(){
    function renderCont(data) {
        var js_html = '<table class="table table-hover">\
            <thead><tr>\
                <th>车辆品牌</th>\
                <th>车辆信息</th>\
                <th>车辆颜色</th>\
                <th>售卖价格</th>\
                <th>车辆状态</th>\
                <th>发布日期</th>\
            </tr>\
            </thead>\
            <tbody>\
            {{each list as value i}}\
            <tr   data-href="carOne.html?carId={{value.carId}}">\
                <td>{{value.brandName}} {{value.modelName}} {{value.statesTypeName}}</td>\
                <td>{{value.note}}</td>\
                <td>{{value.colorName}}</td>\
                <td>￥{{value.price}}</td>\
                <td>{{value.locationName}}</td>\
                <td>{{value.registration.split(" ")[0]}}</td>\
            </tr>\
            {{/each}}\
            </tbody></table>';
        var render = template.compile(js_html);
        //var html = render({data:[1,2]});
        var html = render({
            list:data
        });

        document.getElementById('js_listTable').innerHTML = html;

    }


    function bindEvents(){
        $('#js_listTable').delegate('tr','click',function(e){
            //todo 跳转到detail页
            var url = $(e.target).parent().data('href');
            location.href = url;

        })
    }

    function getData(){
        $.ajax({
            type: "GET",
            url: "http://182.254.179.11/buyShop/s1/gateway.php",
            data: {
                cmd:10002
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
        bindEvents();
    }

   init();


})();