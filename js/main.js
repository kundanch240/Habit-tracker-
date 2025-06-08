document.addEventListener("DOMContentLoaded", () => {
  const maxXP = 500;
  let currentXP = parseInt(localStorage.getItem("currentXP")) || 0;
  
  updateXPBar(currentXP, maxXP);
  
  const taskContainer = document.querySelector(".added-task");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
  if (tasks.length > 0) {
    tasks.forEach((task) => {
      const { id, name, description, category } = task;
      
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");
      
      const mainSrc = `/img/option/${category.toLowerCase()}.png`;
      
      taskDiv.innerHTML = `
            <img src="${mainSrc}" alt="Task Icon" />
            <div class="title">
              <h3>${name}</h3>
              <p>${description}</p>
            </div>
            <div class="task-fun">
              <i class="fa-solid fa-check"></i>
              <i class="fa-solid fa-xmark"></i>
            </div>
          `;
      
      taskContainer.appendChild(taskDiv);
      
      const xmark = taskDiv.querySelector('.fa-xmark');
      const check = taskDiv.querySelector('.fa-check');
      
      check.addEventListener("click", () => {
        currentXP += 10;
        localStorage.setItem("currentXP", currentXP);
        updateXPBar(currentXP, maxXP);
        console.log(`✅ Completed: ${name}`);
      });
      
      xmark.addEventListener("click", () => {
        let permission;
        alertDelete('Are you sure you want to delete this task?').then((result) => {
          if (result) {
            permission = true;
            console.log(permission);
          } else {
            permission = false;
            console.log(permission);
          }
          if (permission === true) {
            // Remove task from DOM
            taskDiv.remove();
            
            // Remove task from localStorage
            tasks = tasks.filter(t => t.id !== id);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            console.log(`❌ Deleted: ${name, description} `);
          } else {
            console.log('ok')
          }
        });
      });
    });
  } else {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.innerHTML = `<h1>No task found</h1>`;
    taskContainer.appendChild(taskDiv);
  }
});


//making function


function updateXPBar(currentXP, maxXP) {
  const fillPercentage = (currentXP / maxXP) * 100;
  document.getElementById("xp-value").innerText = currentXP;
  document.getElementById("xp-bar-fill").style.width = fillPercentage + "%";
}

//alert box

const alertDelete = (message) => {
  return new Promise((resolve) => {
    let body = document.querySelector('body');
    
    let alertDiv = document.createElement('div');
    alertDiv.classList.add('alert')
    alertDiv.innerHTML = `
      <div class="alert-box" style="background: white; padding: 20px; border: 2px solid black;">
        <h1>${message}</h1>
        <div class="button-alert-box" style="margin-top: 10px;">
          <button id="cancel">Cancel</button>
          <button id="ok">Ok</button>
        </div>
      </div>
    `;
    
    body.appendChild(alertDiv);
    
    // Event Listeners
    alertDiv.querySelector('#cancel').addEventListener('click', () => {
      alertDiv.remove(); // Remove the alert box
      resolve(false); // Return false
    });
    
    alertDiv.querySelector('#ok').addEventListener('click', () => {
      alertDiv.remove(); // Remove the alert box
      resolve(true); // Return true
    });
  });
};