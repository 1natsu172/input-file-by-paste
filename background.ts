import { LOG_KEYS } from "./libs/logUtil.js"
import { MESSAGE_KEYS } from "./libs/messageKeys.js"

export {}

console.log(LOG_KEYS.BACKGROUND_SCRIPT)

chrome.runtime.onInstalled.addListener(() => {
  // Create one test item for each context type.
  let contexts = [
    // "page",
    // "selection",
    // "link",
    "editable"
    // "image"
    // "video",
    // "audio"
  ] as unknown as chrome.contextMenus.ContextType[]

  for (let i = 0; i < contexts.length; i++) {
    let context = contexts[i]
    let title = MESSAGE_KEYS.ALLOW_PASTE_FOR_THIS
    chrome.contextMenus.create({
      title: title,
      contexts: [context],
      id: context
    })
  }
})

chrome.contextMenus.onClicked.addListener(genericOnClick)

// A generic onclick callback function.
async function genericOnClick(
  info: chrome.contextMenus.OnClickData,
  tab: chrome.tabs.Tab
) {
  console.log("context menu item clicked.", info)

  chrome.tabs.sendMessage(tab.id, MESSAGE_KEYS.ALLOW_PASTE_FOR_THIS)
}

// async function getCurrentTab() {
//   let queryOptions = { active: true, lastFocusedWindow: true }
//   // `tab` will either be a `tabs.Tab` instance or `undefined`.
//   let [tab] = await chrome.tabs.query(queryOptions)
//   return tab
// }
