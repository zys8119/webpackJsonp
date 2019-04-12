"use strict";
exports.__esModule = true;
var webpackJsonp_init = /** @class */ (function () {
    function webpackJsonp_init(window, resData, time) {
        var webpackJsonp_watch = /** @class */ (function () {
            function webpackJsonp_watch() {
                if (window.webpackJsonp) {
                    resData.forEach(function (e) {
                        var js = document.createElement("script");
                        js.src = e + "?time=" + Date.now();
                        document.body.appendChild(js);
                    });
                }
                else {
                    if (time) {
                        setTimeout(webpackJsonp_watch, time);
                    }
                    else {
                        setTimeout(webpackJsonp_watch);
                    }
                }
            }
            return webpackJsonp_watch;
        }());
        new webpackJsonp_watch();
    }
    return webpackJsonp_init;
}());
exports["default"] = webpackJsonp_init;
