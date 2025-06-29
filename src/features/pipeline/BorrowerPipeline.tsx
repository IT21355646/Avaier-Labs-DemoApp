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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'in review':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'renew':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">Borrower Pipeline</h2>
        <p className="text-sm text-gray-500 mt-1">Manage loan applications and track progress</p>
      </div>

      {/* Enhanced Tabs */}
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-50 p-1 rounded-lg">
          <TabsTrigger 
            value="new" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 text-gray-600 font-medium transition-all duration-200"
          >
            New
          </TabsTrigger>
          <TabsTrigger 
            value="in_review"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 text-gray-600 font-medium transition-all duration-200"
          >
            In Review
          </TabsTrigger>
          <TabsTrigger 
            value="approved"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 text-gray-600 font-medium transition-all duration-200"
          >
            Approved
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 ">
          {["new", "in_review", "approved"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-3 mt-0">
              {borrowers[tab as keyof typeof borrowers]?.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setActiveBorrower(b)}
                  className={`group cursor-pointer rounded-lg border transition-all duration-200 hover:shadow-md ${
                    activeBorrower?.id === b.id 
                      ? "bg-blue-50 border-blue-200 shadow-md ring-1 ring-blue-200" 
                      : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="p-4">
                    {/* Header with name and amount */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate text-base">{b.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{b.loan_type}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="font-bold text-lg text-gray-900">
                          ${b.amount.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(b.status)}`}>
                        {b.status}
                      </span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {(!borrowers[tab as keyof typeof borrowers] || borrowers[tab as keyof typeof borrowers]?.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No applications in this category</p>
                </div>
              )}
            </TabsContent>
          ))}
        </div>
      </Tabs>

      {/* Enhanced Radio Section */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-gray-700 tracking-wider uppercase letter-spacing-wide">
              F-SANITISED ACTIVE
            </h3>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input 
                  type="radio" 
                  name="activeType" 
                  defaultChecked 
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2 transition-all duration-200" 
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                Option A
              </span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input 
                  type="radio" 
                  name="activeType" 
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2 transition-all duration-200" 
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                Option B
              </span>
            </label>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BorrowerPipeline;
