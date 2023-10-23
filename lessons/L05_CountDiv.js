/*

Write a function:
  function solution(A, B, K);

that, given three integers A, B and K, returns the number of integers within
the range [A..B] that are divisible by K, i.e.:

{ i : A ≤ i ≤ B, i mod K = 0 }

For example, for A = 6, B = 11 and K = 2, your function should return 3,
because there are three numbers divisible by 2 within the range [6..11], namely 6, 8 and 10.

Write an efficient algorithm for the following assumptions:
- A and B are integers within the range [0..2,000,000,000];
- K is an integer within the range [1..2,000,000,000];
- A ≤ B.

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

// Attempt 1: Unoptimized (O(N))
function solution(A, B, K) {
  let result = 0;
  for (let i = A; i < B; i++) {
    if (i % K == 0) {
      result++;
    }
  }

  return result;
}

// Attempt 2: Optimized (O(1))
function solution(A, B, K) {
  return Math.floor(B / K) - Math.floor((A - 1) / K);
}
