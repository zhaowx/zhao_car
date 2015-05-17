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
                <th>求购价格</th>\
                <th>详细说明</th>\
                <th>发布时间</th>\
                <th>审核状态</th>\
            </tr>\
            </thead>\
        <tbody>\
            {{each data as value i}}\
            <tr>\
                <td>\
                        <p>{{value.brandName}} {{value.modelName}} {{value.statesTypeName}}</p>\
                </td>\
                <td>￥{{value.price.split(".")[0]}}</td>\
                <td>{{value.remark}}</td>\
                <td>{{value.publish_time.split(" ")[0]}}</td>\
                <td>{{value.shenheName}}</td>\
            </tr>\
            {{/each}}\
        </tbody>\
        </table>\
        <nav>\
            <ul class="pager">\
            <li><a href="#" class="js_prevPage">上一页</a></li>\
            <li><a href="#" class="js_nextPage">下一页</a></li>\
            </ul>\
        </nav>';
        var  fabu_html = '<div class="alert alert-info" role="alert">您暂时没有求购信息，您可以进行发布！</div>';
        var  no_html ='<div class="alert alert-warning" role="alert">您需要进行身份审核通过之后才可以发布求购信息！<a href="userInfomation.html#checkStatus">查看审核状态</a></div>';
        if(tag){
            var  render = template.compile(no_html);
        }
        else if(!data || data.length==0){
            var render = template.compile(fabu_html);
        }else{
            var render = template.compile(js_html);
        }
        //var html = render({data:[1,2]});
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
        uid:''
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
            if(idx==0){
                //return  false;
            }
            idx++;
            that.dataParams.pageIndex = idx;
            getData(that.dataParams)
        })
    }

    function getData(){
        $.ajax({
            type: "GET",
            url: globalVar.reqUrl,
            data: {
                cmd:10007,
                token:that.uid,
                dataPacket:{
                    data: that.dataParams
                }
            },
            dataType: "jsonp"
        }).done(function(req){
            if(req.result && req.result.req) {

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

    }

    init();

})();