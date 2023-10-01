/*

A non-empty array A consisting of N integers is given. A pair of integers (P, Q), such that 0 ≤ P < Q < N,
is called a slice of array A (notice that the slice contains at least two elements).
The average of a slice (P, Q) is the sum of A[P] + A[P + 1] + ... + A[Q] divided by the length of the slice.
To be precise, the average equals (A[P] + A[P + 1] + ... + A[Q]) / (Q − P + 1).

For example, array A such that:
  A[0] = 4
  A[1] = 2
  A[2] = 2
  A[3] = 5
  A[4] = 1
  A[5] = 5
  A[6] = 8

contains the following example slices:
- slice (1, 2), whose average is (2 + 2) / 2 = 2;
- slice (3, 4), whose average is (5 + 1) / 2 = 3;
- slice (1, 4), whose average is (2 + 2 + 5 + 1) / 4 = 2.5.

The goal is to find the starting position of a slice whose average is minimal.

Write a function:
  function solution(A);

that, given a non-empty array A consisting of N integers, returns the starting position of the slice with the minimal average.
If there is more than one slice with a minimal average, you should return the smallest starting position of such a slice.

For example, given array A such that:
  A[0] = 4
  A[1] = 2
  A[2] = 2
  A[3] = 5
  A[4] = 1
  A[5] = 5
  A[6] = 8

  the function should return 1, as explained above.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [2..100,000];
- each element of array A is an integer within the range [−10,000..10,000].

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

function solution(A) {
  let result = -1;
  let minAverage;

  // A slice with 4 or more elements always have a smaller slice with a lower average
  // that is because a slice composed of smaller slices can never have a lower average than its parts
  // thus we only need to check slices with length 2 or 3

  // We create slice maps for sizes 2 and search for the smallest average
  const twoSlices = [];
  for (let i = 0; i < A.length - 1; i++) {
    twoSlices[i] = (A[i] + A[i + 1]) / 2;
  }
  twoSlices.forEach((a, i) => {
    if (minAverage == undefined || a < minAverage) {
      minAverage = a;
      result = i;
    }
  });

  if (A.length <= 2) {
    return result;
  }

  // If A.length > 2, we also search for slices of size 3
  const threeSlices = [];
  for (let i = 0; i < A.length - 2; i++) {
    threeSlices[i] = (A[i] + A[i + 1] + A[i + 2]) / 3;
  }
  threeSlices.forEach((a, i) => {
    if (minAverage == undefined || a < minAverage) {
      minAverage = a;
      result = i;
    }
  });

  return result;
}
