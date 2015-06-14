/**
 * Created by weixiong.zhao on 2015/5/10.
 */

(function(){
    var  globalVar  =  window._globalV;
    var that = {
        dataParams: {
            brand_id:0,
            model_id:0,
            standard_id:0,
            color_id:0
        },
        carid:''
    }

    function communicationSet(){
        $(document).bind('changeDPData',function(event,data){
            var d = $.extend({},that.dataParams,data);
            that.dataParams = d;
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
        var  dp =  that.dataParams;
        for(var  i in  dp){
            if(!dp[i] || dp[i]==0){
                alert('请选择车型')
                return false;
            }
        }
        dp.carVin = $('#carVin').val();
        dp.friendName = $('#friendName').val();
        dp.friendTel = $('#friendTel').val();
        dp.friendEmail = $('#friendEmail').val();
        return dp;
    }

    function sendData(data){
        $.ajax({
            type: "POST",
            url: globalVar.reqUrl,
            data: {
                cmd:10008,
                token:that.uid,
                dataPacket: {
                    data: data
                }
            },
            timeout:'3000',
            dataType: "jsonp"
        }).done(function(req){
            if(req.result && req.result.req) {
                //璺宠浆鍒? 璁㈠崟鍒楄〃椤?
                alert('发布求购成功')
                location.href = 'userWant.html'
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
        communicationSet();
    }

    init();


})()