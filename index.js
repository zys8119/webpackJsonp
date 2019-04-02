var fs= require("fs");
const webpackJsonp_init = require("./webpackJsonp_init");
const configs = require("./configs");
class webpackJsonp {
    constructor(confs = {},callBack = new Function()){
        this.configs = configs;
        for (let k in confs) {
            this.configs[k] = confs[k];
        }
    }

    apply(compiler){
        try {
            if(this.configs.done){
                compiler.plugin('done', (compilation)=> {
                    let dirPath = this.configs.filePath;
                    if(fs.existsSync(dirPath)){
                        let data = fs.readFileSync(dirPath,{encoding :"utf8"});
                        let scriptAll = data.match(/<script(.|\s).*?><\/script>/img);
                        let jsNameListData = this.configs.srtList;
                        let resData = scriptAll.map(e=>{
                            return {
                                old:e,
                                filter:jsNameListData.some(n=>e.indexOf(n) > 0),
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