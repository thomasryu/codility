/*

A non-empty array A consisting of N integers is given.
A peak is an array element which is larger than its neighbours.
More precisely, it is an index P such that 0 < P < N − 1 and A[P − 1] < A[P] > A[P + 1].

For example, the following array A:
  A[0] = 1
  A[1] = 5
  A[2] = 3
  A[3] = 4
  A[4] = 3
  A[5] = 4
  A[6] = 1
  A[7] = 2
  A[8] = 3
  A[9] = 4
  A[10] = 6
  A[11] = 2

has exactly four peaks: elements 1, 3, 5 and 10.

You are going on a trip to a range of mountains whose relative heights are represented by array A, as shown in a figure below.
You have to choose how many flags you should take with you. The goal is to set the maximum number of flags on the peaks, according to certain rules.

Flags can only be set on peaks. What's more, if you take K flags, then the distance between any two flags should be greater than or equal to K.
The distance between indices P and Q is the absolute value |P − Q|.

For example, given the mountain range represented by array A, above, with N = 12, if you take:
- two flags, you can set them on peaks 1 and 5;
- three flags, you can set them on peaks 1, 5 and 10;
- four flags, you can set only three flags, on peaks 1, 5 and 10.
- You can therefore set a maximum of three flags in this case.

Write a function:
  function solution(A);

that, given a non-empty array A of N integers, returns the maximum number of flags that can be set on the peaks of the array.

For example, the following array A:
  A[0] = 1
  A[1] = 5
  A[2] = 3
  A[3] = 4
  A[4] = 3
  A[5] = 4
  A[6] = 1
  A[7] = 2
  A[8] = 3
  A[9] = 4
  A[10] = 6
  A[11] = 2
  
the function should return 3, as explained above.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [1..400,000];
- each element of array A is an integer within the range [0..1,000,000,000].

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

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
