declare const require: any;
declare const __dirname: any;
var path= require("path");
import { InterfaceConfigsOption } from "./typeScript"
export default <InterfaceConfigsOption> {
    filePath:path.join(__dirname, '../../dist/index.html'),
    srtList:['app'],
    time:null,
    exit:false,
    callBack:new Function(),
    done:true,
    plugin:null,
    pluginDone:null,
}
