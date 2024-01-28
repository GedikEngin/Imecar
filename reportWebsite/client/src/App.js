import React from "react";
import "./App.css";
import Tasks from "./components/Tasks"; // Import Tasks component
import Reports from "./components/Reports"; // Import Reports component
import Overview from "./components/Overview"; // Import Overview component

function App() {
	return (
		<div className="App">
			<h1>Task and Report Management System</h1>
			<Overview /> {/* Weekly Overview Component */}
			<Tasks /> {/* Daily Tasks Component */}
			<Reports /> {/* Daily Reports Component */}
		</div>
	);
}

export default App;
