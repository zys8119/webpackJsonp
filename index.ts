declare const require: any;
declare const process: any;
declare const module: any;
var fs= require("fs");
import webpackJsonp_init from "./webpackJsonp_init"
import configs from "./configs"
import {
    InterfaceConfigsOption
} from "./typeScript"
class webpackJsonp {
    configs:InterfaceConfigsOption;
    callBack:Function;
    constructor(confs={},callBack = new Function()){
        this.configs = {...configs,...confs}
        this.callBack = callBack;
    }

    apply(compiler){
        this.callBack.call(this,compiler);
        try {
            if(this.configs.done){
                compiler.plugin('done', (compilation)=> {
                    let dirPath = this.configs.filePath;
                    if(fs.existsSync(dirPath)){
                        let data = fs.readFileSync(dirPath,{encoding :"utf8"});
                        if(this.configs.pluginDone){
                            data = this.configs.pluginDone(data);
                            fs.writeFileSync(dirPath, data);
                            return;
                        }
                        let scriptAll = data.match(/<script(.|\s).*?><\/script>/img);
                        let resData = scriptAll.map(e=>{
                            return {
                                old:e,
                                filter:this.configs.srtList.some(n=>e.indexOf(n) > 0),
                                newd:e.replace(/(<script(.|\s).*src(=|='|="))|(><\/script>)/img,"")
                            }
                        }).filter(e=>e.filter);
                        resData.forEach((e,i)=>{
                            if(i == 0){
                                data = data.replace(new RegExp(e.old),`
                            <script>
                                (${webpackJsonp_init.toString()})(window,${JSON.stringify(resData.map(e=>e.newd))},${this.configs.time})
                            </script>`);
                            } else {
                                data = data.replace(new RegExp(e.old),"");
                            }

                        });
                        fs.writeFileSync(dirPath, data);
                    }
                });
            }
        }catch (e) {}
        try {
            if(this.configs.plugin){
                for (let pluginName in this.configs.plugin){
                    compiler.plugin(pluginName,this.configs.plugin[pluginName].bind(this));
                }
            }
        }catch (e) {}
        this.configs.callBack.call(this,compiler);
        if(this.configs.exit){
            process.exit();
        }
    }
}
module.exports = webpackJsonp;
