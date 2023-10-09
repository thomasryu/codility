/*

You are given an array A consisting of N integers.
For each number A[i] such that 0 ≤ i < N, we want to count the number of
elements of the array that are not the divisors of A[i]. We say that these elements are non-divisors.

For example, consider integer N = 5 and array A such that:
  A[0] = 3
  A[1] = 1
  A[2] = 2
  A[3] = 3
  A[4] = 6

For the following elements:
- A[0] = 3, the non-divisors are: 2, 6,
- A[1] = 1, the non-divisors are: 3, 2, 3, 6,
- A[2] = 2, the non-divisors are: 3, 3, 6,
- A[3] = 3, the non-divisors are: 2, 6,
- A[4] = 6, there aren't any non-divisors.

Write a function:
  function solution(A);

that, given an array A consisting of N integers, returns a sequence of integers representing the amount of non-divisors.
Result array should be returned as an array of integers.

For example, given:
  A[0] = 3
  A[1] = 1
  A[2] = 2
  A[3] = 3
  A[4] = 6

the function should return [2, 4, 3, 2, 0], as explained above.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [1..50,000];
- each element of array A is an integer within the range [1..2 * N].

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

// Attempt 1: Unoptimized (O(N^2))
function solution(A) {
  const result = A.map((a, i) => {
    let count = 0

    for (let j = 0; j < A.length; j++) {
      if (i != j) {
        if (a % A[j] != 0) {
          count += 1
        }
      }
    }

    return count
  })

  return result
}

// Attempt 2: Optimized (O(N * log(N)))
function solution(A) {
  const N = A.length

  const counterA = Array(2 * N + 1).fill(0)
  for (let i = 0; i < N; i++) {
    counterA[A[i]]++
  }

  const result = []

  for (const element of A) {
    let nonDivisors = N

    // Unlike the inefficient solution, the trick here is to notice to discover each factor of element
    // we only need to iterate until sqrt(element)
    for (let j = 1; j <= Math.sqrt(element); j++) {
      if (element % j == 0) {
        nonDivisors -= counterA[j]
        if (j * j !== element) {
          nonDivisors -= counterA[element / j]
        }
      }
    }
    result.push(nonDivisors)
  }

  return result
}
