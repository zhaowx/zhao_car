/**
 * Created by weixiong.zhao on 2015/5/6.
 */

(function(){

     var  globalVar  =  window._globalV;
    function renderCont(data,imgData) {
        var js_html = ' <div class="row">\
            <div class="col-md-5 ycm_img_cont">\
                <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">\
                <ol class="carousel-indicators">\
                {{each data.imgurl as value i}}\
                    {{if  i==0}}\
                    <li data-target="#carousel-example-generic" data-slide-to="i" class="active"></li>\
                    {{else}}\
                    <li data-target="#carousel-example-generic" data-slide-to="i" class=""></li>\
                    {{/if}}\
                {{/each}}\
                </ol>\
                <div class="carousel-inner" role="listbox">\
                {{each data.imgurl as value i}}\
                    {{if i==0}}\
                    <div class="item active">\
                    {{else}}\
                    <div class="item">\
                    {{/if}}\
                        <img src="{{value}}"  data-holder-rendered="true">\
                    </div>\
                {{/each}}\
                </div>\
                <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">\
                    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\
                    <span class="sr-only">Previous</span>\
                </a>\
                <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">\
                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\
                    <span class="sr-only">Next</span>\
                </a>\
                </div>\
            </div>\
            <div class="col-md-6">\
            <div class="ycm_head"><h3>{{data.title}}</h3></div>\
            <div class=" row ycm_cont">\
                <div class="col-xs-8">\
                    <p><span>车辆状态：</span>{{data.location}}</p>\
                    <p><span>车辆规制：</span>{{data.statestype}}</p>\
                    <p><span>车辆颜色：</span>{{data.color}}</p>\
                    <p><span>车架尾号：</span>{{data.vin}}</p>\
                    <p><span>车辆配置：</span>{{data.note}}</p>\
                    {{if data.sts=="0"}}\
                    <button type="button" class="btn btn-success ycm_buy_btn" id="js_buy">购买</button>\
                    {{else}}\
                    <button type="button" class="btn  ycm_buy_btn" disabled="disabled">已售</button>\
                    {{/if}}\
                </div>\
                <div class="col-xs-4"><p class="lead">{{data.price}}</p></div>\
            </div>\
            <div class="row ycm_cont">\
                <div class="col-xs-12">\
                    <a type="button" class="btn btn-warning" href="aboutDirectBuy.html">海外直购，再低10%以上＊</a>\
                </div>\
                <div class="col-xs-12">\
                <p style="font-size: 12px;">＊具体价格以合同为准</p>\
                </div>\
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
                location:data.confirmLocationName,
                color:data.colorName,
                statestype:data.brandName+data.modelName+data.statesTypeName,
                note:data.remark,
                vin:data.vin,
                sts:data.sts,
                price:'￥'+parseInt(data.price),
                imgurl:data.image_url
            }
        });

        document.getElementById('js_carone').innerHTML = html;
        bindEvents();
    }


    function bindEvents(){
        $('#js_buy').bind('click',function(){
            //todo 下单
            if(!that.uid || !that.verify_sts){
                alert('请你登录或注册后购买');
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
                alert('后台已接收订单，客服会尽快和你取得联系')
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