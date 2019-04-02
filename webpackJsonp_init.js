module.exports = function (window,resData,time) {
    var webpackJsonp_watch = function () {
        if(window.webpackJsonp){
            resData.forEach(e=>{
                var js = document.createElement("script");
                js.src = e+"?time="+Date.now();
                document.body.appendChild(js);
            })
        }else {
            if(time){
                setTimeout(webpackJsonp_watch,time);
            }else {
                setTimeout(webpackJsonp_watch);
            }
        }
    }
    webpackJsonp_watch();
}