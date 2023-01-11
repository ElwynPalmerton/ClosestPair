let points = [];
let scl = 30;

let qty = 50;



function setup() {

  function createPoints() {
    createCanvas(21 * scl, 21 * scl);
    for (i = 0; i < qty; i++) {
      let x = random(-10, 10);
      let y = random(-10, 10);
      let newPoint = createVector(x, y);
      points.push(newPoint);
    }
  }


  function showPoints() {

    //Setup
    function makeGrid() {
      background(220);
      translate(width / 2, height / 2);

      //Center 
      fill(80);
      ellipse(0, 0, 4, 4);

      for (x = -10 * scl; x < 10 * scl; x++) {
        rect(x * scl, -1, 1, 2);
      }

      for (y = -10 * scl; y < 100 * scl; y++) {
        rect(-1, y * scl, 2, 1);
      }
    }

    makeGrid();

    function drawPoints() {
      fill('red');
      noStroke();
      for (i = 0; i < points.length; i++) {
        ellipse(points[i].x * scl, points[i].y * scl, 5, 5);
      };
    }
    drawPoints();
  } //End showPoints
  createPoints();
  showPoints();



  let xSortedVecs = mergeSort(points, 'x');
  let ySortedVecs = mergeSort(points, 'y');
  //let pq = closestPair(xSortedVecs, ySortedVecs);
  let result = closestPair(xSortedVecs, ySortedVecs);
  console.log("Final result", result);

  drawSplitPair(result, "magenta");

  strokeWeight(2);
  stroke('blue');
  //line(pq.p.x * scl, pq.p.y * scl, pq.q.x * scl, pq.q.y * scl);

}