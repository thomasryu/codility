/*

A string S consisting of N characters is called properly nested if:
- S is empty;
- S has the form "(U)" where U is a properly nested string;
- S has the form "VW" where V and W are properly nested strings.

For example, string "(()(())())" is properly nested but string "())" isn't.

Write a function:
  function solution(S);

that, given a string S consisting of N characters, returns 1 if string S is properly nested and 0 otherwise.

For example, given S = "(()(())())", the function should return 1 and given S = "())", the function should return 0, as explained above.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [0..1,000,000];
- string S is made only of the characters '(' and/or ')'.

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

function solution(S) {
  const arrayS = [...S]

  let debt = 0
  for (let i = 0; i < S.length; i++) {
    if (S[i] == '(') {
      debt++
    }
    if (S[i] == ')') {
      debt--
    }
    if (debt < 0) {
      return 0
    }
  }

  return debt == 0 ? 1 : 0
}
