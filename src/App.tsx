import "./App.css";

import React from "react";
import { SummaryPage } from "./pages/summary/SummaryPage";
import Type from "./pages/order/Type";
import logo from "./logo.svg";

function App() {
	return (
		<div className="App">
			<SummaryPage />
			<Type orderType='products'/>
		</div>
	);
}

export default App;
