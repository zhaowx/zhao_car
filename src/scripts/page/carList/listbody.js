/**
 * Created by weixiong.zhao on 2015/5/6.
 */

(function(){
    function renderCont() {
        var js_html = '<table class="table table-hover">\
            <thead><tr>\
                <th>车辆品牌</th>\
                <th>车辆信息</th>\
                <th>售卖价格</th>\
                <th>车辆状态</th>\
                <th>发布日期</th>\
            </tr>\
            </thead>\
            <tbody>\
            {{each list as value i}}\
            <tr   data-href="carOne.html?carid=12121212133342">\
                <td>宝马 x5 中规</td>\
                <td>2015款 2.4L 手动版</td>\
                <td>￥366,000</td>\
                <td>期货</td>\
                <td>2015-05-01</td>\
            </tr>\
            {{/each}}\
            </tbody></table>';
        var render = template.compile(js_html);
        //var html = render({data:[1,2]});
        var html = render({
            list:[1,2,3,3,2,1]
        });

        document.getElementById('js_listTable').innerHTML = html;

    }


    renderCont();


})();