import systemConfig from "@/config/systemConfig";
import { Storage } from "@/utils";
import axios from "axios";
import {
  errorCode,
  errorMsg,
  handleCommonError,
  handleNoCommontError
} from "./errorHandle";

const { host, baseUrl, authKey } = systemConfig;
axios.interceptors.response.use(
  response => response.data,
  error => {
    // console.log(error)
    const { response } = error;
    // 请求有响应
    if (response) {
      const { status, data, config } = response;
      data.message = data.message || errorMsg;
      const { code, message } = data;
      if (status === 400) {
        handleCommonError(data, config);
        // TODO:当状态码为400时
        const errorObj = { code, message };
        if (data && data.code >= 240015 && data.code <= 240021) {
          return Promise.reject(new Error(JSON.stringify(errorObj)));
        }
        if (data && data.code === errorCode.c330024) {
          return Promise.reject(new Error(JSON.stringify(errorObj)));
        }
        return Promise.reject(message);
      }
      // 404 502 ..
      // const msg = errorMsg
      handleNoCommontError(errorMsg);
      return Promise.reject(errorMsg);
      // throw message;
    }
    // 请求超时
    if (error.code === "ECONNABORTED") {
      // 请求超时
      const timeoutMsg = "请求超时，请稍后再试";
      handleNoCommontError(timeoutMsg);
      return Promise.reject(timeoutMsg);
    }
    const networkErrorMsg = "您的网络出现问题，请检查网络重试";
    handleNoCommontError(networkErrorMsg);
    return Promise.reject(networkErrorMsg);
  }
);
// TODO: 添加options 类型interface
export default async function request(url, options) {
  const hasApi = url.indexOf("api") === -1; // true => no
  const hasUpdate = url.indexOf("https") === -1; // 判断是否APP版本升级的接口
  const Authorization = await Storage.get(authKey);
  const defaultOptions = {
    headers: {
      [authKey]: Authorization
    },
    credentials: "include",
    timeout: 10000,
    withCredentials: true,
    validateStatus(status) {
      return status >= 200 && status < 300; // default
    }
  };
  const newOptions = { ...defaultOptions, ...options };
  newOptions.data = newOptions.body;
  delete newOptions.body;

  const newUrl = hasApi ? baseUrl + url : url;
  const newHost = hasUpdate ? host : "";
  return axios(newHost + newUrl, newOptions);
}
