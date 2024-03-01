"use client"; // Error components must be Client Components

import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="main-h fx-col-c gap-3 pxs">
      <Image
        className="absolute top-0 
        left-0 mb:h-full md:w-full pointer-events-none object-cover opacity-70  "
        alt="Card background"
        src="/map-mesh.png"
        width={1000}
        height={1000}
      />
      <p className="p-style text-center">There was a problem</p>
      <h1 className="h1-style tc">{error.message || "Something went wrong"}</h1>
      <div className="flex gap-2">
        <Button color="warning" variant="bordered" onClick={() => reset()}>
          Try again
        </Button>
        <Button
          color="default"
          variant="bordered"
          onClick={() => window.location.reload()}
        >
          Reload
        </Button>
      </div>
    </div>
  );
}
