/*
Mostra per la consola el resultat d'una arrow function 
autoinvocable que sumi dos nombres.
*/

const suma = (
    (number1, number2) => console.log(number1 + number2)
)(3,5)



/*
Crea una arrow function que, rebent un paràmetre, retorni un objecte 
amb un atribut que tingui com a valor el paràmetre rebut.
*/

const createObject = (param1) => {
    return { param1 };
  };
  
//console.log(createObject("Perro"));


/*
Crea una classe "Persona" que rebi un paràmetre 'nom' en ser instanciada. 
La classe inclourà un mètode dirNom que imprimeixi per consola el paràmetre 
'nom'. Invoca el mètode dirNom des de fora de la classe.
*/

class Person {
    constructor(name) {
      this.name = name;
    }
  
    dirNom() {
      console.log(this.name);
      return this.name
    }
  }
  
  new Person("Maica").dirNom();
 
  
  /*
Escriu una function creadora d'objectes que faci instàncies 
d'una classe abstracta. Invoca-la amb diferents definicions.
*/

class Mammals {
    constructor() {
      if (this.constructor === Mammals) {
        throw new Error("Abstract class cannot be initialized");
      }
    }
  
  }
  
  
  function createObjeto(mammalType){
    let instance;
    switch(mammalType){
      case 'dog': instance = Object.create(Mammals.prototype);
      break;
      case 'cat': instance = Object.create(Mammals.prototype);
      break;
    }
    return instance
    
  }
  
  //console.log(createObjeto('dog'))
  
  
  
  
