import { LOG_KEYS } from "./libs/logUtil.js"

export {}

console.log(LOG_KEYS.CONTENT_SCRIPT)

chrome.runtime.onMessage.addListener((message, sender, callback) => {
  console.log(message, document.activeElement)
})
