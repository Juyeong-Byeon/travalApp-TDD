import "./App.css";
import { OrderContextProvider } from "./pages/order/OrderContext";
import { OrderPage } from "./pages/order/OrderPage";

function App() {
  return (
    <div className="App" style={{ padding: "50px" }}>
      <OrderContextProvider>
        <OrderPage />
      </OrderContextProvider>
    </div>
  );
}

export default App;
