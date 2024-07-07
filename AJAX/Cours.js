// fonction CallBack()

const callbackFunction = () => {
    console.log('Je suis une fonction de rappel !');
  };
  
  const mainFunction = (otherFunction) => {
    return otherFunction();
  };
  
  mainFunction(callbackFunction);
  

