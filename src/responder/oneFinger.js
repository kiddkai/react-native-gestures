const genernalResponder = require('./general')

module.exports = function oneFingerResponder (onMove, getInitialLayout) {
  return genernalResponder(1, onMove, getInitialLayout)
}
