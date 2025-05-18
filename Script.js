// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Calendar logic
  let selectedRange = null;
  let calendarInstance;
  
  function toggleCalendar() {
    const calendarBox = document.getElementById('calendarBox');
    if (calendarBox.style.display === 'block') {
      calendarBox.style.display = 'none';
    } else {
      calendarBox.style.display = 'block';
      if (!window.calendarInitiated) {
        initCalendar();
        window.calendarInitiated = true;
      }
    }
  }
  
  function initCalendar() {
    const calendarEl = document.getElementById('calendar');
    calendarInstance = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      selectable: true,
      editable: true,
      eventClick: function (info) {
        if (confirm(`Delete '${info.event.title}'?`)) {
          info.event.remove();
          // Delete from backend
          fetch('http://127.0.0.1:8000/api/events', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: info.event.id }) // make sure your backend supports this
          });
        }
      },
      select: function (info) {
        selectedRange = info;
        document.getElementById('event-type-modal').style.display = 'block';
      },
      events: 'http://127.0.0.1:8000/api/events'
    });
    calendarInstance.render();
  }
  
  function submitEventType() {
    const type = document.getElementById('event-type').value;
    const color = type === 'period' ? '#f06292' : '#81c784';
    const title = type.charAt(0).toUpperCase() + type.slice(1);
  
    const event = {
      title,
      start: selectedRange.startStr,
      end: selectedRange.endStr,
      color
    };
  
    calendarInstance.addEvent(event);
  
    // Save to backend
    fetch('http://127.0.0.1:8000/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });
  
    document.getElementById('event-type-modal').style.display = 'none';
  }
 // script.js

// ================= NAVIGATION TABS =================
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").slice(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: "smooth" });
    });
  });
  
  // ================== CALENDAR ===================
  let selectedRange = null;
  let calendarInstance;
  
  function toggleCalendar() {
    const calendarBox = document.getElementById("calendarBox");
    if (calendarBox.style.display === "block") {
      calendarBox.style.display = "none";
    } else {
      calendarBox.style.display = "block";
      if (!window.calendarInitiated) {
        const calendarEl = document.getElementById("calendar");
        calendarInstance = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          selectable: true,
          editable: true,
          eventClick: function(info) {
            if (confirm(`Delete '${info.event.title}'?`)) {
              info.event.remove();
            }
          },
          select: function(info) {
            selectedRange = info;
            document.getElementById('event-type-modal').style.display = 'block';
          },
          events: '/api/events' // load from backend
        });
        calendarInstance.render();
        window.calendarInitiated = true;
      }
    }
  }
  
  function submitEventType() {
    const type = document.getElementById('event-type').value;
    const color = type === 'period' ? '#f06292' : '#81c784';
    const title = type.charAt(0).toUpperCase() + type.slice(1);
  
    calendarInstance.addEvent({
      title,
      start: selectedRange.startStr,
      end: selectedRange.endStr,
      color
    });
  
    // Save to backend
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, start: selectedRange.startStr, end: selectedRange.endStr, color })
    });
  
    document.getElementById('event-type-modal').style.display = 'none';
  }
  
  // ================= PERSONALIZED LIFESTYLE TIPS =================
  const lifestyleList = document.getElementById("lifestyle-list");
  
  const tips = [
    "Low-GI meals (quinoa, oats, sweet potatoes)",
    "Leafy greens & antioxidant-rich foods",
    "Avoid refined sugar & processed carbs",
    "Drink spearmint or green tea",
    "30-min walks or light jogging",
    "Yoga (esp. cobra, bow pose for cramps)",
    "Pilates & low-impact strength training",
    "Deep breathing & meditation (5-10 mins)",
    "Sleep 7-8 hrs daily (keep screen-free time)",
    "Hydration — drink 2-3L water/day",
    "Warm water with lemon every morning",
    "Cut down dairy & gluten (if sensitive)",
    "Chia/flax seeds for hormone balance",
    "Magnesium-rich foods (pumpkin seeds, almonds)",
    "Use heating pads or essential oils for cramps"
  ];
  
  tips.forEach(tip => {
    const li = document.createElement("li");
    li.textContent = tip;
    lifestyleList.appendChild(li);
  });
  
  // =============== MOOD-BASED FOOD SUGGESTIONS ================
  const moodSuggestions = {
    anxious: ["Dark chocolate (85%)", "Avocados", "Chamomile tea", "Pumpkin seeds"],
    sad: ["Salmon", "Bananas", "Walnuts", "Greek yogurt"],
    cravings: ["Frozen grapes", "Dates & nut butter", "Coconut yogurt with berries", "Roasted chickpeas"]
  };
  
  function showMoodFoods(mood) {
    const moodBox = document.getElementById("mood-food-box");
    const items = moodSuggestions[mood] || [];
    moodBox.innerHTML = `<h4>Try these for ${mood} mood:</h4><ul>` + items.map(item => `<li>${item}</li>`).join('') + '</ul>';
    moodBox.style.display = 'block';
  }
  
  // ============ FUTURE IMPROVEMENTS TO ADD ============
  // - Chatbot integration with symptom-based logic
  // - Save user preferences locally or via backend
  // - Reminders via notifications/email for calendar events
  // - Doctor Q&A video or audio snippets
  // - Recommend local doctors based on pin code
   