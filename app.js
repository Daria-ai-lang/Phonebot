let tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";

let item = "";

// Функция для снятия выделения со всех карточек
function removeSelection() {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('selected');
    });
}

function setupButton(id, modelKey, text) {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.addEventListener("click", function () {
        // Если кнопка уже видима, скрываем её (отмена выбора)
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide();
            removeSelection();
            item = "";
        } else {
            // Иначе показываем кнопку и выделяем карточку
            tg.MainButton.setText(text);
            item = modelKey;
            
            // Визуально выделяем выбранную карточку
            removeSelection();
            btn.classList.add('selected');
            
            tg.MainButton.show();
        }
    });
}

setupButton("btn1", "iphone_15_pro_max", "Подробнее об iPhone 15");
setupButton("btn2", "samsung_s24_ultra", "Подробнее о Samsung S24");
setupButton("btn3", "iphone_14", "Подробнее об iPhone 14");
setupButton("btn4", "samsung_s23_fe", "Подробнее о Samsung S23 FE");

Telegram.WebApp.onEvent("mainButtonClicked", function () {
    if (item) {
        tg.sendData(item);
    }
});
