import React from "react";
import Image from "next/image";

const Home = async () => {
  return (
    <div className="flex flex-col relative gap-5">
      <Image
        className="absolute  opacity-50 top-40 h-[100vh] md:w-3/4 object-cover  "
        alt="Card background"
        src="/mesh.png"
        width={500}
        height={500}
        objectFit="cover"
      />
    </div>
  );
};

export default Home;
