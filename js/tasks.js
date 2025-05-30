document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("taskForm");

  const dailyBtn = document.getElementById("dailyBtn");
  const oneTimeBtn = document.getElementById("oneTimeBtn");

  dailyBtn.addEventListener("click", () => {
    dailyBtn.classList.add("active");
    oneTimeBtn.classList.remove("active");
  });

  oneTimeBtn.addEventListener("click", () => {
    oneTimeBtn.classList.add("active");
    dailyBtn.classList.remove("active");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskName = document.getElementById("taskName").value.trim();
    const taskDescription = document.getElementById("taskDiscription").value.trim();
    const category = document.getElementById("category").value;
    const deadline = document.getElementById("deadline").value;
    const isDailyTask = dailyBtn.classList.contains("active");
    const taskType = isDailyTask ? "daily" : "one-time";

    const taskData = {
      id: Date.now(), // Unique ID for each task
      name: taskName,
      description: taskDescription,
      category,
      deadline,
      type: taskType,
      completed: false
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskData);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    alert("✅ Task saved successfully!");
    form.reset();
    dailyBtn.classList.add("active");
    oneTimeBtn.classList.remove("active");
  });
});