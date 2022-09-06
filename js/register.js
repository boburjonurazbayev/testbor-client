// Get Elements
const elRegisterForm = selectElement(".register__form");
const elFullNameInput = selectElement(".register__fullname", elRegisterForm);
const elContactInput = selectElement(".register__contact", elRegisterForm);
const elUsernameInput = selectElement(".register__username", elRegisterForm);
const elPasswordInput = selectElement(".register__password", elRegisterForm);
const elGenderInputs = selectElements(".register__gender", elRegisterForm);
const elModal = selectElement(".modal")

// Check User
const token = localStorage.getItem("token");
// if (token) location.replace("/subject.html");

// Form Submit Listener
elRegisterForm.addEventListener("submit", async (evt) => {
  try {
    evt.preventDefault();

    let gender;

    // Find User Gender
    elGenderInputs.forEach((gen) => {
      if (gen.checked) gender = gen;
    });

    let res = await fetch(API + "/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: elFullNameInput?.value,
        username: elUsernameInput?.value,
        contact: elContactInput?.value,
        password: elPasswordInput?.value,
        gender: gender?.value,
      }),
    });

    let data = await res.json();

    // Save Token and replace location
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


