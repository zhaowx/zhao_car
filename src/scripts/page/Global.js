/**
 * Created by weixiong.zhao on 2015/5/4.
 * 作为全局通用变量使用
 */
//(function ($) {
//    //车系等基本配置表
//    var GlobalVar = {
//        carSource: {}
//    };
//
//})(jQuery);
(function(){
    var GlobalVar = {
        reqUrl:"http://182.254.179.11/buyShop/s1/gateway.php"
    }
    window._globalV = GlobalVar;
})()


/**
 * @discription 获取cookie的值，如果没有返回null
 * @param cookieName {string} cookie的名字
 * */
function getCookie(cookieName) {
    var arr = document.cookie.split(';');

    for (var i = 0; i < arr.length; i++) {
        /* 将cookie名称和值拆分进行判断 */
        var arr2 = arr[i].split('=');
        if (arr2[0] == name) {
            return arr2[1];
        }
    }
    return null;
}

function setCookie(name, value, iDay) {
    if (iDay) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie = name + '=' + value + ';expires=' + oDate;
    }
    else
        document.cookie = name + '=' + value;
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
    var userId = getCookie("userToken");
    var islogin = getCookie("isLogin");
    if (userId && islogin) {
        return true;
    }
    else {
        return false;
    }
}
/**
 * @discription 当前页面是否处于用户中心页面
 */
function isInUserCenter() {
    var url = location.href,
        dir = url.split('/'),
        fileName = dir[dir.length - 1].split("."),
        result = false;
    switch (fileName[0])
    {
        case "userCar":
            result = true;
            break;
        case "userIndent":
            result = true;
            break;
        case "userInfomation":
            result = true;
            break;
        case "userModifyPassword":
            result = true;
            break;
        case "usrService":
            result = true;
            break;
        case "userWant":
            result = true;
            break;
        case "userPublishCar":
            result = true;
            break;
        case "userPublishWantCar":
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
    if (!result && isInUserCenter() ) {
        location.href = "carlist.html";
    }
}
//GoToHome();
