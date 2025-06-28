import { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/Tabs";
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
      <h2 className="text-xl font-bold mb-4 text-slate-800">Borrower Pipeline</h2>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="new">New Applications</TabsTrigger>
            <TabsTrigger value="in_review">Under Review</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>

        {["new", "in_review", "approved"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-3">
                {borrowers[tab as keyof typeof borrowers]?.map((b) => (
                <div
                    key={b.id}
                    onClick={() => setActiveBorrower(b)}
                    className={`cursor-pointer border-2 p-4 rounded-lg transition-all duration-200 hover:shadow-md ${
                    activeBorrower?.id === b.id 
                        ? "bg-blue-50 border-blue-300 shadow-lg ring-2 ring-blue-200" 
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                >
                    <div className="font-bold text-slate-800 mb-1">{b.name}</div>
                    <div className="text-sm text-slate-600 mb-2">{b.loan_type}</div>
                    <div className="text-right font-bold text-lg text-slate-900 mb-2">${b.amount.toLocaleString()}</div>
                    <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${
                        tab === 'new' ? 'text-orange-700 bg-orange-100' :
                        tab === 'in_review' ? 'text-yellow-700 bg-yellow-100' :
                        'text-green-700 bg-green-100'
                    }`}>
                    {b.status}
                    </span>
                </div>
                ))}
            </TabsContent>
        ))}
        </Tabs>

      {/* Radio group (F-SANITISED ACTIVE label) */}
      <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <h3 className="uppercase text-xs font-semibold text-slate-600 mb-3">F-SANITISED ACTIVE</h3>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="activeType" defaultChecked className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm font-medium text-slate-700">Option A</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="activeType" className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm font-medium text-slate-700">Option B</span>
          </label>
        </div>
      </div>
    </Card>
  );
};

export default BorrowerPipeline;
