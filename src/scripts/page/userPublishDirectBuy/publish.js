/**
 * Created by weixiong.zhao on 2015/5/10.
 */

(function(){
    var  globalVar  =  window._globalV;
    var that = {

        carid:''
    }

    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    function checkVin(vin_id){
        $.ajax({
            type: "POST",
            url: globalVar.reqUrl,
            data: {
                cmd:10034,
                token:that.uid,
                dataPacket: {
                    vin: vin_id
                }
            },
            timeout:'3000',
            dataType: "jsonp"
        }).done(function(req){
            if(req.result && req.result.req) {

            }else{
                alert('网络错误,请重试')
            }
        }).fail(function(){
            alert('网络错误')
        })
    }

    function bindEvents(){
        $('#js_publish').bind('click',function(){
            //alert('publish');
            if(!that.verify_sts){
                alert('请先进行身份审核')
                location.href = 'userWant.html'
            }
           var d = dealData();
            d?sendData(d):null;
        })
    }

    function dealData(){
        //console.log(that.dataParams);
        var  dp =  {};

        dp.vin_id = $('#carVin').val();
        dp.friend_name = $('#friendName').val();
        dp.friend_mobile = $('#friendTel').val();
        dp.friend_email = $('#friendEmail').val();
        if(Object.size(dp)!=4){
            alert('请输入完整信息');
            return false;
        }
        return dp;
    }

    function sendData(data){
        $.ajax({
            type: "POST",
            url: globalVar.reqUrl,
            data: {
                cmd:10035,
                token:that.uid,
                dataPacket: {
                    data: data
                }
            },
            timeout:'3000',
            dataType: "jsonp"
        }).done(function(req){
            if(req.result && req.result.req) {
                alert('下单成功')
                location.href = 'userDirectBuyOrder.html'
            }else{
                alert('网络错误,请重试')
            }
        }).fail(function(){
            alert('网络错误')
        })
    }

    function init(){
        that.uid = getCookie('token');
        that.verify_sts = parseInt(getCookie('verify_sts'));
        if(!that.verify_sts){
            location.href = 'userWant.html'
        }
        if(!$('#js_form')){
            return;
        }
        bindEvents();
    }

    init();


})()