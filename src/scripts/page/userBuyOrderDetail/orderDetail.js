/**
 * Created by weixiong.zhao on 2015/5/6.
 */

(function(){

     var  globalVar  =  window._globalV;
    function renderCont(data,imgData) {
        var js_html = ' <div class="row">\
            <div class="col-md-6">\
                <div class=" info"><h3>订单状态 {{data.status}}</h3></div>\
                <div class=" row ">\
                    <div class="col-xs-12">\
                        <p><span>订单号：</span>{{data.orderNo}}</p>\
                        <p><span>订单金额：</span>{{data.price}}</p>\
                        <p><span>订单状态更新时间：</span>{{data.updateDate}}</p>\
                        <p><span>订单生产时间：</span>{{data.createDate}}</p>\
                    </div>\
                </div>\
                <div class=" row ">\
                    <a href="carOne.html?carId="+"{{data.carUrl}}">\
                    <div class="col-xs-12">\
                        <p><span>车型：</span>{{data.carInfo}}</p>\
                        <p><span>车辆名称：</span>{{data.carName}}</p>\
                        <p><span>车辆状态：</span>{{data.carStatus}}</p>\
                    </div>\
                    </a>\
                </div>\
            </div>\
        </div>';

        var carData = data.car[0];
        var render = template.compile(js_html);
        //var html = render({data:[1,2]});
        var html = render({
//            data:{
//                title:'新款卡宴，柴油款',
//                location:'现车',
//                color:'白色',
//                statestype:'中规',
//                note:'',
//                vin:'123444***********4455',
//                price:'￥123,0000',
//                imgurl:'',
//                verify_sts:that.verify_sts
//            }
            data:{
                orderNo:data.order_no,
                price:data.pro_total_price.split('.')[0],
                status:data.confirmName,
                updateDate:data.modify_time,
                createDate:data.create_time,
                carInfo:carData.brandName+' '+carData.modelName+' '+carData.statesTypeName,
                carStatus:carData.confirmLocationName,
                carName:data.pro_name,
                carUrl:data.car_id
            }
        });

        document.getElementById('js_orderDetail').innerHTML = html;
        bindEvents();
    }


    function bindEvents(){

    }

    var that={
        car_id:'',
        verify_sts:false
    }


    function getData(){
        $.ajax({
            type: "GET",
            url: globalVar.reqUrl,
            data: {
                cmd:10033,
                token:that.uid,
                dataPacket: {
                    data: that
                }
            },
            timeout:'3000',
            dataType: "jsonp"
        }).done(function(req){
            if(req.result && req.result.req) {
                //跳转到 订单列表页
                //location.href = 'userIndent.html'
                renderCont(req.result.data)
            }
        }).fail(function(){
            alert('网络异常')
        })
    }

    function init(){
        var match = location.search.match(/order_no=([^&]*)/)
        var order_no = match?match[1]:null;
        if(!order_no){
            location.href =  'userIndent.html'
        }
        that.order_no = order_no;
        that.uid = getCookie('token');
        that.verify_sts = parseInt(getCookie('verify_sts'));
        if(!$('#js_orderDetail')){
            return;
        }
        getData();

    }



    init();
})();