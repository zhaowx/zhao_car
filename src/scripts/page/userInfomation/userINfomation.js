/**
 * Created by luomingzhong on 2015/5/12.
 */
(function () {
    'use strict';
    var token = getCookie('token');
    $.ajax({
        url: window._globalV.reqUrl,//·¢ËÍµÄµØÖ·
        data: {
            cmd: 10027,
            token:token,
            dataPacket: {
            }
        },
        timeout: window._globalV.ajaxTimeOut,
        dataType: 'jsonp',
        type: 'GET'
    }).done(function (data) {
        console.log(data)
    }).fail(function (data) {
       alert("Somthing is error");
    });
}());