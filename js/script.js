// ==========================================
//              ARRAY ALGORITHMS
// ==========================================

/**
 * Function for inserting a new task into the task list array
 * @param {Array} array - task list array
 * @param {number} index - index within task list array at which new task is to be inserted
 * @param {string} value - string of new task to be added to task list array
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
    for (let i = index; i < array.length - 1; i++)
        array[i] = array[i + 1];
    array.length--;
}

/**
 * Function for sequentially searching task list array for specific task using query
 * @param {Array} array - the current task list array
 * @param {string} query - string query being searched for within task list array
 * @returns {string} - query that was successfully located within array or -1 if not found
 */
function sequentialSearchFunction(array, query) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === query) {
            return query;
        }
    }
    return -1;
}

/**
 * Function for sequentially searching task list array for specific task using taskName, dueDate, priority, or consultant
 * @param {Array} array - the current task list array
 * @param {string} query - string query being searched for within task list array
 * @returns {Array} - array containing the index positions of matching tasks (empty array if nothing found)
 */
function sequentialTaskSearch(array, query) {
    let matches = [];

    for (let i = 0; i < array.length; i++) {
        if (
            array[i].taskName === query ||
            array[i].dueDate === query ||
            array[i].priority === query ||
            array[i].consultant === query
        ) {
            matches.push(i);
        }
    }
    return matches;
}

/**
 * Function to perform binary search on sorted roles array to find the role and retrieve the matching consultant
 * @param {Array} arr - use sorted array of roles
 * @param {string} target - role of consultant being searched for
 * @returns {string} - name of consultant (or "Consultant not found")
 */
