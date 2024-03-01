"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { Home } from "lucide-react";
import React from "react";

export const CustomBreadCrumb = ({ items }: { items: string[] }) => {
  return (
    <Breadcrumbs as={"div"}>
      <BreadcrumbItem>
        <Home />
      </BreadcrumbItem>
      {items.map((item, index) => (
        <BreadcrumbItem key={index}>{item}</BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};
