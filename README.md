# Codility Solutions

### JavaScript solutions to **[Codility's lessons](https://app.codility.com/programmers/lessons)**.

<br/>

# Notes

- [1. Sets](#1-sets)
- [2. Divisible numbers](#2-divisible-numbers)
- [3. Prefix sum](#3-prefix-sum)
- [4. Minimum average](#4-minimum-average)
- [5. Triangle](#5-triangle)
- [6. Stone wall](#6-stone-wall)
- [7. Equilibrium leaders](#7-equilibrium-leaders)
- [8. Maximum slice](#8-maximum-slice)
- [9. Counting factors](#9-counting-factors)
- [10. Flag](#10-flag)
- [11. Sieve of Eratosthenes](#11-sieve-of-eratosthenes)
- [12. Factorization](#12-factorization)
- [13. Euclidian Algorithm (Greatest Common Divisor)](#13-euclidian-algorithm--greatest-common-divisor-)
  - [Subtraction → O(N)](#subtraction---o-n-)
  - [Division → O(log(N))](#division---o-log-n--)
  - [Binary → O(log(N))](#binary---o-log-n----more-efficient-than-division-for-large-numbers-)
  - [Least Common Multiple → O(log(N))](#least-common-multiple---o-log-n--)
- [14. Common Prime Divisors](#14-common-prime-divisors)

<br/>

## 1. Sets

Given an array of strings, numbers, etc… a `Set` constructed from the array only stores each unique value from it.

```jsx
const array = [1, 1, 2, 4]
const set = new Set(a) // {1, 2, 4}

console.log(set.has(3)) // false

set.add(3) // {1, 2, 3, 4}
set.add(1) // {1, 2, 3, 4}

const r = set.delete(3) // {1, 2, 4}
console.log(r) // true (the removal was successful / there was a 3)

console.log(set.size) // 4

set.values()
set.forEach()

set.clear()
```

<br/>

## 2. Divisible numbers

Given A, B and N, the quantity of numbers D, A ≤ D ≤B that are divisible by N can be given by the formula: `D = Math.floor(B / N) - Math.floor((A - 1) / N)`

Why?

`B = N * b` → **b** gives us the number of multiples of N between 0 and B <br />
`A = N * a` → **a** gives us the number of multiples of N between 0 and A

Thus the number numbers between A and B divisible by N is

`b - a = (B / N) - (A / N)`

Notice that if A is divisible by N, we lose a single count from the **a**, we solve it by using the previous D formula.

<br/>

## 3. Prefix sum

Given an array A of values, we can construct a prefix sum array B from A such that

`B[i] = B[i - 1] + A[i]` which means, for example, `B[3] = A[0] + A[1] + A[2] + A[3] = B[2] + A[3]`.

With a structure such as this, we can infer many types of conclusions, we can, for example,

- Get the sum of values from `A[x]` to `A[y]` (inclusive, `x < y`) by doing `B[y] - B[x - 1]`
- If `B[i]` is the number of occurrences of a certain character in a string, we can determine if said character occurred between two indexes by using the same formula

<br/>

## 4. Minimum average

Given an array A of size 4 or more, any slice of A of size 2 or more will always have a lower average than A.

**Thus to return the lowest average slice, we just have to search slices of size 2 or 3.**

<br/>

## 5. Triangle

Given A, B, and C, sorted in increasing order (A ≤ B ≤ C), we have that

if `A + B > C` then `B + C > A` (because C and B ≥ A) and `C + A > B` (because C ≥ B)

<br/>

## 6. Stone wall

We iterate over each segment of our stone wall:

- If the current segment is higher than the previous, we will need another block to build the wall
- If the current segment is lower than the previous one, we will need another block only if there wasn't an earlier segment that wasn't the same height
  - And this earlier segment can't be separated from the current segment by an even lower one; If that is the case then we will need another block
- If the heights are the same, the block count remains the same

<br/>

## 7. Equilibrium leaders

Given an array A of size N, a leader is an element that appears at least more than N / 2 times.
For an element E to be a leader of two slices of A, it needs to be a leader of A, because otherwise it will always lose in one of the slices. Therefore, all the possible equileaders will always be E.

Thus to count the number of and equileader, we:

- Find E iterating over A
- For each possible N - 1 two slices:
  - Use a counter array for each slice
  - For A[i], increasing its counter for the left counter and decrease its counter for the right counter
  - Check if E is the leader in both
    - If it is, increase the equileader counter by 1

<br/>

## 8. Maximum slice

To get the slice of an array A with the highest sum, we create an auxiliary array B, where B[i] gives us the highest slice ending B[i].

To do that, we just need to to `B[i] = Math.max(B[i - 1], B[i - 1] + A[i])`

After that we just iterate over B and get the highest value. Even further, we don't even need B to be an array, we just need to calculate B and highest value while iterating over A directly.

<br/>

## 9. Counting factors

Given N, we know that if a N is divisible by a number X, then N / X also is a divisor of N.<br/>
_I.e.:_ `N % X = 0` → `N = X * Y` → `Y = N / X` → `N % Y = 0`

We also know at least X or Y is lesser or equal to sqrt(N) (otherwise X \* Y > N). Thus we can improve a counter algorithm from being **O(N)** to **O(sqrt(N))**, and incrementing the counter by 2 each time we find a match (because we are adding both X and Y) or 1 if X == sqrt(N) (otherwise we would add X twice to the counter).

**Using this logic we can also determine if N is a prime number if the counter is 0 at the end.**

<br/>

## 10. Flag

The trick here is not finding an efficient logic to iterate over the problem (it is important but it's not the core), it is setting an efficient upper limit to the number of iterations.

For an array A of size N:

- If A has F flags, then each flag must have at least `(F - 1)` spaces between them

  - For example, for F = 2, imagine peaks at coordinates 1 and 3

- Therefore, for F flags, the space occupied by them is at least `F * (F - 1)`

  - Thus, `F * (F - 1) <= N` → `F <= sqrt(N)` (aproximately)
  - More specifically, `F <= floor(sqrt(N)) + 1)`
    - e.g.: We can fit 3 flags in an array of size 7

- We also know the amount of flags cannot surpass the amount P of peaks

Finally, we know that the max amount of flags M the array can have is, **at most, O(sqrt(N))**.
</br/>**So, even if we have to nest two O(M) loops, we have an O(N) algorithm.**

<br/>

## 11. Sieve of Eratosthenes

An algorithm that returns a boolean array P of length n, where if i is a prime number, then `P[i] = true`.

- First, we create P and fill it with the value true (i.e., we assume all numbers are prime)
- Initially, from an outer loop, we iterate each number i in range [ 2, 3, 4, …, N ], marking every multiple of i as `false` (this will have an O(Nˆ2) cost).

  ![Screenshot-2023-10-09-at-13-15-08.png](https://i.postimg.cc/Gp1GQrCv/Screenshot-2023-10-09-at-13-15-08.png)

- To improve this algorithm, we only need to iterate over numbers i where `P[i] === true` (i.e., numbers that still haven't been marked non-prime by previous steps)
- As we've seen in _Counting factors_, we only need to iterate i over [ 2, …, sqrt(N) ]
- To further improve this, notice how for a number i, we don't need to verify multiples smaller than i^2, because these numbers already been squashed in previous steps (by the other factor of said numbers)

  ![Notice how, for i = 3, 6 has already marked in a previous step (in i = 2).](https://i.postimg.cc/cHLK9L5t/Screenshot-2023-10-09-at-13-33-17.png) <br/>
  <small>Notice how, for i = 3, 6 has already marked in a previous step (in i = 2).</small>

```jsx
const createSieve = (N) => {
  let P = Array(N + 1).fill(true)

  P[0] = P[1] = false

  for (let i = 2; i <= Math.sqrt(N); i++) {
    if (P[i] == true) {
      for (let j = i * i; j <= N; j += i) {
        P[j] = false
      }
    }
  }

  return P
}
```

<br/>

## 12. Factorization

Factorization is the process of decomposing a number into prime numbers.

To solve this problem, we create modify the Sieve of Eratosthenes algorithm to, instead of saving either `true` or `false` in the array, it saves the smallest prime number that is a factor of i (or 0 if it's a prime number).

![Screenshot 2023-10-09 at 13.48.58.png](https://i.postimg.cc/RFhF1bNc/Screenshot-2023-10-09-at-13-48-58.png)

```jsx
const createSieve = (N) => {
  const P = Array(N + 1).fill(0)

  P[0] = P[1] = -1

  for (let i = 2; i <= Math.sqrt(N); i++) {
    if (P[i] == 0) {
      for (let j = i * i; j <= N; j += i) {
        if (P[j] == 0) {
          P[j] = i
        }
      }
    }
  }

  return P
}

const factorization = (x, P) => {
  const primeFactors = []

  let i
  for (i = x; P[i] > 0; i /= P[i]) {
    primeFactors.push(P[i])
  }
  primeFactors.push(i)

  return primeFactors
}
```

<br/>

## 13. Euclidian Algorithm (Greatest Common Divisor)

### Subtraction → O(N)

```jsx
const gcd = (x, y) => {
  if (x == y) {
    return x
  } else if (x > y) {
    return gcd(x - y, y)
  } else {
    // (y > x)
    return gcd(y - x, x)
  }
}
```

### Division → O(log(N))

```jsx
const gcd = (x, y) => {
  // Making sure x >= y
  const a = x >= y ? x : y
  const b = x < y ? x : y

  if (a % b == 0) {
    return b
  }
  return gcd(b, a % b)
}
```

### Binary → O(log(N)) (more efficient than division for large numbers)

```jsx
const gcd = (x, y, result) => {
  if (x == y) {
    return result * x
  } else if (x % 2 == 0 && y % 2 == 0) {
    return gcd(Math.floor(x / 2), Math.floor(y / 2), 2 * result)
  } else if (x % 2 == 0) {
    return gcd(Math.floor(x / 2), y, result)
  } else if (y % 2 == 0) {
    return gcd(x, Math.floor(y / 2), result)
  } else if (x > y) {
    return gcd(x - y, y, result)
  } else {
    // (y > x)
    return gcd(x, y - x, result)
  }
}
```

### Least Common Multiple → O(log(N))

```jsx
const lcm = (x, y) => {
  const n = x * y
  const g = gcd(x, y)
  return n / g
}
```

<br/>

## 14. Common Prime Divisors

The straightforward idea would be to use the factorization algorithm and compare if both the sets of prime factors of A and B are the same. However the problem lies the space required for the sieve array if A or B are very large numbers.

The idea here is to obtain the greatest common divisor of A and B. By logic, **it will contain ALL the common prime divisors of both.**

After that, we must verify the remainder of A and B divided by the GCD and check whether they contain new prime divisors. If either of them do, then A and B do not share the same prime divisors. Consider the following: `A' = A / GCD`, then:

- If A’ == 1 then A does not contain any new prime divisors ✔️
- If GCD == 1 then A is a prime number not present in GCD ✖️
- If none of the above is true, we calculate

  - `GDC' = getGCD(A', GCD)`
  - `A” = A' / GCD'`

  And repeat the process for these new values.

Remember that we need to run the above verification for both A and B. If both are true, then we have our answer.

```jsx
function solution(A, B) {
  const getGCD = (x, y) => {
    const a = x >= y ? x : y
    const b = x < y ? x : y

    if (a % b == 0) return b
    return getGCD(b, a % b)
  }

  const checkDivisors = (x, gcd) => {
    if (x == 1) {
      return true
    } else if (gcd == 1) {
      return false
    } else {
      let newGcd = getGCD(x, gcd)
      let newX = x / newGcd
      return checkDivisors(newX, newGcd)
    }
  }

  let result = 0
  for (let i = 0; i < A.length; i++) {
    const a = A[i]
    const b = B[i]

    if (a == b) {
      result++
      continue
    } else if (a == 1 || b == 1) {
      continue
    } else {
      let gcd = getGCD(a, b)
      if (gcd == 1) {
        continue
      }

      let newA = a / gcd
      let newB = b / gcd

      if (checkDivisors(newA, gcd) && checkDivisors(newB, gcd)) {
        result++
      }
    }
  }

  return result
}
```
