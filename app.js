let tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";

let item = "";

function setupButton(id, modelKey, text) {
    document.getElementById(id).addEventListener("click", function () {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.setText(text);
            item = modelKey;
            tg.MainButton.show();
        }
    });
}

// Связываем кнопки с ключами из твоей базы данных (model_key)
setupButton("btn1", "iphone_15_pro_max", "Подробнее об iPhone 15 Pro Max");
setupButton("btn2", "samsung_s24_ultra", "Подробнее о Samsung S24 Ultra");
setupButton("btn3", "iphone_14", "Подробнее об iPhone 14");
setupButton("btn4", "samsung_s23_fe", "Подробнее о Samsung S23 FE");

Telegram.WebApp.onEvent("mainButtonClicked", function () {
    console.log("Кнопка нажата! Отправляю: " + item);
    alert("Отправляю в бота: " + item); // Это покажет окошко на экране
    tg.sendData(item);
});
