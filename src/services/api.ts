import { Borrower } from "../types/borrower";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const getBorrowerPipeline = async (): Promise<Record<"new" | "in_review" | "approved", Borrower[]>> => {
  await delay(500);
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

export const getBorrowerDetail = async (id: string): Promise<any> => {
  await delay(300);
  return {
    id,
    name: "Sarah Dunn",
    email: "sarah.dunn@example.com",
    phone: "(355)123-4557",
    loan_amount: 300000,
    status: "In Review",
    employment: "At Tech Company",
    income: 120000,
    existing_loan: 240000,
    credit_score: 720,
    source_of_funds: "Declared",
    risk_signal: "Missing Source of Funds declaration",
    ai_flags: [
      "Income Inconsistent with Bank statements",
      "High Debt-to-Income Ratio detected",
    ],
  };
};

export const requestDocuments = async (id: string) => {
  await delay(200);
  console.log(`📤 Requested documents for borrower ${id}`);
};

export const sendToValuer = async (id: string) => {
  await delay(200);
  console.log(`📤 Sent to valuer for borrower ${id}`);
};

export const approveLoan = async (id: string) => {
  await delay(200);
  console.log(`✅ Loan approved for borrower ${id}`);
};

export const escalateToCommittee = async (id: string) => {
  await new Promise((res) => setTimeout(res, 200));
  console.log(`⚠️ Escalated borrower ${id} to Credit Committee`);
};

export const getOnboardingWorkflow = async (): Promise<{ steps: string[] }> => {
  return {
    steps: [
      "Deal Intake",
      "IDV & Credit Check",
      "Document Upload",
      "AI Validation",
      "Credit Committee",
      "Approval & Docs",
      "Funder Syndication",
    ],
  };
};

export const getBrokerInfo = async (): Promise<{
  name: string;
  deals: number;
  approval_rate: string;
  pending: number;
}> => {
  return {
    name: "Robert Turner",
    deals: 16,
    approval_rate: "75%",
    pending: 7660,
  };
};


