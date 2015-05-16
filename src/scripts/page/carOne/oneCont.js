/**
 * Created by weixiong.zhao on 2015/5/6.
 */

(function(){

     var  globalVar  =  window._globalV;
    function renderCont(data) {
        var js_html = ' <div class="row">\
            <div class="col-md-5 ycm_img_cont"><img src="{{data.imgurl}}"></div>\
            <div class="col-md-6">\
            <div class="ycm_head"><h3>{{data.title}}</h3></div>\
            <div class=" row ycm_cont">\
            <div class="col-xs-8">\
                <p><span>车辆状态：</span>{{data.location}}</p>\
                <p><span>车辆规制：</span>{{data.statestype}}</p>\
                <p><span>车辆颜色：</span>{{data.color}}</p>\
                <p><span>车辆配置：</span>{{data.note}}</p>\
                <p><span>车架尾号：</span>{{data.vin}}</p>\
                {{if data.verify_sts}}\
                <button type="button" class="btn btn-success ycm_buy_btn" id="js_buy">购买</button>\
                {{else}}\
                <button type="button" class="btn disabled ycm_buy_btn" id="js_buy">购买</button>\
                <div class="alert alert-warning" role="alert">您需要进行身份审核通过之后才可以进行下单！</div>\
                {{/if}}\
            </div>\
            <div class="col-xs-4"><p class="lead">{{data.price}}</p></div>\
        </div>\
        </div>\
        </div>';
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
                title:data.title,
                location:data.locationName,
                color:data.colorName,
                statestype:data.brandName+data.modelName+data.statesTypeName,
                note:data.remark,
                vin:'123444***********4455',
                price:'￥'+data.price,
                imgurl:'',
                verify_sts:that.verify_sts
            }
        });

        document.getElementById('js_carone').innerHTML = html;
        bindEvents();
    }


    function bindEvents(){
        $('#js_buy').bind('click',function(){
            //todo 下单
            if(!that.uid){
                alert('请先登陆');
                return;
            }
            if(!that.verify_sts){
                alert('请先通过个人身份审核');
                return;
            }
            submitOrder();
        })
    }

    var that={
        car_id:'',
        verify_sts:false
    }
    function submitOrder(){
        $.ajax({
            type: "GET",
            url: globalVar.reqUrl,
            data: {
                cmd:10024,
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
                alert('下单成功')
                location.href = 'userIndent.html'
            }
            if(req.result && !req.result.req){
                alert(req.result.msg);
//                deleteCookie('token')
                location.href = 'index.html'
            }
        }).fail(function(){
            alert('网络异常')
        })
    }

    function getData(){
        $.ajax({
            type: "GET",
            url: globalVar.reqUrl,
            data: {
                cmd:10002,
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
                renderCont(req.result.data.data[0])
            }
        }).fail(function(){
            alert('网络异常')
        })
    }

    function init(){
        var match = location.search.match(/carId=([^&]*)/)
        var carId = match?match[1]:null;
        if(!carId){
            location.href =  'carList.html'
        }
        that.car_id = carId;
        that.uid = getCookie('token');
        that.verify_sts = parseInt(getCookie('verify_sts'));
        if(!$('#js_carone')){
            return;
        }
        getData();

    }



    init();
})();