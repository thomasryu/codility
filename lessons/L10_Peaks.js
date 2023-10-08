/*

A non-empty array A consisting of N integers is given.
A peak is an array element which is larger than its neighbors.
More precisely, it is an index P such that 0 < P < N − 1,  A[P − 1] < A[P] and A[P] > A[P + 1].

For example, the following array A:
  A[0] = 1
  A[1] = 2
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

has exactly three peaks: 3, 5, 10.

We want to divide this array into blocks containing the same number of elements.
More precisely, we want to choose a number K that will yield the following blocks:
  A[0], A[1], ..., A[K − 1],
  A[K], A[K + 1], ..., A[2K − 1],
  ...
  A[N − K], A[N − K + 1], ..., A[N − 1].

What's more, every block should contain at least one peak.
Notice that extreme elements of the blocks (for example A[K − 1] or A[K]) can also be peaks,
but only if they have both neighbors (including one in an adjacent blocks).

The goal is to find the maximum number of blocks into which the array A can be divided.

Array A can be divided into blocks as follows:
- one block (1, 2, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2). This block contains three peaks.
- two blocks (1, 2, 3, 4, 3, 4) and (1, 2, 3, 4, 6, 2). Every block has a peak.
- three blocks (1, 2, 3, 4), (3, 4, 1, 2), (3, 4, 6, 2). Every block has a peak.
  Notice in particular that the first block (1, 2, 3, 4) has a peak at A[3], because A[2] < A[3] > A[4],
  even though A[4] is in the adjacent block.

However, array A cannot be divided into four blocks,
(1, 2, 3), (4, 3, 4), (1, 2, 3) and (4, 6, 2), because the (1, 2, 3) blocks do not contain a peak.
Notice in particular that the (4, 3, 4) block contains two peaks: A[3] and A[5].

The maximum number of blocks that array A can be divided into is three.

Write a function:
  function solution(A);

that, given a non-empty array A consisting of N integers, returns the maximum number of blocks into which A can be divided.

If A cannot be divided into some number of blocks, the function should return 0.

For example, given:
  A[0] = 1
  A[1] = 2
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
- N is an integer within the range [1..100,000];
- each element of array A is an integer within the range [0..1,000,000,000].

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

function solution(A) {
  const N = A.length

  // 1. Get all peaks - O(N)
  const P = []
  for (let i = 1; i < N - 1; i++) {
    if (A[i - 1] < A[i] && A[i] > A[i + 1]) {
      P.push(i)
    }
  }

  // 2. Create an auxiliary array that, given i,
  // returns the next peak closes to A[i] - O(N)
  const NP = Array(N).fill(-1)
  let peak = 0
  for (let i = 0; i < N; i++) {
    if (i > P[peak]) {
      peak++
    }
    if (P[peak]) {
      NP[i] = P[peak]
    } else {
      break
    }
  }

  // 2. Get all factors of N - O(sqrt(N))
  const F = []
  let i
  for (i = 2; i < Math.sqrt(N); i++) {
    if (N % i === 0) {
      F.push(i)
      F.push(N / i)
    }
  }
  if (i * i === N) {
    F.push(i)
  }

  // 3. We sort our factors because the lowest the factor,
  //    the higher the number of blocks O(sqt(N))
  F.sort((a, b) => a - b)

  // 4. For each factor f of N, check if all (N / f) blocks have a peak - O(N)
  for (const f of F) {
    let valid = true
    for (let j = 0; j * f < N; j++) {
      const blockFirst = j * f // current block's first index
      const blockLast = f * (j + 1) - 1 // current block's last index

      if (NP[blockFirst] < 0 || NP[blockFirst] > blockLast) {
        valid = false
        break
      }
    }

    if (valid) {
      return N / f
    }
  }

  // Since we don't check for a single block of size N before,
  // might as well check it here
  return P.length > 0 ? 1 : 0
}
