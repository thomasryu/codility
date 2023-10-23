/*

You are given N counters, initially set to 0, and you have two possible operations on them:
- increase(X) − counter X is increased by 1,
- max counter − all counters are set to the maximum value of any counter.

A non-empty array A of M integers is given. This array represents consecutive operations:
- if A[K] = X, such that 1 ≤ X ≤ N, then operation K is increase(X),
- if A[K] = N + 1 then operation K is max counter.

For example, given integer N = 5 and array A such that:
  A[0] = 3
  A[1] = 4
  A[2] = 4
  A[3] = 6
  A[4] = 1
  A[5] = 4
  A[6] = 4

the values of the counters after each consecutive operation will be:
  (0, 0, 1, 0, 0)
  (0, 0, 1, 1, 0)
  (0, 0, 1, 2, 0)
  (2, 2, 2, 2, 2)
  (3, 2, 2, 2, 2)
  (3, 2, 2, 3, 2)
  (3, 2, 2, 4, 2)

  The goal is to calculate the value of every counter after all operations.

Write a function:
  function solution(N, A);

that, given an integer N and a non-empty array A consisting of M integers, returns a sequence of integers
representing the values of the counters.

Result array should be returned as an array of integers.

For example, given:
  A[0] = 3
  A[1] = 4
  A[2] = 4
  A[3] = 6
  A[4] = 1
  A[5] = 4
  A[6] = 4

  the function should return [3, 2, 2, 4, 2], as explained above.

Write an efficient algorithm for the following assumptions:
- N and M are integers within the range [1..100,000];
- each element of array A is an integer within the range [1..N + 1].

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

// Attempt 1: Unoptimized (O(Nˆ2))
function solution(N, A) {
  let max = 0;
  const result = Array(N).fill(0);

  A.forEach((a) => {
    if (a <= N) {
      result[a - 1] += 1;

      if (result[a - 1] > max) {
        max = result[a - 1];
      }
    }

    if (a > N) {
      result.fill(max);
    }
  });

  return result;
}

// Attempt 2: Optimized (O(N))
function solution(N, A) {
  // For a O(N) solution, we need to keep track of the current maximum value
  // in the result array, which updates the minimum value possible in it, every time a (N + 1) is found
  let min = 0;
  let max = 0;

  const result = Array(N).fill(0);

  A.forEach((a) => {
    if (a <= N) {
      if (result[a - 1] < min) {
        result[a - 1] = min;
      }
      result[a - 1] += 1;

      if (result[a - 1] > max) {
        max = result[a - 1];
      }
    }

    if (a > N) {
      min = max;
    }
  });

  // After doing the standard operations, we replace every value below the minimum value
  // with the minimum value itself (thus not requiring running .fill(max) inside the previous loop)
  for (let i = 0; i < N; i++) {
    result[i] = result[i] < min ? min : result[i];
  }

  return result;
}
