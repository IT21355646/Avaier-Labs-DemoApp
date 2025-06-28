import { useEffect, useState } from "react";
import { getBrokerInfo, getOnboardingWorkflow } from "../../services/api";
import Card from "../../components/ui/Card";
import { Phone, Mail, MessageSquare } from "lucide-react";

const BrokerOverview = () => {
  const [broker, setBroker] = useState<any>(null);
  const [workflow, setWorkflow] = useState<string[]>([]);
  const [aiAssistant, setAiAssistant] = useState(true);

  useEffect(() => {
    const load = async () => {
      const b = await getBrokerInfo();
      const w = await getOnboardingWorkflow();
      setBroker(b);
      setWorkflow(w.steps);
    };
    load();
  }, []);

  if (!broker) {
    return <Card>Loading broker info...</Card>;
  }

  return (
    <Card className="space-y-4">
      {/* Broker Info */}
      <div>
        <h2 className="text-lg font-semibold">{broker.name}</h2>
        <div className="grid grid-cols-3 gap-2 text-center mt-2">
          <div>
            <div className="text-xl font-bold">{broker.deals}</div>
            <div className="text-xs text-gray-500">Deals</div>
          </div>
          <div>
            <div className="text-xl font-bold">{broker.approval_rate}</div>
            <div className="text-xs text-gray-500">Approval Rate</div>
          </div>
          <div>
            <div className="text-xl font-bold">${broker.pending.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Pending</div>
          </div>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="flex justify-around mt-4">
        <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center gap-1">
          <Phone size={14} /> Call
        </button>
        <button className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1">
          <Mail size={14} /> Email
        </button>
        <button className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 flex items-center gap-1">
          <MessageSquare size={14} /> Chat
        </button>
      </div>

      {/* Onboarding Workflow */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold mb-2">Onboarding Workflow</h3>
        <ol className="list-decimal pl-5 space-y-1 text-sm">
          {workflow.map((step, idx) => (
            <li key={idx} className="text-gray-700">{step}</li>
          ))}
        </ol>
      </div>

      {/* AI Assistant Toggle */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm font-medium">E Ardsassist</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={aiAssistant}
            onChange={() => setAiAssistant((prev) => !prev)}
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-400 peer-checked:bg-blue-600 transition-all" />
          <span className="ml-3 text-xs text-gray-500">
            {aiAssistant ? "Enabled" : "Disabled"}
          </span>
        </label>
      </div>
    </Card>
  );
};

export default BrokerOverview;
