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
    }

    function bindEvents(){
        $('#js_publish').bind('click',function(){
            //alert('publish');
           var d = dealData();
            d?sendData(d):null;
        })
    }

    function dealData(){
        //console.log(that.dataParams);
        var  dp =  that.dataParams;
        if(!dp.brand_id){
            alert('璇烽?夋嫨杞﹀瀷鎴栬?呴鑹?')
            return false;
        }
        for(var  i in  dp){
            if(!dp[i] || dp[i]==0){
                alert('璇烽?夋嫨杞﹀瀷鎴栬?呴鑹?')
                return false;
            }
        }
        dp.title = $('#carName').val();
        dp.price = $('#carPrice').val();
        dp.remark = $('#carNote').val();
        return dp;
    }

    function sendData(data){
        $.ajax({
            type: "POSt",
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
                alert('鍙戝竷姹傝喘鎴愬姛')
                location.href = 'userWant.html'
            }
        }).fail(function(){
            alert('缃戠粶寮傚父')
        })
    }

    function init(){
        that.uid = getCookie('Token');
        if(!$('#js_form')){
            return;
        }
        bindEvents();
        communicationSet();
    }

    init();


})()