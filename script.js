const defaults = {
  productPrice: 51,
  chinaShipping: 0,
  internationalShipping: 35,
  weight: 1.2,
  agentFee: 5,
  insurance: 3,
  usdRate: 17.8,
};

const translations = {
  en: {
    brand: "deliverycalc.md",
    heroEyebrow: "SMART ORDER TOOL",
    title: "Delivery Cost Calculator",
    subtitle: "Calculate your real order price before buying",
    start: "Start calculation",
    sampleAria: "Order estimate example",
    orderEstimate: "ORDER ESTIMATE",
    pairLabel: "EXAMPLE",
    sampleProduct: "Product",
    sampleShipping: "Shipping",
    sampleTotal: "Total",
    sectionEyebrow: "ORDER CALCULATION",
    calculatorTitle: "Order calculator",
    productPrice: "Product price",
    chinaShipping: "China shipping",
    internationalShipping: "International shipping",
    weight: "Weight",
    agentFee: "Agent fee",
    insurance: "Insurance",
    usdRate: "USD to MDL rate",
    calculate: "Calculate",
    clear: "Clear",
    copyResult: "Copy result",
    totalUsd: "Total USD",
    totalMdl: "Total MDL",
    pricePerKg: "Price per kg",
    insuranceValue: "Insurance value",
    goodDeal: "Good deal",
    normalPrice: "Normal price",
    expensiveOrder: "Expensive order",
    historyTitle: "Recent calculations",
    lastThree: "LAST 3",
    emptyHistory: "No calculations yet.",
    emptyResult: "Your calculated result will appear here.",
    copied: "Copied!",
    copyHeading: "Delivery Cost Result",
    copyTotal: "Total",
    copyTotalMdl: "Total MDL",
    copyPricePerKg: "Price per kg",
    copyFirst: "Calculate an order before copying.",
    fillAll: "Please fill in every field.",
    validNumbers: "Please enter valid numbers.",
    weightError: "Weight must be greater than 0.",
    rateError: "USD to MDL rate must be greater than 0.",
  },
  ru: {
    brand: "deliverycalc.md",
    heroEyebrow: "УМНЫЙ РАСЧЕТ ЗАКАЗА",
    title: "Калькулятор доставки",
    subtitle: "Посчитай реальную цену заказа перед покупкой",
    start: "Начать расчет",
    sampleAria: "Пример расчета заказа",
    orderEstimate: "РАСЧЕТ ЗАКАЗА",
    pairLabel: "ПРИМЕР",
    sampleProduct: "Товар",
    sampleShipping: "Доставка",
    sampleTotal: "Итого",
    sectionEyebrow: "РАСЧЕТ ЗАКАЗА",
    calculatorTitle: "Расчет заказа",
    productPrice: "Цена товара",
    chinaShipping: "Доставка по Китаю",
    internationalShipping: "Международная доставка",
    weight: "Вес",
    agentFee: "Комиссия агента",
    insurance: "Страховка",
    usdRate: "Курс USD к MDL",
    calculate: "Рассчитать",
    clear: "Очистить",
    copyResult: "Скопировать результат",
    totalUsd: "Итого в USD",
    totalMdl: "Итого в MDL",
    pricePerKg: "Цена за кг",
    insuranceValue: "Сумма страховки",
    goodDeal: "Выгодно",
    normalPrice: "Нормальная цена",
    expensiveOrder: "Дорого",
    historyTitle: "Последние расчеты",
    lastThree: "ПОСЛЕДНИЕ 3",
    emptyHistory: "Расчетов пока нет.",
    emptyResult: "Здесь появится результат расчета.",
    copied: "Copied!",
    copyHeading: "Результат расчета доставки",
    copyTotal: "Итого",
    copyTotalMdl: "Итого MDL",
    copyPricePerKg: "Цена за кг",
    copyFirst: "Сначала рассчитайте заказ.",
    fillAll: "Заполните все поля.",
    validNumbers: "Введите корректные числа.",
    weightError: "Вес должен быть больше 0.",
    rateError: "Курс USD к MDL должен быть больше 0.",
  },
};

const historyKey = "deliveryCostHistory";
const form = document.querySelector("#calculatorForm");
const inputs = Object.fromEntries(
  Object.keys(defaults).map((key) => [key, document.querySelector(`#${key}`)])
);
const errorElement = document.querySelector("#formError");
const copyStatus = document.querySelector("#copyStatus");
const resultCard = document.querySelector("#resultCard");
const resultEmpty = document.querySelector("#resultEmpty");
const resultContent = document.querySelector("#resultContent");
const calculatorForm = document.querySelector(".calculator-form");
const historyList = document.querySelector("#historyList");
const clearButton = document.querySelector("#clearButton");
const copyButton = document.querySelector("#copyButton");
const languageButtons = document.querySelectorAll(".lang-button");

let currentLanguage = "en";
let currentResult = null;
let resizeTimer = null;

function moneyUsd(value) {
  return `$${Number(value).toFixed(2)}`;
}

function moneyMdl(value) {
  return `${Number(value).toFixed(2)} MDL`;
}

function setError(message) {
  errorElement.textContent = message;
  requestAnimationFrame(syncResultHeight);
}

function clearMessages() {
  setError("");
  copyStatus.textContent = "";
}

function syncResultHeight() {
  if (window.matchMedia("(min-width: 861px)").matches) {
    resultCard.style.height = `${calculatorForm.offsetHeight}px`;
  } else {
    resultCard.style.height = "";
  }
}

