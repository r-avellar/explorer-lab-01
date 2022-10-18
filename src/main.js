import "./css/index.css"

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