function getConsultant(arr, target) {
    if (target === "") return "Consultant not found.";

    let left = 0;
    // Create variable to represent the right-most element in the array called RIGHT (equal to length of array - 1)
    let right = arr.length - 1;

    while (left <= right) {
        // Create variable to represent the middle-most element in the array called MID (equal to average of LEFT and RIGHT ((LEFT+RIGHT)/2)
        const mid = Math.floor((left + right) / 2);
        const role = arr[mid].role;

        if (role === target) {
            return arr[mid].name;
        }

        if (role < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return "Consultant not found.";
}

/**
 * Function to sort consultants in roles array into alphabetical order based on the first letter of their role
 * @param {Array} arr - the current roles array to be sorted
 * @returns {Array} - new roles array now sorted into alphabetical order (based on role)
 */
function sortAscending(arr) {
    return arr.slice().sort(function (a, b) { return a.role.localeCompare(b.role) });
}

/**
 * Function for updating content of Task List Table (taskListTableBody)
 * @returns {void} - updates content of Task List Table (taskListTableBody)
 */
function updateDisplay(matches = null) {

    if (!taskListTableBody) return; // If taskListTableBody is NULL, do nothing

    taskListTableBody.innerHTML = "";

    // Check whether a search was performed and returned no matches
    if (matches !== null && matches.length === 0) {
        let tr = document.createElement("tr"); // Create table row
        let td = document.createElement("td"); // Create table data (cell)

        td.innerText = "No Tasks Found.";
        td.colSpan = 5; // Span the td across all 5 th's

        tr.appendChild(td);
        taskListTableBody.appendChild(tr);

        return;
    }

    // Check whether a search was performed and filter the tasks accordingly
    for (let i = 0; i < tasks.length; i++) {

        if (matches !== null) {
            let found = false;

            for (let j = 0; j < matches.length; j++) {
                if (matches[j] === i) {
                    found = true;
                }
            }

            if (!found) {
                continue;
            }
        }

        // Populate the table with task details:
        // - Populate the table with all tasks if no search was performed
        // or
        // - Populate the table with the matching tasks if a search was performed
        let task = tasks[i];

        let tr = document.createElement("tr");

        // Check whether task has been marked as completed and thus needs
        // to be displayed with a strikethrough (useful for searhcing AFTER
        // tasks have been marked as completed.)
        if (task.completed) {
            tr.classList.add("completed-task");
        }

        // Task Name Column
        let tdtaskName = document.createElement("td");
        tdtaskName.innerText = task.taskName;
        tr.appendChild(tdtaskName);

        // Due Date Column
        let tddueDate = document.createElement("td");
        tddueDate.innerText = task.dueDate;
        tr.appendChild(tddueDate);

        // Priority Column
        let tdpriority = document.createElement("td");
        tdpriority.innerText = task.priority;
        tr.appendChild(tdpriority);

        // Consultant Column
        let tdconsultant = document.createElement("td");
        tdconsultant.innerText = task.consultant;
        tr.appendChild(tdconsultant);

        // Actions Column
        let tdActions = document.createElement("td");
        // Delete button
        let btnDelete = document.createElement("button");
        btnDelete.innerText = "Delete";
        btnDelete.className = "badge-delete";
        btnDelete.addEventListener("click", function () {
            if (confirm("Are you sure you want to delete this task?")) // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_confirm
            {
                deleteFunction(tasks, i);
                updateDisplay();
            }
        })
        tdActions.appendChild(btnDelete);
        // Complete button
        let btnComplete = document.createElement("button");
        btnComplete.innerText = "Complete";
        btnComplete.className = "badge-complete";
        btnComplete.setAttribute("data-index", i);
        btnComplete.addEventListener("click", function () {
            if (confirm("Are you sure you want to complete this task?")) {
                tr.classList.add("completed-task");
                tasks[i].completed = true; // update completed status for further checks when searching
            }
        })
        tdActions.appendChild(btnComplete);
        tr.appendChild(tdActions);
        taskListTableBody.appendChild(tr);
    }
}


// ==========================================
//             DECLARE VARIABLES
// ==========================================

let inputTaskName = document.getElementById("inputTaskName");
let inputDueDate = document.getElementById("inputDueDate");
let inputPriority = document.getElementById("inputPriority");
let inputConsultant = document.getElementById("inputConsultant");
let btnAddTask = document.getElementById("btnAddTask");
let btnClearAddTask = document.getElementById("btnClearAddTask");
let btnSearchTask = document.getElementById("btnSearchTask");
let btnClearSearch = document.getElementById("btnClearSearch");
let taskListTableBody = document.getElementById("taskListTableBody");


// ==========================================
//              DECLARE ARRAYS
// ==========================================

// Roles Array
let unsortedRoles = [
    {
        name: "Vince Johnson",
        role: "Customer Experience Administrator"
    },

    {
        name: "Alice Johnson",
        role: "Accounts Clerk (Payable)"
    },

    {
        name: "Frank Johnson",
        role: "Administration Assistant"
    },

    {
        name: "Kelly Johnson",
        role: "Business Development Manager"
    },
    {
        name: "Liam Johnson",
        role: "Call Centre Manager"
    },

    {
        name: "Noah Johnson",
        role: "Chief Data Officer"
    },

    {
        name: "Rachel Johnson",
        role: "Client Partnerships Lead"
    },

    {
        name: "Sam Johnson",
        role: "Complaint Resolution Team Leader"
    },

    {
        name: "Tina Johnson",
        role: "Corporate Social Responsibility Manager"
    },

    {
        name: "Uma Johnson",
        role: "Customer Accounts Manager"
    }

]

// Task List Array
let tasks = [
    {
        taskName: "Write summary report",
        dueDate: "2026-09-09",
        priority: "Medium",
        consultant: "",
        completed: false
    },
    {
        taskName: "Meet with X client",
        dueDate: "2026-09-26",
        priority: "High",
        consultant: "Vince Johnson",
        completed: true
    },
    {
        taskName: "All team meeting",
        dueDate: "2026-10-08",
        priority: "Medium",
        consultant: "Rachel Johnson",
        completed: false
    },
    {
        taskName: "Create project timeline",
        dueDate: "2026-10-10",
        priority: "Low",
        consultant: "Frank Johnson",
        completed: false
    }
]
// Populate List Task Table
let roles = sortAscending(unsortedRoles);
updateDisplay();


// ==========================================
//                CALL FUNCTIONS
// ==========================================

// Triggered when user clicks Add Task button
// Use IF - Only run task event listeners when the Task Manager page is loaded
// because this JavaScript file is also used by other pages (contact.html)
if (btnAddTask) {
    btnAddTask.addEventListener("click", function () {
        let taskName = inputTaskName.value.trim();
        let dueDate = inputDueDate.value;
        let priority = inputPriority.value;


        if (!taskName || !dueDate || !priority) {
            alert("Required fields cannot be left empty.");
            return; // Return will exit the function: will not continue to the next process (let...)
        }

        let consultantRole = inputConsultant.value;
        let consultant = "";

        if (consultantRole !== "") {
            consultant = getConsultant(roles, consultantRole);
        };

        let newTask = {
            taskName: taskName,
            dueDate: dueDate,
            priority: priority,
            consultant: consultant,
            completed: false
        };
        insertFunction(tasks, 0, newTask);

        // Reset default values to empty string
        inputTaskName.value = "";
        inputDueDate.value = "";
        inputPriority.value = "";
        inputConsultant.value = "";

        // Update table
        updateDisplay();
    })

    // Triggered when user clicks Search button
    btnSearchTask.addEventListener("click", function () {
        let query = document.getElementById("inputSearch").value;

        if (query === "") {
            updateDisplay();
        }
        else {
            let matches = sequentialTaskSearch(tasks, query);
            updateDisplay(matches);
        }
    })

    // Triggered when user clicks Clear Search button in Search for Task section
    btnClearSearch.addEventListener("click", function () {
        document.getElementById("inputSearch").value = "";

        updateDisplay();
    })

    // Triggered when user clicks Clear button in Create New Task section
    btnClearAddTask.addEventListener("click", function () {
        document.getElementById("inputTaskName").value = "";
        document.getElementById("inputDueDate").value = "";
        document.getElementById("inputPriority").value = "";
        document.getElementById("inputConsultant").value = "";
    })
}

// Triggered when user clicks Search button
if (btnSearchTask) {
    btnSearchTask.addEventListener("click", function () {
        let query = document.getElementById("inputSearch").value;

        if (query === "") {
            updateDisplay();
        }
        else {
            let matches = sequentialTaskSearch(tasks, query);
            updateDisplay(matches);
        }
    })
}

// Triggered when user clicks Clear Search button in Search for Task section
if (btnClearSearch) {
    btnClearSearch.addEventListener("click", function () {
        document.getElementById("inputSearch").value = "";

        updateDisplay();
    })
}