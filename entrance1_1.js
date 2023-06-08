const prompt = require("prompt");

/*
Crea una funció que mostri per consola el nom d'usuari/ària en invocar-la 
passant-li el nom com a paràmetre.
*/

function getDataFromUser() {
  const schema = {
    properties: {
      name: {
        pattern: /[a-zA-z\-]+$/,
        message: "Input can not contain numbers ",
        require: true,
      },
    },
  };
  prompt.start();
  prompt.get(schema, (err, result) => console.log(result.name));
}
//getDataFromUser()

/*
Mostra per consola el nom i cognoms de l'usuari/ària mitjançant 
template literals, guardant-los en variables i referenciant-les 
en la impressió del missatge.
*/

function printDetailsResult(err, result) {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log(`Your name is: ${result.name}`);
  }
}

function getDataFromUserAdvanced() {
  const schema = {
    properties: {
      name: {
        pattern: /[a-zA-z\-]+$/,
        message: "Input can not contain numbers ",
        require: true,
      },
    },
  };
  prompt.start();
  prompt.get(schema, printDetailsResult);
}

//getDataFromUserAdvanced()

//Invoca una funció que retorni un valor des de dins d'una template literal.

function printString() {
  return "first day";
}

const result = () => console.log(`This is my: ${printString()}`);

//result()

/*
Crea una matriu de deu funcions i emplena-la mitjançant un 
bucle de manera que cada funció compti del 0 al 9 per la consola. 
Invoca cada funció de l'array iterativament. Haurà de mostrar-se per consola 
el compte del 0 al 9 deu vegades.
*/

function functionCreator() {
  const functions = [];

  for (let i = 0; i < 10; i++) {
    functions.push(() => {
      for (let i = 0; i < 10; i++) {
        console.log(i);
      }
    });
  }
  return functions;
}

function functionsInvoker() {
  const functions = functionCreator();
  for (let i = 0; i < functions.length; i++) {
    console.log(`Invoking function ${i + 1}:`);
    functions[i]();
  }
}

//functionsInvoker()

/*
Crea una funció anònima autoinvocable igualada a una variable que mostri per consola el nom de l'usuari/ària a rebut com a paràmetre.
*/

const dataFromUser = (() => {
  const schema = {
    properties: {
      name: {
        pattern: /[a-zA-z\-]+$/,
        message: "Input can not contain numbers ",
        require: true,
      },
    },
  };
  prompt.start();
  prompt.get(schema).then((result) => {
    console.log(`Your name is ${result.name}`);
  });
})();
