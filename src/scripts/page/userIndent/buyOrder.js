/**
 * Created by weixiong.zhao on 2015/5/6.
 */

(function(){
    var  globalVar  =  window._globalV;

    function renderCont(data,locationData,num) {
        var js_html = '<table class="table table-hover" id="js_tableSell" \
            <thead>\
            <tr>\
                <th>车辆信息</th>\
                <th>订单号</th>\
                <th>成交金额</th>\
                <th>订单状态</th>\
                <th>车辆状态</th>\
                <th>下单时间</th>\
            </tr>\
            </thead>\
        <tbody>\
            {{each data as value i}}\
            <tr>\
                <td>\
                        <p>{{value.brandName}} {{value.modelName}} {{value.statesTypeName}}</p>\
                        <p>{{value.note}}</p>\
                </td>\
                <td>{{value.vin}}</td>\
                <td>{{value.price}}</td>\
                <td></td>\
                <td>20115-05-02</td>\
                {{if value.visible==1}}\
                <td>已通过</td>\
                {{else}}\
                <td>未通过</td>\
                {{/if}}\
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
            num:data.length
        });

        document.getElementById('buyOrder').innerHTML = html;
        bindEvents();
    }

    var that = {
        dataParams: {
            num: 10,
            pageIndex: 0
        }
    }

    function bindEvents(){

    }
    function jumpPage(){
        $('.js_prevPageBuy').bind('click',function(){
            var idx = that.dataParams.pageIndex;
            if(idx==0){
                return  false;
            }
            idx--;
            that.dataParams.pageIndex = idx;
            getData(that.dataParams)
        })
        $('.js_nextPageBuy').bind('click',function(){
            var idx = that.dataParams.pageIndex;
            if(idx==0){
                return  false;
            }
            idx++;
            that.dataParams.pageIndex = idx;
            getData(that.dataParams)
        })
    }

    function getData(){
        $.ajax({
            type: "GET",
            url: globalVar.reqUrl,
            data: {
                cmd:10016,
                dataPacket:{
                    data: {
                        //num: 1
                    }
                }
            },
            dataType: "jsonp"
        }).done(function(req){
            if(req.result && req.result.req) {

                var data = req.result.data.data;
                var location = req.result.data.locationconfig;
                renderCont(data,location);
            }
        })
    }

    function init(){
        if(!$('#buyOrder')){
            return;
        }
        getData();
        jumpPage();
    }

    init();

})();