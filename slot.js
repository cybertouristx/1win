const tg = window.Telegram.WebApp;
tg.expand();

let spins = 0;
const btn = document.getElementById("spin");
const msg = document.getElementById("msg");

btn.addEventListener("click", () => {
    spins++;
    if (spins < 3) {
        msg.textContent = `Сделано ${spins} прокруток, продолжайте!`;
    } else {
        msg.textContent = "Поздравляем! Вы получили 70 фриспинов!";
        btn.disabled = true;
        tg.sendData(JSON.stringify({event: "bonus_spins", spins: spins}));
    }
});
