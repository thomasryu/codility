/*

Write a function:
  function solution(A);

that, given an array A of N integers, returns the smallest positive integer (greater than 0) that does not occur in A.

For example, given A = [1, 3, 6, 4, 1, 2], the function should return 5.

Given A = [1, 2, 3], the function should return 4.

Given A = [−1, −3], the function should return 1.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [1..100,000];
- each element of array A is an integer within the range [−1,000,000..1,000,000].

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

function solution(A) {
  // Create a B array where B[x] is the number of occurrences of x in A
  // since our result is always greater than 0, we can ignore when A[i] <= 0
  const B = [];
  A.forEach((a) => {
    if (a > 0) {
      B[a - 1] = B[a - 1] ? B[a - 1] + 1 : 1;
    }
  });

  // Then we can search for the first integer x not present in B
  let i;
  for (i = 0; i < B.length; i++) {
    if (B[i] == null) {
      break;
    }
  }

  return i + 1;
}
