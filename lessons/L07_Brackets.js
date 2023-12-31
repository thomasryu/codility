/*

A string S consisting of N characters is considered to be properly nested if any of the following conditions is true:
- S is empty;
- S has the form "(U)" or "[U]" or "{U}" where U is a properly nested string;
- S has the form "VW" where V and W are properly nested strings.

For example, the string "{[()()]}" is properly nested but "([)()]" is not.

Write a function:
  function solution(S);

that, given a string S consisting of N characters, returns 1 if S is properly nested and 0 otherwise.

For example, given S = "{[()()]}", the function should return 1 and given S = "([)()]", the function should return 0, as explained above.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [0..200,000];
- string S is made only of the following characters: '(', '{', '[', ']', '}' and/or ')'.

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

function solution(S) {
  const arrayS = [...S]

  const opening = ['(', '{', '[']
  const closing = [']', '}', ')']

  const map = {
    '(': ')',
    '[': ']',
    '{': '}',
  }

  let result = 1
  const closingStack = []
  arrayS.forEach((s) => {
    if (opening.includes(s)) {
      closingStack.push(map[s])
    }
    if (closing.includes(s)) {
      if (closingStack.pop() != s) {
        result = 0
      }
    }
  })

  if (closingStack.length > 0) {
    result = 0
  }

  return result
}
