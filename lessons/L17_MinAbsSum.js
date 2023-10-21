/*

For a given array A of N integers and a sequence S of N integers
from the set {−1, 1}, we define val(A, S) as follows:

val(A, S) = |sum{ A[i]*S[i] for i = 0..N−1 }|
(Assume that the sum of zero elements equals zero.)

For a given array A, we are looking for such a sequence S that minimizes val(A,S).

Write a function:
  function solution(A);

that, given an array A of N integers, computes the minimum value of val(A,S)
from all possible values of val(A,S) for all possible sequences S of N integers from the set {−1, 1}.

For example, given array:
  A[0] =  1
  A[1] =  5
  A[2] =  2
  A[3] = -2

your function should return 0, since for S = [−1, 1, −1, 1], val(A, S) = 0, which is the minimum possible value.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [0..20,000];
- each element of array A is an integer within the range [−100..100].

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

// Attempt 1: Unoptimized (O(N^2 * M))
function solution(A) {
  const N = A.length
  if (N == 0) return 0
  if (N == 1) return Math.abs(A[0])

  let absA = []
  for (let i = 0; i < N; i++) {
    absA[i] = Math.abs(A[i])
  }

  const S = absA.reduce((a, c) => a + c)

  // DP gives me an array of every sum achievable by A
  // DP[i] gives me true if the sum i is possible by A, false otherwise
  // Therefore we map all possible reachable sums
  const DP = Array(S + 1).fill(0)
  DP[0] = true

  for (let i = 0; i < N; i++) {
    for (let j = S - 1; j >= 0; j--) {
      if (DP[j] == true && j + absA[i] <= S) {
        DP[j + absA[i]] = true
      }
    }
  }

  // Here lies the catch: The solution to this problem lies in dividing A
  // into two groups where the difference between their sums is minimal.
  // This can be achieved by obtaining the sum S of all absolute values of the array and
  // attempting to reach S/2 as close as possible, without exceeding it

  // Why? let P + Q = S, P < Q
  // The larger P is, the smaller P - Q is, but since P < Q, the highest value achievable
  // by P is S/2
  let result = S
  for (let i = 0; i < Math.floor(S / 2); i++) {
    if (DP[i]) {
      result = Math.min(result, S - 2 * i)
    }
  }

  return result
}

// Attempt 2: Optimized (O(N * Mˆ2))
function solution(A) {
  const N = A.length
  let M = 0

  if (N == 0) return 0
  if (N == 1) return Math.abs(A[0])

  let absA = []
  for (let i = 0; i < N; i++) {
    absA[i] = Math.abs(A[i])
    M = Math.max(absA[i], M)
  }

  // Differently from the previous attempt, we store the quantity of each
  // number from -100 to 100 inside A
  const count = Array(M + 1).fill(0)
  absA.forEach((a) => (count[a] = count[a] + 1))

  const S = absA.reduce((a, c) => a + c)

  // Instead of a boolean, DP[i] will be >= 0 if it's achievable, -1 otherwise
  // more specifically, it will contain the remaining count of an element of A,
  // which was required to reach it (which element it was and the value doesn't matter,
  // because it will change over time), however all that matter is its value is higher than -1
  const DP = Array(S + 1).fill(-1)
  DP[0] = 0

  // Now we fill the DP array using the created count array
  for (let a = 0; a <= M + 1; a++) {
    if (count[a] > 0) {
      for (let i = 0; i <= S; i++) {
        // If we find a previously achievable value, we know no element a was required to reach it
        // thus we can fill DP[i] with the fill count[a]
        if (DP[i] >= 0) {
          DP[i] = count[a]
        }
        // If the sum i, however, was not reached, we verify if it is reachable and, if it is,
        // update its value with the proper count of a
        else if (i - a >= 0 && DP[i - a] > 0) {
          DP[i] = DP[i - a] - 1
        }
      }
    }
  }

  let result = S
  for (let i = 0; i <= Math.floor(S / 2); i++) {
    if (DP[i] >= 0) {
      // Consider S = P + Q -> Q = S - P
      // what we want to find is Q - P
      // which combining the first two equations, we have Q - P = S - 2 * P
      result = Math.min(result, S - 2 * i)
    }
  }

  return result
}
