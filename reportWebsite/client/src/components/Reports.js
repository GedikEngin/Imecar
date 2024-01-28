import React, { useState, useEffect } from "react";
import axios from "axios";

function Reports() {
	const [reports, setReports] = useState([]);

	useEffect(() => {
		const fetchReports = async () => {
			try {
				const response = await axios.get("/api/dailyReports");
				setReports(response.data.data);
			} catch (error) {
				console.error("Error fetching reports:", error);
			}
		};

		fetchReports();
	}, []);

	return (
		<div>
			<h2>Daily Reports</h2>
			<ul>
				{reports.map((report) => (
					<li key={report.reportID}>{report.reportContent}</li>
				))}
			</ul>
			{/* Form to add new report will go here */}
		</div>
	);
}

export default Reports;
