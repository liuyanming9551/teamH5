import axios from 'axios';
import Qs from 'qs';
// 请求列表
const requestList = [];
// 取消列表
const CancelToken = axios.CancelToken;
let sources = {};

/**
 * @Description: 测试环境代码
 * @author YanMing Liu
 * @date 2019/3/15
*/
//const baseUrl = 'http://139.129.222.23:8021';
    
const baseUrl = 'http://10.168.1.138:5656';
axios.defaults.baseURL = baseUrl;
/**
 * @Description: 线上环境代码
 * @author YanMing Liu
 * @date 2019/3/15
*/

// let protocol = window.location.protocol; //协议
// let host = window.location.host; //主机
// let reg = /^localhost+/;
// let baseUrl = ''
// if(reg.test(host)) {
//     //若本地项目调试使用
//     axios.defaults.baseURL = 'http://10.168.1.138:5656';
//     baseUrl = 'http://10.168.1.138:5656';
// } else {
//     //动态请求地址
//     axios.defaults.baseURL = protocol + "//" + 8021;
//     baseUrl = protocol + "//" + 8021;
// }

axios.defaults.timeout = 30000;

axios.interceptors.request.use((config) => {
    const request = JSON.stringify(config.url) + JSON.stringify(config.data)

    config.cancelToken = new CancelToken((cancel) => {
        sources[request] = cancel
    })
    if(requestList.includes(request)){
        sources[request]('取消重复请求')
    }else{
        requestList.push(request)

    }

    return config
}, function (error) {
    return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
    const request = JSON.stringify(response.config.url) + JSON.stringify(response.config.data)
    requestList.splice(requestList.findIndex(item => item === request), 1)
    return response
}, function (error) {
    if (axios.isCancel(error)) {
        requestList.length = 0

        throw new axios.Cancel('cancel request')
    } else {
        console.log('网络请求失败!')
    }
    return Promise.reject(error)
})

const request = function (url, params, config, method) {
    return new Promise((resolve, reject) => {
        axios[method](url, params, Object.assign({}, config)).then(response => {
            resolve(response.data)
        }, err => {
            if (err.Cancel) {
                console.log(err)
            } else {
                reject(err)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

const post = (url, params, config = {}) => {
    return request(url, Qs.stringify(params), config, 'post')
}

const get = (url, params, config = {}) => {
    return request(url, params, config, 'get')
}

export {sources, post, get,baseUrl}