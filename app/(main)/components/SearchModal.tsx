import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Search } from "lucide-react";
import { Input } from "@nextui-org/react";
export default function SearchModal({
  isOpen,
  onOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
}) {
  return (
    <div className="items-center justify-center">
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          closeButton: "hidden",
        }}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className=" ">
                <div className="flex items-center gap-1 py-2">
                  <Search className="text-secondary-700" />
                  <input
                    placeholder="Search for a school"
                    width="100%"
                    className="bg-transparent border-none outline-none
                  placeholder-gray-500 text-secondary-700
                  "
                  />
                </div>
                <h2>Suggestions</h2>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
