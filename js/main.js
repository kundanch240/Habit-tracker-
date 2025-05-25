console.log('Hello World!');

// lodder start 
const currentXP = 500;
const maxXP = 500;
const fillPercentage = (currentXP / maxXP) * 100;

document.getElementById("xp-value").textContent = currentXP;
document.getElementById("xp-bar-fill").style.width = fillPercentage + "%";

// end