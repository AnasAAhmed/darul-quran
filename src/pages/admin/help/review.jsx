import React from "react";
import { DashHeading } from "../../../components/dashboard-components/DashHeading";
import { Avatar, Button } from "@heroui/react";

const VerticalStars = ({ rating = 5 }) => {
  return (
    <div className="flex flex-row items-start "> {/* Negative spacing سے stars کو closer کرنے کے لیے */}
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={star} className="h-4">
          <span className="text-yellow-500 text-xl">★</span>
        </div>
      ))}
    </div>
  );
};

const reviews = [
  {
    id: 1,
    name: "Grace King",
    desc: "Working with DarulQuran was a pleasure. Their web design team created a stunning website that perfectly captured our brand's essence. The feedback from our customers has been overwhelmingly positive.",
    last_active: "2 hourse ago",
    email: "john.davis@email.com",
    roles: "Students",
  },
  {
    id: 2,
    name: "Grace King",
    desc: "Working with DarulQuran was a pleasure. Their web design team created a stunning website that perfectly captured our brand's essence. The feedback from our customers has been overwhelmingly positive. Firstly I followed comments and bought 2 sizes smaller than my actual size. The sizing is totally out. Not one mm of my body shape was snatched as claimed. I wrote to customer services the day I got them for a refund.",
    last_active: "2 hourse ago",
    email: "john.davis@email.com",
    roles: "Students",
  },
  {
    id: 3,
    name: "Grace King",
    desc: "Working with DarulQuran was a pleasure. Their web design team created a stunning website that perfectly captured our brand's essence. The feedback from our customers has been overwhelmingly positive.",
    last_active: "2 hourse ago",
  },
  {
    id: 3,
    name: "Grace King",
desc: "Working with DarulQuran was a pleasure. Their web design team created a stunning website that perfectly captured our brand's essence. The feedback from our customers has been overwhelmingly positive. Firstly I followed comments and bought 2 sizes smaller than my actual size. The sizing is totally out. Not one mm of my body shape was snatched as claimed. I wrote to customer services the day I got them for a refund.",
    last_active: "2 hourse ago",
  },
  {
    id: 3,
    name: "Grace King",
    desc: "Working with DarulQuran was a pleasure. Their web design team created a stunning website that perfectly captured our brand's essence. The feedback from our customers has been overwhelmingly positive.",
    last_active: "2 hourse ago",
  },
];

const Review = () => {
  return (
    <div className="bg-white sm:bg-linear-to-t from-[#F1C2AC]/50 to-[#95C4BE]/50 px-2 sm:px-3">
      <DashHeading
        title={"Reviews"}
        desc={"See what students are saying about this course"}
      />
      {reviews.map((item, index) => (
        <div className="p-4 bg-white rounded-lg my-2" key={index}>
          <div className="flex gap-3">
            <Avatar src="/icons/review.png" alt="avatar" size="lg" />
            <div className="flex flex-col">
              <h1 className="text-md font-bold">{item.name}</h1>
              {/* Vertical stars component استعمال کریں */}
              <div className="">
                <VerticalStars rating={5} />
              </div>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[#06574C] text-md">{item.desc}</p>
          </div>
        </div>
      ))}
      <div className="my-3 w-full flex justify-end gap-3">
        <Button variant="bordered" size="md" className="border-[#06574C] text-[#06574C]">
        Explore
        </Button>
        <Button className="bg-[#06574C] text-white">
          Get all reviews
        </Button>
      </div>
    </div>
  );
};

export default Review;