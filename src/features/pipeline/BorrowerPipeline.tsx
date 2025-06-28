import { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { useBorrowerStore } from "../../store/borrowerStore";
import { getBorrowerPipeline } from "../../services/api";
import Card from "../../components/ui/Card";

const BorrowerPipeline = () => {
  const {
    borrowers,
    activeTab,
    activeBorrower,
    setBorrowers,
    setActiveTab,
    setActiveBorrower,
  } = useBorrowerStore();

  useEffect(() => {
    const loadData = async () => {
      const data = await getBorrowerPipeline();
      setBorrowers(data);
    };
    loadData();
  }, [setBorrowers]);

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-2">Borrower Pipeline</h2>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)}>
        <TabsList className="flex gap-2 mb-4">
          <TabsTrigger value="new" className="px-3 py-1 rounded-md bg-gray-200">
            New
          </TabsTrigger>
          <TabsTrigger value="in_review" className="px-3 py-1 rounded-md bg-gray-200">
            In Review
          </TabsTrigger>
          <TabsTrigger value="approved" className="px-3 py-1 rounded-md bg-gray-200">
            Approved
          </TabsTrigger>
        </TabsList>

        {["new", "in_review", "approved"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div className="space-y-2">
              {borrowers[tab as keyof typeof borrowers]?.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setActiveBorrower(b)}
                  className={`cursor-pointer border p-2 rounded-md ${
                    activeBorrower?.id === b.id ? "bg-blue-50 border-blue-500" : "bg-white"
                  }`}
                >
                  <div className="font-semibold">{b.name}</div>
                  <div className="text-sm text-gray-600">{b.loan_type}</div>
                  <div className="text-right font-medium">${b.amount.toLocaleString()}</div>
                  <span className="inline-block mt-1 text-xs text-white bg-gray-500 px-2 py-0.5 rounded">
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Radio group (F-SANITISED ACTIVE label) */}
      <div className="mt-6">
        <h3 className="uppercase text-xs text-gray-500 mb-1">F-SANITISED ACTIVE</h3>
        <div className="flex gap-2">
          <label className="flex items-center gap-1">
            <input type="radio" name="activeType" defaultChecked />
            Option A
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" name="activeType" />
            Option B
          </label>
        </div>
      </div>
    </Card>
  );
};

export default BorrowerPipeline;
