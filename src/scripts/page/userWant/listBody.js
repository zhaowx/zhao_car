/**
 * Created by weixiong.zhao on 2015/5/6.
 */

(function(){
    var  globalVar  =  window._globalV;

    function renderCont(data,locationData,num) {
        var js_html = '<table class="table table-hover" id="js_table" \
        {{if num<3}}\
        style="margin-bottom:120px;">\
        {{else}}\
        >\
        {{/if}}\
            <thead>\
            <tr>\
                <th>车辆信息</th>\
                <th>求购价格</th>\
                <th>车辆状态</th>\
                <th>发布时间</th>\
                <th>审核状态</th>\
            </tr>\
            </thead>\
        <tbody>\
            {{each data as value i}}\
            <tr>\
                <td>\
                        <p>{{value.brandName}} {{value.modelName}} {{value.statesTypeName}}</p>\
                        <p>{{value.note}}</p>\
                </td>\
                <td>{{value.price}}</td>\
                <td>{{value.locationName}}</td>\
                <td>20115-05-02</td>\
                {{if value.visible==1}}\
                <td>已通过</td>\
                {{else}}\
                <td>未通过</td>\
                {{/if}}\
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
        if(data.length==0){
            var render = template.compile(fabu_html);
        }else{
            var render = template.compile(js_html);
        }
        //var html = render({data:[1,2]});
        var html = render({
            data:data,
            locationData:locationData,
            num:data.length
        });

        document.getElementById('js_listTable').innerHTML = html;
        bindEvents();
    }

    var that = {
        dataParams: {
            num: 10,
            pageIndex: 0
        }
    }

    function bindEvents(){
        $('#js_table').delegate('li','click',function(e){
            //todo 跳转到detail页
            var carid = $(e.target).parent().data('carid');
            if(confirm('确认要更改其车辆状态？')){
                alert('0')
            }

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
            if(idx==0){
                return  false;
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
                cmd:10016,
                dataPacket:{
                    data: {
                        //num: 1
                    }
                }
            },
            dataType: "jsonp"
        }).done(function(req){
            if(req.result && req.result.req) {

                var data = req.result.data.data;
                var location = req.result.data.locationconfig;
                renderCont(data,location);
            }
        })
    }

    function init(){
        if(!$('#js_listTable')){
            return;
        }
        getData();
        jumpPage();
    }

    init();

})();