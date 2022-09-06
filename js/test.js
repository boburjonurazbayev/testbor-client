const elTestsForm = selectElement(".test__form");
const elButtonTemplate = selectElement("#test__result-btn-template").content;
const elHeadingTemplate = selectElement("#test__heading-template").content;
const elQuestionTemplate = selectElement("#test__question-template").content;
const elAnswerTemplate = selectElement("#test__answer-template").content;
const elLineTemplate = selectElement("#test__line-template").content;
const elResultTemplate = selectElement("#go__result-template").content;

let subjects = localStorage.getItem("subjects");
subjects = JSON.parse(subjects);
if (!subjects) location.replace("/subject.html");

let faculties = localStorage.getItem("faculties");
faculties = JSON.parse(faculties);

let testAnswers = [];
let myTrueAnswers = [];

// Get Tests
const getTests = async (path) => {
  // Fetch universities data
  let res = await fetch(API + path, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      subject1: subjects.subject_1,
      subject2: subjects.subject_2,
    },
  });

  let data = await res.json();

  return data;
};

async function renderTests() {
  try {
    // Universities data
    let test1 = await getTests("/test1");
    let test2 = await getTests("/test2");

    elTestsForm.innerHTML = null;

    function innerRender(data) {
      // Clone template
      let headingTemplate = elHeadingTemplate.cloneNode(true);

      //   Select elements
      let heading = selectElement(".test__heading", headingTemplate);

      // Set attributes
      heading.textContent = data[0].subject_name.toUpperCase();

      // Append element form
      elTestsForm.appendChild(headingTemplate);

      for (let i = 0; i < data.length; i++) {
        // Clone template
        let questionTemplate = elQuestionTemplate.cloneNode(true);

        //   Select elements
        let h3 = selectElement(".test__question", questionTemplate);

        // Set attributes
        h3.textContent = "#" + (i + 1) + " " + data[i].question_text;
        h3.dataset.id = data[i].question_id;

        // Append element form
        elTestsForm.appendChild(questionTemplate);

        let answer = getRandomItem(data[i].answer_all);

        for (let j = 0; j < answer.length; j++) {
          // Clone template
          let answerTemplate = elAnswerTemplate.cloneNode(true);

          //   Select elements
          let input = selectElement(".test__input", answerTemplate);
          let label = selectElement(".test__label", answerTemplate);
          let span = selectElement(".test__text", answerTemplate);

          // Set attributes
          span.textContent = answer[j].f2;
          span.dataset.answerId = answer[j].f1;
          input.dataset.answerId = answer[j].f1;
          input.name = data[i].question_id;

          if (answer[j].f3)
            testAnswers.push({
              subject: data[i].subject_name,
              answer: answer[j].f1,
            });

          // Append element form
          elTestsForm.appendChild(answerTemplate);
        }

        let lineTemplate = elLineTemplate.cloneNode(true);
        elTestsForm.appendChild(lineTemplate);
      }
    }

    innerRender(test1.data);
    innerRender(test2.data);
    let btnTemplate = elButtonTemplate.cloneNode(true);
    elTestsForm.appendChild(btnTemplate);
    console.log(faculties);
  } catch (error) {
    console.error(error);
  }
}

renderTests();

elTestsForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let inputs = selectElements(".test__input", elTestsForm);

  console.log(inputs);

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].disabled = true;
    let checkerQuestion = true;

    if (inputs[i].checked) {
      console.log(inputs[i].dataset.answerId);
      testAnswers.forEach((ans) => {
        if (ans.answer == inputs[i].dataset.answerId) {
          checkerQuestion = false;

          myTrueAnswers.push({
            subject: ans.subject,
            answerId: inputs[i].dataset.answerId,
          });
        }
      });

      if (checkerQuestion) inputs[i].classList.add("wrong-input");
    }
  }

  let btn = selectElement(".test__btn", elTestsForm);

  btn.style.display = "none";

  let r1 = getMyScore(myTrueAnswers, subjects.subject_1, 3.2);
  let r2 = getMyScore(myTrueAnswers, subjects.subject_2, 3.1);

  let myScore = r1.overall + r2.overall;

  let myFac = [];

  for (let j = 0; j < faculties.length; j++) {
    console.log("o`zi kelyaptimi");
    if (faculties[j].g <= myScore) {
      console.log(faculties[j].g);
      myFac = {
        name: faculties[j].name,
        status: "grant",
        score: myScore,
        result: "Recommended",
        s1: r1.trueAnswers,
        s2: r2.trueAnswers,
        s1n: r1.subject,
        s2n: r2.subject,
      };

      break;
    } else if (faculties[j].c <= myScore) {
      console.log(faculties[j].c);
      myFac = {
        name: faculties[j].name,
        status: "contract",
        score: myScore,
        result: "Recommended",
        s1: r1.trueAnswers,
        s2: r2.trueAnswers,
        s1n: r1.subject,
        s2n: r2.subject,
      };

      break;
    }
  }

  console.log(faculties, "myfac");

  if (!myFac.id) {
    myFac = {
      name: faculties[0].name,
      status: "failed",
      score: myScore,
      result: "Not recommended",
      s1: r1.trueAnswers,
      s2: r2.trueAnswers,
      s1n: r1.subject,
      s2n: r2.subject,
    };
  }

  console.log(myFac);

  localStorage.setItem("myFac", JSON.stringify(myFac));

  //   console.log(subjects);
  //   console.log(faculties);
  //   console.log(testAnswers, "test answers");
  //   console.log(myTrueAnswers, "my true answers");

  let resultTemplate = elResultTemplate.cloneNode(true);
  elTestsForm.appendChild(resultTemplate);
});
