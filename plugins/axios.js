import axios from "axios";
import qs from "qs";
import {
  Message
} from 'element-ui';

// 读取环境配置获取接口地址
axios.defaults.baseURL = "http://hplqytest.suoluomei.cn/index.php?s=/hfs/Api/";

//post请求头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

//设置超时
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
  config => {
    //添加loading
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    if (response.status == 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    // 错误提示
    Message.error('服务器请求失败');
  }
);

export default function axiosApi(type, params, method) {
  const api_key = "195a9b99ea7a0d259151b5c412bb631b"
  const sign = "17a1920fdc3c3c25d1bf7c6dd724f5cf"
  var data = method == "post" ? qs.stringify(
    Object.assign({
      api_key: api_key,
      sign: sign
    }, params)
  ) : Object.assign({
    api_key: api_key,
    sign: sign
  }, params)
  return new Promise((resolve, reject) => {
    axios({
        url: type,
        method: method,
        data: data
      })
      .then(res => {
        if (res.data.errcode == 0) {
          resolve(res.data)
        } else {
          Message.error(res.data.msg);
        }
      })
      .catch(err => {
        reject(err)
      });
  })
};