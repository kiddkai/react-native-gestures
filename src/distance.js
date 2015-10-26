function pow2abs (a, b) {
  return Math.pow(Math.abs(a - b), 2)
}

export function ofTwoTouches (touches) {
  let a = touches.get(0)
  let b = touches.get(1)

  return Math.sqrt(
     pow2abs(a.get('pageX'), b.get('pageX')) +
     pow2abs(a.get('pageY'), b.get('pageY')),
   2)
}
