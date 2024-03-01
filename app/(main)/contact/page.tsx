"use client";
import { Button, Input, Textarea } from "@nextui-org/react";
import React from "react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="w-full min-h-[70vh] fx-col-c pxs">
      <form onSubmit={handleSubmit} className="gap-3  fx-col-c ">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className=" opacity-70 p-style tc">
          You can contact us by filling the form below
        </p>
        <Input name="name" placeholder="Your Name" />
        <Input name="email" placeholder="Your Email" />
        <Textarea name="message" minRows={4} placeholder="Your Message" />
        <div className="flex-end">
          <Button color="primary" type="submit">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
