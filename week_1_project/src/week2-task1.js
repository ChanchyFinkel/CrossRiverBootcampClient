
window.onpageshow = onPageLoad();

function onPageLoad() { 
    var randomBtn = document.getElementById("random");
    randomBtn.addEventListener("click", random);
}
function random() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(Math.floor(Math.random() * 10) + 1); }, 3000);
    }).then(result => alert(`The random number is:${result}`));
}