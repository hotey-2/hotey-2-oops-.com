const materialForm = document.getElementById('material-form');
const materialNameInput = document.getElementById('material-name');
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');
const materialList = document.getElementById('material-list');
const totalAmount = document.getElementById('total-amount');
const generateInvoiceButton = document.getElementById('generate-invoice');
const downloadLink = document.getElementById('download-link');

// Customer Details
const customerNameInput = document.getElementById('customer-name');
const customerAddressInput = document.getElementById('customer-address');

let materials = [];

materialForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const materialName = materialNameInput.value;
  const quantity = parseFloat(quantityInput.value);
  const price = parseFloat(priceInput.value);

  // Calculate total price for this material
  const totalPrice = quantity * price;

  const material = {
    name: materialName,
    quantity,
    price,
    totalPrice,
  };

  materials.push(material);
  updateMaterialList();
  updateTotalAmount();

  // Clear the form
  materialForm.reset();
});

function updateMaterialList() {
  materialList.innerHTML = '';
  materials.forEach((material, index) => {
    const li = document.createElement('li');
    li.textContent = `${material.name} - ${material.quantity} units @ ₹${material.price} = ₹${material.totalPrice}`;
    materialList.appendChild(li);
  });
}

function updateTotalAmount() {
  const total = materials.reduce((sum, material) => sum + material.totalPrice, 0);
  totalAmount.textContent = total;
}

generateInvoiceButton.addEventListener('click', function () {
  const customerName = customerNameInput.value;
  const customerAddress = customerAddressInput.value;

  if (!customerName || !customerAddress) {
    alert("Please fill in customer details!");
    return;
  }

  let invoiceText = `Invoice for ${customerName}\nAddress: ${customerAddress}\n\n`;
  materials.forEach((material) => {
    invoiceText += `${material.name} - ${material.quantity} units @ ₹${material.price} = ₹${material.totalPrice}\n`;
  });
  invoiceText += `\nTotal Amount: ₹${totalAmount.textContent}`;

  // Create a downloadable link for the invoice
  const blob = new Blob([invoiceText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.style.display = 'inline';
});
