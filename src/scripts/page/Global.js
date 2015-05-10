/**
 * Created by weixiong.zhao on 2015/5/4.
 * 作为全局通用变量使用
 */
(function ($) {
    //车系等基本配置表
    var GlobalVar = {
        carSource: {}
    };


})(jQuery);

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