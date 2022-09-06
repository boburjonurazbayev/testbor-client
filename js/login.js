const elLoginForm = selectElement(".login__form");
const elUsernameInput = selectElement(".login__username", elLoginForm);
const elPasswordInput = selectElement(".login__password", elLoginForm);

// Check User
const token = localStorage.getItem("token");
// if (token) location.replace("/subject.html");

elLoginForm.addEventListener("submit", async (evt) => {
  try {
    evt.preventDefault();

    let res = await fetch(API + "/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: elUsernameInput?.value,
        password: elPasswordInput?.value,
      }),
    });

    let data = await res.json();

    //    Save Token and replace location
    if (data.message == "succes") {
      localStorage.setItem("token", data.token);

      location.replace("/subject.html");
    } else {
      forError.textContent = data.message;
    }
  } catch (error) {
    console.error(error);
  }
});
