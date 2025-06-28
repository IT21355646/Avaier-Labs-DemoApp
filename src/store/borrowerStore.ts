import { create } from "zustand";
import { Borrower } from "../types/borrower";

type BorrowerState = {
  borrowers: Record<"new" | "in_review" | "approved", Borrower[]>;
  activeTab: "new" | "in_review" | "approved";
  activeBorrower: Borrower | null;
  setBorrowers: (data: BorrowerState["borrowers"]) => void;
  setActiveTab: (tab: BorrowerState["activeTab"]) => void;
  setActiveBorrower: (borrower: Borrower) => void;
};

export const useBorrowerStore = create<BorrowerState>((set) => ({
  borrowers: { new: [], in_review: [], approved: [] },
  activeTab: "new",
  activeBorrower: null,
  setBorrowers: (data) => set({ borrowers: data }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setActiveBorrower: (borrower) => set({ activeBorrower: borrower }),
}));


