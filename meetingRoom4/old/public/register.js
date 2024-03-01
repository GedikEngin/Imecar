document.addEventListener("DOMContentLoaded", function () {
	const registerForm = document.getElementById("registerForm");
	const message = document.getElementById("message");

	registerForm.addEventListener("submit", async function (event) {
		event.preventDefault();
		const formData = new FormData(registerForm);
		const username = formData.get("username");
		const password = formData.get("password");
		const permission = formData.get("permission");
		const department = formData.get("department");

		try {
			const response = await fetch("/register", {
				// Updated URL
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password, permission, department }),
			});

			if (response.ok) {
				window.location.href = "../index.html"; // Redirect to login page after successful registration
			} else {
				const data = await response.json();
				message.textContent = data.message;
			}
		} catch (error) {
			console.error("Error:", error);
			message.textContent = "An error occurred while registering";
		}
	});
});
