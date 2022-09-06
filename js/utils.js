function selectElement(element, node = document) {
  return node.querySelector(element);
}

function selectElements(element, node = document) {
  return node.querySelectorAll(element);
}

function filterArray(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    let identifier = true;
    for (let j = 0; j < result.length; j++) {
      if (result[j] == arr[i]) identifier = false;
    }

    if (identifier) {
      result.push(arr[i]);
    }
  }

  return result;
}

function createOption(node, data) {
  for (let j = 0; j < data.length; j++) {
    let option = document.createElement("option");

    option.value = data[j];
    option.textContent = data[j];

    node.appendChild(option);
  }
}

function getRandomItem(arr) {
  let randomResultArr = [];

  for (let i = 0; randomResultArr.length != arr.length; i++) {
    const randomIndex = Math.floor(Math.random() * arr.length);

    let bool = true;

    if (randomResultArr.length == 0) randomResultArr.push(arr[randomIndex]);

    randomResultArr.map((el) => {
      if (el.f1 == arr[randomIndex].f1) bool = false;
    });

    if (bool) randomResultArr.push(arr[randomIndex]);
  }

  return randomResultArr;
}

function getMyScore(arr, subject, ball) {
  let trueAnsNum = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i]?.subject == subject) {
      trueAnsNum++;
    }
  }

  return {overall: trueAnsNum * ball,
  trueAnswers: trueAnsNum,
subject: subject};
}
