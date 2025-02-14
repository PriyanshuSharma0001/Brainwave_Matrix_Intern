document.addEventListener("DOMContentLoaded", function () {
    const planner = document.getElementById("planner");
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM

    function loadTasks() {
        return JSON.parse(localStorage.getItem("tasks")) || {};
    }

    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderPlanner() {
        planner.innerHTML = "";
        const tasks = loadTasks();

        hours.forEach(hour => {
            const hourBlock = document.createElement("div");
            hourBlock.classList.add("hour-block");

            const label = document.createElement("span");
            label.textContent = `${hour}:00`;
            hourBlock.appendChild(label);

            const input = document.createElement("input");
            input.type = "text";
            input.value = tasks[hour] || "";
            input.dataset.hour = hour;
            hourBlock.appendChild(input);

            const saveBtn = document.createElement("button");
            saveBtn.textContent = "Save";
            saveBtn.onclick = function () {
                tasks[hour] = input.value;
                saveTasks(tasks);
            };
            hourBlock.appendChild(saveBtn);

            planner.appendChild(hourBlock);
        });
    }

    renderPlanner();
});
