// slot.js

// Разворачиваем Web App под полный экран
const tg = window.Telegram.WebApp;
tg.expand();

// Список имён файлов в папке img/
const symbols = [
  'arbuz.png',
  'gift.png',
  'kiwi.png',
  'lemon.png',
  'persik.png',
  'vinograd.png',
];

// DOM-элементы
const reels = [
  document.getElementById('r1'),
  document.getElementById('r2'),
  document.getElementById('r3'),
];
const triesEl = document.getElementById('tries');
const spinBtn = document.getElementById('spin');

// Количество попыток
let tries = 3;
triesEl.textContent = tries;

// Обработчик клика
spinBtn.addEventListener('click', () => {
  if (tries <= 0) return;

  // Уменьшаем счётчик и отображаем
  tries--;
  triesEl.textContent = tries;

  // Перебираем все барабаны и ставим рандомный символ
  reels.forEach(img => {
    const idx = Math.floor(Math.random() * symbols.length);
    img.src = `img/${symbols[idx]}`;
  });

  // Если это была последняя попытка — финал
  if (tries === 0) {
    spinBtn.disabled = true;
    spinBtn.textContent = 'Попытки кончились';

    // 1) Запускаем конфети
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.4 }
    });

    // 2) Шлём в бота событие о выигрыше
    tg.sendData(JSON.stringify({
      event: 'won_bonus',
      amount: 70
    }));
  }
});
