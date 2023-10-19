// O(N * log(N))
function solution(A) {
  const MAX = Math.pow(10, 9)
  let result = 0

  // Inversions are the basis of a merge sort
  // every time an inversion occurs, the merge sort algorith has to invert it
  // therefore we count the inversions it produces to get the result
  const merge = (left, right) => {
    let output = []
    while (left.length > 0 && right.length > 0) {
      if (left[0] <= right[0]) {
        output.push(left.shift())
      } else {
        output.push(right.shift())

        // We found an inversion:
        // - A value of the right half whose value is lower than all of the left
        // - This means, all of the left are inversions to the right element
        //   - because even though their indexes are lower, their values are higher
        // - Therefore we add the number of elements in the left side to the count
        result += left.length
      }
    }

    return result > MAX ? [] : [...output, ...left, ...right]
  }

  const mergeSort = (x) => {
    if (x.length < 2) return x

    const half = Math.floor(x.length / 2)
    const right = [...x]
    const left = right.splice(0, half)

    return merge(mergeSort(left), mergeSort(right))
  }

  mergeSort(A)
  return result > MAX ? -1 : result
}
