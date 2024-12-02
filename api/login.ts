import { request } from "@/utils/http";

export function userRegister(data: any) {
  return request.post({
    url: "/register",
    data,
  });
}
export function userLogin(data: any) {
  return request.post({
    url: "/token",
    data,
  });
}
export function getRsaKey() {
  return request.get({
    url: "/rsaKey",
  });
}
