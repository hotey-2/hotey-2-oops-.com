// Declare materials array to hold added materials
const materials = [];

// Customer Details Inputs
const customerNameInput = document.getElementById('customer-name');
const customerAddressInput = document.getElementById('customer-address');

// Material Entry Form Inputs
const materialForm = document.getElementById('material-form');
const materialNameInput = document.getElementById('material-name');
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');
const materialList = document.getElementById('material-list');
const totalAmount = document.getElementById('total-amount');
const generateInvoiceButton = document.getElementById('generate-invoice');
const downloadLink = document.getElementById('download-link');

// Get the current month and the list of months
const currentMonth = new Date().getMonth(); // 0 for January, 1 for February, etc.

// List of month names
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

// Generate an array of months that have passed
const passedMonths = monthNames.slice(0, currentMonth + 1); // All months up to the current month

// Initialize sales data for the months
const salesData = passedMonths.map(month => ({
  month: month,
  sales: 0  // Initial sales set to 0
}));

// Initialize Chart.js
const ctx = document.getElementById('sales-chart').getContext('2d');

// Create the sales chart
const salesChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: salesData.map(item => item.month), // Months that have passed
    datasets: [{
      label: 'Sales in ₹ (Last Month)',
      data: salesData.map(item => item.sales), // Sales amounts (all 0 initially)
      backgroundColor: 'rgba(75, 192, 192, 0.6)', // Light green bars
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        min: 0, // Start the Y-axis from 0
        max: 10000000, // Maximum value is 1 crore (10 million)
        stepSize: 10000, // Step size of 10,000
        ticks: {
          font: {
            size: 14, // Font size for ticks
            family: 'Arial', // Font family
          },
          callback: function(value) {
            // Format tick labels as integers
            return '₹' + value.toLocaleString();
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 14, // Font size for x-axis labels
            family: 'Arial', // Font family for x-axis labels
          }
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14, // Font size for the legend
            family: 'Arial', // Font family for legend labels
          }
        }
      }
    }
  }
});

// Material Form Submission Handler
materialForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  // Retrieve values from input fields
  const materialName = materialNameInput.value;
  const quantity = parseFloat(quantityInput.value);
  const price = parseFloat(priceInput.value);

  // Calculate total price for the material
  const totalPrice = quantity * price;

  // Create material object and add it to the materials array
  const material = {
    name: materialName,
    quantity,
    price,
    totalPrice,
  };

  materials.push(material);
  updateMaterialList();
  updateTotalAmount();

  // Reset form fields after adding material
  materialForm.reset();
});

// Update Material List in the UI
function updateMaterialList() {
  materialList.innerHTML = ''; // Clear the current list

  // Loop through the materials array and display each material in the list
  materials.forEach((material, index) => {
    const li = document.createElement('li');
    li.textContent = `${material.name} - ₹${material.totalPrice} (Quantity: ${material.quantity})`;
    materialList.appendChild(li);
  });
}

// Update Total Amount in the UI
function updateTotalAmount() {
  const total = materials.reduce((sum, material) => sum + material.totalPrice, 0);
  totalAmount.textContent = total.toFixed(2); // Show total amount with two decimal places
}

// Handle the Generate Invoice Button Click
generateInvoiceButton.addEventListener('click', function () {
  if (materials.length === 0) {
    alert('No materials added yet!');
    return;
  }

  const invoiceContent = `
    Invoice for ${customerNameInput.value} (Address: ${customerAddressInput.value})\n\n
    Materials:\n
    ${materials.map(material => `${material.name} - ₹${material.totalPrice} (Quantity: ${material.quantity})`).join('\n')}\n\n
    Total Amount: ₹${totalAmount.textContent}
  `;

  // Create a Blob with the invoice content and prepare the download link
  const blob = new Blob([invoiceContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.style.display = 'inline-block'; // Show the download link
});
