import React from "react";
import { DashHeading } from "../../../components/dashboard-components/DashHeading";
import { Accordion, AccordionItem, Spinner } from "@heroui/react";
import { useGetAllFaqsQuery } from "../../../redux/api/faq";

const StudentFaqs = () => {
  const { data, isLoading } = useGetAllFaqsQuery({ targetAudience: "students", isActive: "true" });

  return (
    <div className="bg-white sm:bg-linear-to-t from-[#F1C2AC]/50 to-[#95C4BE]/50 px-2 sm:px-6 py-4 min-h-screen">
      <DashHeading
        title={"FAQs"}
        desc={"Find quick answers to common questions for students."}
      />
      <div className="my-3">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" color="success" />
          </div>
        ) : !data?.data || data.data.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100 italic text-gray-400">
            No FAQs found at the moment.
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
                  <h1 className="text-lg text-[#333333] font-bold">
                    {item.question}
                  </h1>
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
    </div>
  );
};

export default StudentFaqs;
