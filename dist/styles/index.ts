export type IProducts = {
  productName: string;
  price: number;
  quantity: number;
};

export type ITimestamps = {
  timestamps: boolean;
};

export type IPaganition = {
  page: number;
  pageSize: number;
};

export const maxSize: number = 3;
export const maxSizeImage: number = maxSize * 1024 * 1024;
