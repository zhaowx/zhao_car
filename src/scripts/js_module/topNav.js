/**
 * Created by weixiong.zhao on 2015/5/4.
 */

(function () {
    //如果cookie存在;表示登录，其他表示未登录。
    var data = {
        isLogin: true//默认没有登录
    };

    /**
     * @discription 通过cookie来判断是否登录
     *
     * */
    function exit(){
        deleteCookie('token');
        location.href ='carlist.html';
    }
    function initData() {
        var result = getCookie('token');
        if (result)
            data.isLogin = false;
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
            <a class="navbar-brand" href="carList.html">易车卖</a>\
        </div>\
         <div class="collapse navbar-collapse  navbar-right" id="bs-example-navbar-collapse-1">\
             <form class="navbar-form navbar-left" role="search">\
                 <div class="form-group">\
                     <input type="text" class="form-control" placeholder="搜索车源">\
                     </div>\
                 </form>\
                 <ul class="nav navbar-nav">\
                     <li class="active"><a href="carlist.html">在卖车源</a></li>\
                     <li><a href="wantList.html">求购列表</a></li>\
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
                     {{if isLogin}}\
                     <li><a href="login.html">login</a></li>\
                     {{else}}\
                     <li class="dropdown">\
                         <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">个人中心 <span class="caret"></span></a>\
                         <ul class="dropdown-menu" role="menu">\
                         <li><a href="userIndent.html">我的订单</a></li>\
                         <li><a href="userPostBuyCar.html">我的求购</a></li>\
                         <li><a href="userCar.html">我的车源</a></li>\
                         <li class="divider"></li>\
                         <li><a href="userInfomation.html">账户信息</a></li>\
                         <li><a href="userModifyPassword.html">修改密码</a></li>\
                         <li class="divider"></li>\
                         <li><a href="userService.html">投诉建议</a></li>\
                         <li><a href="exit.html">退出</a></li>\
                         </ul>\
                     </li>\
                  {{/if}}\
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