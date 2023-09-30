/*

A binary gap within a positive integer N is any maximal sequence of consecutive zeros that is surrounded
by ones at both ends in the binary representation of N.

For example, number 9 has binary representation 1001 and contains a binary gap of length 2.
The number 529 has binary representation 1000010001 and contains two binary gaps: one of length 4 and one of length 3.
The number 20 has binary representation 10100 and contains one binary gap of length 1.
The number 15 has binary representation 1111 and has no binary gaps.
The number 32 has binary representation 100000 and has no binary gaps.

Write a function:
  function solution(N);

that, given a positive integer N, returns the length of its longest binary gap.
The function should return 0 if N doesn't contain a binary gap.

For example, given N = 1041 the function should return 5, because N has binary representation 10000010001 and so its
longest binary gap is of length 5. Given N = 32 the function should return 0, because N has binary representation '100000'
and thus no binary gaps.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [1..2,147,483,647].

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

function solution(N) {
  // Convert N to binary (in string format)
  const binary = (N >>> 0).toString(2);

  // Function which returns every match of regex,
  // even if they overlap with previous matches
  // (which standard .match() is not capable of)
  const getGaps = (regex) => {
    let match = regex.exec(binary);
    const results = [];

    while (match) {
      results.push(match[0]);
      regex.lastIndex = match.index + 1;
      match = regex.exec(binary);
    }

    return results;
  };

  const zeroGaps = getGaps(/1(0+)1/g).map((s) => s.replace(/1/g, ''));
  const oneGaps = getGaps(/0(1+)0/g).map((s) => s.replace(/0/g, ''));

  // Array with the lengths of all 0 and 1 gaps
  const gaps = [...zeroGaps, ...oneGaps]
    .map((g) => g.length)
    .sort((a, b) => b - a);

  return gaps.length > 0 ? gaps[0] : 0;
}
