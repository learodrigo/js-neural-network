// Small lib to "just a kind of understanding how matrices work"

class Matrix {
  constructor (rows = 2, cols = 2) {
    this.rows = rows;
    this.cols = cols;
    // Initializing matrix data with zeros
    this.data = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
  }

  // Adds either a number or a matrix
  add (n) {
    if (n instanceof Matrix) {
      // Matrix plus matrix
      if (this.rows === n.rows || this.cols === n.cols) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++) {
            this.data[i][j] += n.data[i][j];
          }
        }
      // Handling error
      } else {
        console.log('Rows or cols are not equal');
        return undefined;
      }
    // Else - Normal sum
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] += n;
        }
      }
    }
  }

  // Applies a given function to every data element
  map (funk) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let value = this.data[i][j];
        this.data[i][j] = funk(value);
      }
    }
  }

  // Applies scaler product
  multiply (n) {
    // Handling error
    if (n instanceof Matrix) {
      console.log('Ups, try to use static multiply function instead');
      return undefined;

    // Summing
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= n;
        }
      }
    }
  }

  print () {
    console.table(this.data);
  }

  // Creates random int between 0 - 10
  randomize () {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = Math.floor(Math.random() * 10);
      }
    }
  }

  toArray () {
    let arr = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  }

  // Returns new matrix with transposed data
  transpose () {
    let result = new Matrix(this.cols, this.rows);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        result.data[j][i] = this.data[i][j];
      }
    }
    return result;
  }

  /**
   * Static functions
   */

  // Returns a product matrix from two matrices multiplication
  static multiply (a, b) {
    if (a instanceof Matrix && b instanceof Matrix) {
      // Matrix product or dot product
      let result = new Matrix(a.rows, b.cols);
      if (a.rows === b.cols || a.cols === b.rows) {
        for (let i = 0; i < result.rows; i++) {
          for (let j = 0; j < result.cols; j++) {
            // Dot prod of values in col
            let sum = 0;
            for (let k = 0; k < a.cols; k++) {
              sum += a.data[i][k] * b.data[k][j];
            }
            result.data[i][j] = sum;
          }
        }
        return result;
      // Handling error
      } else {
        console.log('Columns of A should be equal as rows of B and A rows to B columns');
        return undefined;
      }
    } else {
      console.log('Looks like the inputs are not matrices. Check them out or use the matrix method multiply');
      return undefined;
    }
  }

  // Convert an array into a Matrix object
  static fromArray (arr) {
    let m = new Matrix(arr.length, 1);
    for (let i = 0; i < arr.length; i++) {
      m.data[i][0] = arr[i]
    }
    return m;
  }
}
