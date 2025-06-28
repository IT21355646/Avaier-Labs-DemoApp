import { useBorrowerStore } from "../../store/borrowerStore";
import Card from "../../components/ui/Card";
import { getStatusColor } from "../../utils/statusColor";
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import {
  requestDocuments,
  sendToValuer,
  approveLoan,
  escalateToCommittee,
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
          <h2 className="text-lg font-bold truncate max-w-full">{name}</h2>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
        <div className="mt-1 space-y-1">
          <p className="text-sm text-gray-600">{email}</p>
          <p className="text-sm text-gray-600">{phone}</p>
          <p className="text-lg font-semibold text-gray-900">${loan_amount?.toLocaleString()}</p>
        </div>
      </div>

      {/* AI Explainability Accordion */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => setExplainOpen(!explainOpen)}
          className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm font-medium text-gray-900">AI Explainability</span>
          {explainOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {explainOpen && (
          <div className="border-t border-gray-200 p-3 space-y-4">
            {ai_flags && ai_flags.length > 0 && (
              <div className="space-y-2">
                {ai_flags.map((flag: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 p-2 bg-red-50 rounded border-l-4 border-red-400"
                  >
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-red-700">{flag}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => requestDocuments(activeBorrower.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Request Documents
              </button>
              <button
                onClick={() => sendToValuer(activeBorrower.id)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Send to Valuer
              </button>
              <button
                onClick={() => approveLoan(activeBorrower.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Approve
              </button>
            </div>
          </div>
        )}
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
