const formatDuration = (seconds) => {
  if (!seconds || Number.isNaN(seconds)) {
    return '0:00'
  }

  const totalSeconds = Math.floor(seconds)
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60

  return `${mins}:${String(secs).padStart(2, '0')}`
}

export { formatDuration }
