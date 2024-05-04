const inputBox = document.querySelector("#input")
const Btn = document.querySelector("#submit ")
const todoList = document.querySelector(".todoList")
const inputcontainer = document.querySelector(".input-container")
const mainWrapper=document.querySelector("main-wrapper")



Btn.addEventListener("click", addTodo);


let dataStorage = localStorageData()

function addTodo() {
    if (inputBox.value === "") {
        alert("please fill the task")
        return;
    }
    const newRow = `
    <ul>
        <li>${inputBox.value}</li><button class="edit">edit</button><button class="delete">delete</button>
    </ul>`;

    const payload = {
        inputBox: inputBox.value,
    }

    // =========================to insert the html tag=======================
    inputcontainer.insertAdjacentHTML("afterend", newRow);
    storeData(payload);
    clearInput();
}

// ===================to store data to the local storage========================
function storeData(payload) {
    // console.log(payload);
    dataStorage.push(payload);
    localStorage.setItem("formData", JSON.stringify(dataStorage))
}

// ====================for localStorage=====================
function localStorageData() {
    const storeData = localStorage.getItem("formData");
    return storeData ? JSON.parse(storeData) : []
}

function rendorStoreData() {
    const data = localStorageData();
    console.log(data, "console the data inside localstorage");
    data.forEach((item) => {
        const newHTML = createRow(item);
// =======================Create a container =======================
        const rowElement = document.createElement("div");
        rowElement.innerHTML = newHTML; 
// ====================Select the delete button====================
        const deleteButton = rowElement.querySelector("button.delete");
        deleteButton.addEventListener("click", function() {

            const indexToRemove = data.indexOf(item);
            if (indexToRemove !== -1) {
                data.splice(indexToRemove, 1);
                localStorage.setItem("formData", JSON.stringify(data));
            }
//=========================== Remove the row from the DOM=============
            rowElement.remove();
        });
 // ================================Insert the DOM======================
        inputcontainer.insertAdjacentElement("afterend", rowElement);
    });
}
// ============================return the data============================
function createRow(data) {
    return `<ul>
                <li>${data.inputBox}</li><button class="edit">edit</button><button class="delete">delete</button>
            </ul>`
}

rendorStoreData();

function clearInput() {
    inputBox.value = ""
}


