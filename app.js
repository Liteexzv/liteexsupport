const tg = window.Telegram.WebApp;
tg.expand();

// Массив тикетов (для демо)
let tickets = [];

function sendTicket() {
  const category = document.getElementById("category").value;
  const text = document.getElementById("text").value;

  if (!text) {
    alert("Напиши текст тикета!");
    return;
  }

  // Отправка данных боту
  tg.sendData(JSON.stringify({
    category: category,
    text: text
  }));

  // Добавляем в локальную историю (чтобы было красиво)
  const ticketId = tickets.length + 1;
  tickets.unshift({
    id: ticketId,
    category,
    text,
    status: "Новый"
  });

  renderTickets();

  document.getElementById("status").innerText = "✅ Тикет отправлен!";
  document.getElementById("text").value = "";
}

// Функция рендера карточек тикетов
function renderTickets() {
  const container = document.getElementById("ticketsList");
  container.innerHTML = "";

  tickets.forEach(t => {
    const div = document.createElement("div");
    div.classList.add("ticket-card");

    div.innerHTML = `
      <h3>🎫 Тикет #${t.id} (${t.category})</h3>
      <p>${t.text}</p>
      <p class="status">Статус: ${t.status}</p>
    `;
    container.appendChild(div);
  });
}
