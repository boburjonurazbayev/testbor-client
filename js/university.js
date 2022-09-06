const elUniversityForm = selectElement(".university__form");
const elInputTemplate = selectElement("#input__template").content;
const elHeadingTemplate = selectElement("#heading__template").content;
const elInfoTemplate = selectElement("#info__template").content;

const subjects = localStorage.getItem("subjects");
if (!subjects) location.replace("/subject.html");

let allFaculties = [];

// Limit Faculties
function limitFaculties() {
  // Select elements
  let checkBoxGroup = selectElements(".faculty__input", elUniversityForm);
  let checkBoxName = selectElements(".faculty__name", elUniversityForm);

  //   limit faculty
  let limit = 5;

  for (let i = 0; i < checkBoxGroup.length; i++) {
    checkBoxGroup[i].onclick = function () {
      let checkedcount = 0;

      for (let i = 0; i < checkBoxGroup.length; i++) {
        checkedcount += checkBoxGroup[i].checked ? 1 : 0;

        checkBoxGroup[i].checked
          ? checkBoxName[i].classList.add("underline")
          : checkBoxName[i].classList.remove("underline");
      }
      if (checkedcount > limit) {
        // console.log("You can select maximum of " + limit + " faculties.");
        alert("You can select maximum of " + limit + " faculties.");
        this.checked = false;
        checkBoxName.forEach((name) => {
          if (name.dataset.id == this.dataset.id)
            name.classList.remove("underline");
        });
      }
    };
  }
}

// Get Universities
const getUniversities = async () => {
  // Fetch universities data
  let res = await fetch(API + "/universities", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      subjectId: JSON.stringify(JSON.parse(subjects).subject_id),
    },
  });

  let data = await res.json();

  return data;
};

async function renderUniversities() {
  try {
    // Universities data
    const { data } = await getUniversities();

    let facultiesData = [];

    if (data) {
      elUniversityForm.innerHTML = null;

      for (let i = 0; i < data.length; i++) {
        // Clone template
        let headingTemplate = elHeadingTemplate.cloneNode(true);

        //   Select elements
        let heading = selectElement(".university__heading", headingTemplate);

        // Set attributes
        heading.textContent = data[i].university_name;

        // Append element form
        elUniversityForm.appendChild(headingTemplate);

        let faculties = data[i].faculties;

        for (let j = 0; j < faculties.length; j++) {
          allFaculties.push({
            id: faculties[j].f1,
            name: faculties[j].f2,
            grant: faculties[j].f3,
            contract: faculties[j].f4,
          });

          // Get faculties data
          facultiesData.push(faculties[j]);

          // Clone template
          let inputTemplate = elInputTemplate.cloneNode(true);

          //   Select elements
          let facultyLabel = selectElement(".faculty__label", inputTemplate);
          let facultyInput = selectElement(".faculty__input", inputTemplate);
          let facultyName = selectElement(".faculty__name", inputTemplate);

          // Set attributes
          facultyLabel.dataset.id = faculties[j]?.f1;
          facultyInput.dataset.id = faculties[j]?.f1;
          facultyName.dataset.id = faculties[j]?.f1;
          facultyName.textContent = faculties[j]?.f2;

          //   Append element form
          elUniversityForm.appendChild(inputTemplate);
        }
      }
      // Create element
      let formBtn = document.createElement("button");

      //   Set attributes
      formBtn.className = "university__submit-btn";
      formBtn.type = "submit";
      formBtn.textContent = "Start exam";

      //   Append element form
      elUniversityForm.appendChild(formBtn);

      limitFaculties();
      hover(facultiesData);
    }
  } catch (error) {
    console.error(error);
  }
}

renderUniversities();

elUniversityForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let checkBoxGroup = selectElements(".faculty__input", elUniversityForm);
  let selectedFaculties = [];

  for (let i = 0; i < checkBoxGroup.length; i++) {
    if (checkBoxGroup[i].checked) {
      for (let j = 0; j < allFaculties.length; j++) {
        if (Number(checkBoxGroup[i].dataset.id == allFaculties[j].id)) {
          console.log(allFaculties);
          selectedFaculties.push({
            id: allFaculties[j].id,
            name: allFaculties[j].name,
            g: allFaculties[j].grant,
            c: allFaculties[j].contract,
          });
        }
      }
    }
  }

  //   Set localstorage facultiesId and replace location
  if (selectedFaculties[0]) {
    localStorage.setItem("faculties", JSON.stringify(selectedFaculties));

    location.replace("/test.html");
  }
});

function hover(data) {
  let ElFacultyLabel = selectElements(".faculty__label", elUniversityForm);

  for (let i = 0; i < ElFacultyLabel.length; i++) {
    ElFacultyLabel[i].addEventListener(
      "mouseenter",
      (evt) => {
        const findFaculty = data.find((fac) => fac.f1 == evt.target.dataset.id);

        info.innerHTML = null;

        let infoTemplate = elInfoTemplate.cloneNode(true);

        let name = selectElement(".info__name", infoTemplate);
        let grantScore = selectElement(".info__grant-score", infoTemplate);
        let contractScore = selectElement(
          ".info__contract-score",
          infoTemplate
        );
        let grantNumber = selectElement(".info__grant-number", infoTemplate);
        let contractNumber = selectElement(
          ".info__contract-number",
          infoTemplate
        );

        name.textContent = findFaculty.f2;
        grantScore.textContent = findFaculty.f3;
        contractScore.textContent = findFaculty.f4;
        grantNumber.textContent = findFaculty.f6;
        contractNumber.textContent = findFaculty.f7;

        info.appendChild(infoTemplate);
      },
      false
    );

    // ElFacultyLabel[i].addEventListener(
    //   "mouseleave",
    //   (evt) => {
    //     info.innerHTML = null;
    //   },
    //   false
    // );
  }
}
