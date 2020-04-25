// Small lib to "just a kind of understanding how matrices work"

class Matrix {
  constructor (rows = 2, cols = 2) {
    this.rows = rows;
    this.cols = cols;
    // Initializing matrix data with zeros
    this.data = new Array(this.rows).fill(0).map(() => new Array(this.cols).fill(0));
  }

  // Adds either a number or a matrix
  add (n) {
    if (n instanceof Matrix) {
      // Matrix plus matrix
      if (this.rows === n.rows || this.cols === n.cols) {
        return this.map((e, i, j) => e + n.data[i][j]);
      }
      // Handling error
      console.error('add - Rows or cols are not equal');
      return undefined;
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
      if (this.rows === n.rows || this.cols === n.cols) {
        // hadamard product
        return this.map((e, i, j) => e * n.data[i][j]);
      }
      // Handling error
      console.error('multiply - Ups, try to use static multiply function instead');
      return undefined;
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
      if (a.cols === b.rows) {
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
      }
      // Matrices haven't same format
      console.error('static multiply - Columns of A must match rows of B');
      return undefined;
    // Given params aren't Matrix object
    } else {
      console.error('static multiply - Looks like the inputs are not matrices. Check them out or use the matrix method multiply');
      return undefined;
    }
  }

  // Subtracts given Matrices objects a - b
  static subtract (a, b) {
    // Handling format error
    if (a instanceof Matrix && b instanceof Matrix) {
      // Checking given matrices format
      if (a.rows === b.rows || a.cols === b.cols) {
        // Temporal variable
        return new Matrix(a.rows, a.cols)
          .map((_, i, j) => a.data[i][j] - b.data[i][j]);
      }
      // Matrices haven't same format
      console.error('static subtract - Columns of A must match rows of B');
      return undefined;
    // Given params aren't Matrix object
    } else {
      console.error('static subtract - Looks like they aren\'t a matrix');
      return undefined;
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
