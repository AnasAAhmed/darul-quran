import React, { useState } from "react";
import { DashHeading } from "../../../components/dashboard-components/DashHeading";
import {
  Accordion,
  AccordionItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Textarea,
  Select,
  SelectItem,
  Spinner,
  Tooltip,
} from "@heroui/react";
import {
  useCreateFaqMutation,
  useGetAllFaqsQuery,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} from "../../../redux/api/faq";
import { successMessage, errorMessage } from "../../../lib/toast.config";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const Faqs = () => {
  const { data, isLoading } = useGetAllFaqsQuery();
  const [createFaq, { isLoading: isCreating }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFaq, setSelectedFaq] = useState(null);
  
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "General",
    targetAudience: "all",
  });

  const handleOpen = (faq = null) => {
    if (faq) {
      setSelectedFaq(faq);
      setFormData({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        targetAudience: faq.targetAudience,
      });
    } else {
      setSelectedFaq(null);
      setFormData({
        question: "",
        answer: "",
        category: "General",
        targetAudience: "all",
      });
    }
    onOpen();
  };

  const handleSubmit = async () => {
    if (!formData.question || !formData.answer) {
      errorMessage("Please fill in all required fields");
      return;
    }

    try {
      let res;
      if (selectedFaq) {
        res = await updateFaq({ id: selectedFaq.id, data: formData }).unwrap();
      } else {
        res = await createFaq(formData).unwrap();
      }

      if (res.success) {
        successMessage(res.message);
        onClose();
      }
    } catch (err) {
      errorMessage(err?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      try {
        const res = await deleteFaq(id).unwrap();
        if (res.success) {
          successMessage(res.message);
        }
      } catch (err) {
        errorMessage(err?.data?.message || "Failed to delete FAQ");
      }
    }
  };

  const targetAudiences = [
    { label: "All Users", value: "all" },
    { label: "Teachers", value: "teachers" },
    { label: "Students", value: "students" },
  ];

  return (
    <div className="bg-white sm:bg-linear-to-t from-[#F1C2AC]/50 to-[#95C4BE]/50 px-2 sm:px-6 py-4 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <DashHeading
          title={"FAQs Management"}
          desc={"Manage quick answers to common questions."}
        />
        <Button
          color="success"
          startContent={<FiPlus />}
          onPress={() => handleOpen()}
          className="shadow-md"
        >
          Add New FAQ
        </Button>
      </div>

      <div className="my-3">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" color="success" />
          </div>
        ) : !data?.data || data.data.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100 italic text-gray-400">
            No FAQs found. Click "Add New FAQ" to create one.
          </div>
        ) : (
          <Accordion
            variant="splitted"
            selectionBehavior="toggle"
            itemClasses={{
              indicator:
                "rounded-full bg-[#F1F2F9] data-[open=true]:bg-[linear-gradient(360.06deg,_#95C4BE_5.92%,_#06574C_89.21%)] p-1 data-[open=true]:text-white ",
              base: "mb-2 pb-3",
              trigger: "pb-0",
            }}
          >
            {data.data.map((item) => (
              <AccordionItem
                key={item.id}
                aria-label={`FAQ ${item.id}`}
                title={
                  <div className="flex justify-between items-center w-full pr-4">
                    <div className="flex flex-col">
                      <h1 className="text-lg text-[#333333] font-bold">
                        {item.question}
                      </h1>
                      <div className="flex gap-2 mt-1">
                        <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full capitalize">
                          {item.category}
                        </span>
                        <span className="text-[10px] bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full capitalize">
                          Target: {item.targetAudience}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Tooltip content="Edit FAQ">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-blue-500"
                          onPress={() => handleOpen(item)}
                        >
                          <FiEdit2 size={16} />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Delete FAQ" color="danger">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-red-500"
                          onPress={() => handleDelete(item.id)}
                        >
                          <FiTrash2 size={16} />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                }
              >
                <div className="mt-2 border-t border-gray-100 pt-3">
                  <p className="text-sm text-[#666666] leading-relaxed whitespace-pre-wrap">
                    {item.answer}
                  </p>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size="lg" backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-[#06574C]">
                {selectedFaq ? "Edit FAQ" : "Add New FAQ"}
              </ModalHeader>
              <ModalBody className="gap-4">
                <Input
                  label="Question"
                  placeholder="Enter the FAQ question"
                  variant="bordered"
                  labelPlacement="outside"
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                />
                <Textarea
                  label="Answer"
                  placeholder="Enter the detailed answer"
                  variant="bordered"
                  labelPlacement="outside"
                  minRows={4}
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData({ ...formData, answer: e.target.value })
                  }
                />
                <div className="flex gap-4">
                  <Input
                    label="Category"
                    placeholder="e.g. General, Payments"
                    variant="bordered"
                    labelPlacement="outside"
                    className="w-1/2"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  />
                  <Select
                    label="Target Audience"
                    variant="bordered"
                    labelPlacement="outside"
                    className="w-1/2"
                    selectedKeys={[formData.targetAudience]}
                    onSelectionChange={(keys) =>
                      setFormData({
                        ...formData,
                        targetAudience: Array.from(keys)[0],
                      })
                    }
                  >
                    {targetAudiences.map((audience) => (
                      <SelectItem key={audience.value} value={audience.value}>
                        {audience.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="success"
                  isLoading={isCreating || isUpdating}
                  onPress={handleSubmit}
                >
                  {selectedFaq ? "Update" : "Create"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Faqs;

