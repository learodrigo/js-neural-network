// References followed can be found in references.txt

function setup () {
  createCanvas(200, 200);
  let nn = new NeuralNetwork(2, 2, 1);
  let input = [1, 0];
  let output = nn.feedForward(input);
  console.log(output);
}

function draw () {
  background(51);
}
