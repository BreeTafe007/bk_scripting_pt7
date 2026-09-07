
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








function updateDisplay() {

    if (!taskListTableBody) return; // If taskListTableBody is NULL, do nothing

    cartTableBody.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        let item = roles[i];
        let tr = document.createElement("tr");


        // Product name column
        let tdName = document.createElement("td");
        tdName.innerText = item.name;
        tr.appendChild(tdName);


        // Price column
        let tdPrice = document.createElement("td");
        tdPrice.innerText = item.price;
        tr.appendChild(tdPrice);


        // Quantity column
        // Quantity descrease button
        const btnDecrease = document.createElement("button");
        btnDecrease.innerText = "-";
        btnDecrease.className = "btn-qty";
        btnDecrease.setAttribute("data-index", i);
        btnDecrease.addEventListener("click", function () {
            if (cart[i].qty > 1) {
                cart[i].qty--;
            }
            else {
                // Remove item if quantity drops to 0
                deletionFuction(cart, i);
            }
            updateDisplay();
        })

        let tdQty = document.createElement("td");
        tdQty.innerText = item.qty;
        tr.appendChild(tdQty);


        // Quantity increase button
        const btnIncrease = document.createElement("button");
        btnIncrease.innerText = "+";
        btnDecrease.className = "btn-qty";
        btnDecrease.setAttribute("data-index", i);
        btnDecrease.addEventListener("click", function () {
            cart[i].qty++;

            updateDisplay();
        })


        // Subtotal column
        // let tdSubtotal = document.createElement("td");
        // tdSubtotal.innerText = item.price * item.qty;
        // tr.appendChild(tdSubtotal);
        const qtyText = document.createElement("span");
        qtyText.className = "qty-text";
        qtyText.innerText = item.qty;

        tdQty.appendChild(btnDecrease);
        tdQty.appendChild(qtyText);
        tdQty.appendChild(btnIncrease);
        // tr.appendChild(tdQty);


        // Actions column
        let tdActions = document.createElement("td");
        let btnDelete = document.createElement("button");
        btnDelete.innerText = "Delete";
        btnDelete.className = "badge-delete";
        btnDelete.setAttribute("data-index", i);
        btnDelete.addEventListener("click", function () {
            deleteFunction(cart, i);
            updateDisplay();
        })
        tdActions.appendChild(btnDelete);
        tr.appendChild(tdActions);



        cartTableBody.appendChild(tr);
    }
}






let tasks = [
    {
        taskName: "Write summary report",
        dueDate: "09/09/26",
        priority: "Medium",
        consultant: ""
    },
    {
        taskName: "Write summary report",
        dueDate: "09/09/26",
        priority: "Medium",
        consultant: ""
    },
    {
        taskName: "All team meeting",
        dueDate: "09/09/26",
        priority: "Medium",
        consultant: ""
    },
    {
        taskName: "Write summary report",
        dueDate: "09/09/26",
        priority: "Medium",
        consultant: ""
    }
]













