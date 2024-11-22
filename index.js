const iconArrow = document.getElementById('icon-arrow');
const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');
const labelDay = document.getElementById('label-day');
const requiredDay = document.getElementById('required-day');
const validDay = document.getElementById('valid-day');
const labelMonth = document.getElementById('label-month');
const requiredMonth = document.getElementById('required-month');
const validMonth = document.getElementById('valid-month');
const labelYear = document.getElementById('label-year');
const requiredYear = document.getElementById('required-year');
const validYear = document.getElementById('valid-year');
const requireds = document.getElementsByClassName('required');
const valids = document.getElementsByClassName('valid');
const labels = document.getElementsByTagName('label');
const inputs = document.getElementsByTagName('input');
const yearsElement = document.getElementById('years')
const montsElement = document.getElementById('months')
const daysElement = document.getElementById('days')

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth() + 1; // Months are 0-indexed
const currentDay = date.getDate();

iconArrow.addEventListener('click', () => validate());

function validate() {
    const dayValue = parseInt(day.value, 10);
    const monthValue = parseInt(month.value, 10);
    const yearValue = parseInt(year.value, 10);
    let isValid = true;

    if (!dayValue) {
        requiredDay.style.display = 'block';
        day.style.border = '1px solid red';
        labelDay.style.color = 'red';
        isValid = false;
    } else if (isNaN(dayValue) || dayValue > 31 || dayValue <= 0) {
        validDay.style.display = 'block';
        day.style.border = '1px solid red';
        labelDay.style.color = 'red';
        isValid = false;
    }

    if (!monthValue) {
        requiredMonth.style.display = 'block';
        month.style.border = '1px solid red';
        labelMonth.style.color = 'red';
        isValid = false;
    } else if (isNaN(monthValue) || monthValue > 12 || monthValue <= 0) {
        validMonth.style.display = 'block';
        month.style.border = '1px solid red';
        labelMonth.style.color = 'red';
        isValid = false;
    }

    if (!yearValue) {
        requiredYear.style.display = 'block';
        year.style.border = '1px solid red';
        labelYear.style.color = 'red';
        isValid = false;
    } else if (isNaN(yearValue) || yearValue > currentYear || yearValue < 1900) {
        validYear.style.display = 'block';
        year.style.border = '1px solid red';
        labelYear.style.color = 'red';
        isValid = false;
    }

    if (isValid) {
        calculate(yearValue, monthValue, dayValue);
    }
}

function calculate(year, month, day) {
    const birthDate = new Date(year, month - 1, day); 
    const today = new Date(); 

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    
    if (ageMonths < 0) {
        ageYears--; 
        ageMonths += 12; 
    }

    
    if (ageDays < 0) {
        ageMonths--; 
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0); 
        ageDays += lastMonth.getDate(); 
    }

    yearsElement.innerHTML = ageYears
    montsElement.innerHTML = ageMonths
    daysElement.innerHTML = ageDays
    
}


Array.from(inputs).forEach((element) => {
    element.addEventListener('keyup', () => {
        Array.from(valids).forEach((element) => (element.style.display = 'none'));
        Array.from(requireds).forEach((element) => (element.style.display = 'none'));
        Array.from(labels).forEach((element) => (element.style.color = 'var(--smokey-grey)'));
        Array.from(inputs).forEach((element) => (element.style.border = '1px solid var(--smokey-grey)'));
    });
});
