/*

Located on a line are N segments, numbered from 0 to N − 1, whose positions are given in arrays A and B.
For each I (0 ≤ I < N) the position of segment I is from A[I] to B[I] (inclusive).
The segments are sorted by their ends, which means that B[K] ≤ B[K + 1] for K such that 0 ≤ K < N − 1.

Two segments I and J, such that I ≠ J, are overlapping if they share at least one common point.
In other words, A[I] ≤ A[J] ≤ B[I] or A[J] ≤ A[I] ≤ B[J].

We say that the set of segments is non-overlapping if it contains no two overlapping segments.
The goal is to find the size of a non-overlapping set containing the maximal number of segments.

For example, consider arrays A, B such that:
  A[0] = 1    B[0] = 5
  A[1] = 3    B[1] = 6
  A[2] = 7    B[2] = 8
  A[3] = 9    B[3] = 9
  A[4] = 9    B[4] = 10

The segments are shown in the figure below.



The size of a non-overlapping set containing a maximal number of segments is 3.
For example, possible sets are {0, 2, 3}, {0, 2, 4}, {1, 2, 3} or {1, 2, 4}.
There is no non-overlapping set with four segments.

Write a function:
  function solution(A, B);

that, given two arrays A and B consisting of N integers,
returns the size of a non-overlapping set containing a maximal number of segments.

For example, given arrays A, B shown above, the function should return 3, as explained above.

Write an efficient algorithm for the following assumptions:
  N is an integer within the range [0..30,000];
  each element of arrays A and B is an integer within the range [0..1,000,000,000];
  A[I] ≤ B[I], for each I (0 ≤ I < N);
  B[K] ≤ B[K + 1], for each K (0 ≤ K < N − 1).

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

function solution(A, B) {
  const N = A.length
  if (N == 0) return 0

  const segment = []
  for (let i = 0; i < N; i++) {
    segment.push({ start: A[i], end: B[i] })
  }
  segment.sort((a, b) => a.start - b.start)

  let result = 1
  let { start, end } = segment[0]

  let i = 1
  while (i < N) {
    // We verify if the subsequent ropes, which are ordered by starting point
    // are shorter than the current one (i.e., their starting point can be higher but
    // their ending point needs lower to be lower than the current one). By doing this
    // we find the current rope which gets the least in the way of finding the solution
    if (segment[i].start >= start && segment[i].end < end) {
      start = segment[i].start
      end = segment[i].end
    } else if (segment[i].start > end) {
      result++
      start = segment[i].start
      end = segment[i].end
    }
    i++
  }

  return result
}
