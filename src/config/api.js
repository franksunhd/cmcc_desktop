// 引入axios
import axios from 'axios';

// 所有接口的 base_url 前缀
// var root = 'http://172.22.54.129:9001/';

var root = 'http://127.0.0.1:9001/';

function apiAxios(method, url, params, success) {
    axios({
        method: method, // 请求方式 post get delete get等
        url: url, // 具体接口地址
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
        baseURL: root, // base_url
        withCredentials: false,  // cookie
        headers: {
            'Content-Type': 'application/json;charset=utf-8', // 请求头
        }
    }).then(function (res) {
        // 成功时回调
        if (success) {
            success(res.data);
        }
    }).catch(function (err) {
        return false;
    });
}

// 返回在vue模板中的调用接口
export default {
    // 查询
    get: function (url, params, success) {
        return apiAxios('GET', url, params, success);
    },
    // 修改
    post: function (url, params, success) {
        return apiAxios('POST', url, params, success);
    },
    // 更新
    put: function (url, params, success) {
        return apiAxios('PUT', url, params, success);
    },
    // 删除
    delete: function (url, params, success) {
        return apiAxios('DELETE', url, params, success);
    },
    root: function () {
        return root;
    }
}
