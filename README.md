# Delivery Cost Calculator

![HTML](https://img.shields.io/badge/HTML-5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111)
![Responsive](https://img.shields.io/badge/Responsive-Design-2ECC71?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-222222?style=for-the-badge&logo=github&logoColor=white)

**Delivery Cost Calculator** - минималистичный сайт-калькулятор доставки и итоговой стоимости заказа из Китая.

Пользователь вводит цену товара, доставку, вес, комиссию агента, страховку и курс USD к MDL, а сайт рассчитывает итоговую стоимость в долларах и молдавских леях.

## Preview

![Project Preview](./preview.png)

![Calculator Preview](./preview-calculator.png)

## Live Demo

[Открыть сайт](https://delivery12335.github.io/deliverycalc/)

## Features

- Расчет итоговой стоимости заказа
- Конвертация USD в MDL
- Расчет цены за килограмм
- Добавление процента страховки
- Сохранение последних 3 расчетов в LocalStorage
- Копирование результата в буфер обмена
- Переключатель языка RU / EN
- Адаптивный дизайн для телефона и ПК

## Tech Stack

- **HTML** - структура страницы
- **CSS** - адаптивный интерфейс и визуальный стиль
- **JavaScript** - логика калькулятора
- **LocalStorage** - история последних расчетов
- **GitHub Pages** - публикация сайта

## Project Structure

```text
delivery-cost-calculator/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run

1. Скачайте или клонируйте репозиторий.
2. Откройте файл `index.html` в браузере.

Backend, база данных, сборщики, npm и фреймворки не нужны.

## Formula

```text
subtotal = productPrice + chinaShipping + internationalShipping + agentFee
insuranceValue = subtotal * insurance / 100
totalUsd = subtotal + insuranceValue
totalMdl = totalUsd * usdToMdlRate
pricePerKg = totalUsd / weight
```

## Author

Made by **Max**

GitHub: [delivery12335](https://github.com/delivery12335)
