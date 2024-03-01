"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { useAuth } from "@/utils/AuthContext";
import { useState } from "react";
export default function AuthModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useAuth().modalStates;
  const { handleGoogleLogin, handleSignIn } = useAuth();
  const [type, setType] = useState<"login" | "signup">("login");

  return (
    <>
      <div className="items-center justify-center ">
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          className="m-4"
          isDismissable={false}
          scrollBehavior={"inside"}
        >
          <ModalContent>
            {(onClose) => (
              <>
                {type === "login" ? (
                  <>
                    <ModalHeader className="flex mt-5 flex-col gap-1">
                      <h1 className="flex justify-center h2-style">
                        Welcome Back
                      </h1>
                    </ModalHeader>
                    <ModalBody className="py-5">
                      <div className="fx-col-c gap-5">
                        <div className="flex">
                          <Button
                            className="w-full"
                            color="success"
                            onClick={handleGoogleLogin}
                          >
                            Login with Google
                          </Button>
                        </div>
                        <div className="fx-center">
                          <p className="text-sm opacity-70 w-3/4 text-center ">
                            Login with Google to access your account and manage
                            your order and services.
                          </p>
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      Dont have an account?{" "}
                      <button
                        className="underline"
                        onClick={() => setType("signup")}
                      >
                        Signup
                      </button>
                    </ModalFooter>
                  </>
                ) : (
                  <>
                    <ModalHeader className="flex mt-5 flex-col gap-1">
                      <h1 className="flex justify-center h2-style">
                        Create an Account
                      </h1>
                    </ModalHeader>
                    <ModalBody className="py-5">
                      <div className="fx-col-c gap-5">
                        <div className="flex">
                          <Button
                            className="w-full"
                            color="success"
                            onClick={handleSignIn}
                          >
                            Sign in with Google
                          </Button>
                        </div>
                        <div className="fx-center">
                          <p className="text-sm opacity-70 w-3/4 text-center ">
                            Sign in with Google to access your account and
                            manage your orders and services.
                          </p>
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      Already have an account?{" "}
                      <button
                        className="underline"
                        onClick={() => setType("login")}
                      >
                        Login
                      </button>
                    </ModalFooter>
                  </>
                )}
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
