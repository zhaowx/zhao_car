/**
 * Created by weixiong.zhao on 2015/5/10.
 */

(function(){
    var  globalVar  =  window._globalV;
    var that = {
        dataParams: {

        },
        carid:''
    }

    function communicationSet(){
        $(document).bind('changeDPData',function(event,data){
            var d = $.extend({},that.dataParams,data);
            that.dataParams = d;
        })
        $(document).bind('changeColorData',function(event,data){
            var d = $.extend({},that.dataParams,data);
            that.dataParams = d;
        })
        $(document).bind('changeLocationData',function(event,data){
            var d = $.extend({},that.dataParams,data);
            that.dataParams = d;
        })
    }

    function bindEvents(){
        $('#js_publish').bind('click',function(){
            //alert('publish');
            if(!that.verify_sts){
                alert('请先进行身份审核')
                location.href = 'userCar.html'
            }
            var d = dealData();
            d?sendData(d):null;
        })
    }

    function dealData(){
        //console.log(that.dataParams);
        var  dp =  that.dataParams;
        if(!dp.brand_id){
            alert('请选择车型或者颜色')
            return false;
        }
        for(var  i in  dp){
            if(!dp[i] || dp[i]==0){
                alert('请选择车型或者颜色')
                return false;
            }
        }
        if(!$('#vin').val()){
            alert('请输入车架号');
            return false;
        }
        dp.vin = $('#vin').val();
        dp.title = $('#carName').val();
        dp.price = $('#carPrice').val();
        dp.remark = $('#carNote').val();
        return dp;
    }

    function sendData(data){
        $.ajax({
            type: "POST",
            url: globalVar.reqUrl,
            data: {
                cmd:10012,
                token:that.uid,
                dataPacket: {
                    data: data
                }
            },
            timeout:'3000',
            dataType: "jsonp"
        }).done(function(req){
            if(req.result && req.result.req) {
                //跳转到 订单列表页
                alert('发布车源成功')
                location.href = 'userCar.html'
            }
        }).fail(function(){
            alert('网络异常')
        })
    }

    function init(){
        that.uid = getCookie('token');
        that.verify_sts = parseInt(getCookie('verify_sts'));
        if(!that.verify_sts){
            location.href = 'userCar.html'
        }
        if(!$('#js_form')){
            return;
        }
        bindEvents();
        communicationSet();
    }

    init();


})()