let roles = [
    {
        name: "Alice Johnson",
        role: "Accounts Clerk (Payable)"
    },
    {
        name: "Bob Johnson",
        role: "Accounts Clerk (Receivable)"
    },
    {
        name: "Carla Johnson",
        role: "Accounts Manager"
    },
    {
        name: "David Johnson",
        role: "Accounts Officer"
    },
    {
        name: "Emma Johnson",
        role: "Accounts Team Leader"
    },
    {
        name: "Frank Johnson",
        role: "Administration Assistant"
    },
    {
        name: "Grace Johnson",
        role: "Administration Manager"
    },
    {
        name: "Hank Johnson",
        role: "Administration Supervisor"
    },
    {
        name: "Ivy Johnson",
        role: "Brand Coordinator"
    },
    {
        name: "Jack Johnson",
        role: "Brand Manager"
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
        name: "Mia Johnson",
        role: "Call Centre Operator"
    },
    {
        name: "Noah Johnson",
        role: "Chief Data Officer"
    },
    {
        name: "Olivia Johnson",
        role: "Chief Executive Officer"
    },
    {
        name: "Paul Johnson",
        role: "Chief Technical Officer"
    },
    {
        name: "Quinn Johnson",
        role: "Chief of Operations"
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
    },
    {
        name: "Vince Johnson",
        role: "Customer Experience Administrator"
    },
    {
        name: "Wendy Johnson",
        role: "Customer Experience Data Manager"
    },
    {
        name: "Xavier Johnson",
        role: "Customer Experience Manager"
    },
    {
        name: "Yara Johnson",
        role: "Customer Insight Coordinator"
    },
    {
        name: "Zane Johnson",
        role: "Customer Service Officer"
    },
    {
        name: "Abby Jones",
        role: "Cyber Security Engineer"
    },
    {
        name: "Ben Jones",
        role: "Database Development Team Leader"
    },
    {
        name: "Clara Jones",
        role: "Digital Media Coordinator"
    },
    {
        name: "Derek Jones",
        role: "Employee Relations Advisor"
    },
    {
        name: "Ella Jones",
        role: "Employee Relations Officer"
    },
    {
        name: "Felix Jones",
        role: "Employee Relations Team Lead"
    },
    {
        name: "Gina Jones",
        role: "Employee Services Manager"
    },
    {
        name: "Harry Jones",
        role: "Employee Social Planner"
    },
    {
        name: "Iris Jones",
        role: "Engineering Consultant"
    },
    {
        name: "Jake Jones",
        role: "Financial Controller"
    },
    {
        name: "Kara Jones",
        role: "Finance Officer"
    },
    {
        name: "Leo Jones",
        role: "Financial Planner"
    },
    {
        name: "Maya Jones",
        role: "Head of Customer Service"
    },
    {
        name: "Nate Jones",
        role: "Head of Finance"
    },
    {
        name: "Opal Jones",
        role: "Head of Marketing"
    },
    {
        name: "Pete Jones",
        role: "Human Resources Advisor"
    },
    {
        name: "Quinn Jones",
        role: "Human Resources Analyst"
    },
    {
        name: "Ruby Jones",
        role: "Human Resources Consultant"
    },
    {
        name: "Sean Jones",
        role: "Human Resources Coordinator"
    },
    {
        name: "Tara Jones",
        role: "Human Resources Director"
    },
    {
        name: "Ulysses Jones",
        role: "Human Resources Information Systems Administrator"
    },
    {
        name: "Violet Jones",
        role: "Internal Audit Officer"
    },
    {
        name: "Will Jones",
        role: "Internal Relations Team Lead"
    },
    {
        name: "Xena Jones",
        role: "ICT Consultant"
    },
    {
        name: "Yuri Jones",
        role: "ICT Services Senior Manager"
    },
    {
        name: "Zoe Jones",
        role: "ICT Support Senior Manager"
    },
    {
        name: "Anna Brown",
        role: "ICT Network Senior Manager"
    },
    {
        name: "Bill Brown",
        role: "ICT Security Senior Manager"
    },
    {
        name: "Cara Brown",
        role: "Marketing and Communications Manager"
    },
    {
        name: "Dean Brown",
        role: "Marketing and Research Analyst"
    },
    {
        name: "Eva Brown",
        role: "Marketing and Research Coordinator"
    },
    {
        name: "Finn Brown",
        role: "Marketing Assistant"
    },
    {
        name: "Gwen Brown",
        role: "Marketing Consultant"
    },
    {
        name: "Hank Brown",
        role: "Marketing Coordinator"
    },
    {
        name: "Ivy Brown",
        role: "Marketing Manager"
    },
    {
        name: "Jake Brown",
        role: "Media Coordinator"
    },
    {
        name: "Kara Brown",
        role: "Media Planning Coordinator"
    },
    {
        name: "Liam Brown",
        role: "Organisational Development Coordinator"
    },
    {
        name: "Mia Brown",
        role: "Payroll Manager"
    },
    {
        name: "Noah Brown",
        role: "Payroll Officer"
    },
    {
        name: "Olivia Brown",
        role: "Portfolio Team Leader"
    },
    {
        name: "Paul Brown",
        role: "Procurement Manager"
    },
    {
        name: "Quinn Brown",
        role: "Procurement Officer"
    },
    {
        name: "Rachel Brown",
        role: "Product Development Coordinator"
    },
    {
        name: "Sam Brown",
        role: "Public Relations Lead"
    },
    {
        name: "Tina Brown",
        role: "Quality Assurance Officer"
    },
    {
        name: "Uma Brown",
        role: "Reception Manager"
    },
    {
        name: "Vince Brown",
        role: "Receptionist"
    },
    {
        name: "Wendy Brown",
        role: "Recruitment Advisor"
    },
    {
        name: "Xavier Brown",
        role: "Recruitment Coordinator"
    },
    {
        name: "Yara Brown",
        role: "Recruitment, Selection and Onboarding Administrator"
    },
    {
        name: "Zane Brown",
        role: "Research Officer"
    },
    {
        name: "Abby Smith",
        role: "Return To Work Coordinator"
    },
    {
        name: "Ben Smith",
        role: "Salary Administrator"
    },
    {
        name: "Clara Smith",
        role: "Service Desk Officer Level 1"
    },
    {
        name: "Derek Smith",
        role: "Social Media Lead"
    },
    {
        name: "Ella Smith",
        role: "Strategic Analyst"
    },
    {
        name: "Felix Smith",
        role: "Strategic Planning Manager"
    },
    {
        name: "Gina Smith",
        role: "Software Development Team Leader"
    },
    {
        name: "Harry Smith",
        role: "Security Administrator"
    },
    {
        name: "Iris Smith",
        role: "Security Manager"
    },
    {
        name: "Jake Smith",
        role: "Sustainability Officer"
    },
    {
        name: "Kara Smith",
        role: "Talent Acquisition Manager"
    },
    {
        name: "Leo Smith",
        role: "Telecommunication Technician"
    },
    {
        name: "Maya Smith",
        role: "Telecommunications Senior Manager"
    },
    {
        name: "Nate Smith",
        role: "Technical Support Officer Level 2"

    },
    {
        name: "Opal Smith",
        role: "Technical Support Specialist Level 3"
    },
    {
        name: "Pete Smith",
        role: "Taxation Manager"
    },
    {
        name: "Quinn Smith",
        role: "Taxation Officer"
    },
    {
        name: "Ruby Smith",
        role: "Training Advisor"
    },
    {
        name: "Sean Smith",
        role: "Training and Development Administrator"
    },
    {
        name: "Tara Smith",
        role: "Training and Development Manager"
    },
    {
        name: "Ulysses Smith",
        role: "Web Development Team Leader"
    },
    {
        name: "Violet Smith",
        role: "Work Health and Safety Administrator"
    },
    {
        name: "Will Smith",
        role: "Work Health and Safety Coordinator"
    },
    {
        name: "Xena Smith",
        role: "Work Health and Safety Manager"
    },
    {
        name: "Yuri Smithh",
        role: "Work Health and Safety Officer"
    }
]