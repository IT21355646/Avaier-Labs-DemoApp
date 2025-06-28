import Header from "./components/layout/Header";
import BorrowerPipeline from "./features/pipeline/BorrowerPipeline";
import BorrowerDetail from "./features/borrowerDetail/BorrowerDetail";
import BrokerOverview from "./features/brokerOverview/BrokerOverview";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <BorrowerPipeline />
        <BorrowerDetail />
        <BrokerOverview />
      </main>
    </div>
  );
}

export default App;
