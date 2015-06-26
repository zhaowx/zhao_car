/**
 * Created by weixiong.zhao on 2015/5/6.
 */

(function(){

     var  globalVar  =  window._globalV;
    function renderCont(data) {
        var js_html = ' <div class="row">\
            <div class="col-md-6">\
                <div class=" info"><h3>VIN详情</h3></div>\
                <div class=" row ">\
                    <div class="col-xs-12">\
                        <p><span>车型：</span>{{data.brandName}} {{data.modelName}} {{data.statesTypeName}}</p>\
                        <p><span>车型版本：</span>{{data.model_version}}</p>\
                        <p><span>VIN码：</span>{{data.vin}}</p>\
                        <p><span>轮毂尺寸	：</span>{{data.hub_size}}</p>\
                        <p><span>座位数	：</span>{{data.seat_size}}</p>\
                    </div>\
                </div>\
            </div>\
        </div>';

        var render = template.compile(js_html);
        //var html = render({data:[1,2]});
        var html = render({
            data:data
        });

        document.getElementById('js_orderDetail').innerHTML = html;
        bindEvents();
    }


    function bindEvents(){

    }

    var that={
        id:''
    }


    function getData(){
        $.ajax({
            type: "GET",
            url: globalVar.reqUrl,
            data: {
                cmd:10039,
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
        var match = location.search.match(/vin=([^&]*)/)
        var vin = match?match[1]:null;
        if(!vin){
            location.href =  'userVinList.html'
        }
        that.id = vin;
        that.uid = getCookie('token');
        that.verify_sts = parseInt(getCookie('verify_sts'));
        if(!$('#js_orderDetail')){
            return;
        }
        getData();

    }



    init();
})();