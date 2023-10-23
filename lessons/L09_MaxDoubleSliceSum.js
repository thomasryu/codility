/*

A non-empty array A consisting of N integers is given.
A triplet (X, Y, Z), such that 0 ≤ X < Y < Z < N, is called a double slice.

The sum of double slice (X, Y, Z) is the total of
A[X + 1] + A[X + 2] + ... + A[Y − 1] + A[Y + 1] + A[Y + 2] + ... + A[Z − 1].

For example, array A such that:
  A[0] = 3
  A[1] = 2
  A[2] = 6
  A[3] = -1
  A[4] = 4
  A[5] = 5
  A[6] = -1
  A[7] = 2

contains the following example double slices:
- double slice (0, 3, 6), sum is 2 + 6 + 4 + 5 = 17,
- double slice (0, 3, 7), sum is 2 + 6 + 4 + 5 − 1 = 16,
- double slice (3, 4, 5), sum is 0.

The goal is to find the maximal sum of any double slice.

Write a function:
  function solution(A);

that, given a non-empty array A consisting of N integers, returns the maximal sum of any double slice.

For example, given:
  A[0] = 3
  A[1] = 2
  A[2] = 6
  A[3] = -1
  A[4] = 4
  A[5] = 5
  A[6] = -1
  A[7] = 2

the function should return 17, because no double slice of array A has a sum of greater than 17.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [3..100,000];
- each element of array A is an integer within the range [−10,000..10,000].

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

function solution(A) {
  const N = A.length

  if (N == 3) {
    return 0
  }

  // The problem itself is so horribly worded,
  // however we create two arrays, one for the maximum sum slice starting from i
  // and the other for the maximum sum slice ending in i
  let maxSumEndingAt = []
  let maxSumStartingFrom = []

  for (let i = 1; i < N - 1; i++) {
    maxSumEndingAt[i] = Math.max(A[i], maxSumEndingAt[i - 1] + A[i])
  }

  for (let i = N - 2; i > 0; i--) {
    maxSumStartingFrom[i] = Math.max(A[i], maxSumStartingFrom[i + 1] + A[i])
  }

  let result = 0
  for (let i = 1; i < N - 1; i++) {
    if (maxSumEndingAt[i - 1] + maxSumStartingFrom[i + 1] > result) {
      result = maxSumEndingAt[i - 1] + maxSumStartingFrom[i + 1]
    }
  }

  return result
}
