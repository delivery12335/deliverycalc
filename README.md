# deliverycalc.md

**deliverycalc.md** is a clean, responsive delivery cost calculator for estimating the real price of an order from China before buying.

The project is built with plain **HTML**, **CSS**, and **JavaScript**. No backend, no database, no frameworks, and no build step.

## What It Does

deliverycalc.md helps calculate the full order cost using:

- product price
- local shipping in China
- international shipping
- package weight
- agent fee
- insurance percentage
- USD to MDL exchange rate

The calculator shows:

- total cost in USD
- total cost in MDL
- price per kilogram
- insurance value
- order verdict: Good deal, Normal price, or Expensive order

## Features

- Minimal premium UI with mint and dark chocolate palette
- Responsive layout for desktop and mobile
- EN / RU language switcher
- Instant calculation with validation
- Clear button that resets fields to defaults
- Copy result button
- Local history of the last 3 calculations
- History is saved in `localStorage`
- Works by opening `index.html` directly
- Ready for GitHub Pages

## Formula

```text
subtotal = product price + china shipping + international shipping + agent fee
insuranceValue = subtotal * insurance / 100
totalUsd = subtotal + insuranceValue
totalMdl = totalUsd * usdToMdlRate
pricePerKg = totalUsd / weight
```

## Default Values

```text
Product price: 51
China shipping: 0
International shipping: 35
Weight: 1.2
Agent fee: 5
Insurance: 3
USD to MDL rate: 17.8
```

## Project Structure

```text
deliverycalc/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Deploy To GitHub Pages

1. Create a GitHub repository named `deliverycalc`.
2. Upload these files to the repository root.
3. Open repository `Settings`.
4. Go to `Pages`.
5. Choose `Deploy from a branch`.
6. Select branch `main` and folder `/root`.
7. Save.

Your public website will be available at:

```text
https://YOUR_USERNAME.github.io/deliverycalc/
```

## Custom Domain

If you own the domain `deliverycalc.md`, you can connect it later in GitHub Pages settings and configure DNS for the domain.
