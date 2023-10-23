/*

A non-empty array A consisting of N integers is given. Array A represents numbers on a tape.

Any integer P, such that 0 < P < N, splits this tape into two non-empty parts: A[0], A[1], ..., A[P − 1]
and A[P], A[P + 1], ..., A[N − 1].

The difference between the two parts is the value of:
|(A[0] + A[1] + ... + A[P − 1]) − (A[P] + A[P + 1] + ... + A[N − 1])|

In other words, it is the absolute difference between the sum of the first part and the sum of the second part.

For example, consider array A such that:
  A[0] = 3
  A[1] = 1
  A[2] = 2
  A[3] = 4
  A[4] = 3

We can split this tape in four places:
  P = 1, difference = |3 − 10| = 7
  P = 2, difference = |4 − 9| = 5
  P = 3, difference = |6 − 7| = 1
  P = 4, difference = |10 − 3| = 7

Write a function:
  function solution(A)

that, given a non-empty array A of N integers, returns the minimal difference that can be achieved.

For example, given:
  A[0] = 3
  A[1] = 1
  A[2] = 2
  A[3] = 4
  A[4] = 3

the function should return 1, as explained above.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [2..100,000];
- each element of array A is an integer within the range [−1,000..1,000].

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

// Attempt 1: Unoptimized (O(Nˆ2))
function solution(A) {
  const N = A.length
  let min = -1

  for (let P = 1; P < N; P++) {
    let split1 = 0
    for (let j = 0; j < P; j++) {
      split1 += A[j]
    }

    let split2 = 0
    for (let j = P; j < N; j++) {
      split2 += A[j]
    }

    if (min === -1 || Math.abs(split1 - split2) < min) {
      min = Math.abs(split1 - split2)
    }
  }

  return min
}

// Attempt 2: Optimized (O(N))
function solution(A) {
  let left = 0
  let right = A.reduce((a, c) => a + c)

  let result = 2000
  for (let i = 0; i < A.length - 1; i++) {
    left += A[i]
    right -= A[i]

    if (Math.abs(left - right) < result) {
      result = Math.abs(left - right)
    }
  }

  return result
}
