
function addCooler(){
let container = document.getElementById('.card');

for(let i=1; i<11; i++){
    let myDiv = document.createElement("div");
    myDiv.className = "card";
    myDiv.id = "card"+i;
    container.appendChild(myDiv);
}
}