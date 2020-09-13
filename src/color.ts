const colors: Record<logType, string> = {
  debug: '#0093B4',
  warning: 'orange',
  info: '#0093B4',
  todo: 'purple',
  fixme: 'red',
  success: 'green',
  error: 'red',
  danger: 'red',
  sequence: 'black',
}

const getColor = (type: logType) => {
  return colors[type] || 'black'
}

export {
  getColor,
}

export default {
  getColor,
}
