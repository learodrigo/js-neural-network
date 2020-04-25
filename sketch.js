// Xor training data values
let training_data = [
  {
    inputs: [0, 0],
    target: [0]
  },
  {
    inputs: [0, 1],
    target: [1]
  },
  {
    inputs: [1, 0],
    target: [1]
  },
  {
    inputs: [1, 1],
    target: [0]
  }
];

function setup () {
  createCanvas(200, 200);
  let nn = new NeuralNetwork(2, 2, 1);

  for (let i = 0; i < 100; i++) {
    let data = random(training_data);
    nn.train(data.inputs, data.target);
  }

  console.log(nn.feedForward([0, 0]));
  console.log(nn.feedForward([0, 1]));
  console.log(nn.feedForward([1, 0]));
  console.log(nn.feedForward([1, 1]));
}

function draw () {
  background(51);
}
