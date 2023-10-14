/*

You are given two non-empty arrays A and B consisting of N integers.
These arrays represent N planks. More precisely, A[K] is the start and B[K] the end of the K−th plank.

Next, you are given a non-empty array C consisting of M integers. This array represents M nails.
More precisely, C[I] is the position where you can hammer in the I−th nail.

We say that a plank (A[K], B[K]) is nailed if there exists a nail C[I] such that A[K] ≤ C[I] ≤ B[K].

The goal is to find the minimum number of nails that must be used until all the planks are nailed.
In other words, you should find a value J such that all planks will be nailed after using only the first J nails.
More precisely, for every plank (A[K], B[K]) such that 0 ≤ K < N, there should exist a nail C[I] such that I < J and A[K] ≤ C[I] ≤ B[K].

For example, given arrays A, B such that:
  A[0] = 1    B[0] = 4
  A[1] = 4    B[1] = 5
  A[2] = 5    B[2] = 9
  A[3] = 8    B[3] = 10

four planks are represented: [1, 4], [4, 5], [5, 9] and [8, 10].

Given array C such that:
  C[0] = 4
  C[1] = 6
  C[2] = 7
  C[3] = 10
  C[4] = 2

if we use the following nails:
  0, then planks [1, 4] and [4, 5] will both be nailed.
  0, 1, then planks [1, 4], [4, 5] and [5, 9] will be nailed.
  0, 1, 2, then planks [1, 4], [4, 5] and [5, 9] will be nailed.
  0, 1, 2, 3, then all the planks will be nailed.

Thus, four is the minimum number of nails that, used sequentially, allow all the planks to be nailed.

Write a function:
  function solution(A, B, C);

that, given two non-empty arrays A and B consisting of N integers and a non-empty array C consisting of M integers,
returns the minimum number of nails that, used sequentially, allow all the planks to be nailed.

If it is not possible to nail all the planks, the function should return −1.

For example, given arrays A, B, C such that:
  A[0] = 1    B[0] = 4
  A[1] = 4    B[1] = 5
  A[2] = 5    B[2] = 9
  A[3] = 8    B[3] = 10

  C[0] = 4
  C[1] = 6
  C[2] = 7
  C[3] = 10
  C[4] = 2

the function should return 4, as explained above.

Write an efficient algorithm for the following assumptions:
- N and M are integers within the range [1..30,000];
- each element of arrays A, B and C is an integer within the range [1..2*M];
- A[K] ≤ B[K].

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

// Attempt 1: Unoptimized O((N * M) * log(N))
function solution(A, B, C) {
  const N = A.length

  const planks = []

  for (let i = 0; i < N; i++) {
    planks.push([A[i], B[i]])
  }

  // Gets whether all the planks are nailed by C[0...x]
  const nailedAllPlanks = (x) => {
    const remainingPlanks = [...planks]

    for (let i = 0; i < x + 1 && remainingPlanks.length > 0; i++) {
      const nail = C[i]
      let j
      for (j = 0; j < remainingPlanks.length; j++) {
        const plank = remainingPlanks[j]
        if (nail >= plank[0] && nail <= plank[1]) {
          remainingPlanks.splice(j, 1)
          j--
        }
      }
    }

    return remainingPlanks.length === 0
  }

  let start = 0
  let end = C.length - 1
  let result = -2
  while (start <= end) {
    const i = Math.floor((start + end) / 2)
    if (nailedAllPlanks(i)) {
      end = i - 1
      result = i
    } else {
      start = i + 1
    }
  }

  return result + 1
}

// Attempt 2 - Optimized O((N + M) * log(M))
function solution(A, B, C) {
  const N = A.length
  const M = C.length

  const planks = []
  for (let i = 0; i < N; i++) {
    planks.push([A[i], B[i]])
  }

  // Gets whether all the planks are nailed by C[0...x]
  const nailedAllPlanks = (x) => {
    const remainingNails = C.slice(0, x + 1).sort((a, b) => b - a)

    // We create a prefix array, which map how many nails have shown up
    // until certain index, allowing us to quickly get if there is a nail within a board
    const prefixNails = Array(N + 1).fill(0)
    let nail = remainingNails.pop()
    for (let i = 1; i <= 2 * M; i++) {
      if (i == nail) {
        prefixNails[i] = prefixNails[i - 1] + 1
        nail = remainingNails.pop()

        // Treat the edge case where there are multiple nails in the same spot
        while (i == nail) {
          prefixNails[i]++
          nail = remainingNails.pop()
        }
      } else {
        prefixNails[i] = prefixNails[i - 1]
      }
    }

    // Count how many planks are nailed
    let count = 0
    planks.forEach((plank) => {
      if (prefixNails[plank[1]] - prefixNails[plank[0] - 1] > 0) {
        count++
      }
    })
    return count === planks.length
  }

  // We use binary search to find the required nail index
  let start = 0
  let end = C.length - 1
  let result = -2
  while (start <= end) {
    const i = Math.floor((start + end) / 2)
    if (nailedAllPlanks(i)) {
      end = i - 1
      result = i
    } else {
      start = i + 1
    }
  }

  return result + 1
}
