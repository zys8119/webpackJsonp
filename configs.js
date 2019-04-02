var path= require("path");
module.exports = {
    //需要处理的文件路径
    filePath:path.join(__dirname, '../../dist/index.html'),
    //替换字符串条件
    srtList:[
        // "manifest",
        // "vendor",
        'app'],
    //查询时间
    time:null,
    //是否终止程序，调试用
    exit:false,
    //插件回调，做你想做的是
    callBack:new Function(),
    //是否运行默认的done钩子
    done:true,
    //webpack插件钩子列表
    plugin:null
};