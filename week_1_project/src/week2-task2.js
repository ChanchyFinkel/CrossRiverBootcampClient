
window.onpageshow = onPageLoad();

function onPageLoad() {
    var bootcamps = ["crossRiver", "Microsoft", "waze", "google", "appliedMaterial"]
    var makeAllbtn = document.getElementById("makeAll");
    makeAllbtn.addEventListener("click", function ()
     { makeAllCaps(bootcamps) });
}

function makeAllCaps(array) {
    return new Promise(function (resolve, reject) {
        array.forEach(word => {
            if (typeof (word) !== 'string')
                reject(new Error('Invalid array'));
        });
        let newArray = array.map(word =>
            word.toUpperCase());
        resolve(newArray);
    }).then(function sortWords(result) {
        return new Promise((resolve, reject) => {
            resolve(result.sort());
        });
    }).then(res => alert(res))
        .catch(error => alert(error.message));
}
