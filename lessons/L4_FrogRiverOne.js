function solution(X, A) {
  if (A.length < X) {
    return -1;
  }

  // Fill an array B, inverse of A, where for B[Y] shows the earlies time a
  // leaf fall at position Y
  const B = [];
  A.forEach((a, i) => {
    if (!B[a - 1]) {
      B[a - 1] = i;
    }
  });

  if (B.length < X) {
    return -1;
  }

  // Now, with B filled, we just need to find the largest value inside it,
  // which will indicate the time for the last necessary leaf to fall
  let result = -1;

  for (const b of B) {
    if (b == null) {
      result = -1;
      break;
    }
    if (b > result) {
      result = b;
    }
  }

  return result;
}
