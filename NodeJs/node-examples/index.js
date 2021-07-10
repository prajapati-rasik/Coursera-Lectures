var rect = require("./rectangle");

function solveRect(a, b) {
  console.log(
    "solving for rectangle with length l = " + a + " and width b = " + b
  );
  rect(a, b, (err, rectangle) => {
    if (err) {
      console.log("ERROR: ", err.message);
    } else {
      console.log(
        "The area of rectangle of dimention length l = " +
          a +
          " and width b = " +
          b +
          rectangle.area()
      );
      console.log(
        "The peirmeter of rectangle of dimention length l = " +
          a +
          " and width b = " +
          b +
          rectangle.perimeter()
      );
    }
  });
  console.log("This statement is after the call to rect()");
}

solveRect(2, 5);
solveRect(-2, 0);
solveRect(0, 5);
solveRect(2, 3);
