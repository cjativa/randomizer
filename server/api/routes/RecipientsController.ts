import express from "express";

const recipientsController = express.Router();

recipientsController.get("/recipientsEligibleForGifts", ({ query }, res) => {
  const { org } = query;
});

export default recipientsController;
