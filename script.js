// Login Script
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation (replace with backend logic for real-world apps)
    if (username === "user" && password === "password123") {
        // Hide the login page and show the app
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('sidebar').style.display = 'block';
        document.getElementById('content').style.display = 'block';

        // Load dashboard content by default
        document.getElementById("dashboard").click();
    } else {
        alert("Invalid username or password.");
    }
});

// Existing JavaScript code for content and menu interactions
document.addEventListener("DOMContentLoaded", () => {
    const menus = document.querySelectorAll(".menu");
    const content = document.getElementById("content");

    // Data Keuangan
    const finances = {
        incomes: [],
        spendings: [],
        targetSaving: 500000, // Default target saving
    };

    // Konten Dinamis
    const contentData = {
        dashboard: `
            <h1>Dashboard</h1>
            <div class="dashboard-summary">
                <div class="card" id="total-balance">
                    <h2>Total Balance</h2>
                    <p>Rp 0</p>
                </div>
                <div class="card" id="target-saving">
                    <h2>Target Saving</h2>
                    <p>Rp ${finances.targetSaving}</p>
                </div>
                <div class="card" id="total-incomes">
                    <h2>Total Incomes</h2>
                    <p>Rp 0</p>
                </div>
                <div class="card" id="total-spendings">
                    <h2>Total Spendings</h2>
                    <p>Rp 0</p>
                </div>
            </div>
        `,
        incomes: `
            <h1>Incomes</h1>
            <form id="income-form">
                <label for="amount">Amount (Rp):</label>
                <input type="number" id="amount" placeholder="Enter amount" required>
                <label for="date">Date:</label>
                <input type="date" id="date" required>
                <button type="submit">Add Income</button>
            </form>
            <table id="income-table">
                <thead>
                    <tr>
                        <th>Amount (Rp)</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `,
        spendings: `
            <h1>Spendings</h1>
            <form id="spending-form">
                <label for="amount">Amount (Rp):</label>
                <input type="number" id="spending-amount" placeholder="Enter amount" required>
                <label for="date">Date:</label>
                <input type="date" id="spending-date" required>
                <button type="submit">Add Spending</button>
            </form>
            <table id="spending-table">
                <thead>
                    <tr>
                        <th>Amount (Rp)</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `,
        settings: `
            <h1>Settings</h1>
            <form id="settings-form">
                <label for="target-saving-input">Target Saving (Rp):</label>
                <input type="number" id="target-saving-input" placeholder="Enter new target saving" value="${finances.targetSaving}" required>
                <button type="submit">Update Target Saving</button>
            </form>
        `,
    };

    menus.forEach(menu => {
        menu.addEventListener("click", () => {
            menus.forEach(m => m.classList.remove("active"));
            menu.classList.add("active");
            content.innerHTML = contentData[menu.id] || "<h1>404 Not Found</h1>";

            if (menu.id === "incomes") {
                renderIncomeTable();
                setupIncomeForm();
            } else if (menu.id === "spendings") {
                renderSpendingTable();
                setupSpendingForm();
            } else if (menu.id === "dashboard") {
                updateDashboard();
            } else if (menu.id === "settings") {
                setupSettingsForm(); // Setup settings form for target saving
            }
        });
    });

    // Income Form Handling
    function setupIncomeForm() {
        const form = document.getElementById("income-form");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const amount = parseFloat(document.getElementById("amount").value);
            const date = document.getElementById("date").value;

            finances.incomes.push({ amount, date });

            renderIncomeTable();
            form.reset();
            updateDashboard();
        });
    }

    // Spending Form Handling
    function setupSpendingForm() {
        const form = document.getElementById("spending-form");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const amount = parseFloat(document.getElementById("spending-amount").value);
            const date = document.getElementById("spending-date").value;

            finances.spendings.push({ amount, date });

            renderSpendingTable();
            form.reset();
            updateDashboard();
        });
    }

    // Settings Form Handling (Target Saving)
    function setupSettingsForm() {
        const form = document.getElementById("settings-form");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const targetSaving = parseFloat(document.getElementById("target-saving-input").value);

            if (targetSaving > 0) {
                finances.targetSaving = targetSaving;
                updateDashboard(); // Update dashboard to reflect the new target saving
            } else {
                alert("Please enter a valid target saving amount.");
            }
        });
    }

    // Rendering Income Table
    function renderIncomeTable() {
        const tableBody = document.querySelector("#income-table tbody");
        tableBody.innerHTML = ""; // Bersihkan tabel

        finances.incomes.forEach(income => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${income.amount}</td><td>${income.date}</td>`;
            tableBody.appendChild(row);
        });
    }

    // Rendering Spending Table
    function renderSpendingTable() {
        const tableBody = document.querySelector("#spending-table tbody");
        tableBody.innerHTML = ""; // Bersihkan tabel

        finances.spendings.forEach(spending => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${spending.amount}</td><td>${spending.date}</td>`;
            tableBody.appendChild(row);
        });
    }

    // Update Dashboard
    function updateDashboard() {
        const totalIncomes = finances.incomes.reduce((sum, item) => sum + item.amount, 0);
        const totalSpendings = finances.spendings.reduce((sum, item) => sum + item.amount, 0);
        const totalBalance = totalIncomes - totalSpendings;

        document.getElementById("total-balance").querySelector("p").textContent = `Rp ${totalBalance}`;
        document.getElementById("total-incomes").querySelector("p").textContent = `Rp ${totalIncomes}`;
        document.getElementById("total-spendings").querySelector("p").textContent = `Rp ${totalSpendings}`;
        document.getElementById("target-saving").querySelector("p").textContent = `Rp ${finances.targetSaving}`;
    }

    // Initial Dashboard load
    document.getElementById("dashboard").click();
});
