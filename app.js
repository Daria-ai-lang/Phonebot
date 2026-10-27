window.addEventListener("load", function () {
    // 1. Проверяем, что Telegram.WebApp вообще загрузился
    let tg = window.Telegram.WebApp;
    if (!tg) {
        alert("Ошибка: Telegram.WebApp не загружен. Убедитесь, что скрипт telegram-web-app.js подключен в HTML.");
        return;
    }

    tg.expand();
    tg.MainButton.textColor = "#FFFFFF";
    tg.MainButton.color = "#2cab37";

    let item = "";

    // 2. Безопасная функция привязки кнопок
    function setupButton(id, modelKey, text) {
        const btn = document.getElementById(id);
        if (!btn) {
            console.error("Ошибка: Кнопка с id='" + id + "' не найдена в HTML!");
            return;
        }

        btn.addEventListener("click", function () {
            if (tg.MainButton.isVisible) {
                tg.MainButton.hide();
            } else {
                tg.MainButton.setText(text);
                item = modelKey;
                tg.MainButton.show();
            }
        });
    }

    // 3. Привязываем кнопки к ключам из БД
    setupButton("btn1", "iphone_15_pro_max", "Подробнее об iPhone 15 Pro Max");
    setupButton("btn2", "samsung_s24_ultra", "Подробнее о Samsung S24 Ultra");
    setupButton("btn3", "iphone_14", "Подробнее об iPhone 14");
    setupButton("btn4", "samsung_s23_fe", "Подробнее о Samsung S23 FE");

    // 4. Обработка нажатия нижней кнопки Telegram (MainButton)
    tg.onEvent("mainButtonClicked", function () {
        if (!item) {
            console.error("Ошибка: item пуст, данные не выбраны.");
            return;
        }
        console.log("Отправляем в бота:", item);
        tg.sendData(item);
    });
});
