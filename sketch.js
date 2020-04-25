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
  testing();
}

function testing () {
  let nn = new NeuralNetwork(2, 2, 1);

  for (let i = 0; i < 50000; i++) {
    let data = random(training_data);
    nn.train(data.inputs, data.target);
  }

  console.log(nn.predict([0, 0]));
  console.log(nn.predict([0, 1]));
  console.log(nn.predict([1, 0]));
  console.log(nn.predict([1, 1]));
}
