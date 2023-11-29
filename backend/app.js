const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

//Middlewares
app.use(cors());
app.use(express.json());

//Connection to DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log('Server running on port: ' + PORT));
  })
  .catch((e) => console.log(e));

const Invoice = require('./models/invoice.model.js');

//Routes

//Create new invoice
app.post('/api/invoices', async (req, res) => {
  const newInvoiceData = req.body;
  try {
    const newInvoice = new Invoice(newInvoiceData);
    const createdInvoice = await newInvoice.save();
    res.json({ message: 'Invoice created!', createdInvoice });
  } catch (error) {
    console.log(error);
  }
});

//Delete invoice

app.delete('/api/invoices/:id', async (req, res) => {
  const invoiceId = req.params.id;
  try {
    await Invoice.findByIdAndRemove(invoiceId);
    res.json({ message: 'removed' });
  } catch (error) {
    console.log(error);
  }
});

// //Update invoice

app.put('/api/invoices/:id', async (req, res) => {
  const invoiceId = req.params.id;
  const updateData = req.body;
  try {
    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    const fieldsToUpdate = [
      'to_pay',
      'status',
      'name',
      'invoice_amount',
      'service_date',
      'currency',
      'invoice_date',
      'invoice_number',
      'comment',
      'reminder',
    ];

    fieldsToUpdate.forEach((field) => {
      if (updateData[field] !== undefined) {
        invoice[field] = updateData[field];
      }
    });

    await invoice.save();

    res.json({
      message: 'Invoice updated successfully',
      updatedInvoice: invoice,
    });
  } catch (error) {
    console.log(error);
  }
});

// //Update invoice

// app.put('/api/invoices/:id', async (req, res) => {
//   const invoiceId = req.params.id;
//   const updateData = req.body;
//   try {
//     const invoice = await Invoice.findById(invoiceId);

//     if (!invoice) {
//       return res.status(404).json({ message: 'Invoice not found' });
//     }

//     if (updateData !== undefined) {
//       invoice = updateData;
//     }

//     await invoice.save();

//     res.json({
//       message: 'Invoice updated successfully',
//       updatedInvoice: invoice,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// //Shows all orders with Status - Completed
// app.get('/api/portfolio', async (_req, res) => {
//   try {
//     const orders = await Order.find();
//     const completedOrders = orders.filter(
//       (order) => order.status === 'Completed'
//     );
//     if (!completedOrders) {
//       res.json({ message: 'No Completed Orders found' });
//     } else {
//       res.json(completedOrders);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// //Shows all orders with Status - Pending

app.get('/api/invoices', async (req, res) => {
  try {
    const invoices = await Invoice.find();

    if (!invoices) {
      res.json({ message: 'No Invoices found' });
    } else {
      res.json(invoices);
    }
  } catch (error) {
    console.log(error);
  }
});
