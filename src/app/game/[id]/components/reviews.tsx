import {
  Box,
  Button,
  Rating,
  SxProps,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Bird, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  useAddReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "../api/query";
import {
  MyReviewGameResponse,
  ReviewItemGameResponse,
} from "@/app/types/types";
import { useRouter } from "next/navigation";
import {
  IAddNewAndChangeReviewProps,
  IReviewItemProps,
  IReviewsProps,
} from "../types/game";
import { BuyButtonStateDeleteReview, BuyButtonStateSendReview } from "../utils/buttonState";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#FFBF00",
  },
  "& .MuiRating-iconHover": {
    color: "#FFBF00",
  },
});

const ReviewItem: React.FC<IReviewItemProps> = ({
  author,
  content,
  rating,
  date,
}) => {
  return (
    <Box
      mt={"20px"}
      bgcolor={"#0a0a0adb"}
      p={"20px"}
      width={"max-content"}
      borderRadius={"10px"}
    >
      <Typography fontSize={"23px"}>{author}</Typography>
      <Typography fontSize={"23px"} width={"780px"}>
        {content}
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={"row"}
      >
        <StyledRating
          sx={{ mt: "10px" }}
          name="read-only"
          value={rating}
          icon={<Bird fontSize="inherit" />}
          emptyIcon={<Bird color="#ffff" fontSize="inherit" />}
          readOnly
        />
        <Typography fontStyle={"italic"} fontSize={"19px"}>
          {date}
        </Typography>
      </Box>
    </Box>
  );
};

const AddNewAndChangeReview: React.FC<IAddNewAndChangeReviewProps> = ({
  value,
  setValue,
  rating,
  setRating,
  mutate,
  editMode,
  deleteReview,
  sendReviewButtonState,
  deleteReviewButtonState
}) => {
  const handleAddReview = () => {
    if (value && rating) {
      mutate();
    }
  };
  const handleDeleteReview = () => {
    if (editMode) {
      deleteReview();
    }
  };
  const handleClearReview = () => {
    setValue("")
    setRating(0)
  };
  return (
    <Box
      bgcolor={"#0a0a0adb"}
      p={"20px"}
      width={"max-content"}
      borderRadius={"10px"}
    >
      <TextField
        value={value}
        color="info"
        focused
        inputProps={{ maxLength: 1000 }}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        id="standard-multiline-static"
        label={editMode ? "Edit review" : "Add new review"}
        multiline
        sx={styleTextArea}
        maxRows={10}
        variant="standard"
      />
      <Box
        justifyContent={"space-between"}
        display={"flex"}
        width={"780px"}
        mt={"10px"}
      >
        <StyledRating
          sx={{ mt: "10px" }}
          name="customized-color"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          defaultValue={2}
          getLabelText={(value: number) =>
            `${value} Heart${value !== 1 ? "s" : ""}`
          }
          icon={<Bird fontSize="inherit" />}
          emptyIcon={<Bird color="#ffff" fontSize="inherit" />}
        />
        <Box>
          <Button
            variant="contained"
            disabled={!value || !rating || sendReviewButtonState.disabled}
            onClick={handleAddReview}
            sx={styleActionsButtons}
          >
            {sendReviewButtonState.message}
          </Button>
          {editMode && (
            <Button
              variant="contained"
              color="error"
              disabled={deleteReviewButtonState.disabled}
              onClick={handleDeleteReview}
              sx={styleActionsButtons}
            >
              {deleteReviewButtonState.message}
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleClearReview}
            sx={styleActionsButtons}
          >
            <X />
          </Button>
        </Box>

      </Box>
    </Box>
  );
};

const Reviews: React.FC<IReviewsProps> = ({ gameID, myReview, allReviews }) => {
  const [value, setValue] = useState<string | null>(myReview.comment || "");
  const [rating, setRating] = useState<number | null>(myReview.rating || 0);
  const router = useRouter();
  const { isSuccess, mutate, isPending, error } = useAddReviewMutation(gameID, {
    comment: value,
    rating: rating,
  });
  const deleteReview = useDeleteReviewMutation(myReview.reviewId);
  const {
    mutate: mutateReview,
    isSuccess: isSuccessUpdateReview,
    isPending: isLoadingUpdateReview,
    error: errorUpdateReview,
  } = useUpdateReviewMutation(myReview.reviewId, {
    comment: value,
    rating: rating,
  });

  useEffect(() => {
    if (isSuccess || isSuccessUpdateReview || deleteReview.isSuccess) {
      router.refresh();
    }
  }, [isSuccess, isSuccessUpdateReview, deleteReview.isSuccess]);
  const sendReviewButtonState = BuyButtonStateSendReview(
    isSuccess || isSuccessUpdateReview ,
    isPending || isLoadingUpdateReview,
    error?.message || errorUpdateReview?.message
  );
  const deleteReviewButtonState = BuyButtonStateDeleteReview(
    deleteReview.isSuccess,
    deleteReview.isPending,
    deleteReview.error?.message
  );

  return (
    <Box width={"860px"} mt={"20px"} mr={"0px"} height={"400px"}>
      <AddNewAndChangeReview
        value={value}
        setValue={setValue}
        rating={rating}
        setRating={setRating}
        mutate={!Boolean(myReview.reviewId) ? mutate : mutateReview}
        editMode={Boolean(myReview.reviewId)}
        deleteReview={deleteReview.mutate}
        sendReviewButtonState={sendReviewButtonState}
        deleteReviewButtonState={deleteReviewButtonState}
      />
      {allReviews.map((review: ReviewItemGameResponse[0]) => {
        return (
          review && (
            <ReviewItem
              key={review.reviewId}
              author={review.username}
              content={review.comment}
              rating={review.rating}
              date={review.reviewDate}
            />
          )
        );
      })}
    </Box>
  );
};

export { Reviews };

const styleTextArea: SxProps = {
  width: "780px",
  "& label": {
    fontWeight: "600",
    fontSize: "26px",
  },
  "& textarea": {
    fontSize: "23px",
  },
  paddingTop: "10px",
};

const styleActionsButtons: SxProps = { width: "50px", height: "40px", ml: "10px" }