import { useState } from "react";
import "./App.css";
import { CompletePage } from "./pages/complete/CompletePage";
import { OrderContextProvider } from "./pages/order/OrderContext";
import { OrderPage } from "./pages/order/OrderPage";
import { SummaryPage } from "./pages/summary/SummaryPage";

function App() {
  const [step, setStep] = useState(0);
  return (
    <div className="App" style={{ padding: "50px" }}>
      <OrderContextProvider>
        {step === 0 && <OrderPage setPage={setStep} />}
        {step === 1 && <SummaryPage />}
        {step === 2 && <CompletePage />}
      </OrderContextProvider>
    </div>
  );
}

export default App;
