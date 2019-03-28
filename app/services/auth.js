import request from "@/utils/request";
import { stringify } from "qs";

export function login(params) {
  return request(`/admin/Login/index`, {
    method: "post",
    body: params
  });
}
export function register(params) {
  return request(`/admin/User/register`, {
    method: "post",
    body: params
  });
}
