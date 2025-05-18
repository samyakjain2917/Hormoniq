document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const plansSection = document.querySelector(".plans-section");
    const tipsSection = document.querySelector(".extra-tips");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const activity = document.getElementById("activity").value;
      const sleep = document.getElementById("sleep").value;
      const workout = document.getElementById("workout").value;
  
      // Filter logic (can be expanded further)
      let filteredTips = [];
  
      if (activity === "not_active") {
        filteredTips.push("Start with gentle yoga or walks 3x a week.");
      } else {
        filteredTips.push("Maintain an active lifestyle with cardio + strength.");
      }
  
      if (sleep === "less_5") {
        filteredTips.push("Work on improving your sleep hygiene.");
      } else if (sleep === "6_7") {
        filteredTips.push("Aim for at least 8 hours of sleep for better recovery.");
      } else {
        filteredTips.push("Great! Keep up the consistent sleep schedule.");
      }
  
      if (workout === "none") {
        filteredTips.push("Begin with 10-minute light routines daily.");
      } else if (workout === "weekly") {
        filteredTips.push("Consider increasing your workout days gradually.");
      } else {
        filteredTips.push("Daily workouts help keep hormones balanced!");
      }
  
      // Update extra tips section dynamically
      const tipsList = tipsSection.querySelector("ul");
      tipsList.innerHTML = ""; // Clear existing tips
  
      filteredTips.forEach(tip => {
        const li = document.createElement("li");
        li.textContent = tip;
        tipsList.appendChild(li);
      });
  
      // Scroll to plans
      plansSection.scrollIntoView({ behavior: "smooth" });
    });
  });
  