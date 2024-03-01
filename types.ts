import { SetStateAction } from "react";

export interface CustomModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
}

interface IFetched {
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}
export interface IAuthUser {
  email: string;
  displayName?: string;
  photoURL?: string;
  uid: string;
}
export interface ISellerBase {
  name: string;
  email: string;
  phone: string;
  location: string;
  uid: string;
  description?: string;
  thumbnail?: string;
}
export interface ISeller extends ISellerBase {
  slug: string;
}
export interface ISellerFetched extends ISellerBase, IFetched {}
export type IChildren = {
  children: React.ReactNode;
};
export interface IProductBase {
  name: string;
  price: number;
  description: string;
  thumbnail: string;
  category: string;
  active: boolean;
  slug: string;
}
export interface IProduct extends IProductBase {
  business: string;
  category: string;
}
export type IProductType = "product" | "service";

export interface IProductUpdate extends IProductBase {
  _id: string;
}
export interface IProductFetched extends IProductBase, IFetched {
  business: ISellerFetched;
}
export interface ImageInputProps {
  file: File | null;
  setFile: React.Dispatch<SetStateAction<File | null>>;
  multiple?: false;
}
export type InputChangeEventTypes =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;
export interface IFUser {
  displayName: string;
  email: string;
  uid: string;
}
export interface IUser extends IFUser {
  admin: boolean;
  status: "active" | "banned";
}
export interface IUserFetched extends IFUser, IFetched {}
export interface IOrder {
  displayName: string;
  email: string;
  phone: string;
  uid: string;
  description: string;
  price: number;
  quantity: number;
  business: string | ISellerFetched;
  product: string | IProductFetched;
}
export interface IOrderFetched extends IOrder, IFetched {
  status: "pending" | "completed" | "cancelled";
  product: IProductFetched;
  business: ISellerFetched;
}
