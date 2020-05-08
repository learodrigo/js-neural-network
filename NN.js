/**
 * Neural Network class that creates and process the given inputs
 * params:
 * inputs_nodes  (int) Number of inputs nodes for the network
 * hidden_nodes  (int) Number of hidden nodes for the middle layer
 * outputs_nodes (int) Number of outputs the network has
 *
 */

// Other techniques for learning
class ActivationFunction {
  constructor (func, dfunc) {
    this.func = func;
    this.dfunc = dfunc;
  }
}

let sigmoid = new ActivationFunction (
  x => 1 / (1 + Math.exp(-x)),
  y => y * (1 - y)
);

let tanh = new ActivationFunction (
  x => Math.tanh(x),
  y => 1 - (y * y)
);

let tanh = new ActivationFunction (
  x => Math.tanh(x),
  y => 1 - (y * y)
);

class NeuralNetwork {
  /*
  * if first argument is a NeuralNetwork the constructor clones it
  * USAGE: cloned_nn = new NeuralNetwork(to_clone_nn);
  */
  constructor(inputs_nodes, hidden_nodes, outputs_nodes) {
    if (inputs_nodes instanceof NeuralNetwork) {
      let a = inputs_nodes;
      this.input_nodes = a.input_nodes;
      this.hidden_nodes = a.hidden_nodes;
      this.output_nodes = a.output_nodes;

      this.weights_ih = a.weights_ih.copy();
      this.weights_ho = a.weights_ho.copy();

      this.bias_h = a.bias_h.copy();
      this.bias_o = a.bias_o.copy();
    } else {
      this.input_nodes = inputs_nodes;
      this.hidden_nodes = hidden_nodes;
      this.output_nodes = outputs_nodes;

      this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
      this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
      this.weights_ih.randomize();
      this.weights_ho.randomize();

      this.bias_h = new Matrix(this.hidden_nodes, 1);
      this.bias_o = new Matrix(this.output_nodes, 1);
      this.bias_h.randomize();
      this.bias_o.randomize();
    }

    this.setLearningRate();
    this.setActivationFunction();
  }

  setLearningRate (learning_rate = 0.1) {
    this.learning_rate = learning_rate;
  }

  setActivationFunction () {
    this.activation_function = sigmoid;
  }

  // Adding function for neuro-evolution
  copy () {
    return new NeuralNetwork(this);
  }

  // The information moves in only one direction, forward, from the input nodes, through the hidden nodes (if any) and to the output nodes.
  predict (input_array) {
    // Genereting hidden outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);

    // Activation function aka Sigmoid function
    hidden.map(this.activation_function.func);

    // Generating the outputs
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(this.activation_function.func);

    // Returning
    return output.toArray();
  }

  // Accept an arbitrary function for mutation
  mutate (funk) {
    this.weights_ih.map(funk);
    this.weights_ho.map(funk);
    this.bias_h.map(funk);
    this.bias_o.map(funk);
  }

  serialize () {
    return JSON.stringify(this);
  }

  // Train brain function
  // TODO: Make train to allow several layer for calculating the errors
  // for hidden_errors should be a recursive function to reach layer 0
  train (input_array, target_array) {
    // Genereting hidden outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);

    // Activation function aka Sigmoid function
    hidden.map(this.activation_function.func);

    // Generating the outputs
    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(this.activation_function.func);

    // Converting array to Matrix object
    let targets = Matrix.fromArray(target_array);

    // Calculate the error
    let output_errors = Matrix.subtract(targets, outputs);

    // Calculate gradient
    let gradients = Matrix.map(outputs, this.activation_function.dfunc);
    gradients.multiply(output_errors);
    gradients.multiply(this.learning_rate);

    // Calculate deltas
    let hidden_transpose = Matrix.transpose(hidden);
    let weights_ho_deltas = Matrix.multiply(gradients, hidden_transpose);

    // Adjust the weights by deltas
    this.weights_ho.add(weights_ho_deltas);
    // Adjust the bias by its deltas (gradients)
    this.bias_o.add(gradients);

    // Transpose and calculate hidden layer errors
    let weights_ho_transpose = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(weights_ho_transpose, output_errors);

    // Calculate hidden gradients
    let hidden_gradient = Matrix.map(hidden, this.activation_function.dfunc);
    hidden_gradient.multiply(hidden_errors);
    hidden_gradient.multiply(this.learning_rate);

    // Calculate input to hidden deltas
    let inputs_transpose = Matrix.transpose(inputs);
    let weights_ih_deltas = Matrix.multiply(hidden_gradient, inputs_transpose);

    // Adjust the weights by deltas
    this.weights_ih.add(weights_ih_deltas);
    // Adjust the bias by its deltas (gradients)
    this.bias_h.add(hidden_gradient);
  }

  /**
   * Static functions
   */
  static deserialize (data) {
    if (typeof data == 'string') data = JSON.parse(data);
    let nn = new NeuralNetwork(data.input_nodes, data.hidden_nodes, data.output_nodes);
    nn.weights_ih = Matrix.deserialize(data.weights_ih);
    nn.weights_ho = Matrix.deserialize(data.weights_ho);
    nn.bias_h = Matrix.deserialize(data.bias_h);
    nn.bias_o = Matrix.deserialize(data.bias_o);
    nn.learning_rate = data.learning_rate;
    return nn;
  }
}
