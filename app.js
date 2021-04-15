const audioContext = new AudioContext()

const NOTES_CHART = [
  { note: 'C', key: 'Z', frequency: 261.626 },
  { note: 'Db', key: 'S', frequency: 277.183 },
  { note: 'D', key: 'X', frequency: 293.665 },
  { note: 'Eb', key: 'D', frequency: 311.127 },
  { note: 'E', key: 'C', frequency: 329.628 },
  { note: 'F', key: 'V', frequency: 349.228 },
  { note: 'Gb', key: 'G', frequency: 369.994 },
  { note: 'G', key: 'B', frequency: 391.995 },
  { note: 'Ab', key: 'H', frequency: 415.305 },
  { note: 'A', key: 'N', frequency: 440 },
  { note: 'Bb', key: 'J', frequency: 466.164 },
  { note: 'B', key: 'M', frequency: 493.883 },
]

document.addEventListener('keydown', (e) => {
  changeNoteState(e, true, 'add')
})

document.addEventListener('keyup', (e) => {
  changeNoteState(e, false)
})

function getNote(code) {
  return NOTES_CHART.find((note) => `Key${note.key}` === code)
}

function changeNoteState(e, isActive, isBeingPressed) {
  if (e.repeat) return
  const code = e.code
  const note = getNote(code)

  if (note == null) return

  note.active = isActive

  if (isBeingPressed === 'add')
    document.querySelector(`[data-note=${note.note}]`).classList.add('press')
  else
    document.querySelector(`[data-note=${note.note}]`).classList.remove('press')

  playnote(note, isActive)
}

function playnote(note, isActive) {
  if (!isActive) {
    note.oscillator.stop()
    note.oscillator.disconnect()
    return
  }

  const oscillator = audioContext.createOscillator()

  oscillator.frequency.value = note.frequency
  oscillator.connect(audioContext.destination)
  oscillator.start()

  note.oscillator = oscillator

  console.log(NOTES_CHART)
}
