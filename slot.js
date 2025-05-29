// slot.js

// Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();

// Список имён файлов картинок (без расширения)
const symbols = ['gift','arbuz','kiwi','lemon','persik','vinograd'];

let tries = 3;
const triesEl = document.getElementById('tries');
const btn     = document.getElementById('spin');
const reels   = [
  document.getElementById('r1'),
  document.getElementById('r2'),
  document.getElementById('r3')
];

// Функция запуска спина
btn.addEventListener('click', () => {
  if (tries <= 0) return;
  tries--;
  triesEl.textContent = tries;
  btn.disabled = true;
  
  // Добавим CSS-класс для анимации (если у вас есть .spin в style.css)
  reels.forEach(r => r.classList.add('spin'));

  setTimeout(() => {
    // Проставляем конечные картинки
    reels.forEach((r, i) => {
      if (tries === 0) {
        // На последнем спине — всегда подарок
        r.src = `img/gift.png`;
      } else {
        // Иначе выбираем случайный символ (можно включить gift, если хотите шанс)
        const idx = Math.floor(Math.random() * symbols.length);
        r.src = `img/${symbols[idx]}.png`;
      }
      r.classList.remove('spin');
    });

    if (tries === 0) {
      // Запускаем конфетти
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.3 } });
      // Шлём в Телеграм-бота событие о том, что юзер выиграл 70 фриспинов
      tg.sendData(JSON.stringify({ event: 'bonus_spins', spins: 70 }));
      // Меняем кнопку на сбор бонуса
      btn.textContent = 'Забрать бонус';
      btn.disabled = false;
    } else {
      // Разрешаем новый спин
      btn.disabled = false;
    }
  }, 1000);
});
