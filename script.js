const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const amtEl = document.querySelector('#amount-input');
const dropdown = document.querySelectorAll('#selector select');
const convertEl = document.querySelector('#convert');
const toCurr = document.querySelector('#to select');
const fromCurr = document.querySelector('#from select');
const finalmsg = document.querySelector("#final-msg");

let options;
for (let select of dropdown){
    for (let currCode in countryList){
        if (currCode === 'INR' && select.name === 'to' || currCode === 'USD' && select.name === 'from'){
            options += `<option value="${currCode}" selected>${currCode}</option>\n`
        }
        options += `<option value="${currCode}">${currCode}</option>\n`
    }
    select.innerHTML = options
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

function updateFlag(element){
    const countryCode = countryList[element.value]
    const newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    const imgEl = element.parentElement.querySelector('img')
    imgEl.src = newSrc
}

const updateExchangeRate = async () => {
    let amount = amtEl.value
    if (amount === "" || amount <= 0){
        amount = 1
    }
    const Url = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(Url);
    let data = await response.json();
    const rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    const finalAmount = (amount * rate).toFixed(2);
    finalmsg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

convertEl.addEventListener('click', () => {updateExchangeRate()});

amtEl.addEventListener('keydown', () => {updateExchangeRate()});

window.addEventListener('load', () => {updateExchangeRate()});
