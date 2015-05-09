/**
 * Created by weixiong.zhao on 2015/5/4.
 */

(function(){
    //如果cookie存在;表示登录，其他表示未登录。
    var data={
        isLogin:true//默认没有登录
    };

    /**
     * @discription 通过cookie来判断是否登录
     *
     * */
    function initData(){
        //todo
    }
    function renderCont() {
        var js_html = ' <div class="container">\
        <div class="navbar-header">\
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"\
            data-target="#bs-example-navbar-collapse-1">\
                <span class="sr-only">Toggle navigation</span>\
                <span class="icon-bar"></span>\
                <span class="icon-bar"></span>\
                <span class="icon-bar"></span>\
            </button>\
            <a class="navbar-brand" href="index.html">易车卖</a>\
        </div>\
         <div class="collapse navbar-collapse  navbar-right" id="bs-example-navbar-collapse-1">\
             <form class="navbar-form navbar-left" role="search">\
                 <div class="form-group">\
                     <input type="text" class="form-control" placeholder="搜索车源">\
                     </div>\
                 </form>\
                 <ul class="nav navbar-nav">\
                     <li class="active"><a href="list.html">车源</a></li>\
                     <li><a href="#">发布车源</a></li>\
                     <li class="dropdown">\
                         <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">服务承诺<span class="caret"></span></a>\
                         <ul class="dropdown-menu" role="menu">\
                             <li><a href="#" class="active">购车流程</a></li>\
                             <li><a href="#">保险服务</a></li>\
                             <li><a href="#">质量保证</a></li>\
                             <li class="divider"></li>\
                             <li><a href="#">关于我们</a></li>\
                         </ul>\
                     </li>\
                     <li class="dropdown">\
                         <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">个人中心 <span class="caret"></span></a>\
                         <ul class="dropdown-menu" role="menu">\
                         {{if isLogin}}\
                         <li><a href="userIndent.html">我的订单</a></li>\
                         <li><a href="userPostBuyCar.html">我的求购</a></li>\
                         <li><a href="user_Vehicle_Information.html">我的车源</a></li>\
                         <li><a href="userInfomation.html">账户信息</a></li>\
                         <li><a href="userService.html">投诉建议</a></li>\
                         <li><a href="userModifyPassword.html">修改密码</a></li>\
                         <li><a href="void()">退出</a></li>\
                         {{else}}\
                            <li><a href="#">登陆</a></li>\
                             <li><a href="#">注册</a></li>\
                         {{/if}}\
                         </ul>\
                     </li>\
                 </ul>\
             </div>\
         </div>';
        initData();
        var render = template.compile(js_html);
        var html = render(data);
        document.getElementById('js_topnav').innerHTML = html;

    }
    renderCont();
})();