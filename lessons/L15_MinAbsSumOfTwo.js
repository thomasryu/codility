/*

Let A be a non-empty array consisting of N integers.
The abs sum of two for a pair of indices (P, Q) is the absolute value |A[P] + A[Q]|, for 0 ≤ P ≤ Q < N.

For example, the following array A:
  A[0] =  1
  A[1] =  4
  A[2] = -3

has pairs of indices (0, 0), (0, 1), (0, 2), (1, 1), (1, 2), (2, 2).
The abs sum of two for the pair (0, 0) is A[0] + A[0] = |1 + 1| = 2.
The abs sum of two for the pair (0, 1) is A[0] + A[1] = |1 + 4| = 5.
The abs sum of two for the pair (0, 2) is A[0] + A[2] = |1 + (−3)| = 2.
The abs sum of two for the pair (1, 1) is A[1] + A[1] = |4 + 4| = 8.
The abs sum of two for the pair (1, 2) is A[1] + A[2] = |4 + (−3)| = 1.
The abs sum of two for the pair (2, 2) is A[2] + A[2] = |(−3) + (−3)| = 6.

Write a function:
  function solution(A);

that, given a non-empty array A consisting of N integers,
returns the minimal abs sum of two for any pair of indices in this array.

For example, given the following array A:
  A[0] =  1
  A[1] =  4
  A[2] = -3

the function should return 1, as explained above.

Given array A:
  A[0] = -8
  A[1] =  4
  A[2] =  5
  A[3] =-10
  A[4] =  3

the function should return |(−8) + 5| = 3.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [1..100,000];
- each element of array A is an integer within the range [−1,000,000,000..1,000,000,000].

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

function solution(A) {
  // Since when A is either composed of only positive or negative numbers we can quickly
  // solve it getting  the value of A which has the minimum absolute value,
  // our problem lies when there is a mix of positive and negative numbers

  // Therefore, we split the array into positives and negatives
  const posA = A.filter((a) => a >= 0).sort((a, b) => a - b)
  const negA = A.filter((a) => a < 0).sort((a, b) => b - a)

  // Set the initial result with the minimum absolute value
  let result
  if (posA.length > 0) {
    if (negA.length > 0) {
      result = 2 * Math.min(Math.abs(posA[0]), Math.abs(negA[0]))
    } else result = 2 * posA[0]
  } else result = -2 * negA[0]

  // Then we search using the Caterpillar Method the two elements in both arrays
  // whose absolute difference is the lowest
  // and if that difference is lower than the set initial result, we update it
  let start = 0
  for (let end = 0; end < negA.length; end++) {
    while (start < posA.length) {
      const sum = Math.abs(posA[start] + negA[end])
      if (result > sum) {
        result = sum
      }
      if (Math.abs(posA[start]) > Math.abs(negA[end])) break
      start++
    }
  }

  return result
}

// Cleaner solution
function solution(A) {
  const N = A.length
  const sortedA = A.sort((a, b) => a - b)

  let head = N - 1
  let tail = 0
  let result = Math.abs(sortedA[head] - sortedA[tail])

  while (tail <= head) {
    const sum = sortedA[head] - sortedA[tail]
    result = Math.min(result, Math.abs(sum))

    // Since we are not using absolute values yet, if the sum is larger than 0,
    // we know the head can be moved left else the tail can be moved right
    // (since we are trying to reach values closes to 0)
    if (sum > 0) head--
    else tail++
  }

  return result
}
