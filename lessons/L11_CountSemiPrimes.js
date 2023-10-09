/*

A prime is a positive integer X that has exactly two distinct divisors: 1 and X.
The first few prime integers are 2, 3, 5, 7, 11 and 13.

A semiprime is a natural number that is the product of two (not necessarily distinct) prime numbers.
The first few semiprimes are 4, 6, 9, 10, 14, 15, 21, 22, 25, 26.

You are given two non-empty arrays P and Q, each consisting of M integers.
These arrays represent queries about the number of semiprimes within specified ranges.

Query K requires you to find the number of semiprimes within the range (P[K], Q[K]), where 1 ≤ P[K] ≤ Q[K] ≤ N.

For example, consider an integer N = 26 and arrays P, Q such that:
  P[0] = 1    Q[0] = 26
  P[1] = 4    Q[1] = 10
  P[2] = 16   Q[2] = 20

The number of semiprimes within each of these ranges is as follows:
- (1, 26) is 10,
- (4, 10) is 4,
- (16, 20) is 0.

Write a function:
  function solution(N, P, Q);

that, given an integer N and two non-empty arrays P and Q consisting of M integers,
returns an array consisting of M elements specifying the consecutive answers to all the queries.

For example, given an integer N = 26 and arrays P, Q such that:
  P[0] = 1    Q[0] = 26
  P[1] = 4    Q[1] = 10
  P[2] = 16   Q[2] = 20

the function should return the values [10, 4, 0], as explained above.

Write an efficient algorithm for the following assumptions:
- N is an integer within the range [1..50,000];
- M is an integer within the range [1..30,000];
- each element of arrays P and Q is an integer within the range [1..N];
- P[i] ≤ Q[i].

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

// O(N * log(log(N)) + M)
function solution(N, P, Q) {
  // We create the factorization algorithm
  const sieve = Array(N + 1).fill(0)
  sieve[0] = sieve[1] = -1

  for (let i = 2; i <= Math.sqrt(N); i++) {
    if (sieve[i] === 0) {
      for (let j = i * i; j <= N; j += i) {
        if (sieve[j] === 0) {
          sieve[j] = i
        }
      }
    }
  }

  const factorization = (x) => {
    const factors = []
    let i
    for (i = x; sieve[i] > 0; i /= sieve[i]) {
      factors.push(sieve[i])
    }
    factors.push(i)
    return factors
  }

  // We build a prefix array X of size N where X[i] gives us the number of semiprime numbers between 0 and i
  // (this is easy to do because each member j, X[j] = X[j - 1] + 1 if j is a semiprime or X[j] = X[j - 1] otherwise)
  const prefix = [0, 0]
  for (let i = 2; i <= N; i++) {
    const f = factorization(i)
    prefix[i] = prefix[i - 1] + (f.length == 2 ? 1 : 0)
  }

  // For each pair p of P and q of Q,
  // add prefix[q] - prefix[q - 1] to the array
  const result = []
  for (let i = 0; i < P.length; i++) {
    result[i] = prefix[Q[i]] - prefix[P[i] - 1]
  }

  return result
}
