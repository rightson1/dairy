"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardBody,
  Image as CardImage,
  Skeleton,
} from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";

const LectureCardLoading = ({
  title,
  mesh,
}: {
  title: string;
  mesh: boolean;
}) => {
  return (
    <div className=" p-4 sm:p-8 flex flex-col gap-5 relative overflow-hidden">
      {mesh && (
        <Image
          className="absolute mb:opacity-100 top-10 right-0 w-3/4 opacity-50 "
          alt="Card background"
          src="/mesh.svg"
          width={500}
          height={500}
          objectPosition="center"
        />
      )}
      <h4 className="h3-style">{title}</h4>
      <div
        className="grid 
        gap-3 grid-cols-2 md:grid-cols-4 "
      >
        {[1, 2, 3, 4, 5, 6, 7].map((school, index) => (
          <Card key={school} className="py-4  px-2 fx-col gap-2  w-full">
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </Card>
        ))}
      </div>
      <div className="fx-center">
        <Pagination total={10 / 4} initialPage={1} />
      </div>
    </div>
  );
};

export default LectureCardLoading;
