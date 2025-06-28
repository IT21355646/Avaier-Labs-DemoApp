import { Borrower } from "../types/borrower";

// Simulate fetching data from `/api/borrowers/pipeline`
export const getBorrowerPipeline = async (): Promise<Record<"new" | "in_review" | "approved", Borrower[]>> => {
  return {
    new: [
      { id: "1", name: "Sarah Dunn", loan_type: "Home Loan", amount: 300000, status: "Renew" },
      { id: "3", name: "Lisa Carter", loan_type: "Home Loan", amount: 450000, status: "New" },
    ],
    in_review: [
      { id: "2", name: "Alan Matthews", loan_type: "Personal Loan", amount: 20000, status: "In Review" },
    ],
    approved: [],
  };
};
