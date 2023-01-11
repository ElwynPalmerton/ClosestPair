function closestPair(Px, Py) {
  //Parameter: Px = an array of vectors sorted by the x value.
  //Parameter: Py = an array of vectors sorted by the y value.

  //Px[0], Px[1], Px[2].
  // dist 0 & 1, dist 0 & 2, dist 1 & and 2.

  function baseCase(Px) {
    if (Px.length == 1) {
      return null;
    }

    if (Px.length == 2)
      return {
        p: Px[0],
        q: Px[1]
      };

    let dist01 = Px[0].dist(Px[1]); //Distance between points 0 and 1.
    let dist02 = Px[0].dist(Px[2]); //Distance between points 0 and 2.
    let dist12 = Px[1].dist(Px[2]); //Distance between points 1 and 2.

    if (dist01 <= dist02 && dist01 <= dist12)
      return {
        p: Px[0],
        q: Px[1]
      };
    if (dist02 <= dist01 && dist02 <= dist12)
      return {
        p: Px[0],
        q: Px[2]
      };
    if (dist12 <= dist01 && dist12 <= dist02)
      return {
        p: Px[1],
        q: Px[2]
      };
  } //End of baseCase function.

  //If there are three or fewer points these are computed in constant time.

  if (Px.length <= 3) return baseCase(Px);

  // L_ is the left array of vectors. R_ is the right array of vectors.
  //Lx = first half of Px sorted by the x-coordinate.
  //Ly = first half of Px sorted by the y-coordinate.
  //Rx = second half of Px sorted by the x-coordinate.
  //Ry = second half of Px sorted by the y-coordinate.

  let middle = Math.floor(Px.length / 2);

  let Lx = Px.slice(0, middle);
  let Ly = Py.slice(0, middle);
  let Rx = Px.slice(middle);
  let Ry = Py.slice(middle);

  // (l1, l2) = closestPair(Lx, Ly)            //Best left pair.
  // (r1, r2) = closestPair(Rx, Ry)            //Best right pair.
  //Recursive calls to the left and right halfs of the two sorted arrays.
  let leftPair = closestPair(Lx, Ly);
  let rightPair = closestPair(Rx, Ry);


  showBlueLines(leftPair, rightPair);

  let leftDist = dist(leftPair.p.x, leftPair.p.y, leftPair.q.x, leftPair.q.y);
  let rightDist = dist(rightPair.p.x, rightPair.p.y, rightPair.q.x, rightPair.q.y);

  rlShortest = Math.min(leftDist, rightDist);

  function closestSplitPair(Px, Py, rlShortest) {
    let middle = Math.floor(Px.length / 2);
    let xL = Px[middle - 1];
    //xL = largest x-coordinate in the left half. (Px.length / 2 - 1);

    //Scan through Py and remove any points outside the range of xL - midpoint - (+) or (-) rlShortest.

    // let filteredRange = Py.filter((point) => {
    //   if (point.x > xL - rlShortest && point.x < xL + rlShortest) return true;
    // });

    let inside = [];

    for (i = Py.length - 1; i >= 0; i--) {
      if (Py[i].x >= xL.x - rlShortest && Py[i].x <= xL.x + rlShortest) {
        inside.push(Py[i]);
      }
    }

    //Implement the loop above with Array.filter.

    //Draw the middle x and the distance of the shortest pair wih the left or right (but not split) sets.

    //drawSplitRange(xL, rlShortest);

    //Checks inside the range.
    function checkInside(Sy, best) {
      if (Sy.length === 0) return null;
      let bestPair = null;

      for (let i = 0; i < Sy.length - 1; i++) {
        for (let j = 1; j < Math.min(7, Sy.length - i); j++) {
          if (dist(Sy[i].x, Sy[i].y, Sy[i + j].x, Sy[i + j].y) < best) {
            //dist(x1, y1, x2, y2);  <--- p5 dist definition.
            best = dist(Sy[i], Sy[i + j]);
            bestPair = {
              p: Sy[i],
              q: Sy[i + j]
            };
          }
        }
      }
      return bestPair;
    }

    let bestSplitPair = checkInside(inside, rlShortest);

    //Draws the green line.
    drawSplitPair(bestSplitPair);

    return bestSplitPair;

  } //End closestSplitPair function.

  let bestSplitPair = closestSplitPair(Px, Py, rlShortest);



  function shortestOfThree(leftPair, rightPair, bestSplitPair) {
    let shortest;
    if (bestSplitPair == null) {
      shortest = shortestOfTwo(leftPair, rightPair);
    } else {
      shortest = shortestLeftRightSplit(leftPair, rightPair, bestSplitPair);
    }
    return shortest;

    function shortestOfTwo() {
      let distLeft = dist(leftPair.p.x, leftPair.p.y, leftPair.q.x, leftPair.q.y);
      let distRight = dist(rightPair.p.x, rightPair.p.y, rightPair.q.x, rightPair.q.y);
      if (distLeft < distRight) {
        return leftPair;
      } else {
        return rightPair;
      }
    }

    function shortestLeftRightSplit(leftPair, rightPair, bestSplitPair) {
      let distLeft = dist(leftPair.p.x, leftPair.p.y, leftPair.q.x, leftPair.q.y);
      let distRight = dist(rightPair.p.x, rightPair.p.y, rightPair.q.x, rightPair.q.y);
      let distSplit = dist(bestSplitPair.p.x, bestSplitPair.p.y, bestSplitPair.q.x, rightPair.q.y);

      let best = distLeft;

      if (distLeft <= distRight && distLeft <= distSplit) {
        return leftPair;
      } else if (distRight <= distLeft && distRight <= distSplit) {
        return rightPair;
      } else if (distSplit <= distRight && distSplit <= distLeft) {
        return bestSplitPair;
      }
    }
  } //End of shortest of Three

  return shortestOfThree(leftPair, rightPair, bestSplitPair);

  //return best of (l1, l2), (r1, r1), (s1, s2);
  //Reuse the baseCase function by restructuring.
} //end closestPair.