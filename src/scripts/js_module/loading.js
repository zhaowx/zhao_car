/**
 * Created by creditease on 2015/5/5.
 */
//这个是在进行ajax提交的时候的加载条
window.loading = {};
(function (loading) {
    var source = '<div class="animateLoad">\
               <div id="floatingBarsG">\
               <div class="blockG" id="rotateG_01">\
               </div>\
               <div class="blockG" id="rotateG_02">\
               </div>\
               <div class="blockG" id="rotateG_03">\
               </div>\
               <div class="blockG" id="rotateG_04">\
               </div>\
               <div class="blockG" id="rotateG_05">\
               </div>\
               <div class="blockG" id="rotateG_06">\
               </div>\
               <div class="blockG" id="rotateG_07">\
               </div>\
               <div class="blockG" id="rotateG_08">\
               </div>\
               </div>\
               <p class="waitload">{{data}}</p>\
               </div>';

    var render = template.compile(source);
    var html = render({data:"请稍后..."});
    document.getElementById("loading").innerHTML = html;
    var touchmove = function (e) {
        e.preventDefault();
    };
    var animateLoad = $(".animateLoad"),
        lodingElement = $("#loading");

    function init() {
        var width = window.innerWidth,
            height = window.innerHeight;
        animateLoad.css("top", (height - parseInt(animateLoad.height())) / 2 + "px");
        animateLoad.css("left", (width - parseInt(animateLoad.width())) / 2 + 'px');
    }

    loading.show = function () {
        init();
        lodingElement.show();
        $(window).on('touchmove', touchmove);
    };
    loading.hide = function () {
        lodingElement.hide();
        $(window).on('touchmove', touchmove);
    };
    return loading;
}(window.loading));