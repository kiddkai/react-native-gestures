import genernalResponder from './general'

export default function oneFingerResponder (onMove, getInitialLayout) {
  return genernalResponder(1, onMove, getInitialLayout)
}
