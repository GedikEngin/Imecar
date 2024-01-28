import React, { useState, useEffect } from "react";
import axios from "axios";

function Tasks() {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await axios.get("/api/dailyTasks");
				setTasks(response.data.data);
			} catch (error) {
				console.error("Error fetching tasks:", error);
			}
		};

		fetchTasks();
	}, []);

	return (
		<div>
			<h2>Daily Tasks</h2>
			<ul>
				{tasks.map((task) => (
					<li key={task.taskID}>{task.taskContent}</li>
				))}
			</ul>
			{/* Form to add new task will go here */}
		</div>
	);
}

export default Tasks;
