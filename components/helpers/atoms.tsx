"use client";
import { Button } from "@nextui-org/react";
import { Facebook } from "lucide-react";
import { Twitter } from "lucide-react";
import { Share2 } from "lucide-react";
import React, { useEffect } from "react";

function share(url: string, text: string, share?: boolean) {
  if (navigator.share && share) {
    navigator
      .share({
        title: "Check this out!",
        text,
        url,
      })
      .catch((error) => console.log("Error sharing", error));
  } else {
    window.open(url, "_blank");
  }
}

const IconContainer = ({
  children,
  url,
  shareUrl,
}: {
  children: React.ReactNode;
  url: string;
  shareUrl?: boolean;
}) => {
  return (
    <Button
      isIconOnly
      size="sm"
      variant="bordered"
      className="bg-transparent"
      onClick={() => share(url, "Check this out!", shareUrl)}
    >
      {children}
    </Button>
  );
};

export function CustomShare() {
  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    setUrl(window.location.href);
  }, []);
  if (!url) return null;
  return (
    <div className="fx-center gap-2">
      <IconContainer
        url={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`}
      >
        <Facebook size={13} />
      </IconContainer>
      <IconContainer
        url={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
      >
        <Twitter size={13} />
      </IconContainer>
      <IconContainer url={url} shareUrl={true}>
        <Share2 size={13} />
      </IconContainer>
    </div>
  );
}
