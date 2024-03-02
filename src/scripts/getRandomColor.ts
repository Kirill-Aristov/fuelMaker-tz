
export default function getRandomColor(numberRows: number) {
  const arrayColor = [];
  let r, g, b;
  for (let index = 0; index < numberRows; index++) {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);

    while (r < 50 && g < 50 && b < 50) {
      r = Math.floor(Math.random() * 256);
      g = Math.floor(Math.random() * 256);
      b = Math.floor(Math.random() * 256);
    }
    arrayColor.push("rgb(" + r + ", " + g + ", " + b + ")");
  }

  return arrayColor;
}
