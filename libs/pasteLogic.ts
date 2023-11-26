import { LOG_KEYS } from "./logUtil.js"

export function toSupportInputByPaste({
  fileInputElement
}: {
  fileInputElement: HTMLInputElement
}) {
  const originalFilesProperty = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "files"
  )

  // カスタムセッターを定義
  Object.defineProperty(fileInputElement, "files", {
    ...originalFilesProperty,
    set(files) {
      // オリジナルのセッターを呼び出し
      originalFilesProperty.set.call(this, files)

      // カスタムイベントを発火
      const event = new Event("filesInputChanged")
      this.dispatchEvent(event)
    }
  })

  setupPasteFunctions(fileInputElement)
}

function setupPasteFunctions(fileInputElement: HTMLInputElement) {
  const IFBPContainer = insertIFBPContainer(fileInputElement)
  const { previewContainer } = insertPasteExtendFields({
    fileInputElement,
    IFBPContainer
  })
  observeInputFilesChanged({ fileInputElement, previewContainer })
}

function insertIFBPContainer(fileInputElement: HTMLInputElement) {
  const parentElementOfFileInput = fileInputElement.parentElement
  const div = document.createElement("div")
  parentElementOfFileInput.after(div)
  return div
}

function insertPasteExtendFields({
  fileInputElement,
  IFBPContainer
}: {
  fileInputElement: HTMLInputElement
  IFBPContainer: HTMLElement
}) {
  insertPasteField({ fileInputElement, IFBPContainer })
  const previewContainer = insertPreviewContainer({
    fileInputElement,
    IFBPContainer
  })
  return { previewContainer }
}

function insertPasteField({
  fileInputElement,
  IFBPContainer
}: {
  fileInputElement: HTMLInputElement
  IFBPContainer: HTMLElement
}) {
  console.log(LOG_KEYS.INSERT_PASTE_FIELD)

  const pasteElement = document.createElement("input")
  pasteElement.type = "text"
  IFBPContainer.appendChild(pasteElement)

  pasteElement.addEventListener("paste", (e) => {
    console.log("on paste.", e.clipboardData.files)

    fileInputElement.files = e.clipboardData.files
  })
}

function insertPreviewContainer({
  IFBPContainer
}: {
  fileInputElement: HTMLInputElement
  IFBPContainer: HTMLElement
}) {
  console.log(LOG_KEYS.INSERT_PREVIEW_CONTAINER)

  const div = document.createElement("div")
  div.className = "IFBPpreview"
  IFBPContainer.appendChild(div)
  return div
}

function previewFile({
  file,
  previewContainer
}: {
  file: File
  previewContainer: Element
}) {
  // FileReaderオブジェクトを作成
  const reader = new FileReader()

  // URLとして読み込んだときに実行する処理
  reader.onload = (event) => {
    const imageUrl = event.target.result // URLはevent.target.resultで呼び出せる
    const img = document.createElement("img") // img要素を作成
    // @ts-expect-error
    img.src = imageUrl // URLをimg要素にセット
    previewContainer.appendChild(img) // #previewの中に追加
  }

  // ファイルをURLとして読み込む
  reader.readAsDataURL(file)
}

function observeInputFilesChanged({
  fileInputElement,
  previewContainer
}: {
  fileInputElement: HTMLInputElement
  previewContainer: HTMLElement
}) {
  const previewFiles = () => {
    const files = fileInputElement.files
    console.log("handleFileChange", files)
    for (let i = 0; i < files.length; i++) {
      console.log(files[i])
      previewFile({ file: files[i], previewContainer: previewContainer })
    }
  }

  // イベントリスナーを追加
  fileInputElement.addEventListener("filesInputChanged", previewFiles)
}
