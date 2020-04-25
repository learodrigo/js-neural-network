/**
 * Neural Network class that creates and process the given inputs
 * params:
 * inputs_nodes  (int) Number of inputs nodes for the network
 * hidden_nodes  (int) Number of hidden nodes for the middle layer
 * outputs_nodes (int) Number of outputs the network has
 *
 */

class NeuralNetwork {
  constructor (inputs_nodes, hidden_nodes, outputs_nodes) {
    this.inputs_nodes = inputs_nodes;
    this.hidden_nodes = hidden_nodes;
    this.outputs_nodes = outputs_nodes;

    this.weights_ih = new Matrix(this.hidden_nodes, this.inputs_nodes);
    this.weights_ho = new Matrix(this.outputs_nodes, this.hidden_nodes);
    this.weights_ih.randomize();
    this.weights_ho.randomize();

    this.bias_h = new Matrix(this.hidden_nodes, 1);
    this.bias_o = new Matrix(this.outputs_nodes, 1);
    this.bias_h.randomize();
    this.bias_o.randomize();

    this.learning_rate = 0.1;
  }

  // The information moves in only one direction, forward, from the input nodes, through the hidden nodes (if any) and to the output nodes.
  feedForward (input_array) {
    // Genereting hidden outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);

    // Activation function aka Sigmoid function
    hidden.map(this.sigmoidFunction);

    // Generating the outputs
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(this.sigmoidFunction);

    // Returning
    return output.toArray();
  }

  // Check reference about Sigmoid function
  sigmoidFunction (x) {
    return 1 / (1 + Math.exp(-x));
  }

  // Derivative of Sigmoid
  dsigmoid (x) {
    return x - (1 - x)
  }

  // Train brain function
  // TODO: Make train to allow several layer for calculating the errors
  // for hidden_errors should be a recursive function to reach layer 0
  train (input_array, target_array) {
    // Duplicate
    // Genereting hidden outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);

    // Activation function aka Sigmoid function
    hidden.map(this.sigmoidFunction);

    // Generating the outputs
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(this.sigmoidFunction);

    // Converting array to Matrix object
    let targets = Matrix.fromArray(target_array);

    // Calculate the error
    let output_errors = Matrix.subtract(targets, output);

    // Calculate gradient
    let gradients = Matrix.map(output, this.dsigmoid);
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
    let hidden_gradient = Matrix.map(hidden, this.dsigmoid);
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
}
