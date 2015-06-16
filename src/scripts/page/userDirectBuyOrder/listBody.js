/**
 * Created by weixiong.zhao on 2015/5/6.
 */

(function(){
    var  globalVar  =  window._globalV;

    function renderCont(data,tag) {
        var js_html = '<table class="table table-hover" id="js_table" \
            <thead>\
            <tr>\
                <th>车辆信息</th>\
                <th>订单号</th>\
                <th>帮购朋友</th>\
                <th class="hidden-xs">下单时间</th>\
            </tr>\
            </thead>\
        <tbody>\
            {{each data as value i}}\
            <tr data-href="userDirectBuyOrderDetail.html?orderNo={{value.orderNo}}">\
                <td>{{value.brandName}} {{value.modelName}} {{value.statesTypeName}}</p></td>\
                <td>{{value.orderNo}}</td>\
                <td>{{value.friendName}}</td>\
                <td class="hidden-xs">{{value.createTime.split(" ")[0]}}</td>\
            </tr>\
            {{/each}}\
        </tbody>\
        </table>\
        <nav>\
            <ul class="pager">\
            <li><a href="#" class="js_prevPage">上一页</a></li>\
            <li><a href="#" class="js_nextPage">下一页</a></li>\
            <li><span style="float: right">{{data.currentPageNum}}/{{data.totalPageNum}}页</span></li>\
            </ul>\
        </nav>';
        var  fabu_html = '<div class="alert alert-info" role="alert">您暂时没有直购信息，您可以进行发布！</div>';
        var  no_html ='<div class="alert alert-warning" role="alert">您需要进行身份审核通过之后才可以直购！<a href="userInfomation.html#checkStatus">查看审核状态</a></div>';
        if(tag){
            var  render = template.compile(no_html);
        }
        else if(!data || data.length==0){
            var render = template.compile(fabu_html);
        }else{
            var render = template.compile(js_html);
        }
        //var html = render({data:[1,2]});
        data.currentPageNum = that.dataParams.pageIndex+1;
        data.totalPageNum = parseInt(that.countNum/that.dataParams.num)+1;
        var html = render({
            data:data
        });

        document.getElementById('js_listTable').innerHTML = html;
        bindEvents();
        jumpPage();
    }

    var that = {
        dataParams: {
            num: 10,
            pageIndex: 0
        },
        uid:'',
        countNum:0
    }

    function bindEvents(){
        $('#js_table').delegate('tbody tr','click',function(e){
            //todo 跳转到detail页
            var url = $(e.target).parent().data('href');
            location.href = url;
        })
    }
    function jumpPage(){
        $('.js_prevPage').bind('click',function(){
            var idx = that.dataParams.pageIndex;
            if(idx==0){
                return  false;
            }
            idx--;
            that.dataParams.pageIndex = idx;
            getData(that.dataParams)
        })
        $('.js_nextPage').bind('click',function(){
            var idx = that.dataParams.pageIndex;
            idx++;
            if(that.countNum <= idx*that.dataParams.num){
                return  false;
            }
            that.dataParams.pageIndex = idx;
            getData(that.dataParams)
        })
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
                that.countNum = req.result.data.ct;
                var data = req.result.data.data;
                renderCont(data);
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
        getData();
        //var data=[
        //            {
        //                brandName:'宝马',
        //                modelNmae:'x1',
        //                statesTypeName:'12',
        //                orderNo:'20150614001122',
        //                createTime:'20150614 12:00:11',
        //                friendName:'李斯'
        //            }
        //    ]
        //renderCont(data);
    }

    init();

})();