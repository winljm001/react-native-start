import request from "@/utils/request";
import { stringify } from "qs";

export function Add(params) {
  return request(`/admin/Bill/add`, {
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
