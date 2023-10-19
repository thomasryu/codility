function solution(A) {
  const N = A.length
  const MAX_VALUE = Math.pow(10, 9)

  let result = 0
  for (let end = 0; end < N - 1; end++) {
    for (let start = end + 1; start < N; start++) {
      if (A[end] > A[start]) {
        result++
      }
      if (result > MAX_VALUE) return -1
    }
  }

  return result
}
