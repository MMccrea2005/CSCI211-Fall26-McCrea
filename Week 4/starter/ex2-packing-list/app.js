// Exercise 2: Packing List
// Your name:
//
// TODO list (chapter sections in brackets):
//   1. Select the form, #itemInput, #packList, #emptyMsg and #clearAll.
//   2. On submit: prevent the reload, trim the text, and ignore blank items.
//   3. Build each <li> with createElement: a span.item-name and a button.remove. [2.1]
//   4. Clear the input and put the cursor back in it after adding.
//   5. Remove deletes only its own item. [2.2.1, 3.1.1]
//   6. Show #emptyMsg only when the list is empty, using its hidden property.
//   7. Clear all empties the list with replaceChildren(). [2.2.1]
//   8. Don't use innerHTML anywhere in this file. [7, Table 6]

const packForm = document.querySelector("#packForm");
const itemInput = document.querySelector("#itemInput");
const packList = document.querySelector("#packList");
const emptyMsg = document.querySelector("#emptyMsg");
const clearAllBtn = document.querySelector("#clearAll");

packForm.addEventListener("submit", function(e){
    e.preventDefault();
    const text = itemInput.value.trim();
    if (text ===""){
        return;
    }

    addItem(text);
    itemInput.value = "";
    itemInput.focus();
});

function addItem(text){
    const li = document.createElement("li");
    const name = document.createElement("span");
    name.className = "item-name";
    name.textContent = text;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "remove";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function () {
        removeBtn.parentElement.remove();
        updateEmptyMessage();
    })

    li.append(name, removeBtn);
    packList.appendChild(li);
    updateEmptyMessage();

}
function updateEmptyMessage(){
    emptyMsg.hidden = packList.children.length > 0;
}

clearAllBtn.addEventListener("click", function (){
    packList.replaceChildren();
    updateEmptyMessage();
})

updateEmptyMessage();