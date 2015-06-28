/**
 * Created by weixiong.zhao on 2015/5/4.
 */

(function () {
    //如果cookie存在;表示登录，其他表示未登录。
    var style = "active";
    var data = {
        isLogin: true,//默认没有登录
        carlist:"",
        wantList:"",
        service:"",
        userCenter:"",
        login:"",
        register:"",
        aboutDirectBuy:''
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
            _fileName =getFileName();
        if (result)
            data.isLogin = false;
        if(/^user*/.test(_fileName)){
            _fileName = "userCenter";
        }
        switch (_fileName)
        {
            case "wantlist":
                data.wantList =style;
                break;
            case "carlist":
                data.carlist = style;
                break;
            case "xx":
                data.service = style;
            case "aboutDirectBuy":
                data.aboutDirectBuy = style;
                break;
            case "userCenter":
                data.userCenter = style;
                break;
            case "login":
                data.login = style;
                break;
            case "register":
                data.register = style;
                break;
            default:
                //data.carlist = style;
        }
    }

    function renderCont() {
        var js_html = ' <div class="container">\
        <div class="navbar-header">\
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"\
            data-target="#bs-example-navbar-collapse-1">\
               {{if isLogin}}\
               菜单\
               {{else}}\
               我的菜单\
               {{/if}}\
            </button>\
            <a class="navbar-brand" href="index.html"><img src="../src/styles/imgs/ycm_logo.png" style="max-width: 120px;margin-top: -10px;"></a>\
        </div>\
         <div class="collapse navbar-collapse  navbar-right" id="bs-example-navbar-collapse-1">\
                 <ul class="nav navbar-nav">\
                     <li class="{{carlist}}"><a href="carlist.html">在卖车源</a></li>\
                     <li class="{{wantList}}"><a href="wantlist.html">求购列表</a></li>\
                     <li class="{{aboutDirectBuy}}"><a href="aboutDirectBuy.html">海外直购</a></li>\
                     {{if isLogin}}\
                     <li  class="{{login}}"><a href="login.html">登录</a></li>\
                     <li  class="{{register}}"><a href="register.html">注册</a></li>\
                     {{else}}\
                     <li class="dropdown {{userCenter}}">\
                         <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">我的 <span class="caret"></span></a>\
                         <ul class="dropdown-menu" role="menu">\
                         <li><a href="userIndent.html">我的订单</a></li>\
                         <li><a href="userDirectBuyOrder.html">我的海外直购</a></li>\
                         <li><a href="userWant.html">我的求购</a></li>\
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