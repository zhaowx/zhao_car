/**
 * Created by weixiong.zhao on 2015/5/6.
 */

(function(){
    var  globalVar  =  window._globalV;

    function renderCont(data,logisticsconfig) {
        var js_html = ' <div class="row">\
            <div class="col-md-12">\
                <div class=" info"><h3>订单状态 {{data.status}}</h3></div>\
                <div class=" row ">\
                    <div class="col-xs-12 lh2">\
                        <p><span>订单号：</span>{{data.orderNo}}</p>\
                        <p><span>更新时间：</span>{{data.updateDate}}</p>\
                        <p><span>订单生成时间：</span>{{data.createDate}}</p>\
                        <p><span>帮购朋友名称：</span>{{data.friendName}}</p>\
                        <p><span>朋友电话：</span>{{data.friendTel}}</p>\
                        <p><span>朋友email：</span>{{data.friendEmail}}</p>\
                    </div>\
                </div>\
                <div class="panel panel-default">\
                    <div class="panel-body">订单改变记录</div>\
                    <div class="panel-footer">\
                        <div class="procedure">\
                            <div class="fl process-bar">\
                                {{each logisticsconfig as value i}}\
                                    {{if i != logisticsconfig.length-1}}\
                                        {{if value.sts == 1}}\
                                            <i class="icon i-orderok"></i>\
                                            <i class="i-orderarrow"></i>\
                                        {{else}}\
                                            <i class="icon i-orderetyok"></i>\
                                            <i class="i-orderetyarrow"></i>\
                                        {{/if}}\
                                    {{else}}\
                                        {{if value.sts == 1}}\
                                            <i class="icon i-orderok"></i>\
                                        {{else}}\
                                            <i class="icon i-orderetyok"></i>\
                                        {{/if}}\
                                    {{/if}}\
                                {{/each}}\
                            </div>\
                            <div class="fl tips">\
                            {{each logisticsconfig as value i}}\
                                <div class="step">\
                                    <span class="fr t-3">{{value.time}}</span>\
                                    <p class="bold">{{value.text}}</p>\
                                    <p class="sub">{{value.cont}}</p>\
                                </div>\
                            {{/each}}\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                </div>\
            </div>\
        </div>';

        var render = template.compile(js_html);

        var _logisticsconfig = makeStatusData(logisticsconfig,data.logistics)
        //var html = render({data:[1,2]});
        var html = render({
            //data:{
            //    status:'手续办理中',
            //    orderNo:'20150601130021',
            //    updateDate:'2015-06-15',
            //    createDate:'2015-06-11',
            //    friendName:'李斯',
            //    friendTel:'18612345678',
            //    friendEmail:'zwx@163.com',
            //    statusLogs:['aa','bbb']
            //}

            data:{
                status:data.stsName,
                orderNo:data.order_no,
                updateDate:data.modify_time,
                createDate:data.create_time,
                friendName:data.friend_name,
                friendTel:data.friend_mobile,
                friendEmail:data.friend_email,
                statusLogs:data.logistics
            },
            logisticsconfig:_logisticsconfig
        });

        document.getElementById('js_orderDetail').innerHTML = html;
        bindEvents();
    }

    var that = {
        dataParams: {
            order_no:''
        },
        uid:'',
        countNum:0
    }

    function makeStatusData(logisticsconfig,logistics){

        var data = [];
        $(logisticsconfig).each(function(i,item){
            var _item = {
                text:'',
                sts:0,
                time:'',
                cont:''
            }
            _item.text = item.name;
            if(logistics[i]){
                _item.sts = 1;
                _item.time = logistics[i].create_time;
                _item.cont = logistics[i].content;
            }
            data.push(_item);
        })
        return data;
    }

    function bindEvents(){
//        $('#js_table').delegate('li','click',function(e){
//            //todo 跳转到detail页
//            var carid = $(e.target).parent().data('carid');
//            if(confirm('确认要更改其车辆状态？')){
//                alert('0')
//            }
//
//        })
    }


    function getData(){
        $.ajax({
            type: "GET",
            url: globalVar.reqUrl,
            data: {
                cmd:10036,
                token:that.uid,
                dataPacket:{
                    data: that.dataParams
                }
            },
            dataType: "jsonp"
        }).done(function(req){
            if(req.result && req.result.req) {

                var data = req.result.data.data[0];

                renderCont(data,req.result.data.logisticsconfig);
            }
        })
    }

    function init(){
        that.uid = getCookie('token');
        that.verify_sts = parseInt(getCookie('verify_sts'));

        if(!$('#js_listTable')){
            return;
        }
        if(!that.verify_sts){
            $('.js_publish').remove();
            renderCont({},true);
            return;
        }
        var match = location.search.match(/order_no=([^&]*)/)
        var order_no = match?match[1]:null;
        if(!order_no){
            location.href =  'userDirectBuyOrder.html'
        }
        that.dataParams.order_no = order_no;
        getData();
    }

    init();

})();