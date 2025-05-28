const dailyBtn = document.getElementById('dailyBtn');
const oneTimeBtn = document.getElementById('oneTimeBtn');

dailyBtn.addEventListener("click", () => {
  dailyBtn.classList.add('active');
  oneTimeBtn.classList.remove('active');
});

oneTimeBtn.addEventListener("click", () => {
  oneTimeBtn.classList.add('active');
  dailyBtn.classList.remove('active');
});