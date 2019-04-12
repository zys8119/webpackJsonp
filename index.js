"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var fs = require("fs");
var webpackJsonp_init_1 = require("./webpackJsonp_init");
var configs_1 = require("./configs");
var webpackJsonp = /** @class */ (function () {
    function webpackJsonp(confs, callBack) {
        if (confs === void 0) { confs = {}; }
        if (callBack === void 0) { callBack = new Function(); }
        this.configs = __assign({}, configs_1["default"], confs);
        this.callBack = callBack;
    }
    webpackJsonp.prototype.apply = function (compiler) {
        var _this = this;
        this.callBack.call(this, compiler);
        try {
            if (this.configs.done) {
                compiler.plugin('done', function (compilation) {
                    var dirPath = _this.configs.filePath;
                    if (fs.existsSync(dirPath)) {
                        var data_1 = fs.readFileSync(dirPath, { encoding: "utf8" });
                        var scriptAll = data_1.match(/<script(.|\s).*?><\/script>/img);
                        var resData_1 = scriptAll.map(function (e) {
                            return {
                                old: e,
                                filter: _this.configs.srtList.some(function (n) { return e.indexOf(n) > 0; }),
                                newd: e.replace(/(<script(.|\s).*src(=|='|="))|(><\/script>)/img, "")
                            };
                        }).filter(function (e) { return e.filter; });
                        resData_1.forEach(function (e, i) {
                            if (i == 0) {
                                data_1 = data_1.replace(new RegExp(e.old), "\n                            <script>\n                                (" + webpackJsonp_init_1["default"].toString() + ")(window," + JSON.stringify(resData_1.map(function (e) { return e.newd; })) + "," + _this.configs.time + ")\n                            </script>");
                            }
                            else {
                                data_1 = data_1.replace(new RegExp(e.old), "");
                            }
                        });
                        fs.writeFileSync(dirPath, data_1);
                    }
                });
            }
        }
        catch (e) { }
        try {
            if (this.configs.plugin) {
                for (var pluginName in this.configs.plugin) {
                    compiler.plugin(pluginName, this.configs.plugin[pluginName].bind(this));
                }
            }
        }
        catch (e) { }
        this.configs.callBack.call(this, compiler);
        if (this.configs.exit) {
            process.exit();
        }
    };
    return webpackJsonp;
}());
module.exports = webpackJsonp;
