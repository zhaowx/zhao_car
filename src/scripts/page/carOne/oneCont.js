/**
 * Created by weixiong.zhao on 2015/5/6.
 */

(function(){
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
                <button type="button" class="btn btn-success ycm_buy_btn" id="js_buy">buy</button>\
            </div>\
            <div class="col-xs-4"><p class="lead">{{data.price}}</p></div>\
        </div>\
        </div>\
        </div>';
        var render = template.compile(js_html);
        //var html = render({data:[1,2]});
        var html = render({
            data:{
                title:'新款卡宴，柴油款',
                location:'现车',
                color:'白色',
                statestype:'中规',
                note:'',
                vin:'123444***********4455',
                price:'￥123,0000',
                imgurl:'http://7te99a.com2.z0.glb.qiniucdn.com/8D3A5560-EB08-4CB9-ADA1-35DB9D7C35DC.jpeg'
            }
        });

        document.getElementById('js_carone').innerHTML = html;

    }


    function bindEvents(){
        $('#js_buy').bind('click',function(){
            //todo 下单
        })
    }

    function getData(){
        $.ajax({
            type: "GET",
            url: "http://182.254.179.11/buyShop/s1/gateway.php",
            data: {
                cmd:10001,
                data:{
                    carid:'1000222'
                }
            },
            dataType: "jsonp"
        }).done(function(req){
            if(req.result && req.result.req) {

                var data = req.result.data;
                renderCont(data);
            }
        })
    }

    function init(){
        if(!$('#js_carone')){
            return;
        }
        getData();
        bindEvents();
    }



    renderCont();
})();