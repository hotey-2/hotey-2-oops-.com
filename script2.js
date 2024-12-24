function generateInvoice() {
  const customerName = document.getElementById("customerName").value;
  const customerAddress = document.getElementById("customerAddress").value;

  if (items.length === 0) {
    alert("No items added!");
    return;
  }

  let invoiceContent = `Invoice for ${customerName}\nAddress: ${customerAddress}\n\n`;

  let total = 0;
  items.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    invoiceContent += `${item.name} - ${item.quantity} units @ ₹${item.price} = ₹${itemTotal}\n`;
  });

  invoiceContent += `\nTotal Amount: ₹${total}`;

  // Encoding the content properly
  const blob = new Blob([invoiceContent], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "invoice.txt";
  link.click();
}
