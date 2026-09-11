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
 * Fuction for sequentially searching task list array for specific task using query
 * @param {Array} array - the current task list array
 * @param {string} query - string query being searched for within task list array
 * @returns {string} - query that was successfully located within array or -1 if not found
 */
function sequentialSearchFunction(array, query) {
    for (let i = 0; i < array.length; i++)
        if (array[i] === query)
            return query
}

/**
 * Fuction for sequentially searching task list array for specific task using taskName, dueDate, priority, or consultant
 * @param {Array} array - the current task list array
 * @param {string} query - string query being searched for within task list array
 * @returns {number} - index position within array of query value or -1 if not found
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
    return arr.slice().sort(function (a, b) { return a.role.localeCompare(b.role) })
}

/**
 * Function for updating content of Task List Table (taskListTableBody)
 * @returns {void} - updates content of Task List Table (taskListTableBody)
 */
function updateDisplay(matches = null) {

    if (!taskListTableBody) return; // If taskListTableBody is NULL, do nothing

    taskListTableBody.innerHTML = "";

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

        let task = tasks[i];

        let tr = document.createElement("tr");

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

        // Concultant Column
        let tdconsultant = document.createElement("td");
        tdconsultant.innerText = task.consultant;
        tr.appendChild(tdconsultant);

        // Actions Column
        let tdActions = document.createElement("td");
        // Delete button
        let btnDelete = document.createElement("button");
        btnDelete.innerText = "Delete";
        btnDelete.className = "badge-delete";
        btnDelete.setAttribute("data-index", i);
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
            if (confirm("Are you sure you want to complete this task?"))
                tr.classList.add("completed-task");
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
        consultant: ""
    },
    {
        taskName: "Meet with X client",
        dueDate: "2026-09-26",
        priority: "High",
        consultant: "Vince Johnson"
    },
    {
        taskName: "All team meeting",
        dueDate: "2026-10-08",
        priority: "Medium",
        consultant: "Rachel Johnson"
    },
    {
        taskName: "Create project timeline",
        dueDate: "2026-10-10",
        priority: "Low",
        consultant: "Frank Johnson"
    }
]
// Populate List Task Table
let roles = sortAscending(unsortedRoles);
updateDisplay();


// ==========================================
//                CALL FUNCTIONS
// ==========================================

