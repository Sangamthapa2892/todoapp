document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;
  const taskInput = document.getElementById("task-input");
  const addBtn = document.getElementById("add-btn");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const taskCheckboxes = document.querySelectorAll(".task-checkbox");
  const editBtns = document.querySelectorAll(".edit-btn");
  const deleteBtns = document.querySelectorAll(".delete-btn");

  // Theme toggle functionality
  themeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });

  // Add button click effect
  addBtn.addEventListener("click", function () {
    this.style.opacity = "0.7";
    setTimeout(() => {
      this.style.opacity = "1";
    }, 200);
  });

  // Filter buttons active state
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Task checkbox toggle
  taskCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const taskItem = this.closest(".task-item");

      // Add or remove the 'completed' class
      if (this.checked) {
        taskItem.classList.add("completed");
      } else {
        taskItem.classList.remove("completed");
      }
    });
  });

  // Edit button effect
editBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const taskItem = this.closest(".task-item");
    const taskId = taskItem.dataset.id;
    const taskName = taskItem.querySelector(".task-text").textContent.trim();

    // Create a new <li> with an edit form
    const editLi = document.createElement("li");
    editLi.className = "task-item";

    editLi.innerHTML = `
      <form action="/edit-todo/${taskId}/" method="post" style="display: flex; gap: 200px; align-items: center; margin-top: 8px;">
        <input type="hidden" name="csrfmiddlewaretoken" value="${
          document.querySelector("[name=csrfmiddlewaretoken]").value
        }">
        <input type="text" name="name" value="${taskName}" class="edit-input" />
        <button type="submit" class="update-btn">Update</button>
      </form>
    `;

    // Replace the original <li> with the edit form
    taskItem.replaceWith(editLi);
  });
});

  // Input field focus effect
  taskInput.addEventListener("focus", function () {
    this.style.borderColor = "#6a11cb";
  });

  taskInput.addEventListener("blur", function () {
    if (body.classList.contains("dark-mode")) {
      this.style.borderColor = "#4a5568";
    } else {
      this.style.borderColor = "#e0e0e0";
    }
  });
});

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    localStorage.setItem("selectedFilter", btn.getAttribute("href"));
  });
});

// On page load, apply the stored filter
window.addEventListener("DOMContentLoaded", () => {
  const savedFilter = localStorage.getItem("selectedFilter");
  if (savedFilter) {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
      if (btn.getAttribute("href") === savedFilter) {
        btn.classList.add("active");
      }
    });
  }
});