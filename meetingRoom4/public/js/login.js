document.addEventListener("DOMContentLoaded", function () {
	const loginForm = document.getElementById("loginForm");
	const message = document.getElementById("message");

	loginForm.addEventListener("submit", async function (event) {
		event.preventDefault();
		const formData = new FormData(loginForm);
		const username = formData.get("username");
		const password = formData.get("password");

		try {
			const response = await fetch("/user/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			if (response.ok) {
				const data = await response.json();
				// Redirect to dashboard on successful login
				window.location.href = "../html/dashboard.html";
			} else {
				const data = await response.json();
				message.textContent = data.message;
			}
		} catch (error) {
			console.error("Error:", error);
			message.textContent = "An error occurred while logging in";
		}
	});
});
