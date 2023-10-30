const unescapeHtml = (str) => {
  if (typeof str === 'string') {
    return str
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&#x60;/g, '`')
  } else {
    return str
  }
}

export default unescapeHtml
