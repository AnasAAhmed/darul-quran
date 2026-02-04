/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { DashHeading } from "../../../components/dashboard-components/DashHeading";
import {
  Button,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea
} from "@heroui/react";
import {
  Download,
  Eye,
  ListFilterIcon,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import * as motion from "motion/react-client";
import toast from "react-hot-toast";

const PaymentsInvoices = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Refund Modal State
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [refundReason, setRefundReason] = useState("");
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState(null);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/payment/history`, { credentials: 'include' });
      const data = await res.json();
      if (data.success) setPayments(data.history);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const openRefundModal = (id) => {
    setSelectedEnrollmentId(id);
    setRefundReason("");
    onOpen();
  };

  const submitRefund = async (onClose) => {
    if (!refundReason.trim()) {
      toast.error("Please enter a reason");
      return;
    }

    const loadingToast = toast.loading("Submitting request...");
    try {
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/payment/refund-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ enrollmentId: selectedEnrollmentId, reason: refundReason })
      });
      const data = await res.json();
      toast.dismiss(loadingToast);

      if (data.success) {
        toast.success("Refund requested successfully");
        fetchPayments(); // Refresh list
        onClose();
      } else {
        toast.error(data.message || "Failed to request refund");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Network error");
    }
  };

  const statuses = [
    { key: "all", label: "All Status" },
    { key: "draft", label: "Draft" },
    { key: "published", label: "Published" },
  ];
  const filters = [{ key: "all", label: "Filter" }];

  const header = [
    { key: "Course Name", label: "Course Name" },
    { key: "Date", label: "Date" },
    { key: "Prices", label: "Prices" },
    { key: "Payment Method", label: "Payment Method" },
    { key: "Status", label: "Status" },
    { key: "Action", label: "Action" },
  ];
  const limits = [
    { key: "10", label: "10" },
    { key: "20", label: "20" },
    { key: "30", label: "30" },
    { key: "40", label: "40" },
    { key: "50", label: "50" },
  ];

  return (
    <div className="bg-white bg-linear-to-t from-[#F1C2AC]/50 to-[#95C4BE]/50 h-screen px-2 sm:px-3 overflow-y-auto">
      <DashHeading
        title={"Payments & Invoices"}
        desc={"Keep track of all payments with transparency and ease"}
      />
      <div className="bg-[#EBD4C9] flex-wrap gap-2 p-2 sm:p-4 rounded-lg my-3 flex justify-between items-center">
        <div className="flex max-md:flex-wrap items-center gap-2 max-md:w-full">
          <Select
            className="w-full md:min-w-[120px]"
            radius="sm"
            defaultSelectedKeys={["all"]}
            placeholder="Select status"
          >
            {statuses.map((status) => (
              <SelectItem key={status.key}>{status.label}</SelectItem>
            ))}
          </Select>
          <Select
            radius="sm"
            className="w-full md:min-w-[120px]"
            defaultSelectedKeys={["all"]}
            selectorIcon={<ListFilterIcon />}
            placeholder="Filter"
          >
            {filters.map((filter) => (
              <SelectItem key={filter.key}>{filter.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {loading ? (
            <div className="flex justify-center p-10"><Spinner size="lg" /></div>
          ) : payments.length === 0 ? (
            <div className="text-center p-10 text-gray-500">No payment history found.</div>
          ) : (
            <Table
              isHeaderSticky
              aria-label="Payments table"
              removeWrapper
              classNames={{
                base: "w-full bg-white rounded-lg overflow-x-scroll w-full no-scrollbar mb-3",
                th: "font-bold p-4 text-md text-[#333333] capitalize tracking-widest bg-[#EBD4C936]",
                td: "py-3 items-center whitespace-nowrap",
                tr: "border-b border-default-200 ",
              }}
            >
              <TableHeader>
                {header.map((item) => (
                  <TableColumn key={item.key}>{item.label}</TableColumn>
                ))}
              </TableHeader>

              <TableBody>
                {payments.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="px-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {item.courseName}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 max-w-[200px] truncate">
                          {item.description || "Course Enrollment"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                    <TableCell>${item.amount}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 items-center">
                        <img src="/icons/Visa.svg" alt="Card" className="w-8" />
                        •••• 4242
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Button className={`text-sm p-2 rounded-md capitalize h-8 ${item.status === "completed" || item.status === "Complete" ? "bg-[#95C4BE33] text-[#06574C]" :
                          item.status === "pending" || item.status === "Pending" ? "bg-[#F1C2AC33] text-[#D28E3D]" :
                            "bg-[#FFEAEC] text-[#E8505B]"}`
                        }>
                          {item.status || "Completed"}
                        </Button>
                        {item.refundStatus && item.refundStatus !== 'none' && (
                          <span className="text-[10px] text-red-500 font-medium">Refund: {item.refundStatus}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      {item.receiptUrl ? (
                        <Button
                          radius="sm"
                          className="bg-[#06574C] text-white"
                          onPress={() => window.open(item.receiptUrl, '_blank')}
                          startContent={<Download size={18} color="white" />}
                        >
                          Download Invoice
                        </Button>
                      ) : (
                        <Button radius="sm" isDisabled variant="flat">
                          No Invoice
                        </Button>
                      )}

                      {item.status === 'completed' && (!item.refundStatus || item.refundStatus === 'none') && (
                        <Button variant="ghost" color="danger" radius="sm" onPress={() => openRefundModal(item.id)}>
                          Request Refund
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </motion.div>
        <div className="md:flex items-center pb-4 gap-2 justify-between overflow-hidden">
          <div className="flex text-sm items-center gap-1">
            <span>Showing</span>
            <Select
              radius="sm"
              className="w-[70px]"
              defaultSelectedKeys={["10"]}
              placeholder="1"
            >
              {limits.map((limit) => (
                <SelectItem key={limit.key}>{limit.label}</SelectItem>
              ))}
            </Select>
            <span className="min-w-56">Out of {payments.length}</span>
          </div>
          <Pagination
            className=""
            showControls
            variant="ghost"
            initialPage={1}
            total={Math.ceil(payments.length / 10) || 1}
            classNames={{
              item: "rounded-sm hover:bg-bg-[#06574C]/50",
              cursor: "bg-[#06574C] rounded-sm text-white",
              prev: "rounded-sm bg-white/80",
              next: "rounded-sm bg-white/80",
            }}
          />
        </div>
        <div className="text-center text-xs text-gray-500 mt-4 pb-4 font-style-italic">
          Note: “Classes will resume after the next successful payment inshaAllah.”
        </div>

      </AnimatePresence>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Request Refund</ModalHeader>
              <ModalBody>
                <p className="text-sm text-gray-500 mb-2">Please provide a reason for your refund request. Our team will review it shortly.</p>
                <Textarea
                  label="Reason"
                  placeholder="Enter your reason here..."
                  value={refundReason}
                  onValueChange={setRefundReason}
                  minRows={3}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={() => submitRefund(onClose)}>
                  Submit Request
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div >
  );
};

export default PaymentsInvoices;
