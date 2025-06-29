import { useEffect, useState } from "react";
import { getBrokerInfo, getOnboardingWorkflow } from "../../services/api";
import Card from "../../components/ui/Card";
import { Phone, Mail, MessageSquare, Check, Circle } from "lucide-react";

interface BrokerInfo {
  name: string;
  deals: number;
  approval_rate: string;
  pending: number;
}

interface WorkflowStep {
  step: string;
  completed?: boolean;
}

interface WorkflowTemplate {
  name: string;
  steps: string[];
}

const workflowTemplates: WorkflowTemplate[] = [
  {
    name: "Standard Home Loan",
    steps: [
      "Initial client consultation and needs assessment",
      "Pre-qualification and credit check",
      "Document collection (income, assets, employment)",
      "Loan application submission to lenders",
      "Property valuation and inspection",
      "Loan approval and conditional requirements",
      "Final documentation and settlement preparation",
    ],
  },
  {
    name: "First Home Buyer",
    steps: [
      "First home buyer education session",
      "Government grants and scheme eligibility check",
      "Credit assessment and capacity calculation",
      "Pre-approval application",
      "Property search guidance and budget confirmation",
      "Formal loan application with chosen property",
      "Final approval and settlement coordination",
    ],
  },
  {
    name: "Investment Property",
    steps: [
      "Investment strategy consultation",
      "Tax implications and structure advice",
      "Serviceability assessment for investment loan",
      "Property research and market analysis",
      "Loan structure optimization",
      "Application submission with investment focus",
      "Settlement and rental setup coordination",
    ],
  },
  {
    name: "Refinancing",
    steps: [
      "Current loan analysis and exit costs review",
      "Market comparison and potential savings calculation",
      "New lender application preparation",
      "Property revaluation if required",
      "Loan approval and rate confirmation",
      "Discharge preparation for existing loan",
      "Settlement and loan transfer completion",
    ],
  },
];

const BrokerOverview = () => {
  const [broker, setBroker] = useState<BrokerInfo | null>(null);
  const [workflow, setWorkflow] = useState<WorkflowStep[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>(
    "Standard Home Loan"
  );
  const [aiAssistant, setAiAssistant] = useState(true);

  useEffect(() => {
    const load = async () => {
      const b = await getBrokerInfo();
      const w = await getOnboardingWorkflow();
      setBroker(b);

      // Use selected workflow template or fallback to API data
      const selectedTemplate = workflowTemplates.find(
        (t) => t.name === selectedWorkflow
      );
      const steps = selectedTemplate ? selectedTemplate.steps : w.steps;

      setWorkflow(
        steps.map((step: string, idx: number) => ({
          step,
          completed: idx < 3, // Mock completion status
        }))
      );
    };
    load();
  }, [selectedWorkflow]);

  if (!broker) {
    return (
      <Card className="animate-pulse">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900">Broker Overview</h1>
      </div>

      {/* Broker Info Card */}
      <Card className="p-6 space-y-6 shadow-sm border border-gray-100">
        {/* Broker Name */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {broker.name}
          </h2>
          <p className="text-sm text-gray-500">Licensed Mortgage Broker</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {broker.deals}
            </div>
            <div className="text-sm font-medium text-gray-600">Deals</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {broker.approval_rate}
            </div>
            <div className="text-sm font-medium text-gray-600">Approval Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              ${broker.pending.toLocaleString()}
            </div>
            <div className="text-sm font-medium text-gray-600">Pending</div>
          </div>
        </div>

        {/* Contact Buttons - Segmented Control */}
        <div className="bg-gray-50 rounded-lg p-1 flex space-x-1">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 transition-colors">
            <Phone size={16} />
            Call
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm rounded-md transition-colors">
            <Mail size={16} />
            Email
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm rounded-md transition-colors">
            <MessageSquare size={16} />
            Chat
          </button>
        </div>
      </Card>

      {/* Onboarding Workflow Card */}
      <Card className="p-6 shadow-sm border border-gray-100">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Onboarding Workflow
            </h3>

            {/* Workflow Type Selector */}
            <select
              value={selectedWorkflow}
              onChange={(e) => setSelectedWorkflow(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {workflowTemplates.map((template) => (
                <option key={template.name} value={template.name}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            {workflow.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {item.completed ? (
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-green-600" />
                    </div>
                  ) : idx === workflow.findIndex((w) => !w.completed) ? (
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <Circle size={14} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">
                      {idx + 1}.
                    </span>
                    <p
                      className={`text-sm ${
                        item.completed
                          ? "text-gray-900 font-medium line-through"
                          : idx === workflow.findIndex((w) => !w.completed)
                          ? "text-blue-600 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {item.step}
                    </p>
                  </div>
                  {item.completed && (
                    <div className="mt-1">
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        Completed
                      </span>
                    </div>
                  )}
                  {idx === workflow.findIndex((w) => !w.completed) && (
                    <div className="mt-1">
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        In Progress
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>
                {workflow.filter((w) => w.completed).length} of{" "}
                {workflow.length} completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    (workflow.filter((w) => w.completed).length / workflow.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </Card>

      {/* AI Assistant Card */}
      <Card className="p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-base font-semibold text-gray-900">
              AI Assistant
            </h4>
            <p className="text-sm text-gray-500">E Ardsassist integration</p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={aiAssistant}
              onChange={() => setAiAssistant((prev) => !prev)}
            />
            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              aiAssistant
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {aiAssistant ? "Enabled" : "Disabled"}
          </span>
        </div>
      </Card>
    </div>
  );
};

export default BrokerOverview;
