type GoodsType = {
  category: string;
  goodsName: string;
  quantity: number;
  brandName?: string;
  model?: string;
  id?: string | number;
  barcode?: string;
  cover?: string;
  price?: number;
};
type BrandType = {
  id?: string
  brandName?: string;
  logo?: string;
  enName?: string;
  code?: string;
  remark?: string;
};
