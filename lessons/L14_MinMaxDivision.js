/*

You are given integers K, M and a non-empty array A consisting of N integers.
Every element of the array is not greater than M.

You should divide this array into K blocks of consecutive elements.
The size of the block is any integer between 0 and N. Every element of the array should belong to some block.

The sum of the block from X to Y equals A[X] + A[X + 1] + ... + A[Y]. The sum of empty block equals 0.
The large sum is the maximal sum of any block.

For example, you are given integers K = 3, M = 5 and array A such that:
  A[0] = 2
  A[1] = 1
  A[2] = 5
  A[3] = 1
  A[4] = 2
  A[5] = 2
  A[6] = 2

The array can be divided, for example, into the following blocks:
- [2, 1, 5, 1, 2, 2, 2], [], [] with a large sum of 15;
- [2], [1, 5, 1, 2], [2, 2] with a large sum of 9;
- [2, 1, 5], [], [1, 2, 2, 2] with a large sum of 8;
- [2, 1], [5, 1], [2, 2, 2] with a large sum of 6.

The goal is to minimize the large sum. In the above example, 6 is the minimal large sum.

Write a function:
  function solution(K, M, A);

that, given integers K, M and a non-empty array A consisting of N integers, returns the minimal large sum.

For example, given K = 3, M = 5 and array A such that:
  A[0] = 2
  A[1] = 1
  A[2] = 5
  A[3] = 1
  A[4] = 2
  A[5] = 2
  A[6] = 2

the function should return 6, as explained above.

Write an efficient algorithm for the following assumptions:
- N and K are integers within the range [1..100,000];
- M is an integer within the range [0..10,000];
- each element of array A is an integer within the range [0..M].

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

function solution(K, M, A) {
  // Highest value in A
  let maxA = 0
  A.forEach((a) => {
    if (a > maxA) {
      maxA = a
    }
  })

  // The largest possible large sum
  let largeSum = A.reduce((a, c) => a + c)

  // The minimum largest sum should be between maxA (i.e., a block that only contains it)
  // and largeSum (i.e., a block that contains all elements of A)
  let start = maxA
  let end = largeSum

  // Function that returns the necessary blocks
  // to reach certain large sum
  const getRequiredBlocks = (largeSum) => {
    let sum = 0
    let count = 0
    A.forEach((a) => {
      if (sum + a > largeSum) {
        sum = 0
        count++
      }
      sum += a
    })

    return count
  }

  // The goal here is to check if we can squeeze the result in blocks of lower size

  // Note that, the more evenly we distribute the blocks (i.e., the lower the size of each non-empty block),
  // the lower large sum is
  while (start <= end) {
    let mid = Math.floor((start + end) / 2)

    // So if our predicted block count is lower than K,
    // we can split A even further, lowering our large sum
    if (getRequiredBlocks(mid) < K) {
      end = mid - 1
    } else {
      start = mid + 1
    }
  }

  return start
}
