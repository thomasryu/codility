/*

A DNA sequence can be represented as a string consisting of the letters A, C, G and T,
which correspond to the types of successive nucleotides in the sequence.
Each nucleotide has an impact factor, which is an integer. Nucleotides of types A, C, G and T
have impact factors of 1, 2, 3 and 4, respectively. You are going to answer several queries of the form:
What is the minimal impact factor of nucleotides contained in a particular part of the given DNA sequence?

The DNA sequence is given as a non-empty string S = S[0]S[1]...S[N-1] consisting of N characters.
There are M queries, which are given in non-empty arrays P and Q, each consisting of M integers.
The K-th query (0 ≤ K < M) requires you to find the minimal impact factor of nucleotides contained in the
DNA sequence between positions P[K] and Q[K] (inclusive).

For example, consider string S = CAGCCTA and arrays P, Q such that:
  P[0] = 2    Q[0] = 4
  P[1] = 5    Q[1] = 5
  P[2] = 0    Q[2] = 6

The answers to these M = 3 queries are as follows:
- The part of the DNA between positions 2 and 4 contains nucleotides G and C (twice), whose impact factors are 3 and 2 respectively, so the answer is 2.
- The part between positions 5 and 5 contains a single nucleotide T, whose impact factor is 4, so the answer is 4.
- The part between positions 0 and 6 (the whole string) contains all nucleotides, in particular nucleotide A whose impact factor is 1, so the answer is 1.

Write a function:
  function solution(S, P, Q);

that, given a non-empty string S consisting of N characters and two non-empty arrays P and Q consisting of M integers,
returns an array consisting of M integers specifying the consecutive answers to all queries.

Result array should be returned as an array of integers.

For example, given the string S = CAGCCTA and arrays P, Q such that:
    P[0] = 2    Q[0] = 4
    P[1] = 5    Q[1] = 5
    P[2] = 0    Q[2] = 6

    the function should return the values [2, 4, 1], as explained above.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [1..100,000];
- M is an integer within the range [1..50,000];
- each element of arrays P and Q is an integer within the range [0..N - 1];
- P[K] ≤ Q[K], where 0 ≤ K < M;
- string S consists only of upper-case English letters A, C, G, T.

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

// Attempt 1: Unoptimized (O(N * M))
function solution(S, P, Q) {
  const M = P.length;
  const impactMap = { A: 1, C: 2, G: 3, T: 4 };
  const impactS = [...S].map((s) => impactMap[s]);

  const result = [];

  for (let i = 0; i < M; i++) {
    let min = 5;
    for (let j = P[i]; j <= Q[i]; j++) {
      if (impactS[j] < min) {
        min = impactS[j];
      }
    }

    result[i] = min;
  }

  return result;
}

function solution(S, P, Q) {
  const M = P.length;

  const occurrenceA = [0];
  const occurrenceC = [0];
  const occurrenceG = [0];
  const occurrenceT = [0];

  // We create a map that, for index i counts the number of occurrences of each letter until S[I]
  // for example, for CAAGTG, we have the an A map equals [0, 0, 1, 2, 2, 2, 2]
  const arrayS = [...S];
  arrayS.forEach((s, i) => {
    switch (s) {
      case 'A':
        occurrenceA[i + 1] = occurrenceA[i] + 1;
        occurrenceC[i + 1] = occurrenceC[i];
        occurrenceG[i + 1] = occurrenceG[i];
        occurrenceT[i + 1] = occurrenceT[i];
        break;
      case 'C':
        occurrenceC[i + 1] = occurrenceC[i] + 1;
        occurrenceA[i + 1] = occurrenceA[i];
        occurrenceG[i + 1] = occurrenceG[i];
        occurrenceT[i + 1] = occurrenceT[i];
        break;
      case 'G':
        occurrenceG[i + 1] = occurrenceG[i] + 1;
        occurrenceC[i + 1] = occurrenceC[i];
        occurrenceA[i + 1] = occurrenceA[i];
        occurrenceT[i + 1] = occurrenceT[i];
        break;
      case 'T':
        occurrenceT[i + 1] = occurrenceT[i] + 1;
        occurrenceC[i + 1] = occurrenceC[i];
        occurrenceG[i + 1] = occurrenceG[i];
        occurrenceA[i + 1] = occurrenceA[i];
        break;
    }
  });

  // Then, to check whether a genome occurs between P[j] and Q[j],
  // we just have to check whether the coordinate Q[j] + 1 of the occurrence map has a higher count than P[j]

  // We don't use P[j] + 1, to know why check the following example:
  // S = 'AC'  P = [0, 0, 1]  Q = [0, 1, 1]

  // for it, we have the following maps:
  // occurrenceA = [0, 1, 1]
  // occurrenceC = [0, 0, 1]

  // for j = 0, since P[0] is equal to Q[0] we have to compare position 1 (which corresponds to S[0]) of the maps with position 0

  // for j = 1, if we used P[1] + 1 and Q[1] + 1, we would compare positions 1 and 2, which would return C, which is not correct
  // instead, we need to compare positions 0 (P[1]) and 2 (Q[1] + 1), which returns A (this is because P[j] gives the correct
  // comparison count for the j-th genome)

  // for j = 2, we apply the same rule as j = 0, but with positions 1 and 2

  let result = [];
  for (let i = 0; i < M; i++) {
    if (occurrenceA[Q[i] + 1] > occurrenceA[P[i]]) {
      result.push(1);
    } else if (occurrenceC[Q[i] + 1] > occurrenceC[P[i]]) {
      result.push(2);
    } else if (occurrenceG[Q[i] + 1] > occurrenceG[P[i]]) {
      result.push(3);
    } else {
      result.push(4);
    }
  }

  return result;
}
