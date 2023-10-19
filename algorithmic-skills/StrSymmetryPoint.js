/*

Write a function:
  function solution(S);

that, given a string S, returns the index (counting from 0) of a character such that the part
of the string to the left of that character is a reversal of the part of the string to its right.
The function should return −1 if no such index exists.

Note: reversing an empty string (i.e. a string whose length is zero) gives an empty string.

For example, given a string:
  "racecar"

the function should return 3, because the substring to the left of the character "e"
at index 3 is "rac", and the one to the right is "car".

Given a string:
"x"

the function should return 0, because both substrings are empty.

Write an efficient algorithm for the following assumptions:
- the length of string S is within the range [0..2,000,000].

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

function solution(S) {
  const N = S.length

  if (N === 0 || N % 2 === 0) {
    return -1
  }

  const mid = Math.floor(N / 2)
  const left = []
  const right = []

  for (let i = 0; i < mid; i++) {
    left.push(S[i])
    right.push(S[N - i - 1])
  }

  return JSON.stringify(left) === JSON.stringify(right) ? mid : -1
}
