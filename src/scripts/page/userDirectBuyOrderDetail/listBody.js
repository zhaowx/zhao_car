/**
 * Created by weixiong.zhao on 2015/5/6.
 */

(function(){
    var  globalVar  =  window._globalV;

    function renderCont(data) {
        var js_html = ' <div class="row">\
            <div class="col-md-12">\
                <div class=" info"><h3>订单状态 {{data.status}}</h3></div>\
                <div class=" row ">\
                    <div class="col-xs-12">\
                        <p><span>订单号：</span>{{data.orderNo}}</p>\
                        <p><span>更新时间：</span>{{data.updateDate}}</p>\
                        <p><span>订单生成时间：</span>{{data.createDate}}</p>\
                        <p><span>帮购朋友名称：</span>{{data.friendName}}</p>\
                        <p><span>朋友电话：</span>{{data.friendTel}}</p>\
                        <p><span>朋友email：</span>{{data.friendEmail}}</p>\
                    </div>\
                </div>\
                <div class="panel panel-default">\
                    <div class="panel-body">订单改变纪录</div>\
                <div class="panel-footer">\
                {{each data.statusLogs as value i}}\
                {{i}} {{value}}<br\>\
                {{/each}}\
                </div>\
                </div>\
            </div>\
        </div>';

        var render = template.compile(js_html);
        //var html = render({data:[1,2]});
        var html = render({
            data:{
                status:'手续办理中',
                orderNo:'20150601130021',
                updateDate:'2015-06-15',
                createDate:'2015-06-11',
                friendName:'李斯',
                friendTel:'18612345678',
                friendEmail:'zwx@163.com',
                statusLogs:['aa','bbb']
            }
//            data:{
//                orderNo:data.order_no,
//                price:data.pro_total_price.split('.')[0],
//                status:data.confirmName,
//                updateDate:data.modify_time,
//                createDate:data.create_time,
//                carInfo:carData.brandName+' '+carData.modelName+' '+carData.statesTypeName,
//                carStatus:carData.confirmLocationName,
//                carName:data.pro_name,
//                carUrl:data.car_id
//            }
        });

        document.getElementById('js_orderDetail').innerHTML = html;
        bindEvents();
    }

    var that = {
        dataParams: {
            num: 10,
            pageIndex: 0
        },
        uid:'',
        countNum:0
    }

    function bindEvents(){
//        $('#js_table').delegate('li','click',function(e){
//            //todo 跳转到detail页
//            var carid = $(e.target).parent().data('carid');
//            if(confirm('确认要更改其车辆状态？')){
//                alert('0')
//            }
//
//        })
    }
    function jumpPage(){
        $('.js_prevPage').bind('click',function(){
            var idx = that.dataParams.pageIndex;
            if(idx==0){
                return  false;
            }
            idx--;
            that.dataParams.pageIndex = idx;
            getData(that.dataParams)
        })
        $('.js_nextPage').bind('click',function(){
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
                cmd:10036,
                token:that.uid,
                dataPacket:{
                    data: that.dataParams
                }
            },
            dataType: "jsonp"
        }).done(function(req){
            if(req.result && req.result.req) {
                that.countNum = req.result.data.ct;
                var data = req.result.data.data;
                renderCont(data);
            }
        })
    }

    function init(){
        that.uid = getCookie('token');
        that.verify_sts = parseInt(getCookie('verify_sts'));

        if(!$('#js_listTable')){
            return;
        }
        if(!that.verify_sts){
            $('.js_publish').remove();
            renderCont({},true);
            return;
        }
        //getData();{{value.brandName}} {{value.modelName}} {{value.statesTypeName}}
        var data=[
                    {
                        brandName:'宝马',
                        modelNmae:'x1',
                        statesTypeName:'12',
                        orderNo:'20150614001122',
                        createTime:'20150614 12:00:11',
                        friendName:'李斯'
                    }
            ]
        renderCont(data);
    }

    init();

})();