"use client";
import React from "react";

import { CSSProperties } from "react";
import LoadingRandomMessage from "../components/LoadingRandomMessage";
const UniversalLoading = () => {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  return <LoadingRandomMessage />;
};

export default UniversalLoading;
