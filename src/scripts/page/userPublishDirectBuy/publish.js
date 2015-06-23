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
                cmd:10037,
                token:that.uid,
                dataPacket: {
                    data: {
                        vin: vin_id
                    }
                }
            },
            timeout:'3000',
            dataType: "jsonp"
        }).done(function(req){
            if(req.result && req.result.req) {
                console.log(req);
                makeCars(req.result.data);
            }else{
                alert('网络错误,请重试')
            }
        }).fail(function(){
            alert('网络错误')
        })
    }

    function makeCars(data){
        var el = $('#js_vinCars');
        var html = '';
        if(data.length==0){
            html = '未找到与该VIN码对应的车型，请先核对或联系客服'
        }else{
            html= '<div class="btn-group" data-toggle="buttons">';
            $(data).each(function(i,item){
                html += '<label class="btn btn-default js_carVin">\
                    <input type="radio" name="options" value="'+item.id+'" autocomplete="off"> '+item.brandName+' '+ item.modelName+'\
                </label>';
            })
            html += '</div>';
        }
        el[0].innerHTML = '';
        el.append(html);
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
        $('#js_checkVin').bind('click',function(){
            var vin_id = $('#js_vin').val();
            checkVin(vin_id)
        })
    }

    function dealData(){
        //console.log(that.dataParams);
        var  dp =  {};

        dp.vin_id = $('.js_carVin.active').children().val();
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