# Delivery Cost Calculator

![HTML](https://img.shields.io/badge/HTML-5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111)
![Responsive](https://img.shields.io/badge/Responsive-Design-2ECC71?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-222222?style=for-the-badge&logo=github&logoColor=white)

**Delivery Cost Calculator** — минималистичный сайт-калькулятор доставки и итоговой стоимости заказа из Китая.

Пользователь вводит цену товара, доставку, вес, комиссию агента, страховку и курс USD к MDL, а сайт рассчитывает итоговую стоимость в долларах и молдавских леях.

## Preview

![Project Preview](./preview.png)

![Calculator Preview](./preview-calculator.png)

## Live Demo

🔗 [Открыть сайт](https://delivery12335.github.io/deliverycalc/)

## Features

- Calculate total order cost
- Convert USD to MDL
- Calculate price per kg
- Add insurance percentage
- Save last 3 calculations in LocalStorage
- Copy result to clipboard
- RU / EN language switcher
- Responsive design

## Tech Stack

- **HTML** — структура страницы
- **CSS** — адаптивный интерфейс и визуальный стиль
- **JavaScript** — логика калькулятора
- **LocalStorage** — история последних расчетов
- **GitHub Pages** — публикация сайта

## Project Structure

```text
delivery-cost-calculator/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run

1. Download or clone repository.
2. Open `index.html` in your browser.

No backend, database, build tools, npm, or frameworks are required.

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
