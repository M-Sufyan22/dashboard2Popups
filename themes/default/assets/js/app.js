let closefiltermodel = document.getElementById('filterModelBox-overlay');
let filterOpenBtn = document.getElementById('filter-model-popup-open');
let filterModelBox = document.getElementById('filterModelBox');
let IncreaseNumbersBtn_Employee = document.getElementById('inc_emp_no');
let decreaseNumbersBtn_Employee = document.getElementById('dec_emp_no');
let Employee_num_field = document.getElementById('calendarInputEmployeesNo');
filterOpenBtn.addEventListener('click', () => {
    filterModelBox.classList.toggle('show-filter-popup');
    closefiltermodel.classList.toggle('show-filter-popup-overlay');
})

closefiltermodel.addEventListener('click', () => {
    filterModelBox.classList.remove('show-filter-popup');
    closefiltermodel.classList.remove('show-filter-popup-overlay');
});

IncreaseNumbersBtn_Employee.addEventListener('click', (e) => {
    e.preventDefault();
    let hisValue = parseInt(Employee_num_field.value);
    Employee_num_field.value = hisValue + 1
});

decreaseNumbersBtn_Employee.addEventListener('click', (e) => {
    e.preventDefault();
    let hisValue = parseInt(Employee_num_field.value);
    if (hisValue < 2) {
        Employee_num_field.value = 1;
    } else {
        Employee_num_field.value = hisValue - 1
    }
});