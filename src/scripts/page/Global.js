/**
 * Created by weixiong.zhao on 2015/5/4.
 * 作为全局通用变量使用
 */
(function () {
    var GlobalVar = {
        reqUrl: "http://182.254.179.11/buyShop/s1/gateway.php",
        imgUpUrl: 'http://182.254.179.11/buyShop/s1/uploadimagefile.php',
        personImgUpUrl: 'http://182.254.179.11/buyShop/s1/uploadcertfile.php',
        imgSource: []
    }
    window._globalV = GlobalVar;
})()


/**
 * @discription 获取cookie的值，如果没有返回null
 * @param cookieName {string} cookie的名字
 * */
function getCookie(c_name) {
    if (document.cookie.length > 0) {//先查询cookie是否为空，为空就return ""
        var c_start = document.cookie.indexOf(c_name + "=");//通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1　　
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;//最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置
            var c_end = document.cookie.indexOf(";", c_start);//其实我刚看见indexOf()第二个参数的时候猛然有点晕，后来想起来表示指定的开始索引的位置...这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));//通过substring()得到了值。想了解unescape()得先知道escape()是做什么的，都是很重要的基础，想了解的可以搜索下，在文章结尾处也会进行讲解cookie编码细节
        }
    }
    return null;

}

function setCookie(name, value, iDay) {
    var date = new Date();
    if (iDay) {
        var date = new Date();
        date.setTime(date.getTime() + iDay * 24 * 3600 * 1000);
        document.cookie = name + '=' + value + ';expires=' + date.toGMTString();
    }
    else {
        date.setTime(date.getTime() + 2 * 3600 * 1000);
        document.cookie = name + '=' + value + ';expires=' + date.toGMTString();
    }
}

/**
 * @discription 删除cookie
 * */
function deleteCookie(cookieName) {
    setCookie(cookieName, 1, -1);
}
/**
 * @discription 根据用户的cookie和userId来判断用户是否登录，未登录就转到carlist.html页面
 */
function isLogin() {
    var userId = getCookie("token");
    if (userId) {
        return true;
    }
    else {
        return false;
    }
}
/**
 * @discription 当前页面是否处于用户中心页面
 */
function getFileName() {
    var url = location.href,
        dir = url.split('/'),
        fileName = dir[dir.length - 1].split(".");
    return fileName[0];
}
function isInUserCenter() {
    var _fileName = getFileName(),
        result = false;
    if (/^user*/.test(_fileName)) {
        _fileName = "userCenter";
    }

    switch (_fileName) {
        case "userCenter":
            result = true;
            break;
        default:
            result = false;
            break;
    }
    return result;
}
/**@iscription 针对用户中心转主页*/
function GoToHome() {
    var result = isLogin();
    if (!result && isInUserCenter()) {
        location.href = "login.html";
    }
}
/**
 * 如果不为pc返回ture;
 *否则为false;
 * */
var isPC = (function () {
    var navigator = window.navigator,
        userAgent = navigator.userAgent,
        android = userAgent.match(/(Android)[\s\/]+([\d\.]+)/),
        ios = userAgent.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/),
        wp = userAgent.match(/(Windows\s+Phone)\s([\d\.]+)/),
        isWebkit = /WebKit\/[\d.]+/i.test(userAgent),
        isSafari = ios ? (navigator.standalone ? isWebkit : (/Safari/i.test(userAgent) && !/CriOS/i.test(userAgent) && !/MQQBrowser/i.test(userAgent))) : false,
        os = {};

    if (android) {
        os.android = true;
        os.version = android[2];
    }
    if (ios) {
        os.ios = true;
        os.version = ios[2].replace(/_/g, '.');
        os.ios7 = /^7/.test(os.version);
        if (ios[1] === 'iPad') {
            os.ipad = true;
        } else if (ios[1] === 'iPhone') {
            os.iphone = true;
            os.iphone5 = window.screen.height == 568;
        } else if (ios[1] === 'iPod') {
            os.ipod = true;
        }
    }
    if (wp) {
        os.wp = true;
        os.version = wp[2];
        os.wp8 = /^8/.test(os.version);
    }
    if (isWebkit) {
        os.webkit = true;
    }
    if (isSafari) {
        os.safari = true;
    }
    if (os.wp || os.wp8 || os.iphone || os.iphone5 || os.ipod || os.ios7 || os.android) {
        return true;
    }
    else {
        return false;
    }
})();
GoToHome();
