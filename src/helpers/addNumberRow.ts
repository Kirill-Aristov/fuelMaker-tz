export default function addNumberRow(): void {
  let count: number = 1;
  document.querySelectorAll(".number__row").forEach((element) => {
    element.textContent = String(count);
    return count++;
  });
}