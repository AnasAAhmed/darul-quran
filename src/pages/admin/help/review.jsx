import React, { useState } from "react";
import { DashHeading } from "../../../components/dashboard-components/DashHeading";
import { Avatar, Button, Pagination, Spinner, User } from "@heroui/react";
import { useSearchParams } from "react-router-dom";
import { useGetReviewsQuery, useDeleteReviewMutation } from "../../../redux/api/courses";
import { Trash2 } from "lucide-react";
import { errorMessage, successMessage } from "../../../lib/toast.config";
import RatingStars from "../../../components/RatingStar";

const Review = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isDeleting, setIsDeleting] = useState(null);

  const { data, isFetching, isError, error, refetch } = useGetReviewsQuery(
    { courseId: id, page, limit },
    { skip: !id }
  );

  const [deleteReview] = useDeleteReviewMutation();

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      setIsDeleting(reviewId);
      const result = await deleteReview(reviewId).unwrap();
      if (result.success) {
        successMessage(result.message || "Review deleted successfully");
      }
    } catch (err) {
      errorMessage(err?.data?.message || err?.message || "Failed to delete review");
    } finally {
      setIsDeleting(null);
    }
  };

  if (isError) {
    return (
      <div className="text-center text-red-500 py-8">
        Error: {error?.data?.message || error?.message || "Failed to load reviews"}
      </div>
    );
  }

  const reviews = data?.reviews || [];
  const totalPages = data?.totalPages || 0;
  const totalReviews = data?.total || 0;

  return (
    <div className="bg-white sm:bg-linear-to-t from-[#F1C2AC]/50 to-[#95C4BE]/50 px-2 sm:px-3 min-h-screen">
      <DashHeading
        title={"Reviews"}
        desc={"See what students are saying about this course"}
      />

      {isFetching && !reviews.length ? (
        <div className="flex justify-center items-center py-12">
          <Spinner size="lg" color="success" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 text-lg">No reviews found for this course.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {reviews.map((item) => (
              <div
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                key={item.id}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex gap-3 flex-1">
                    <Avatar
                      name={item.username || "User"}
                      size="lg"
                      color="success"
                    />
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-md font-bold text-gray-800">
                          {item.username || "Anonymous"}
                        </h1>
                        <RatingStars rating={item.rating || 0} /> ({item.rating || 0})
                      </div>
                      <p className="text-sm text-gray-500">{item.email}</p>
                    </div>
                  </div>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="danger"
                    onPress={() => handleDelete(item.id)}
                    isLoading={isDeleting === item.id}
                    isDisabled={isDeleting === item.id}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
                <div className="mt-3 ml-14">
                  <p className="text-[#06574C] text-md">{item.description || "No description provided"}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="my-6 w-full flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show:</span>
                <select
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                  }}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#06574C]"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-600 ml-2">
                  ({totalReviews} total reviews)
                </span>
              </div>
              <Pagination
                className=""
                showControls
                variant="ghost"
                initialPage={1}
                page={page}
                total={totalPages}
                onChange={setPage}
                classNames={{
                  item: "rounded-sm hover:bg-[#06574C]/10",
                  cursor: "bg-[#06574C] rounded-sm text-white",
                  prev: "rounded-sm bg-white/80",
                  next: "rounded-sm bg-white/80",
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Review;