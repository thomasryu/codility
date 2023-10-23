/*

You are going to build a stone wall. The wall should be straight and N meters long, and its thickness should be constant;
however, it should have different heights in different places.
The height of the wall is specified by an array H of N positive integers.
H[I] is the height of the wall from I to I+1 meters to the right of its left end.
In particular, H[0] is the height of the wall's left end and H[N-1] is the height of the wall's right end.

The wall should be built of cuboid stone blocks (that is, all sides of such blocks are rectangular).
Your task is to compute the minimum number of blocks needed to build the wall.

Write a function:
  function solution(H);

that, given an array H of N positive integers specifying the height of the wall,
returns the minimum number of blocks needed to build it.

For example, given array H containing N = 9 integers:
  H[0] = 8    H[1] = 8    H[2] = 5
  H[3] = 7    H[4] = 9    H[5] = 8
  H[6] = 7    H[7] = 4    H[8] = 8

the function should return 7. The figure shows one possible arrangement of seven blocks.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [1..100,000];
- each element of array H is an integer within the range [1..1,000,000,000].

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

// O(N)
function solution(H) {
  let result = 0
  const segmentStack = []

  H.forEach((h) => {
    const M = segmentStack.length

    // if the stack is empty or if the current segment is higher than the previous one,
    // add the current segment to the stack and increment the counter
    if (M == 0 || h > segmentStack[M - 1]) {
      segmentStack.push(h)
      result++
    }

    // If the current segment is lower than the previous one, pop the stack
    // until we find a value equal or lower than the current one
    if (h < segmentStack[M - 1]) {
      let previousSegment = segmentStack.pop()
      while (h < previousSegment) {
        previousSegment = segmentStack.pop()
      }

      // After the previous step, if the previous segment is equal to the current one, the counter does not increase
      // however, if it's lower, we need to add back the previous segment, and increase the counter
      // (if the stack was empty, we simply increment the counter)
      if (previousSegment == null || previousSegment < h) {
        previousSegment && segmentStack.push(previousSegment)
        result++
      }

      // And, regardless, we add the decreasing segment to the stack
      segmentStack.push(h)
    }
  })

  return result
}
