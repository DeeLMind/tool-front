/**
 * morse加密
 * @param {string} data
 * @param {string} formatSelected
 * @returns {string}
 */
export function Encrypt(data, formatSelect) {
  const format = formatSelect.split('/')
  const dash = format[0]
  const dot = format[1]

  data = data.split(/\r?\n/)
  data = Array.prototype.map.call(data, function(line) {
    let words = line.split(/ +/)
    words = Array.prototype.map.call(words, function(word) {
      const letters = Array.prototype.map.call(word, function(character) {
        const letter = character.toUpperCase()
        if (typeof MORSE_TABLE[letter] === 'undefined') {
          return ''
        }

        return MORSE_TABLE[letter]
      })

      return letters.join('<ld>')
    })
    line = words.join('<wd>')
    return line
  })
  data = data.join('\n')

  data = data.replace(
    /<dash>|<dot>|<ld>|<wd>/g,
    function(match) {
      switch (match) {
        case '<dash>': return dash
        case '<dot>': return dot
        case '<ld>': return ' '
        case '<wd>': return '\n'
      }
    }
  )

  return data
}

/**
 * morse解密
 * @param {string} data
 * @returns {string}
 */
export function Decrypt(data) {
  const reversedTable = {}
  const letterDelim = ' '
  const wordDelim = '\n'

  for (const letter in MORSE_TABLE) {
    const signal = MORSE_TABLE[letter]
    reversedTable[signal] = letter
  }

  data = data.replace(/-|‐|−|_|–|—|dash/ig, '<dash>')
  data = data.replace(/\.|·|dot/ig, '<dot>')

  let words = data.split(wordDelim)
  words = Array.prototype.map.call(words, function(word) {
    const signals = word.split(letterDelim)

    const letters = signals.map(function(signal) {
      return reversedTable[signal]
    })

    return letters.join('')
  })
  words = words.join(' ')

  return words
}

const MORSE_TABLE = {
  'A': '<dot><dash>',
  'B': '<dash><dot><dot><dot>',
  'C': '<dash><dot><dash><dot>',
  'D': '<dash><dot><dot>',
  'E': '<dot>',
  'F': '<dot><dot><dash><dot>',
  'G': '<dash><dash><dot>',
  'H': '<dot><dot><dot><dot>',
  'I': '<dot><dot>',
  'J': '<dot><dash><dash><dash>',
  'K': '<dash><dot><dash>',
  'L': '<dot><dash><dot><dot>',
  'M': '<dash><dash>',
  'N': '<dash><dot>',
  'O': '<dash><dash><dash>',
  'P': '<dot><dash><dash><dot>',
  'Q': '<dash><dash><dot><dash>',
  'R': '<dot><dash><dot>',
  'S': '<dot><dot><dot>',
  'T': '<dash>',
  'U': '<dot><dot><dash>',
  'V': '<dot><dot><dot><dash>',
  'W': '<dot><dash><dash>',
  'X': '<dash><dot><dot><dash>',
  'Y': '<dash><dot><dash><dash>',
  'Z': '<dash><dash><dot><dot>',
  '1': '<dot><dash><dash><dash><dash>',
  '2': '<dot><dot><dash><dash><dash>',
  '3': '<dot><dot><dot><dash><dash>',
  '4': '<dot><dot><dot><dot><dash>',
  '5': '<dot><dot><dot><dot><dot>',
  '6': '<dash><dot><dot><dot><dot>',
  '7': '<dash><dash><dot><dot><dot>',
  '8': '<dash><dash><dash><dot><dot>',
  '9': '<dash><dash><dash><dash><dot>',
  '0': '<dash><dash><dash><dash><dash>',
  '.': '<dot><dash><dot><dash><dot><dash>',
  ',': '<dash><dash><dot><dot><dash><dash>',
  ':': '<dash><dash><dash><dot><dot><dot>',
  ';': '<dash><dot><dash><dot><dash><dot>',
  '!': '<dash><dot><dash><dot><dash><dash>',
  '?': '<dot><dot><dash><dash><dot><dot>',
  "'": '<dot><dash><dash><dash><dash><dot>',
  '"': '<dot><dash><dot><dot><dash><dot>',
  '/': '<dash><dot><dot><dash><dot>',
  '-': '<dash><dot><dot><dot><dot><dash>',
  '+': '<dot><dash><dot><dash><dot>',
  '(': '<dash><dot><dash><dash><dot>',
  ')': '<dash><dot><dash><dash><dot><dash>',
  '@': '<dot><dash><dash><dot><dash><dot>',
  '=': '<dash><dot><dot><dot><dash>',
  '&': '<dot><dash><dot><dot><dot>',
  '_': '<dot><dot><dash><dash><dot><dash>',
  '$': '<dot><dot><dot><dash><dot><dot><dash>',
  ' ': '<dot><dot><dot><dot><dot><dot><dot>'
}
