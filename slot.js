const symbols = [
  'gift.png',
  'cherry.png',
  'watermelon.png',
  'strawberry.png',
  'bell.png',
  'cherry2.png'
];

let tries = 3;
const triesLabel = document.getElementById('tries');
const btn = document.getElementById('spin');
const reels = [
  document.getElementById('r1'),
  document.getElementById('r2'),
  document.getElementById('r3')
];

// Запускаем спин
btn.addEventListener('click', () => {
  if (tries <= 0) return;
  tries--;
  triesLabel.textContent = tries;

  // Для каждого барабана выбираем случайный символ
  reels.forEach(img => {
    const rnd = Math.floor(Math.random() * symbols.length);
    img.src = `img/${symbols[rnd]}`;
  });

  // Если попытки закончились — отправляем данные в бота
  if (tries === 0) {
    btn.disabled = true;
    window.Telegram.WebApp.sendData(JSON.stringify({
      event: 'bonus_spins',
      spins: 3,
      result: reels.map(img => img.src.split('/').pop())
    }));
  }
});

