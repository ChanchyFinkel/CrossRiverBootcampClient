let array = ["E", "F", "G", "H"];

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
    array.forEach((ele, i) => {
        if (typeof (ele) != typeof ("")) {
            reject(new Error("Invalid element"));
        }
    });
    array.forEach((ele, i) => {
        array[i] = array[i].toLowerCase();
    });
    resolve(array)
})
promise2.then(
    resolve => {
        resolve=resolve.sort();
        alert(resolve)},
    reject => alert(reject)
);
