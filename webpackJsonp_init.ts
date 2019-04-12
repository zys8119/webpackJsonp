export default class webpackJsonp_init {
    constructor(window,resData,time){
        class webpackJsonp_watch {
            constructor(){
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
        }
        new webpackJsonp_watch();
    }
}