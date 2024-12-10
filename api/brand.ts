import { request } from "@/utils/http";

export function getBrandListApi() {
  return request.get({
    url: "/api/brand/list",
  });
}
export function createBrandApi(data: any) {
  return request.post({
    url: "/api/brand",
    data,
  });
}

// 调用品观网api 获取品牌列表
export function getBrandPinguanApi(params: any) {
  return request.get(
    {
      url: "https://m.pinguan.com/search/brand",
      params,
    },
    {
      joinPrefix: false,
      isTransformRequestResult: false,
    },
  )
}
