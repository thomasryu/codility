/*

A non-empty array A consisting of N integers is given. The consecutive elements of array A represent consecutive cars on a road.

Array A contains only 0s and/or 1s:
- 0 represents a car traveling east,
- 1 represents a car traveling west.

The goal is to count passing cars. We say that a pair of cars (P, Q), where 0 ≤ P < Q < N, is passing when P is traveling to the east and Q is traveling to the west.

For example, consider array A such that:
  A[0] = 0
  A[1] = 1
  A[2] = 0
  A[3] = 1
  A[4] = 1

  We have five pairs of passing cars: (0, 1), (0, 3), (0, 4), (2, 3), (2, 4).

Write a function:
  function solution(A);

that, given a non-empty array A of N integers, returns the number of pairs of passing cars.

The function should return −1 if the number of pairs of passing cars exceeds 1,000,000,000.

For example, given:
  A[0] = 0
  A[1] = 1
  A[2] = 0
  A[3] = 1
  A[4] = 1

the function should return 5, as explained above.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [1..100,000];
- each element of array A is an integer that can have one of the following values: 0, 1.

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

function solution(A) {
  let result = 0;
  let eastwardCars = 0;
  let westwardCars = 0;

  // We know that, for a vehicle X going east (i.e. A[X] = 0), all eastward vehicles
  // whose indexes are lower than E also crossed by the same vehicles X did

  // Thus we keep track of the current number of eastward vehicles (E) and, when
  // encountering a new eastward vehicle, we count the vehicled it passed through (W) and
  // add (E * W) to the counter
  A.forEach((a, i) => {
    if (a == 1) {
      westwardCars++;

      // If the last car in the array goes west, we also need to add to the results
      if (i == A.length - 1) {
        result += eastwardCars * westwardCars;
      }
    }

    // After calculating results after finding a eastward car, we need to reset
    // the westward cars count
    if (a == 0) {
      result += eastwardCars * westwardCars;
      eastwardCars++;
      westwardCars = 0;
    }
  });

  return result <= 1000000000 ? result : -1;
}
