import React, { useState, useEffect } from "react";
import axios from "axios";

function Overview() {
	const [overviews, setOverviews] = useState([]);

	useEffect(() => {
		const fetchOverviews = async () => {
			try {
				const response = await axios.get("/api/weekOverviews");
				setOverviews(response.data.data);
			} catch (error) {
				console.error("Error fetching weekly overviews:", error);
			}
		};

		fetchOverviews();
	}, []);

	return (
		<div>
			<h2>Weekly Overviews</h2>
			<ul>
				{overviews.map((overview) => (
					<li key={overview.weekID}>Week starting: {overview.weekBeginning}</li>
				))}
			</ul>
		</div>
	);
}

export default Overview;
