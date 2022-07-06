// window.onPageLoad = randoNumber();
let promise = new Promise(function(resolve, reject) {
    setTimeout(() => {resolve(`the rand anser is ${Math.floor(Math.random() *10)}`),
    reject(new Error("not valid")),3000})
  });
  
  promise.then(
    resolve => alert(resolve), 
    reject => alert(reject) 
  );