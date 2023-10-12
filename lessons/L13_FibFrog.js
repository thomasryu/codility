/*

The Fibonacci sequence is defined using the following recursive formula:
  F(0) = 0
  F(1) = 1
  F(M) = F(M - 1) + F(M - 2) if M >= 2

A small frog wants to get to the other side of a river.
The frog is initially located at one bank of the river (position −1) and wants to get to the other bank (position N).
The frog can jump over any distance F(K), where F(K) is the K-th Fibonacci number.
Luckily, there are many leaves on the river, and the frog can jump between the leaves,
but only in the direction of the bank at position N.

The leaves on the river are represented in an array A consisting of N integers.
Consecutive elements of array A represent consecutive positions from 0 to N − 1 on the river.
Array A contains only 0s and/or 1s:

0 represents a position without a leaf;
1 represents a position containing a leaf.

The goal is to count the minimum number of jumps in which the frog can get
to the other side of the river (from position −1 to position N).
The frog can jump between positions −1 and N (the banks of the river) and every position containing a leaf.

For example, consider array A such that:
  A[0] = 0
  A[1] = 0
  A[2] = 0
  A[3] = 1
  A[4] = 1
  A[5] = 0
  A[6] = 1
  A[7] = 0
  A[8] = 0
  A[9] = 0
  A[10] = 0

The frog can make three jumps of length F(5) = 5, F(3) = 2 and F(5) = 5.

Write a function:
  function solution(A);

that, given an array A consisting of N integers, returns the minimum number
of jumps by which the frog can get to the other side of the river.
If the frog cannot reach the other side of the river, the function should return −1.

For example, given:
  A[0] = 0
  A[1] = 0
  A[2] = 0
  A[3] = 1
  A[4] = 1
  A[5] = 0
  A[6] = 1
  A[7] = 0
  A[8] = 0
  A[9] = 0
  A[10] = 0

the function should return 3, as explained above.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [0..100,000];
- each element of array A is an integer that can have one of the following values: 0, 1.

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

// Attempt 1: Unoptimized (O(N * log(N)ˆN)
function solution(A) {
  const N = A.length

  // Array with all fibonacci numbers
  const F = [0, 1]
  let i
  for (i = 2; F[i - 1] + F[i - 2] <= N + 1; i++) {
    F.push(F[i - 1] + F[i - 2])
  }
  F.push(F[i - 1] + F[i - 2])

  // A simple array where we can check
  // if a number i is a Fibonacci number
  const isFib = Array(i).fill(false)
  F.forEach((f) => (isFib[f] = true))

  // Array of indexes of all leaves
  const L = []
  A.forEach((a, i) => {
    if (a == 1) {
      L.push(i)
    }
  })
  L.push(N)

  // Recursively call each possibility until the other border is reached
  // if the number of steps is smaller than the any possibility, update the count
  let found = false
  let result = N + 1
  const countSteps = (leaves, current, count) => {
    if (current == N) {
      found = true
      if (count < result) {
        result = count
      }
    }

    for (let i = leaves.length - 1; i >= 0; i--) {
      if (isFib[leaves[i] - current]) {
        countSteps(
          [...leaves.slice(i + 1, leaves.length)],
          leaves[i],
          count + 1,
        )
      }
    }
  }

  countSteps(L, -1, 0)
  return found ? result : -1
}

// Attempt 2: Optimized (O(N * log(N)))
function solution(A) {
  const leaves = [...A, 1] // We count the other shore as a reachable point
  const N = leaves.length

  // Array with all fibonacci numbers - O(log(N))
  const fibonacci = [0, 1]
  for (let i = 2; fibonacci[i - 1] + fibonacci[i - 2] <= N + 1; i++) {
    fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2])
  }

  // An array that stores the optimal number of jumps to reach i
  const reachable = Array(N).fill(-1)

  // From the starting point (-1), we get all the points reachable by the frog
  const starting = -1
  fibonacci.forEach((f) => {
    if (leaves[f + starting] == 1) {
      reachable[f + starting] = 1
    }
  })

  // We calculate the minimum reachable for each position in the river - O(N * log(N))
  for (let i = 0; i < N; i++) {
    // If there are no leaves or if a minimum path was already calculated, skip
    if (leaves[i] == 0 || reachable[i] > 0) {
      continue
    }
    // Else, we calculate the minimum by iterating over previous steps reachable by a fibonacci jump
    // if the minimum + 1 of said step if lower than the current step, we update it
    fibonacci.forEach((f) => {
      const previousIndex = i - f
      if (previousIndex >= 0) {
        if (reachable[previousIndex] > 0) {
          const currentScore = reachable[previousIndex] + 1
          if (currentScore <= reachable[i] || reachable[i] == -1) {
            reachable[i] = currentScore
          }
        }
      }
    })
  }

  // After everything is calculated, we just need to obtain the minimum for N
  // (N - 1 in this case since we added 1 more "leaf" to the array at the start)
  return reachable[N - 1]
}
