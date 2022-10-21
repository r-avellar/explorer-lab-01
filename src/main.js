import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")

const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardFlag(flag) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#df6f29", "#C69347"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[flag][0])
  ccBgColor02.setAttribute("fill", colors[flag][1])

  ccLogo.setAttribute("src", `cc-${flag}.svg`)
}

setCardFlag("default")

const cvc = document.querySelector('#security-code')
const cvcPattern = {
  mask:"000"
}
const cvcMasked = IMask(cvc, cvcPattern)

const expDate = document.querySelector("#expiration-date")
const expDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from:String(new Date().getFullYear()).slice(2) ,
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
}
const expDateMasked = IMask(expDate, expDatePattern)

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardFlag: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardFlag: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardFlag: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    return foundMask
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", (e)=>{
  e.preventDefault()
  alert("Cartão adicionado")
})

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", ()=>{
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerText =
    cardHolder.value.length > 0 ? cardHolder.value : "FULANO DA SILVA"
})

cvcMasked.on("accept", ()=>{
  const ccSecurity = document.querySelector(".cc-security .value")
  ccSecurity.innerText = cvcMasked.value.length > 0 ? cvcMasked.value : "123" 
})

cardNumberMasked.on("accept", () => {
  const cardFlag = cardNumberMasked.masked.currentMask.cardFlag
  setCardFlag(cardFlag)
  const cardNumberValido = document.querySelector(".cc-number")
  cardNumberValido.innerText = cardNumberMasked.value.length > 0 ? cardNumberMasked.value : "1234 5678 9012 3456"

})

expDateMasked.on("accept", () => {
  const exDate = document.querySelector(".cc-extra .value")
  exDate.innerText = expDateMasked.value.length > 0 ? expDateMasked.value : "02/32"
})





