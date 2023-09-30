function solution(A) {
  // Array B such that B[I] shows the number of occurences of I in array A
  const B = [];
  A.forEach((a) => {
    B[a - 1] = B[a - 1] ? B[a - 1] + 1 : 1;
  });

  if (B.length != A.length) {
    return 0;
  }

  for (const b of B) {
    if (b != 1) {
      return 0;
    }
  }
  return 1;
}
