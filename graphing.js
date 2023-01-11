function showBlueLines(leftPair, rightPair) {

  strokeWeight(2);
  stroke("blue");
  line(
    leftPair.p.x * scl,
    leftPair.p.y * scl,
    leftPair.q.x * scl,
    leftPair.q.y * scl
  );
  line(
    rightPair.p.x * scl,
    rightPair.p.y * scl,
    rightPair.q.x * scl,
    rightPair.q.y * scl
  );
}

function drawSplitRange(xL, rlShortest) {
  strokeWeight(1);
  stroke(160);
  line(xL.x * scl, -11 * scl, xL.x * scl, 11 * scl);
  strokeWeight(0);
  stroke(200);
  line(
    xL.x * scl - rlShortest * scl,
    -11 * scl,
    xL.x * scl - rlShortest * scl,
    11 * scl
  );
  line(
    xL.x * scl + rlShortest * scl,
    -11 * scl,
    xL.x * scl + rlShortest * scl,
    11 * scl
  );
}

function drawSplitPair(bestSplitPair, c) {

  c = c || "green";

  if (bestSplitPair != null) {
    strokeWeight(2);
    stroke(c);
    line(
      bestSplitPair.p.x * scl,
      bestSplitPair.p.y * scl,
      bestSplitPair.q.x * scl,
      bestSplitPair.q.y * scl
    );
  }
}