// Asynchronous
// Javascript
// And
// XML

// 1- Callback functions
// 2- Asynchronous coding (Promises)
// 3- JSON + JSON.parse(), JSON.stringify()
// 4- XHR GET
// 5- XHR POST (04/07)
// 6- Jquery $ajax() (04/07)
// 7- Fetch API (04/07)

// Une fonction de rappel (callback function) est tout simplement une fonction qui en appelle une autre...

const callbackFunction = () => {
  console.log('Je suis une fonction de rappel !');
};

const mainFunction = (otherFunction) => {
  return otherFunction();
};

mainFunction(callbackFunction);

// Un petit exemple de closure...
const firstFunction = (num1, num2) => {
  return function (num3, num4) {
    return function (num5, num6) {
      return num1 + num2 + num3 + num4 + num5 + num6;
    };
  };
};

const result1 = firstFunction(1, 2);
const result2 = firstFunction(1, 2)(3, 4);
const result3 = firstFunction(1, 2)(3, 4)(5, 6);
console.log('result1: ', result1);
console.log('result2: ', result2);
console.log('result3: ', result3);

const myButton = document.getElementById('click-me');

const myCustomListener = (event) => {
  event.preventDefault();
  console.log('event: ', event);
};

myButton.addEventListener('click', myCustomListener);
function countToNumber() { for (let i = 0; i < 150000; i++) { console.log(i) } };
// Premier exemple de code asynchrone sans utiliser de promesse, en utilisant la fonction setTimeout()...
const pseudoAsyncFunction = () => {
  setTimeout(() => {
    alert('Code "asynchrone" exécuté');
  }, 1000);

  console.log('Premier log en dehors de la fonction setTimeout');
  countToNumber();
  console.log('Deuxième log en dehors de la fonction setTimeout');
  console.log('Troisième log en dehors de la fonction setTimeout');
};

// pseudoAsyncFunction();

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('Promesse résolue');
    reject('Promesse rejetée');
  }, 3000);
});

console.log('myPromise: ', myPromise);

myPromise
  .then((data) => {
    console.log('data: ', data);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log('Tout est terminé !');
  })

// Petit rappel sur la valeur de this dans le contexte d'une fonction flèche et celui d'une fonction standard...
const myObject = {
  blabla: 'Toto',
  sayHello() {
    console.log('sayHello: ', this.blabla);
  },
  sayHi: () => {
    console.log('sayHi: ', this.blabla);
  }
}

// Petit point sur la destructuration d'assignation...
var obj = {
  myName: 'Toto',
  sayName() {
    console.log('my name is ', this.myName);
    return true;
  }
};

var objName = obj.myName;
var { myName } = obj;
var objReference = obj;
var objCopy = { ...obj };

obj.myName = 'Titi';

obj.sayName();
objReference.sayName();
objCopy.sayName();
console.log('objName = ', objName, 'myName = ', myName);


myObject.sayHello();
myObject.sayHi();


const firstArray = ['Hello', 'world', '!'];
console.log('firstArray: ', firstArray);
console.log('...firstArray', ...firstArray);

const secondArray = ['coucou', 'tout', 'le', 'monde'];
const thirdArray = ['coucou', ...firstArray];
console.log('thirdArray with rest operator: ', thirdArray);

const fourthArray = [...firstArray, ...secondArray];
console.log('fourthArray: ', fourthArray);


const standardAsyncFunction = (randomNumber) => {
  console.log('randomNumber value: ', randomNumber);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (randomNumber % 2 === 0) resolve('Promesse résolue');
      return reject('Promesse échouée');
    }, 1000);
  })
};

standardAsyncFunction(Math.round(Math.random() * 10))
  .then((resolvedValue) => console.log(resolvedValue))
  .catch((rejectedValue) => console.log(rejectedValue))
  .finally(() => console.log('Promise fulfilled'));


const modernAsyncFunction = async (randomNumber) => {
  console.log('randomNumber value: ', randomNumber);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (randomNumber % 2 === 0) resolve('Promesse résolue');
      return reject('Promesse échouée');
    }, 1000);
  })
};

// Syntaxe avec un top-level await (uniquement avec nodejs 18+)
/* try {
  await modernAsyncFunction();
} catch (error) {
  console.error(error);
} */

const getResult = async (randomNumber) => {
  let result = 'Résultat non modifié';

  try {
    result = await modernAsyncFunction(randomNumber);
    console.log('result inside try block: ', result);
  } catch (error) {
    console.log('promesse échouée : ', error);
  } finally {
    console.log('Promesse terminée.');
  }

  console.log('result before final return: ', result);
  return result;
};

getResult(Math.round(Math.random() * 10));


const tryCatchFunction = (randomNumber) => {
  try {
    if (randomNumber % 2 === 0) {
      return true;
    }
    throw new Error('Nombre impair, pas possible !');
  } catch (error) {
    console.error(error);
  }
}

try {
  throw new Error('Quelque chose a planté');
} catch (choucrouteGarnie) {
  console.log('Erreur attrapée: ', choucrouteGarnie);
}

// Petit point sur le format données JSON... Javascript Object Notation
const myJsonDoc = {
  "firstname": "David",
  "lastname": "Martins",
  "isAdmin": false,
  "address": {
    "zipCode": 75005,
    "city": "Paris",
    "street": "Rue de la richesse",
    "number": 42
  },
  "booksRead": [
    {
      "title": "The Lord of the Rings: The Fellowship of the Ring",
      "author": "JR. Tolkien"
    },
    {
      "title": "Harry Potter",
      "author": "JK Rowling"
    },
    {
      "title": "Bouquin numéro 3",
      "author": "Someone"
    }
  ]
};

console.log(myJsonDoc['firstname']);
console.log(myJsonDoc.firstname);

console.log('myJsonDoc: ', myJsonDoc);

const myStringifiedJsonDoc = JSON.stringify(myJsonDoc);
console.log('myStringifiedJsonDoc: ', myStringifiedJsonDoc);

const myParsedStringifiedJsonDoc = JSON.parse(myStringifiedJsonDoc);
console.log('myParsedStringifiedJsonDoc: ', myParsedStringifiedJsonDoc);


// XHR
// see xhr.js file
