/*

A prime is a positive integer X that has exactly two distinct divisors: 1 and X.
The first few prime integers are 2, 3, 5, 7, 11 and 13.

A prime D is called a prime divisor of a positive integer P if there exists a positive integer K such that D * K = P.
For example, 2 and 5 are prime divisors of 20.

You are given two positive integers N and M.
The goal is to check whether the sets of prime divisors of integers N and M are exactly the same.

For example, given:
- N = 15 and M = 75, the prime divisors are the same: {3, 5};
- N = 10 and M = 30, the prime divisors aren't the same: {2, 5} is not equal to {2, 3, 5};
- N = 9 and M = 5, the prime divisors aren't the same: {3} is not equal to {5}.

Write a function:
  function solution(A, B);

that, given two non-empty arrays A and B of Z integers,
returns the number of positions K for which the prime divisors of A[K] and B[K] are exactly the same.

For example, given:
  A[0] = 15   B[0] = 75
  A[1] = 10   B[1] = 30
  A[2] = 3    B[2] = 5

  the function should return 1, because only one pair (15, 75) has the same set of prime divisors.

Write an efficient algorithm for the following assumptions:
- Z is an integer within the range [1..6,000];
- each element of arrays A and B is an integer within the range [1..2,147,483,647].

Copyright 2009–2023 by Codility Limited. All Rights Reserved.
Unauthorized copying, publication or disclosure prohibited.

*/

// Attempt 1: Bad storage performance
function solution(A, B) {
  const N = 1000000

  // Build the sieve
  const sieve = Array(N).fill(0)
  sieve[0] = sieve[1] = -1
  for (let i = 2; i <= Math.sqrt(N); i++) {
    if (sieve[i] == 0) {
      for (let j = i * i; j <= N; j += i) {
        if (sieve[j] == 0) {
          sieve[j] = i
        }
      }
    }
  }

  const getFactors = (x) => {
    const factors = {}
    let i
    for (i = x; sieve[i] > 0; i /= sieve[i]) {
      factors[sieve[i]] = factors[sieve[i]] ? factors[sieve[i]] + 1 : 1
    }
    factors[i] = factors[i] ? factors[i] + 1 : 1
    return factors
  }

  const Z = A.length
  let result = 0

  for (let i = 0; i < Z; i++) {
    const factorsA = Object.keys(getFactors(A[i]))
    const factorsB = Object.keys(getFactors(B[i]))

    if (JSON.stringify(factorsA) == JSON.stringify(factorsB)) {
      result++
    }
  }

  return result
}

// Attempt 2
function solution(A, B) {
  // If A and B share the prime divisors,
  // all of them will be contained within their GCD

  // This also implies that if their GCD is 1, then
  // they do not have common prime divisors

  const getGCD = (x, y) => {
    const a = x >= y ? x : y
    const b = x < y ? x : y

    if (a % b == 0) return b
    return getGCD(b, a % b)
  }

  // Therefore, only need to check the remainder of their respective divisions by the GCD
  // i.e., A' = A / GCD(A, B) and B' = B / GCD(A, B) must not have new prime divisors

  // To verify that, we
  // 1. Check whether A' == 1, if that is true, then A' doesn't have a new prime divisors
  // 2. Else, check if GCD == 1, if that is true, then we have a new prime divisor
  // 3. Else, we calculate GCD' = GCD(A', GCD) and A" = A' / GCD'
  //    and repeat the verification for A" and GCD'

  // This is because each layer of A and GCD calculation allows us to check if there is a prime
  // in A, not contained in GCD (if A becomes 1 then the answer is no, if GCD becomes 1, then the answer is yes)

  // We need to do this verification for both A and B
  const checkDivision = (x, gcd) => {
    if (x == 1) {
      return true
    } else if (gcd == 1) {
      return false
    } else {
      let newGcd = getGCD(x, gcd)
      let newX = x / newGcd
      return checkDivision(newX, newGcd)
    }
  }

  let result = 0
  for (let i = 0; i < A.length; i++) {
    const a = A[i]
    const b = B[i]

    if (a == b) {
      result++
    } else if (a == 1 || b == 1) {
      continue
    } else {
      let gcd = getGCD(a, b)
      if (gcd == 1) {
        continue
      }

      let newA = a / gcd
      let newB = b / gcd

      if (checkDivision(newA, gcd) && checkDivision(newB, gcd)) {
        result++
      }
    }
  }

  return result
}
