export const calculateSum = (array, property) => {
  console.log(array);
  //   let sum = 0;
  //   for (let index = 0; index < array.length; index++) {
  //     sum += parseInt(array[index].Credit);
  //   }
  //   console.log(sum);
  //   return sum;
  const total = array.reduce((accumulator, object) => {
    return accumulator + parseInt(object[property]);
  }, 0);
  console.log(total);
  if (total == NaN) {
    return 0;
  } else {
    return total;
  }
};
