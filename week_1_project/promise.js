let strings = ["E","F","G","H"];
var er =true;

let promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve(`the rand anser is ${Math.floor(Math.random() * 10)}`),
        reject(new Error("not valid")), 3000
    })
});
promise.then(
    resolve => alert(resolve),
    reject => alert(reject)
);


let promise2 = new Promise(function (resolve, reject) {
    let lowerStrings = toLower(strings);
    if (lowerStrings!=false) {
        resolve(lowerStrings);
    } else {
        reject("invalid array");
    }
})
promise2.then(
    function (resolve) {
        resolve = resolve.sort();
        alert((resolve.toString()))
    }
    ,
    function (reject) {
        alert(reject)
    }
)

function toLower(array) {
    array.forEach((ele, i) => {
        if (typeof (ele) == typeof ("")) {
            array[i] = array[i].toLowerCase();
        }
        else {
           er = false;
        }
    });
     if (er)
        return array;
     else
       return er;
}