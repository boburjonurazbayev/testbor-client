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

const array = [
  { f1: 1, f2: "8", f3: false },
  { f1: 2, f2: "6", f3: false },
  { f1: 3, f2: "0", f3: false },
  { f1: 4, f2: "4", f3: true },
];

// const result = getRandomItem(array);
// console.log(result);

let ind = 2

for (let index = 0; index < 5; index++) {
  
  console.log(index);
  if (index == ind) {
    console.log('push');
    break
  }
  
}