function sendMessage() {
    const input = document.getElementById("userInput");
    const msg = input.value.trim();
    if (!msg) return;
  
    const chatBody = document.getElementById("chat-body");
  
    // User message
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-message");
    userDiv.textContent = msg;
    chatBody.appendChild(userDiv);
  
    // Simple bot response (static for now)
    const botDiv = document.createElement("div");
    botDiv.classList.add("bot-message");
    botDiv.textContent = generateBotResponse(msg);
    chatBody.appendChild(botDiv);
  
    chatBody.scrollTop = chatBody.scrollHeight;
    input.value = "";
  }
  
  function generateBotResponse(input) {
    const lower = input.toLowerCase();
  
    if (lower.includes("period pain")) return "Try a warm compress and yoga stretches. Need a few suggestions? 🧘‍♀";
    if (lower.includes("meal") || lower.includes("diet")) return "You can go for an anti-inflammatory diet: think oats, berries, and leafy greens 🥗";
    if (lower.includes("stress")) return "Deep breathing, 4-7-8 technique, or mindfulness sessions help a lot 🧘‍♂";
  
    return "I'm still learning! But I’ll try my best to support you 💕";
  }