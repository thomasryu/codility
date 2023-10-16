/*

Write a function solution that, given two integers A and B, returns a string containing
exactly A letters 'a' and exactly B letters 'b' with no three consecutive
letters being the same (in other words, neither "aaa" nor "bbb" may occur in the returned string).

Examples:
  1. Given A = 5 and B = 3, your function may return "aabaabab". Note that "abaabbaa" would also be a correct answer. Your function may return any correct answer.
  2. Given A = 3 and B = 3, your function should return "ababab", "aababb", "abaabb" or any of several other strings.
  3. Given A = 1 and B = 4, your function should return "bbabb", which is the only correct answer in this case.

Assume that:
- A and B are integers within the range [0..100];
- at least one solution exists for the given A and B.
- In your solution, focus on correctness. The performance of your solution will not be the focus of the assessment.

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

function solution(A, B) {
  if (A > 2 * (B + 1) || B > 2 * (A + 1)) {
    return ''
  }
  const count = {
    a: A,
    b: B,
  }

  const getCurrentConcat = (letter) => {
    const otherLetter = letter == 'a' ? 'b' : 'a'
    if (
      count[letter] > count[otherLetter] &&
      count[letter] - count[otherLetter] > 1
    ) {
      return 2
    }
    return 1
  }

  let currentLetter = count.a > count.b ? 'a' : 'b'
  let currentConcat = getCurrentConcat(currentLetter)

  let result = ''
  while (count.a > 0 || count.b > 0) {
    for (let i = 0; i < currentConcat; i++) {
      result = result.concat('', currentLetter)
    }
    count[currentLetter] -= currentConcat
    currentLetter = currentLetter == 'a' ? 'b' : 'a'
    currentConcat = getCurrentConcat(currentLetter)
  }

  return result
}
