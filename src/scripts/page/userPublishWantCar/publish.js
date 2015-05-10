/**
 * Created by weixiong.zhao on 2015/5/10.
 */

(function(){
    var  globalVar  =  window._globalV;
    var that = {
        dataParams: {

        }
    }

    function communicationSet(){
        $(document).bind('changeDPData',function(event,data){
            console.log(data);
            that.dataParams.pageIndex = 0;
            var d = $.extend({},data,that.dataParams);
            that.dataParams = d;
        })
        $(document).bind('changeColorData',function(event,data){
            console.log(data);
            that.dataParams.pageIndex = 0;
            var d = $.extend({},data,that.dataParams);
            that.dataParams = d;
        })
    }

    function bindEvents(){

    }

    function init(){
        if(!$('#js_form')){
            return;
        }
        bindEvents();
        communicationSet();
    }

    init();


})()