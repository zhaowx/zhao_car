/**
 * Created by weixiong.zhao on 2015/5/4.
 */

(function(){
    function renderCont() {
        var js_html = '     <div class="container">\
            <div class="row footer-top">\
            <div class="col-sm-5 col-lg-5 hidden-xs">\
                <h4><img src="../src/styles/imgs/ycm_logo.png" style="max-width: 300px; padding-bottom: 20px;">\
                <div><a  href="tel:010-82437080">客服电话 ：010-82437080</a></div>\
                </h4>\
                </div>\
                <div class="col-sm-5  col-lg-4 col-lg-offset-1 hidden-xs">\
                    <div class="row about">\
                        <div class="col-xs-4">\
                            <h4>关于</h4>\
                            <ul class="list-unstyled">\
                                <li><a href="#">关于我们</a></li>\
                                <li><a href="#">广告合作</a></li>\
                                <li><a href="#">友情链接</a></li>\
                                <li><a href="#">招聘</a></li>\
                            </ul>\
                        </div>\
                        <div class="col-xs-4">\
                            <h4>售后服务</h4>\
                            <ul class="list-unstyled">\
                                <li><a href="#" target="_blank">保险</a></li>\
                                <li><a href="#" target="_blank">上牌</a></li>\
                            </ul>\
                        </div>\
                        <div class="col-xs-4">\
                            <h4>购车帮助</h4>\
                            <ul class="list-unstyled">\
                                <li><a href="#" target="_blank">如何下单</a></li>\
                                <li><a href="#" target="_blank">物流信息</a></li>\
                            </ul>\
                        </div>\
                    </div>\
                </div>\
                <div class="col-sm-2 col-lg-2 col-xs-6 visible-xs" style="text-align: center;">\
                    <h4>客服</h4>\
                    <p>\
                   <a style="display: block"  href="tel:010-82437080"><img src="../src/styles/imgs/telephone.png" width="50px" ></a>\
                   </p>\
                    </div>\
                <div class="col-sm-2 col-lg-2 col-xs-6" style="text-align: center;">\
                    <h4>微信</h4>\
                    <p><img src="../src/styles/imgs/ycm_ecode.jpg" width="50px;"></p>\
                    </div>\
                </div>\
                <br/>\
                    <div class="row footer-bottom">\
                        <ul class="list-inline text-center">\
                            <li><a href="http://www.miibeian.gov.cn/" target="_blank">京ICP备 号</a></li>\
                            <li>京公网安备 </li>\
                        </ul>\
                    </div>\
                </div>';

        var render = template.compile(js_html);
        var html = render();
        document.getElementById('js_bottomFooter').innerHTML = html;

    }


    renderCont();

})();