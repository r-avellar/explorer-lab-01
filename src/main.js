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
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
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