export interface InterfaceConfigsOption {
    //需要处理的文件路径
    filePath?:string,
    //替换字符串条件=>["manifest","vendor",'app']
    srtList?:string[],
    //查询时间
    time?:null|number,
    //是否终止程序，调试用
    exit?:boolean,
    //插件回调，做你想做的是
    callBack?():void,
    //是否运行默认的done钩子
    done?:boolean,
    //webpack插件钩子列表
    plugin:null|any[]
    //webpack插件钩子列表
    pluginDone?(fileData):void
}
