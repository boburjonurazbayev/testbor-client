const elResultForm = selectElement(".result__form");
const elResultSubName1 = selectElement(".result__subject1", elResultForm);
const elResultInput1 = selectElement(".result__range1", elResultForm);
const elResultOutput1 = selectElement(".result__output1", elResultForm);
const elResultNum1 = selectElement(".result__number1", elResultForm);
const elResultSubName2 = selectElement(".result__subject2", elResultForm);
const elResultInput2 = selectElement(".result__range2", elResultForm);
const elResultOutput2 = selectElement(".result__output2", elResultForm);
const elResultNum2 = selectElement(".result__number2", elResultForm);

const elfacrec = selectElement(".facrec")
const elfacname = selectElement(".facname")
const elfacstat = selectElement(".facstat")

let myRes = localStorage.getItem("myFac");
myRes = JSON.parse(myRes);

console.log(
  elResultForm,
  elResultSubName1,
  elResultInput1,
  elResultOutput1,
  elResultNum1,
  elResultSubName2,
  elResultInput2,
  elResultOutput2,
  elResultNum2
);

console.log(myRes);

(elResultSubName1.textContent = myRes.s1n.toUpperCase()),
  (elResultSubName2.textContent = myRes.s2n.toUpperCase()),
  (elResultInput1.name = myRes.s1n),
  (elResultInput2.name = myRes.s2n),
  (elResultInput1.value = Math.floor((myRes.s1 * 100) / 30)),
  (elResultInput2.value = Math.floor((myRes.s2 * 100) / 30)),
  (elResultOutput1.textContent = Math.floor((myRes.s1 * 100) / 30)),
  (elResultOutput2.textContent = Math.floor((myRes.s2 * 100) / 30)),
  (elResultNum1.textContent = myRes.s1 + "/30"),
  (elResultNum2.textContent = myRes.s2 + "/30");
  elfacrec.textContent = myRes.result
elfacname.textContent ="Faculty name: " + myRes.name
elfacstat.textContent = "Result: " +  myRes.status
