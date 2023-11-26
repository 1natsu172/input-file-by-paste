import { LOG_KEYS } from "./libs/logUtil.js"
import { MESSAGE_KEYS } from "./libs/messageKeys.js"
import { toSupportInputByPaste } from "./libs/pasteLogic.js"

export {}

function isInputTypeEqualFile(element: Element): element is HTMLInputElement {
  return element.getAttribute("type") === "file"
}

//------------------------------------------
console.log(LOG_KEYS.CONTENT_SCRIPT)

chrome.runtime.onMessage.addListener((message, _sender, _callback) => {
  if (message !== MESSAGE_KEYS.ALLOW_PASTE_FOR_THIS) {
    return
  }

  const targetElement = document.activeElement
  console.log(message, targetElement)

  if (!isInputTypeEqualFile(targetElement)) {
    alert(`${targetElement.nodeName} is not file input… :(`)
  } else {
    toSupportInputByPaste({ fileInputElement: targetElement })
  }
})
