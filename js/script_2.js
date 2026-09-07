
/**
 * Function for inserting a new task into the task list array
 * @param {Array} array 
 * @param {number} index 
 * @param {string} value 
 */
function insertFunction(array, index, value) {
    for (let i = array.length; i > index; i--)
        array[i] = array[i - 1];
    array[index] = value;
}

/**
 * Function for deleting a target task at specified index within task list array
 * @param {Array} array - the current task list array
 * @param {number} index - index of task within the task list that you wish to delete
 */
function deleteFunction(array, index) {
    for (i = index; i < array.length - 1; i++)
        array[i] = array[i + 1];
    array.length--;
}


/**
 * Function for sequentially searching task list array for specified task
 * @param {Array} array - the current task list array
 * @param {string} query - 
 * @returns 
 */
function sequentialSearchFunction(array, query) {
    for (i = 0; i < array.length; i++)
        if (array[i] === query)
            return query
}




let inputTaskName = document.getElementById("inputTaskName");
let inputDueDate = document.getElementById("inputDueDate");
let inputPriority = document.getElementById("inputPriority");
let inputConstultant = document.getElementById("inputConstultant");
let btnAddTask = document.getElementById("btnAddTask");
let taskListTableBody = document.getElementById("taskListTableBody");





btnAddTask.addEventListener("click", function () {
    let taskName = inputTaskName.value.trim();
    let dueDate = parseFloat(inputDueDate.value);
    let priority = parseInt(inputPriority.value);
    let consultant = parseInt(inputConstultant.value);

    if (!taskName || isNaN(dueDate) || isNaN(priority) || isNaN(consultant)) {
        alert("Invalid input.");
        return; // Return will exit the function: will not continue to the next process (let...)
    }

    let newTask = { name: name, dueDate: dueDate, priority: priority, consultant: consultant };
    insertFunction(cart, 0, newTask);
    console.log(cart);

    inputTaskName.value = "";
    // inputPrice.value = "";
    // inputQty.value = "";

    updateDisplay();
})