const state = {
    balance: 100,
    income: 400000,
    expense: 100,
    transactions: [
        {id: uniqueId, name: 'salary', amount: 5000, type: 'income' },
        {id: uniqueId, name: 'Buy Grocery', amount: 50, type: 'expense' },
        {id: uniqueId, name: 'Buy Guiter', amount: 500, type: 'expense' },
    ]

}

const balanceElement = document.querySelector('#balance');
const incomeElement = document.querySelector('#income');
const expenseElement = document.querySelector('#expense');
const transactionElement = document.querySelector('#transaction');
const incomeBtnElement = document.querySelector('#incomeBtn');
const expenseBtnElement = document.querySelector('#expenseBtn')
const nameInput = document.querySelector('#name');
const amountInput = document.querySelector('#amount');



function init() {
    updateState();
    initListener()
}
function uniqueId() {
    return Math.random();
}

function initListener() {
    incomeBtnElement.addEventListener('click', onAddIncomeClick);
    expenseBtnElement.addEventListener('click', onAddExpenseCLICK)
}

function onAddIncomeClick(e) {
    e.preventDefault()
    const name = nameInput.value;
    const amount = amountInput.value;
    if (name !== '' && amount !== '') {
        const transaction = {
            name: nameInput.value,
            amount: parseInt(amountInput.value),
            type: 'income'
        }
        state.transactions.push(transaction)
        updateState();
    } else {
        alert('please enter valid data')
    }

}
function onAddExpenseCLICK(e) {
    e.preventDefault()
    const name = nameInput.value;
    const amount = amountInput.value;
    if (name !== '' && amount !== '') {
        const transaction = {
            name: nameInput.value,
            amount: parseInt(amountInput.value),
            type: 'expense'
        }
        state.transactions.push(transaction)
        updateState();
    } else {
        alert('please enter valid data')
    }
}

    function addTransaction(name, amount, type) {
       
        if (name !== '' && amount !== '') {
            let transaction = {
                id: uniqueId(),
                name: name,
                amount: parseInt(amount),
                type: 'type'
            };


            state.transactions.push(transaction);
            updateState();
        } else {
            alert('please enter valid data')
        }
        nameInput.value = '';
        amountInput.value = '';
    }
    function updateState() {
        let balance = 0,
            income = 0,
            expense = 0,

            item;
        for (let i = 0; i < state.transactions.length; i++) {
            item = state.transactions[i];

            if (item.type === 'income') {
                income += item.amount;
            } else if (item.type === 'expense') {
                expense += item.amount;
            }
        }
        balance = income - expense;
        state.balance = balance;
        state.income = income;
        state.expense = expense;
        render();

}
function onDeleteClick(e) {
    let id = parseInt(e.target.getAttribute('data-id'));
    let deleteIndex;
    for (let i = 0; i < state.transactions.length; i++){
        if (state.transactions[i].id === id) {
            deleteIndex = i;
            break;
        }
    }
    state.transactions.splice(deleteIndex, 1);
    updateState();
    }


    function render() {
        balanceElement.innerHTML = `#${state.balance}`;
        incomeElement.innerHTML = `#${state.income}`;
        expenseElement.innerHTML = `#${state.expense}`;

        let li, div, span, item, button;
        transactionElement.innerHTML = '';

        for (let i = 0; i < state.transactions.length; i++) {
            item = state.transactions[i];
            li = document.createElement('li');
            div = document.createElement('div')
            span = document.createElement('span')
            button = document.createElement('button');
            button.setAttribute('data-id', item.id)
            button.innerText = 'X';
            button.addEventListener('click', onDeleteClick)


            li.append(item.name);

            transactionElement.appendChild(li);

            if (item.type === 'income') {
                span.classList.add('income-amount');
            } else if (item.type === 'expense') {
                span.classList.add('expense-amount');
            }
            span.innerHTML = `#${item.amount}`
            div.appendChild(span);
            li.appendChild(div);
            div.appendChild(button)
        }

    }
    init();
