import commandGenerator from './services/command-generator-service';

function Start() {
  let a = 123;

  commandGenerator.generateCommand('test')
  .then((value) => {
    console.log(value);
  });
}

Start();
