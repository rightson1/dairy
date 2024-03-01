"use client";
import Categories from "@/components/home/Categories";
import Hero from "@/components/home/Hero";
import Bottom from "@/components/shared/Bottom";
import React from "react";

const Home = () => {
  const [search, setSearch] = React.useState("");
  return (
    <div>
      <Hero
        {...{
          search,
          setSearch,
        }}
      />
      <Categories
        {...{
          search,
          setSearch,
        }}
      />
      <Bottom />
    </div>
  );
};

export default Home;
