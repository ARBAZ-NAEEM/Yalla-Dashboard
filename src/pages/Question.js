const family = [
  {
    name: "Talha",
    children: [
      {
        name: "Zaid",
        children: [
          { name: "Waqar", children: [{ name: "Shehzad", children: [] }] },
          {
            name: "Wajid",
            children: [
              {
                name: "Majeed",
                children: [
                  { name: "Saleh", children: [] },
                  { name: "JACK", children: [] },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Moobeen",
        children: [
          {
            name: "Wajeeh",
            children: [
              { name: "Samad", children: [] },
              { name: "A. Wahab", children: [] },
            ],
          },
        ],
      },
    ],
  },
];

function getNameOfFamily(family) {
  if (family?.[0]?.length > 0) {
    for (let index = 0; index < family.length; index++) {
      const element = family[index];
      console.log(element);
      getNameOfFamily(family?.children);
    }
  } else {
    console.log(family?.[0]?.name);
    getNameOfFamily(family?.children);
  }
}

console.log(getNameOfFamily(family))

// var array1 = [20, 33, 1, 3221, 23, 122];
// var array2 = [4, 23, 343, 44, 55, 122];

// for (var i = 0; i < array2.length; i++) {
//   var arrlen = array1.length;
//   for (var j = 0; j < arrlen; j++) {
//     if (array2[i] == array1[j]) {
//       array1 = array1.slice(0, j).concat(array1.slice(j + 1, arrlen));
//     }
//   }
// }

// console.log(array1);

// const stringArray = ["20", "33", "1", "3221", "23", "122"];
// const integerArray = [(4, 23, 343, 44, 55, 122)];

// const newArray = [];

// for (let i = 0; i <= stringArray.length - 1; i++) {
//   for (let j = 0; j <= integerArray.length - 1; j++) {
//     if (stringArray[i] != integerArray[j]) {
//       array1 = array1.slice(0, j).concat(array1.slice(j + 1, arrlen));
//     }
//   }
// }

// console.log(newArray);
