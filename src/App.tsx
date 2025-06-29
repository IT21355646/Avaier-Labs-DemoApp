import Header from "./components/layout/Header";
import BorrowerPipeline from "./features/pipeline/BorrowerPipeline";
import BorrowerDetail from "./features/borrowerDetail/BorrowerDetail";
import BrokerOverview from "./features/brokerOverview/BrokerOverview";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="p-4 max-w-[1440px] mx-auto">
          <Header />
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <BorrowerPipeline />
            </div>
            <div className="lg:col-span-2">
              <BorrowerDetail />
            </div>
            <div className="lg:col-span-2">
              <BrokerOverview />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
};

export default App;
