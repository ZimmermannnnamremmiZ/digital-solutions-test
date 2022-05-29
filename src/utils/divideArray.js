// функция для группировки элементов массива (необходимо для карусели (слайдера), так как исходя из макета, на слайде по 4 элемента (пользователя))
const arrDivide = (arr, size) => {
  const dividedArr = []; //массив в который будет выведен результат.
  for (let i = 0; i <Math.ceil(arr.length/size); i++) {
      dividedArr[i] = arr.slice((i*size), (i*size) + size);
  };
  return dividedArr;
}

export default arrDivide;