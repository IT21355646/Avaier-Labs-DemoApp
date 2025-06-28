import { useBorrowerStore } from "../../store/borrowerStore";
import Card from "../../components/ui/Card";
import { getStatusColor } from "../../utils/statusColor";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import {
  requestDocuments,
  sendToValuer,
  approveLoan,
  escalateToCommittee, // 👈 make sure this is here
} from "../../services/api";

const BorrowerDetail = () => {
  const { activeBorrower } = useBorrowerStore();
  const [explainOpen, setExplainOpen] = useState(true);

  if (!activeBorrower) {
    return (
      <Card>
        <p className="text-gray-500 italic">Select a borrower to view details.</p>
      </Card>
    );
  }

  const {
    name,
    email,
    phone,
    loan_amount,
    status,
    employment,
    existing_loan,
    credit_score,
    source_of_funds,
    risk_signal,
    ai_flags,
  } = activeBorrower as any; // Replace `any` with type when fetched from full detail API

  return (
    <Card className="space-y-4">
      {/* Header */}
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{name}</h2>
          <span className={`text-xs px-2 py-1 rounded ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
        <p className="text-sm text-gray-600">{email}</p>
        <p className="text-sm text-gray-600">{phone}</p>
        <p className="mt-1 font-medium text-lg">${loan_amount?.toLocaleString()}</p>
      </div>

      {/* Explainability Section */}
      <div>
        <button
          onClick={() => setExplainOpen(!explainOpen)}
          className="text-sm text-blue-600 underline"
        >
          {explainOpen ? "Hide" : "Show"} AI Explainability
        </button>

        {explainOpen && ai_flags && (
          <div className="mt-2 space-y-2">
            {ai_flags.map((flag: string, i: number) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-red-600"
              >
                <AlertTriangle className="w-4 h-4" />
                {flag}
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-4">
  <button
    onClick={() => requestDocuments(activeBorrower.id)}
    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
  >
    Request Documents
  </button>
  <button
    onClick={() => sendToValuer(activeBorrower.id)}
    className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
  >
    Send to Valuer
  </button>
  <button
    onClick={() => approveLoan(activeBorrower.id)}
    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
  >
    Approve
  </button>
</div>
      </div>

      {/* Loan Summary */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Loan Summary</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><strong>Employment:</strong> {employment}</div>
          <div><strong>Existing Loan:</strong> ${existing_loan?.toLocaleString()}</div>
          <div><strong>Credit Score:</strong> {credit_score}</div>
          <div><strong>Source of Funds:</strong> {source_of_funds}</div>
        </div>
      </div>

      {/* Risk Signal */}
      {risk_signal && (
        <div className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded text-sm">
          ⚠️ Risk Signal: {risk_signal}
        </div>
      )}

      {/* Escalate Button */}
      <div>
  <button
    onClick={() => escalateToCommittee(activeBorrower.id)}
    className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
  >
    Escalate to Credit Committee
  </button>
</div>
    </Card>
  );
};

export default BorrowerDetail;
