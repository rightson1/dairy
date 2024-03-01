import { IChildren } from "@/types";
import React from "react";
import { SellerAuthProvider } from "@/utils/sellerAuth";
const Layout = ({ children }: IChildren) => {
  return <SellerAuthProvider>{children}</SellerAuthProvider>;
};

export default Layout;
