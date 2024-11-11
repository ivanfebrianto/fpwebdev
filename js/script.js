document.addEventListener("DOMContentLoaded", loadAchievements);

function add(event) {
  event.preventDefault();
  const achievementInput = document.getElementById("achievementInput");
  const achievement = achievementInput.value.trim();
  const isStatus = document.getElementById("statusCheckbox").checked; // Dynamically get checkbox state

  if (achievement) {
    const achievements = JSON.parse(localStorage.getItem("achievements")) || [];
    achievements.push({ text: achievement, isStatus: isStatus });
    localStorage.setItem("achievements", JSON.stringify(achievements));

    achievementInput.value = "";
    document.getElementById("statusCheckbox").checked = false;
    loadAchievements();
  }
}

function loadAchievements() {
  const achievementList = document.getElementById("achievementList");
  achievementList.innerHTML = "";

  const achievements = JSON.parse(localStorage.getItem("achievements")) || [];

  achievements.forEach((achievement, index) => {
    const listItem = document.createElement("li");
    listItem.className =
      "list-group-item d-flex justify-content-between align-items-center";

    const achievementText = document.createElement("span");
    achievementText.textContent = achievement.text;

    // Apply strikethrough if isStatus is true
    if (achievement.isStatus === true) {
      achievementText.classList.add("text-decoration-line-through");
    }

    const statusCheckbox = document.createElement("input");
    statusCheckbox.type = "checkbox";
    statusCheckbox.className = "form-check-input me-3";
    statusCheckbox.checked = achievement.isStatus;
    statusCheckbox.onchange = () => toggleStatus(index);

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-sm btn-danger";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteAchievement(index);

    listItem.appendChild(statusCheckbox);
    listItem.appendChild(achievementText);
    listItem.appendChild(deleteButton);
    achievementList.appendChild(listItem);
  });
}

function toggleStatus(index) {
  const achievements = JSON.parse(localStorage.getItem("achievements")) || [];
  achievements[index].isStatus = !achievements[index].isStatus;
  localStorage.setItem("achievements", JSON.stringify(achievements));
  loadAchievements();
}

function deleteAchievement(index) {
  const achievements = JSON.parse(localStorage.getItem("achievements")) || [];
  achievements.splice(index, 1);
  localStorage.setItem("achievements", JSON.stringify(achievements));
  loadAchievements();
}
