// Small lib to "just a kind of understanding how matrices work"

class Matrix {
  constructor (rows, cols) {
    this.rows = rows;
    this.cols = cols;
    // Initializing matrix data with zeros
    this.data = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
  }

  // Adds either a number or a matrix
  add (n) {
    if (n instanceof Matrix) {
      // Handling error
      if (this.rows !== n.rows || this.cols !== n.cols) {
        console.error('add - Rows or cols from A are not equal to B');
        return;
      }
      // Matrix plus matrix
      return this.map((e, i, j) => e + n.data[i][j]);
    // Else - Normal sum
    } else {
      return this.map(e => e + n);
    }
  }

  // Returns a copy of the given matrix
  copy () {
    let m = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        m.data[i][j] = this.data[i][j];
      }
    }
    return m;
  }

  // Applies a given function to every data element
  map (funk) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let value = this.data[i][j];
        this.data[i][j] = funk(value, i, j);
      }
    }
    return this;
  }

  // Applies scaler product
  multiply (n) {
    // Handling error
    if (n instanceof Matrix) {
      // Handling error
      if (this.rows !== n.rows || this.cols !== n.cols) {
        console.error('Rows and cols from A are not equal to B');
        return;
      }
      // hadamard product
      return this.map((e, i, j) => e * n.data[i][j]);
    // Scalar product
    } else {
      return this.map(e => e * n);
    }
  }

  // Print table matrix
  print () {
    console.table(this.data);
    return this;
  }

  // Creates random int between 0 - 10
  randomize () {
    return this.map(e => Math.random() * 2 - 1);
  }

  serialize () {
    return JSON.stringify(this);
  }

  // Convert matrix into array
  toArray () {
    let arr = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  }

  /**
   * Static functions
   */

  static deserialize(data) {
    if (typeof data == 'string') data = JSON.parse(data);
    let matrix = new Matrix(data.rows, data.cols);
    matrix.data = data.data;
    return matrix;
  }

  // Convert an array into a Matrix object
  static fromArray (arr) {
    return new Matrix(arr.length, 1).map((e, i) => arr[i]);
  }

  // Applies a given function to every data element
  static map (matrix, funk) {
    return new Matrix(matrix.rows, matrix.cols)
      .map((e, i, j) => funk(matrix.data[i][j], i, j));
  }

  // Returns a product matrix from two matrices multiplication
  static multiply (a, b) {
    if (a instanceof Matrix && b instanceof Matrix) {
      // Hadamard product
      if (a.cols !== b.rows) {
        // Matrices haven't same format
        console.error('static multiply - Columns of A must match rows of B');
        return;
      }

      // Temporal variable
      return new Matrix(a.rows, b.cols)
        .map((e, i, j) => {
          // Dot product of values in col
          let sum = 0;
          for (let k = 0; k < a.cols; k++) {
            sum += a.data[i][k] * b.data[k][j];
          }
          return sum;
        });

    // Given params aren't Matrix object
    } else {
      console.error('Looks like the inputs you are trying to multuply are not matrices. Check them out');
      return;
    }
  }

  // Subtracts given Matrices objects a - b
  static subtract (a, b) {
    // Handling format error
    if (a instanceof Matrix && b instanceof Matrix) {
      // Checking given matrices format
      if (a.rows !== b.rows || a.cols !== b.cols) {
        // Matrices haven't same format
        console.error('static subtract - Columns of A must match rows of B');
        return;
      }
      // Temporal variable
      return new Matrix(a.rows, a.cols)
        .map((_, i, j) => a.data[i][j] - b.data[i][j]);
    // Given params aren't Matrix object
    } else {
      console.error('Looks like the parameters you are trying to subtract are not matrices');
      return;
    }
  }

  // Returns new matrix with transposed data
  static transpose (matrix) {
    return new Matrix(matrix.cols, matrix.rows)
      .map((_, i, j) => matrix.data[j][i]);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Matrix;
}
