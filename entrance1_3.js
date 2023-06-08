/*
Crea una funció que retorni una Promise que invoqui la funció resolve() 
o reject() que rep. Invoca-la passant-li les dues funcions de manera que 
imprimeixin un missatge diferent depenent de si la Promise es resol o no.
*/

function putNameAsParam(...args) {
  return new Promise(function (resolve, reject) {
    if (args.length > 0) {
      resolve(`Hello ${args[0]}! Parameter passed to function`);
    }
    reject(new Error("Parameter not passed to function"));
  });
}

//const promise = putNameAsParam("Maica");
//console.log(promise);

/*
Crea una arrow function que rebi un paràmetre i una funció callback 
i li passi a la funció un missatge o un altre (que s'imprimirà per consola) 
en funció del paràmetre rebut.
*/

function printMessage(message) {
  console.log(message);
}

const wrapingCallback = (callback, ...args) => {
  if (args.length > 0) {
    callback("Custom parameter passed to function.");
  } else {
    callback("Custom parameter not passed to function.");
  }
};

//wrapingCallback(printMessage, "Maica");

/*
Donats els objectes employees i salaries, crea una arrow function 
getEmployee() que retorni una Promise efectuant la cerca en l'objecte pel 
seu id.
*/

const { employees } = require("./dataFor1_3");

function getEmployee(id, employeesList) {
  return new Promise(function (resolved, rejected) {
    try {
      employeesList.forEach((employee) => {
        if (employee.id === undefined || isNaN(id)) {
          rejected(new Error("I can not process this data"));
        }
        if (employee.id === id) {
          resolved(employee);
        }
      });

      rejected(new Error("No such employee"));
    } catch (err) {
      rejected(new Error("I can not process this data"));
    }
  });
}

//getEmployee(1, employees)
// .then((employee) => console.log(employee))
// .catch((err) => console.log(err.message));

/*
Crea una altra arrow function getSalary() similar a l'anterior que rebi com 
a paràmetre un objecte employee i retorni el seu salari.
*/

const { salaries } = require("./dataFor1_3");

function getSalary(employee, salaryList) {
  return new Promise(function (resolved, rejected) {
    try {
      salaryList.forEach((salary) => {
        if (salary.id === undefined || employee.id === undefined) {
          rejected(new Error("I can not process this data"));
        }
        if (salary.id === employee.id) {
          resolved(salary.salary);
        }
      });

      rejected(new Error("Salary not asignated"));
    } catch (err) {
      rejected(new Error("I can not process this data"));
    }
  });
}

//getSalary({ id: 1, name: "Linux Torvalds" }, salaries)
//.then((employee) => console.log(employee))
//.catch((err) => console.log(err.message));

/*
Invoca la primera funció getEmployee() i després getSalary() niant 
l'execució de les dues promises de manera que es retorni per la consola 
el nom de l'empleat/da i el seu salari.
*/

getEmployee(2, employees).then((employee) => {
  getSalary(employee, salaries).then((salary) => {
    console.log("Name: ", employee.name);
    console.log("Salary: ", salary);
  });
});

/*
Fixa un element catch a la invocació del nivell anterior que capturi qualsevol 
error i el mostri per la consola.
*/

getEmployee(3)
  .then((employee) => {
    getSalary(employee).then((salary) => {
      console.log("Name: ", employee.name);
      console.log("Salary: ", salary);
    });
  })
  .catch((err) => console.log(err.message));
