import { request } from "@/utils/http";

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
