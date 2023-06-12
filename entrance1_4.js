/*
Crea una funció asíncrona que rebi un id d'empleat/da i imprimeixi 
per pantalla el nom de l'empleat/da i el seu salari, usant les funcions 
getEmployee() i getSalary() que has definit a la tasca anterior.
*/

const { getEmployee, getSalary } = require("./entrance1_3");
const { employees, salaries } = require("./dataFor1_3");

async function getEmployeeSalary(employeeId, employeeList, salaryList) {
  try {
    const employee = await getEmployee(employeeId, employeeList);
    const salary = await getSalary(employee, salaryList);
    console.log(`Employee: ${employee.name}\nSalary: ${salary}`);
  } catch (err) {
    console.log(err.message);
  }
}

/*
Crea una nova funció asíncrona que cridi a una altra que retorni una 
Promise que efectuï la seva funció resolve() després de 2 segons de la 
seva invocació.
*/

const promise = () => {
  return new Promise((res) => {
    setTimeout(() => res("Resolved after 2 sec."), 2000);
  });
};

async function customAsyncFunction() {
  const response = await promise();
  return response;
}

/*
Crea una funció que retorni el doble del número que li passa com a paràmetre 
després de 2 segons.
Crea una altra funció que rebi tres números i calculi la suma dels seus 
dobles fent servir la funció anterior.
*/

const doblador = (number) => {
  if (isNaN(number)) {
    throw new Error("Argumment must be a number!");
  }
  return new Promise((res) => {
    setTimeout(() => {
      res(number * 2);
    }, 2000);
  });
};

async function sumarDoblados(number1, number2, number3) {
  try {
    const doble1 = await doblador(number1);
    const doble2 = await doblador(number2);
    const doble3 = await doblador(number3);
    return doble1 + doble2 + doble3;
  } catch (err) {
    console.log(err.message);
  }
}

const sumarDoblados2 = async (number1, number2, number3) => {
  try {
    const doblesList = [number1, number2, number3].map(doblador);
    const nums = await Promise.all(doblesList);
    let result = nums.reduce((total, number_1) => {
      return total + number_1;
    });
    return result;
  } catch (err) {
    console.log(err.message);
  }
};

/*
Força i captura tants errors com puguis dels nivells 1 i 2.
*/

const { test_employees, test_salaries } = require("./dataTestFor1_4");

console.log("__________n1e1_______________________");
setTimeout(() => {
  console.log("1. First parameters test: ");
  console.log(getEmployeeSalary("1", test_employees, test_salaries, 10));
}, 1000);
setTimeout(() => {
  console.log("\n2. Second parameters test: ");
  console.log(getEmployeeSalary(1, 2, test_salaries, 10));
}, 2000);
setTimeout(() => {
  console.log("\n3. Third parameters test: ");
  console.log(getEmployeeSalary(1, test_employees, "1", 10));
}, 4000);
setTimeout(() => {
  console.log("\n4. No salary test: ");
  console.log(getEmployeeSalary(2, test_employees, test_salaries, 10));
}, 5000);
setTimeout(() => {
  console.log("\n5. No employee test: ");
  console.log(getEmployeeSalary(3, test_employees, test_salaries, 10));
}, 6000);

setTimeout(() => {
  console.log("__________n1e2_______________________");
  console.log("\n1. Promise time test: ");
  console.log(customAsyncFunction(1000));
}, 7000);

setTimeout(() => {
  console.log("__________n2e1_______________________");
  console.log("\n1. Parameter test for SumarDoblados: ");
  console.log(sumarDoblados("ss", 2, 2));
}, 9000);

setTimeout(() => {
  console.log("\n1. Parameter test for SumarDoblados2: ");
  console.log(sumarDoblados2("ss", 2, 2));
}, 15000);
