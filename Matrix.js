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
        console.log('add - Rows or cols are not equal');
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
      console.log('multiply - Ups, try to use static multiply function instead');
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

  /**
   * Static functions
   */

  // Convert an array into a Matrix object
  static fromArray (arr) {
    let m = new Matrix(arr.length, 1);
    for (let i = 0; i < arr.length; i++) {
      m.data[i][0] = arr[i]
    }
    return m;
  }

  // Applies a given function to every data element
  static map (matrix, funk) {
    let result = new Matrix(matrix.rows, matrix.cols);
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        let value = matrix.data[i][j];
        result.data[i][j] = funk(value);
      }
    }
    return result;
  }

  // Returns a product matrix from two matrices multiplication
  static multiply (a, b) {
    if (a instanceof Matrix && b instanceof Matrix) {
      // Hadamard product
      if (a.rows === b.cols || a.cols === b.rows) {
        // Temporal variable
        let result = new Matrix(a.rows, b.cols);
        for (let i = 0; i < result.rows; i++) {
          for (let j = 0; j < result.cols; j++) {
            // Dot product of values in col
            let sum = 0;
            for (let k = 0; k < a.cols; k++) {
              sum += a.data[i][k] * b.data[k][j];
            }
            result.data[i][j] = sum;
          }
        }
        return result;
      // Matrices haven't same format
      } else {
        console.log('static multiply - Columns of A should be equal as rows of B and A rows to B columns');
        return undefined;
      }
    // Given params aren't Matrix object
    } else {
      console.log('static multiply - Looks like the inputs are not matrices. Check them out or use the matrix method multiply');
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
        let result = new Matrix(a.rows, a.cols);
        for (let i = 0; i < result.rows; i++) {
          for (let j = 0; j < result.cols; j++) {
            result.data[i][j] = a.data[i][j] - b.data[i][j];
          }
        }
        return result;

      // Matrices haven't same format
      } else {
        console.log('static subtract - Columns of A should be equal as rows of B and A rows to B columns');
        return undefined;
      }
    // Given params aren't Matrix object
    } else {
      console.log('static subtract - Looks like the inputs are not matrices. Check them out or use the matrix method multiply');
      return undefined;
    }
  }

  // Returns new matrix with transposed data
  static transpose (matrix) {
    let result = new Matrix(this.cols, this.rows);
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        result.data[j][i] = matrix.data[i][j];
      }
    }
    return result;
  }
}
