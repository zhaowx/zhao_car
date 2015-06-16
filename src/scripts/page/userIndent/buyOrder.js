/**
 * Created by weixiong.zhao on 2015/5/6.
 */

(function(){
    var  globalVar  =  window._globalV;

    function renderCont(data,num) {
        var js_html = '<table class="table table-hover" id="js_tableSell" \
            <thead>\
            <tr>\
                <th>车辆信息</th>\
                <th>订单号</th>\
                <th>成交金额</th>\
                <th class="hidden-xs">下单时间</th>\
            </tr>\
            </thead>\
        <tbody>\
            {{each data as value i}}\
            <tr   data-href="userBuyOrderDetail.html?order_no={{value.order_no}}">\
                <td>{{value.car[0].brandName}} {{value.car[0].modelName}} {{value.car[0].statesTypeName}}</p>\
                </td>\
                <td>{{value.order_no}}</td>\
                <td>￥{{value.pro_total_price.split(".")[0]}}</td>\
                <td class="hidden-xs">{{value.create_time}}</td>\
            </tr>\
            {{/each}}\
        </tbody>\
        </table>\
        <nav>\
            <ul class="pager">\
            <li><a href="#" class="js_prevPageBuy">上一页</a></li>\
            <li><a href="#" class="js_nextPageBuy">下一页</a></li>\
            <li><span style="float: right">{{data.currentPageNum}}/{{data.totalPageNum}}页</span></li>\
            </ul>\
        </nav>';
        var render = template.compile(js_html);
        //var html = render({data:[1,2]});
        data.currentPageNum = that.dataParams.pageIndex+1;
        data.totalPageNum = parseInt(that.countNum/that.dataParams.num)+1;
        var html = render({
            data:data,
            num:data.length
        });

        document.getElementById('buyOrder').innerHTML = html;
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
        $('#buyOrder').delegate('tbody tr','click',function(e){
            //todo 跳转到detail页
            var url = $(e.target).parent().data('href');
            location.href = url;
        })
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
            idx++;
            if(that.countNum <= idx*that.dataParams.num){
                return  false;
            }
            that.dataParams.pageIndex = idx;
            getData(that.dataParams)
        })
    }

    function getData(){
        $.ajax({
            type: "GET",
            url: globalVar.reqUrl,
            data: {
                cmd:10025,
                token:that.uid,
                dataPacket:{
                    data: that.dataParams
                }
            },
            dataType: "jsonp"
        }).done(function(req){
            if(req.result && req.result.req) {
                that.countNum =  req.result.data.ct;
                var data = req.result.data.data;
                renderCont(data);
            }
        })
    }

    function init(){
        that.uid = getCookie('token');
        if(!$('#buyOrder')){
            return;
        }
        getData();
        //jumpPage();
    }

    init();

})();