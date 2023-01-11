function mergeSort(vecs, axis) {

  //Sort by x and then sort by y.

  //Test for the base case.
  //divide into two arrays.
  //recursively sort.
  //merge the arrays.

  if (vecs.length === 1) return vecs;
  let middle = Math.floor(vecs.length / 2);



  let left = vecs.slice(0, middle);
  let right = vecs.slice(middle, vecs.length);

  left = mergeSort(left, axis);
  right = mergeSort(right, axis);

  let leftIndex = 0;
  let rightIndex = 0;
  let mergedVecs = [];

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex][axis] <= right[rightIndex][axis]) {
      mergedVecs.push(left[leftIndex]);
      leftIndex++;
    } else if (right[rightIndex][axis] < left[leftIndex][axis]) {
      mergedVecs.push(right[rightIndex]);
      rightIndex++
    }
  }

  mergedVecs = mergedVecs.concat(left.slice(leftIndex), right.slice(rightIndex));


  return mergedVecs;

}