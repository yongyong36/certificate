/**
 * Created by sharon. on 2017/10/18.
 * 调用 Api
 * Api.request({
        type:type,
        payload: payload (requestUrl path上用到的参数传值 示例{key:value},
                          request data用到的参数传值 示例{params：{key:value}})
    },function(status,res){
        switch (status) {
            case 1:
                break;
            case 0:
                break;
            case -1:
                break;
        }
    })
 */
//请求url hostname
const requestHost = {
    app: {
        // host: 'https://appserver.hunlimao.com',
        // xcx: 'https://xcx.hunlimao.com',
        // host: 'http://staging.xitaoinfo.com/appserver',
        // host: 'http://192.168.2.11/appserver',
        host: 'http://127.0.0.1:3000',
    }
}

/**
 * params:{type,payload},cb: 回调函数
 * 根据不同type处理请求的参数
 * method（["GET","POST"],default: "GET"），
 * requestUrl，
 * options（["json",null],default: null）
 */
function request (params,cb){
    let method,requestUrl,payload,options;
    switch (params.type) {
        case "BANNER_LIST":
            requestUrl = requestHost.app.host + "/adSetting/list";
            break;
        default:
            break;
    }
    method = method || "GET";
    payload = params.payload ? params.payload.params : null;
    options = options || null;
    //调用 wx.request
    wxRequest(method, requestUrl,payload,options,cb);
}

/**
 * 执行 wx.request
 * 请求完成 执行回调函数 cb(),分别根据success，fail情况处理(status:[-1,0,1])将请求结果(res)返回
 */
function wxRequest(method,requestUrl,params,options,cb){
    options = options ? "application/json" : "application/x-www-form-urlencoded";
    wx.request({
        method: method,
        url: requestUrl,
        data: params || {},
        header: {
            'content-type': options
        },
        success: function (res) {
            // console.log(res)
            if (res.statusCode == 200) {
                cb && cb(1,res);
            } else {
                cb && cb(-1,res)
            }
        },
        fail: function(res) {
            cb && cb(0,res)
        }
    })
}

module.exports = {
    request: request
}