// Triggered when user clicks Add Task button
btnAddTask.addEventListener("click", function () {
    let taskName = inputTaskName.value.trim();
    let dueDate = inputDueDate.value;
    let priority = inputPriority.value;


    if (!taskName || !dueDate || !priority) {
        alert("Invalid input.");
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
        consultant: consultant
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

// Triggered when user clicks Clear Search button
btnClearSearch.addEventListener("click", function () {
    document.getElementById("inputSearch").value = "";
    updateDisplay();
})













// let roles = [
//     {
//         name: "Alice Johnson",
//         role: "Accounts Clerk (Payable)"
//     },
//     {
//         name: "Bob Johnson",
//         role: "Accounts Clerk (Receivable)"
//     },
//     {
//         name: "Carla Johnson",
//         role: "Accounts Manager"
//     },
//     {
//         name: "David Johnson",
//         role: "Accounts Officer"
//     },
//     {
//         name: "Emma Johnson",
//         role: "Accounts Team Leader"
//     },
//     {
//         name: "Frank Johnson",
//         role: "Administration Assistant"
//     },
//     {
//         name: "Grace Johnson",
//         role: "Administration Manager"
//     },
//     {
//         name: "Hank Johnson",
//         role: "Administration Supervisor"
//     },
//     {
//         name: "Ivy Johnson",
//         role: "Brand Coordinator"
//     },
//     {
//         name: "Jack Johnson",
//         role: "Brand Manager"
//     },
//     {
//         name: "Kelly Johnson",
//         role: "Business Development Manager"
//     },
//     {
//         name: "Liam Johnson",
//         role: "Call Centre Manager"
//     },
//     {
//         name: "Mia Johnson",
//         role: "Call Centre Operator"
//     },
//     {
//         name: "Noah Johnson",
//         role: "Chief Data Officer"
//     },
//     {
//         name: "Olivia Johnson",
//         role: "Chief Executive Officer"
//     },
//     {
//         name: "Paul Johnson",
//         role: "Chief Technical Officer"
//     },
//     {
//         name: "Quinn Johnson",
//         role: "Chief of Operations"
//     },
//     {
//         name: "Rachel Johnson",
//         role: "Client Partnerships Lead"
//     },
//     {
//         name: "Sam Johnson",
//         role: "Complaint Resolution Team Leader"
//     },
//     {
//         name: "Tina Johnson",
//         role: "Corporate Social Responsibility Manager"
//     },
//     {
//         name: "Uma Johnson",
//         role: "Customer Accounts Manager"
//     },
//     {
//         name: "Vince Johnson",
//         role: "Customer Experience Administrator"
//     },
//     {
//         name: "Wendy Johnson",
//         role: "Customer Experience Data Manager"
//     },
//     {
//         name: "Xavier Johnson",
//         role: "Customer Experience Manager"
//     },
//     {
//         name: "Yara Johnson",
//         role: "Customer Insight Coordinator"
//     },
//     {
//         name: "Zane Johnson",
//         role: "Customer Service Officer"
//     },
//     {
//         name: "Abby Jones",
//         role: "Cyber Security Engineer"
//     },
//     {
//         name: "Ben Jones",
//         role: "Database Development Team Leader"
//     },
//     {
//         name: "Clara Jones",
//         role: "Digital Media Coordinator"
//     },
//     {
//         name: "Derek Jones",
//         role: "Employee Relations Advisor"
//     },
//     {
//         name: "Ella Jones",
//         role: "Employee Relations Officer"
//     },
//     {
//         name: "Felix Jones",
//         role: "Employee Relations Team Lead"
//     },
//     {
//         name: "Gina Jones",
//         role: "Employee Services Manager"
//     },
//     {
//         name: "Harry Jones",
//         role: "Employee Social Planner"
//     },
//     {
//         name: "Iris Jones",
//         role: "Engineering Consultant"
//     },
//     {
//         name: "Jake Jones",
//         role: "Financial Controller"
//     },
//     {
//         name: "Kara Jones",
//         role: "Finance Officer"
//     },
//     {
//         name: "Leo Jones",
//         role: "Financial Planner"
//     },
//     {
//         name: "Maya Jones",
//         role: "Head of Customer Service"
//     },
//     {
//         name: "Nate Jones",
//         role: "Head of Finance"
//     },
//     {
//         name: "Opal Jones",
//         role: "Head of Marketing"
//     },
//     {
//         name: "Pete Jones",
//         role: "Human Resources Advisor"
//     },
//     {
//         name: "Quinn Jones",
//         role: "Human Resources Analyst"
//     },
//     {
//         name: "Ruby Jones",
//         role: "Human Resources Consultant"
//     },
//     {
//         name: "Sean Jones",
//         role: "Human Resources Coordinator"
//     },
//     {
//         name: "Tara Jones",
//         role: "Human Resources Director"
//     },
//     {
//         name: "Ulysses Jones",
//         role: "Human Resources Information Systems Administrator"
//     },
//     {
//         name: "Violet Jones",
//         role: "Internal Audit Officer"
//     },
//     {
//         name: "Will Jones",
//         role: "Internal Relations Team Lead"
//     },
//     {
//         name: "Xena Jones",
//         role: "ICT Consultant"
//     },
//     {
//         name: "Yuri Jones",
//         role: "ICT Services Senior Manager"
//     },
//     {
//         name: "Zoe Jones",
//         role: "ICT Support Senior Manager"
//     },
//     {
//         name: "Anna Brown",
//         role: "ICT Network Senior Manager"
//     },
//     {
//         name: "Bill Brown",
//         role: "ICT Security Senior Manager"
//     },
//     {
//         name: "Cara Brown",
//         role: "Marketing and Communications Manager"
//     },
//     {
//         name: "Dean Brown",
//         role: "Marketing and Research Analyst"
//     },
//     {
//         name: "Eva Brown",
//         role: "Marketing and Research Coordinator"
//     },
//     {
//         name: "Finn Brown",
//         role: "Marketing Assistant"
//     },
//     {
//         name: "Gwen Brown",
//         role: "Marketing Consultant"
//     },
//     {
//         name: "Hank Brown",
//         role: "Marketing Coordinator"
//     },
//     {
//         name: "Ivy Brown",
//         role: "Marketing Manager"
//     },
//     {
//         name: "Jake Brown",
//         role: "Media Coordinator"
//     },
//     {
//         name: "Kara Brown",
//         role: "Media Planning Coordinator"
//     },
//     {
//         name: "Liam Brown",
//         role: "Organisational Development Coordinator"
//     },
//     {
//         name: "Mia Brown",
//         role: "Payroll Manager"
//     },
//     {
//         name: "Noah Brown",
//         role: "Payroll Officer"
//     },
//     {
//         name: "Olivia Brown",
//         role: "Portfolio Team Leader"
//     },
//     {
//         name: "Paul Brown",
//         role: "Procurement Manager"
//     },
//     {
//         name: "Quinn Brown",
//         role: "Procurement Officer"
//     },
//     {
//         name: "Rachel Brown",
//         role: "Product Development Coordinator"
//     },
//     {
//         name: "Sam Brown",
//         role: "Public Relations Lead"
//     },
//     {
//         name: "Tina Brown",
//         role: "Quality Assurance Officer"
//     },
//     {
//         name: "Uma Brown",
//         role: "Reception Manager"
//     },
//     {
//         name: "Vince Brown",
//         role: "Receptionist"
//     },
//     {
//         name: "Wendy Brown",
//         role: "Recruitment Advisor"
//     },
//     {
//         name: "Xavier Brown",
//         role: "Recruitment Coordinator"
//     },
//     {
//         name: "Yara Brown",
//         role: "Recruitment, Selection and Onboarding Administrator"
//     },
//     {
//         name: "Zane Brown",
//         role: "Research Officer"
//     },
//     {
//         name: "Abby Smith",
//         role: "Return To Work Coordinator"
//     },
//     {
//         name: "Ben Smith",
//         role: "Salary Administrator"
//     },
//     {
//         name: "Clara Smith",
//         role: "Service Desk Officer Level 1"
//     },
//     {
//         name: "Derek Smith",
//         role: "Social Media Lead"
//     },
//     {
//         name: "Ella Smith",
//         role: "Strategic Analyst"
//     },
//     {
//         name: "Felix Smith",
//         role: "Strategic Planning Manager"
//     },
//     {
//         name: "Gina Smith",
//         role: "Software Development Team Leader"
//     },
//     {
//         name: "Harry Smith",
//         role: "Security Administrator"
//     },
//     {
//         name: "Iris Smith",
//         role: "Security Manager"
//     },
//     {
//         name: "Jake Smith",
//         role: "Sustainability Officer"
//     },
//     {
//         name: "Kara Smith",
//         role: "Talent Acquisition Manager"
//     },
//     {
//         name: "Leo Smith",
//         role: "Telecommunication Technician"
//     },
//     {
//         name: "Maya Smith",
//         role: "Telecommunications Senior Manager"
//     },
//     {
//         name: "Nate Smith",
//         role: "Technical Support Officer Level 2"

//     },
//     {
//         name: "Opal Smith",
//         role: "Technical Support Specialist Level 3"
//     },
//     {
//         name: "Pete Smith",
//         role: "Taxation Manager"
//     },
//     {
//         name: "Quinn Smith",
//         role: "Taxation Officer"
//     },
//     {
//         name: "Ruby Smith",
//         role: "Training Advisor"
//     },
//     {
//         name: "Sean Smith",
//         role: "Training and Development Administrator"
//     },
//     {
//         name: "Tara Smith",
//         role: "Training and Development Manager"
//     },
//     {
//         name: "Ulysses Smith",
//         role: "Web Development Team Leader"
//     },
//     {
//         name: "Violet Smith",
//         role: "Work Health and Safety Administrator"
//     },
//     {
//         name: "Will Smith",
//         role: "Work Health and Safety Coordinator"
//     },
//     {
//         name: "Xena Smith",
//         role: "Work Health and Safety Manager"
//     },
//     {
//         name: "Yuri Smithh",
//         role: "Work Health and Safety Officer"
//     }
// ]




