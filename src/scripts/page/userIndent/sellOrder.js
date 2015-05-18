/**
 * Created by weixiong.zhao on 2015/5/6.
 */

(function(){
    var  globalVar  =  window._globalV;

    function renderCont(data,locationData,dd,num) {
        var js_html = '<table class="table table-hover" id="js_tableSell" \
        {{if num<3}}\
        style="margin-bottom:120px;">\
        {{else}}\
        >\
        {{/if}}\
            <thead>\
            <tr>\
                <th>车辆信息</th>\
                <th>车架号</th>\
                <th>售卖价格</th>\
                <th>订单状态</th>\
                <th>车辆状态</th>\
                <th>发布时间</th>\
                <th>审核状态</th>\
            </tr>\
            </thead>\
        <tbody>\
            {{each data as value i}}\
            <tr>\
                <td>\
                        <p>{{value.car[0].brandName}} {{value.car[0].modelName}} {{value.car[0].statesTypeName}}</p>\
                </td>\
                <td>{{value.car[0].vin}}</td>\
                <td>￥{{value.car[0].price.split(".")[0]}}</td>\
                <td>\
                    {{if num-i<2 && i>2}}\
                    <div class="dropup">\
                    {{else}}\
                    <div class="dropdown">\
                    {{/if}}\
                    <div class="btn-group">\
                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">\
                        {{value.stsName}} <span class="caret"></span>\
                        </button>\
                        <ul class="dropdown-menu" role="menu" data-orderid="{{value.order_no}}"  id="js_tableSellOrder">\
                            {{each dd as vv ii}}\
                            <li><a href="#" data-value="{{vv.value_code}}">{{vv.name}}</a></li>\
                            {{/each}}\
                        </ul>\
                    </div>\
                    </div>\
                </td>\
                <td>{{value.car[0].locationName}}</td>\
                <td>{{value.create_time}}</td>\
                <td>{{value.shenheName}}</td>\
            </tr>\
            {{/each}}\
        </tbody>\
        </table>\
        <nav>\
            <ul class="pager">\
            <li><a href="#" class="js_prevPageSell">上一页</a></li>\
            <li><a href="#" class="js_nextPageSell">下一页</a></li>\
            </ul>\
        </nav>';
        var render = template.compile(js_html);
        //var html = render({data:[1,2]});
        var html = render({
            data:data,
            locationData:locationData,
            dd:dd,
            num:data.length
        });

        document.getElementById('sellOrder').innerHTML = html;
        bindEvents();
        jumpPage();
    }

    var that = {
        dataParams: {
            num: 10,
            pageIndex: 0
        },
        countNum:0
    }

    function bindEvents(){
        $('#js_tableSellOrder').delegate('li','click',function(e){
            //todo 跳转到detail页
            var order_no = $(e.target).parents('ul').data('orderid');
            var sts = $(e.target).data('value');
            if(confirm('确认要更改其订单状态？')){
                changeOrderStatus(order_no,sts);
            }

        })
    }

    function changeOrderStatus(order_no,sts){
        $.ajax({
            type: "GET",
            url: globalVar.reqUrl,
            data: {
                cmd:10029,
                token:that.uid,
                dataPacket:{
                    data: {
                        order_no:order_no,
                        sts:sts
                    }
                }
            },
            dataType: "jsonp"
        }).done(function(req){
            if(req.result && req.result.req) {
                location.reload()
            }
        })
    }

    function jumpPage(){
        $('.js_prevPageSell').bind('click',function(){
            var idx = that.dataParams.pageIndex;
            if(idx==0){
                return  false;
            }
            idx--;
            that.dataParams.pageIndex = idx;
            getData(that.dataParams)
        })
        $('.js_nextPageSell').bind('click',function(){
            var idx = that.dataParams.pageIndex;
            idx++;
            if(that.countNum <= idx*that.dataParams.num){
                return  false;
            }
            that.dataParams.pageIndex = idx;
            getData()
        })
    }

    function getData(){
        $.ajax({
            type: "GET",
            url: globalVar.reqUrl,
            data: {
                cmd:10026,
                token:that.uid,
                dataPacket:{
                    data:that.dataParams
                }
            },
            dataType: "jsonp"
        }).done(function(req){
            if(req.result && req.result.req) {

                var data = req.result.data.data;
                var location = req.result.data.locationconfig;
                var dd = req.result.data.stsconfig;
                that.countNum = req.result.data.ct;
                renderCont(data,location,dd);
            }
        })
    }

    function init(){
        that.uid = getCookie('token');
        if(!$('#sellOrder')){
            return;
        }
        getData();
        //jumpPage();
    }

    init();

})();