document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Fetch the data from the server
        const response = await fetch('/transactions');
        if (!response.ok) throw new Error('Network response was not ok');
        const transactions = await response.json();

        // Get references to the table body and total amount cell
        const expensesTablebody = document.getElementById('expense-table-body');
        const totalAmountCell = document.getElementById('total-amount');
        let totalAmount = 0;

        // Populate the table with the fetched data
        transactions.forEach(transaction => {
            // Update total amount
            totalAmount += transaction.amount_input;

            // Create a new row
            const newRow = expensesTablebody.insertRow();
            const categoryCell = newRow.insertCell();
            const amountCell = newRow.insertCell();
            const infoCell = newRow.insertCell();
            const dateCell = newRow.insertCell();
            const deleteCell = newRow.insertCell();

            categoryCell.textContent = transaction.category_select;
            amountCell.textContent = transaction.amount_input;
            infoCell.textContent = transaction.info;
            dateCell.textContent = new Date(transaction.date_input).toLocaleDateString(); // Format the date

            // Create a delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', function() {
                // Handle deletion here (e.g., send a request to delete the item from the server)
                // For now, it just removes the row
                expensesTablebody.removeChild(newRow);
            });

            deleteCell.appendChild(deleteBtn);
        });

        // Display total amount
        totalAmountCell.textContent = totalAmount;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

