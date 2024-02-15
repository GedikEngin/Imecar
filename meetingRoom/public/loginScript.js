// loginScript.js

async function loginUser(credentials) {
	try {
		const response = await fetch("http://localhost:8080/api/users/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentials),
		});

		if (!response.ok) {
			throw new Error("Network error 1");
		}

		const token = await response.text();

		return token;
	} catch (error) {
		console.error("Error:", error.message);
		return null;
	}
}

document
	.getElementById("myButton")
	.addEventListener("click", async function (e) {
		e.preventDefault();
		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;
		if (!username || !password) {
			console.log("Username or password is missing. ");
			console.log("error login details missing");
			return;
		}

		try {
			const token = await loginUser({
				username,
				password,
			});
			if (token) {
				window.location.href = "calendarView.html";
			} else {
				console.log("username/pass incorrect");
			}
		} catch (error) {
			console.log("error logging in");
		}
	});
//
//