function readValues() {
  const emptyField = Object.values(inputs).some((input) => input.value.trim() === "");
  if (emptyField) {
    throw new Error(translations[currentLanguage].fillAll);
  }

  const values = Object.fromEntries(
    Object.entries(inputs).map(([key, input]) => [key, Number(input.value)])
  );

  if (Object.values(values).some((value) => !Number.isFinite(value))) {
    throw new Error(translations[currentLanguage].validNumbers);
  }

  if (values.weight <= 0) {
    throw new Error(translations[currentLanguage].weightError);
  }

  if (values.usdRate <= 0) {
    throw new Error(translations[currentLanguage].rateError);
  }

  return values;
}

function calculate(values) {
  const subtotal = values.productPrice + values.chinaShipping + values.internationalShipping + values.agentFee;
  const insuranceValue = (subtotal * values.insurance) / 100;
  const totalUsd = subtotal + insuranceValue;
  const totalMdl = totalUsd * values.usdRate;
  const pricePerKg = totalUsd / values.weight;
  let verdictKey = "expensiveOrder";

  if (totalUsd < 80) {
    verdictKey = "goodDeal";
  } else if (totalUsd <= 150) {
    verdictKey = "normalPrice";
  }

  return {
    subtotal,
    insuranceValue,
    totalUsd,
    totalMdl,
    pricePerKg,
    verdictKey,
    createdAt: new Date().toISOString(),
  };
}

function showResult(result) {
  currentResult = result;
  resultEmpty.hidden = true;
  resultContent.hidden = false;
  syncResultHeight();

  document.querySelector("#verdictText").textContent = translations[currentLanguage][result.verdictKey];
  document.querySelector("#totalUsd").textContent = moneyUsd(result.totalUsd);
  document.querySelector("#totalMdl").textContent = moneyMdl(result.totalMdl);
  document.querySelector("#pricePerKg").textContent = moneyUsd(result.pricePerKg);
  document.querySelector("#insuranceValue").textContent = moneyUsd(result.insuranceValue);

  requestAnimationFrame(() => {
    resultContent.classList.add("is-visible");
    resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

function resetResult() {
  currentResult = null;
  resultContent.classList.remove("is-visible");
  resultContent.hidden = true;
  resultEmpty.hidden = false;
  syncResultHeight();
}

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(historyKey)) || [];
  } catch {
    return [];
  }
}

function saveHistory(result) {
  const nextHistory = [
    {
      createdAt: result.createdAt,
      totalUsd: result.totalUsd,
      totalMdl: result.totalMdl,
    },
    ...getHistory(),
  ].slice(0, 3);

  localStorage.setItem(historyKey, JSON.stringify(nextHistory));
  renderHistory();
}

function formatDate(isoDate) {
  const locale = currentLanguage === "ru" ? "ru-RU" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoDate));
}

function renderHistory() {
  const history = getHistory();
  historyList.innerHTML = "";

  if (history.length === 0) {
    const empty = document.createElement("p");
    empty.className = "history-empty";
    empty.textContent = translations[currentLanguage].emptyHistory;
    historyList.append(empty);
    return;
  }

  history.forEach((item) => {
    const card = document.createElement("article");
    card.className = "history-card";
    card.innerHTML = `
      <div class="history-date">${formatDate(item.createdAt)}</div>
      <div class="history-money">
        <strong>${moneyUsd(item.totalUsd)}</strong>
        <span>${moneyMdl(item.totalMdl)}</span>
      </div>
    `;
    historyList.append(card);
  });
}

function applyLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = translations[language][key];
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    element.setAttribute("aria-label", translations[language][key]);
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (currentResult) {
    document.querySelector("#verdictText").textContent = translations[currentLanguage][currentResult.verdictKey];
  }

  renderHistory();
  clearMessages();
  syncResultHeight();
}

function resetForm() {
  Object.entries(defaults).forEach(([key, value]) => {
    inputs[key].value = value;
  });

  clearMessages();
  resetResult();
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall back for browsers that expose the API but block it in local pages.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "0";
  textarea.style.top = "0";
  textarea.style.width = "1px";
  textarea.style.height = "1px";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.append(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  const copyHandler = (event) => {
    event.clipboardData.setData("text/plain", text);
    event.preventDefault();
  };

  document.addEventListener("copy", copyHandler);
  const copied = document.execCommand("copy");
  document.removeEventListener("copy", copyHandler);
  textarea.remove();

  if (!copied) {
    throw new Error("Copy failed");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearMessages();

  try {
    const result = calculate(readValues());
    showResult(result);
    saveHistory(result);
  } catch (error) {
    setError(error.message);
  }
});

clearButton.addEventListener("click", resetForm);

copyButton.addEventListener("click", async () => {
  clearMessages();

  if (!currentResult) {
    setError(translations[currentLanguage].copyFirst);
    return;
  }

  const text = [
    translations[currentLanguage].copyHeading,
    `${translations[currentLanguage].copyTotal}: ${moneyUsd(currentResult.totalUsd)}`,
    `${translations[currentLanguage].copyTotalMdl}: ${moneyMdl(currentResult.totalMdl)}`,
    `${translations[currentLanguage].copyPricePerKg}: ${moneyUsd(currentResult.pricePerKg)}`,
  ].join("\n");

  try {
    await copyText(text);
    copyStatus.textContent = translations[currentLanguage].copied;
    syncResultHeight();
  } catch {
    setError(text);
  }
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

applyLanguage("en");
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(syncResultHeight, 120);
});
window.addEventListener("load", syncResultHeight);
