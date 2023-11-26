export enum LOG_KEYS {
  EXT_PREFIX = `IFBP:`,
  CONTENT_SCRIPT = `${LOG_KEYS.EXT_PREFIX} content script.`,
  BACKGROUND_SCRIPT = `${LOG_KEYS.EXT_PREFIX} background script.`,
  INSERT_PASTE_FIELD = `${LOG_KEYS.EXT_PREFIX} insert paste field.`,
  INSERT_PREVIEW_CONTAINER = `${LOG_KEYS.EXT_PREFIX} insert preview container.`
}
