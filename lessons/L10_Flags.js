// Attempt 1: Unoptimized O(N + M^2)
function solution(A) {
  const N = A.length

  if (N < 3) return 0

  // Count the number of peaks, because the number of flags
  // never need to exceed the number of peaks.
  let P = []
  for (let i = 1; i < N - 1; i++) {
    if (A[i - 1] < A[i] && A[i] > A[i + 1]) {
      P.push(i)
    }
  }

  // For each flag quantity between 1 and P.length,
  // we test how many flags can be placed
  let result = 0
  for (let f = 1; f <= P.length; f++) {
    let prevFlag = P[0]
    let flagCount = 1

    // Starting from the second peak, we test the distance between it and the previous flag
    // if the distance is greater than or equal to f, a flag can be placed
    // we also check if we haven't surpassed the amount of flags that were brought
    for (let i = 1; i < P.length; i++) {
      if (P[i] - prevFlag >= f && flagCount < f) {
        flagCount++
        prevFlag = P[i]
      }
    }

    // If the flag count was higher than the maximum, update
    if (result < flagCount) {
      result = flagCount
    }
  }

  return result
}

// Attempt 2: Optimized (O(N))
function solution(A) {
  const N = A.length

  // For an amount F of flags, there must be at least a distance of (F - 1) empty spaces between them
  // Thus, for a mountain of size N, the highest amount of flags is sqrt(N) (F * (F - 1) <= N)

  // So, the total number of flags will be either lesser than or equal to the total number of peaks OR sqrt(N)
  // thus we can check which of them is lower and start our check from there

  // 1. Again we create an array with the coordinate of all peaks
  let P = []
  for (let i = 1; i < N - 1; i++) {
    if (A[i - 1] < A[i] && A[i] > A[i + 1]) {
      P.push(i)
    }
  }

  if (P.length == 0) return 0

  // 2. We set the maximum number of flags possible
  const maxFlags = Math.min(P.length, Math.floor(Math.sqrt(N)) + 1)

  // 3. We repeat the same counting process used previously, however this time we are limited to O(N)
  //    since we are nesting two (O(sqrt(N))) loops
  let result = 0
  for (let f = 1; f <= maxFlags; f++) {
    let prevFlag = P[0]
    let flagCount = 1

    // Starting from the second peak, we test the distance between it and the previous flag
    // if the distance is greater than or equal to f, a flag can be placed
    // we also check if we haven't surpassed the amount of flags that were brought
    for (let i = 1; i < P.length; i++) {
      if (P[i] - prevFlag >= f && flagCount < f) {
        flagCount++
        prevFlag = P[i]
      }
    }

    // If the flag count was higher than the maximum, update
    if (result < flagCount) {
      result = flagCount
    }
  }

  return result
}
