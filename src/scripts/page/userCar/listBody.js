/**
 * Created by weixiong.zhao on 2015/5/6.
 */

(function(){
    var  globalVar  =  window._globalV;
    function renderCont(data,locationData,num,tag) {
        var js_html = '<table class="table table-hover" id="js_table" \
        {{if num<3}}\
        style="margin-bottom:120px;">\
        {{else}}\
        >\
        {{/if}}\
            <thead>\
            <tr>\
                <th>车辆信息</th>\
                <th>车架号</th>\
                <th>售卖价格</th>\
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
                <td>{{value.vin}}</td>\
                <td>￥{{value.price.split(".")[0]}}</td>\
                <td>\
                    {{if num-i<2 && i>2}}\
                    <div class="dropup">\
                    {{else}}\
                    <div class="dropdown">\
                    {{/if}}\
                    <div class="btn-group">\
                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">\
                        {{value.locationName}} <span class="caret"></span>\
                        </button>\
                        <ul class="dropdown-menu" role="menu" data-carid="{{value.car_id}}">\
                            {{each locationData as vv ii}}\
                            <li><a href="#" data-value="{{vv.value_code}}">{{vv.name}}</a></li>\
                            {{/each}}\
                        </ul>\
                    </div>\
                    </div>\
                </td>\
                <td>{{value.create_time.split(" ")[0]}}</td>\
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
        var  fabu_html = '<div class="alert alert-info" role="alert">您暂时没有发布的车源信息，您可以进行发布！</div>';
        var  no_html ='<div class="alert alert-warning" role="alert">您需要进行身份审核通过之后才可以发布车源信息!<a href="userInfomation.html#checkStatus">查看审核状态</a></div>';
        if(tag){
            var  render = template.compile(no_html);
        }
        else if(!data || data.length==0){
            var render = template.compile(fabu_html);
        }else{
            var render = template.compile(js_html);
        }
        var html = render({
            data:data,
            locationData:locationData,
            num:data.length
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
        $('#js_table').delegate('li','click',function(e){
            //todo 跳转到detail页
            var carid = $(e.target).parents('ul').data('carid');
            var location_id = $(e.target).data('value');
            if(confirm('确认要更改其车辆状态？')){
                changeStatus(carid,location_id);
            }

        })
    }
    function changeStatus(carid,location_id){
        $.ajax({
            type: "GET",
            url: globalVar.reqUrl,
            data: {
                cmd:10028,
                token:that.uid,
                dataPacket:{
                    data: {
                        car_id:carid,
                        location_id:location_id
                    }
                }
            },
            dataType: "jsonp"
        }).done(function(req){
            if(req.result && req.result.req) {
               location.reload()
            }
        })
    }
    function jumpPage(){
        $('.js_prevPage').bind('click',function(){
            var idx = that.dataParams.pageIndex;
            if(idx==0){
                //return  false;
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
                cmd:10016,
                token:that.uid,
                dataPacket:{
                    data: that.dataParams
                }
            },
            dataType: "jsonp"
        }).done(function(req){
            if(req.result && req.result.req) {

                var data = req.result.data.data;
                that.countNum = req.result.data.ct;
                var location = req.result.data.locationconfig;
                renderCont(data,location);
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
            renderCont({},{},0,true);
            return;
        }
        getData();

    }

    init();

})();