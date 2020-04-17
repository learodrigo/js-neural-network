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
    this.bias_h.randomize()
    this.bias_o.randomize()
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

  sigmoidFunction (x) {
    return 1 / (1 + Math.exp(-x));
  }

  train (inputs, answer) {

  }
}
