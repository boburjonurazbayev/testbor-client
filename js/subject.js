const elSubjectForm = selectElement(".subject__form");
const elSubjectFirstInput = selectElement(".subject__1", elSubjectForm);
const elSubjectSecondInput = selectElement(".subject__2", elSubjectForm);
const elOptionTemplate = selectElement("#option__template").content;
let firstInputValue = elSubjectFirstInput.value;

// Check User
const token = localStorage.getItem("token");
if (!token) location.replace("/login.html");

// Get subject 1
const getSubject1 = async () => {
  elSubjectFirstInput.innerHTML = null;

  let res = await fetch(API + "/subject1");

  let data = await res.json();

  let sub = data.data.map((sub) => sub.subject_1);

  createOption(elSubjectFirstInput, filterArray(sub));
};

// Get subject 2
const getSubject2 = async () => {
  elSubjectSecondInput.innerHTML = null;

  let res = await fetch(API + "/subject2", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subject1: await elSubjectFirstInput?.value,
    }),
  });

  let data = await res.json();

  let sub = data.data.map((sub) => sub.subject_2);

  createOption(elSubjectSecondInput, filterArray(sub));
};

getSubject1();
getSubject2();

elSubjectForm.addEventListener("click", async (evt) => {
  // listen first option
  if (
    evt.target.className == "subject__1" &&
    firstInputValue != evt.target.value
  ) {
    getSubject2();

    firstInputValue = evt.target.value;
  }

  // Listen submit btn
  if (evt.target.className == "subject__submit-btn") {
    evt.preventDefault();

    console.log(elSubjectFirstInput.value, elSubjectSecondInput.value);

    let res = await fetch(API + "/subjects", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject1: elSubjectFirstInput?.value,
        subject2: elSubjectSecondInput?.value,
      }),
    });

    let data = await res.json();

    console.log(data);

    //    Save SubjectId and replace location
    if (data.message == "succes") {
      localStorage.setItem("subjects", JSON.stringify(data.subjects));

      location.replace("/university.html");
    } else {
      forError.textContent = data.message;
    }
  }
});
