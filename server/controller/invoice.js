import Invoice from '../models/Invoice.model.js';
import School from '../models/School.model.js';
import Collection from '../models/Collection.model.js';
import mongoose from 'mongoose';


export async function allInvoices(req, res) {
  try {
    // Retrieve all invoices
    const invoices = await Invoice.find();

    // Send the list of invoices as a response
    return res.status(200).json(invoices);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}

// Controller to list all invoices associated with a school
export async function listAllInvoices(req, res) {
  try {
    // Retrieve all invoices associated with the school
    const invoices = await Invoice.find({ school: req.params.schoolId });

    // Send the list of invoices as a response
    return res.status(200).json(invoices);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}

// Controller to create a new invoice




export async function createInvoice(req, res) {
  try {
    const { school, items, dueDate, amount, paidAmount, balance, status } = req.body;

    // Generate a unique invoice number
    const lastInvoice = await Invoice.findOne().sort({ creationDate: -1 });
    let invoiceNumber;
    if (lastInvoice) {
      const lastInvoiceNumber = parseInt(lastInvoice.invoiceNumber.replace('INV', ''));
      invoiceNumber = `INV${lastInvoiceNumber + 1}`;
    } else {
      invoiceNumber = 'INV1';
    }

    // Create a new invoice instance
    const invoice = new Invoice({
      invoiceNumber,
      school,
      items,
      dueDate,
      amount,
      paidAmount,
      balance,
      status,
    });

    // Save the new invoice to the database
    const savedInvoice = await invoice.save();

    // Update the school to include the new invoice ID and recalculate balance
    const schoolDoc = await School.findById(school);
    schoolDoc.invoices.push(savedInvoice._id);
    schoolDoc.balance += amount; // Increase the balance by the invoice amount
    await schoolDoc.save();

    return res.status(201).send({
      message: 'Invoice created successfully',
      invoice: savedInvoice,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}





// Controller to update an existing invoice
export async function updateInvoice(req, res) {
  try {
    const invoiceId = req.params.id;
    const updates = req.body;

    // Find the invoice by ID and update its details
    const updatedInvoice = await Invoice.findByIdAndUpdate(invoiceId, updates, { new: true });

    return res.status(200).send({
      message: 'Invoice updated successfully',
      invoice: updatedInvoice,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}

// Controller to delete an existing invoice
export async function deleteInvoice(req, res) {
  try {
    const invoiceId = req.params.id;

    // Find the invoice by ID and delete it
    await Invoice.findByIdAndDelete(invoiceId);

    return res.status(200).send({
      message: 'Invoice deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}






export async function getSchoolById(req, res) {
  try {
    const { schoolId } = req.params;

    console.log(`Looking for school with ID: ${schoolId}`);

    // Find the school by ID
    const school = await School.findById(schoolId).exec();

    if (!school) {
      console.error(`School not found with ID: ${schoolId}`);
      return res.status(404).send({ error: 'School not found' });
    }

    const schoolDetails = {
      name: school.name,
      type: school.type,
      product: school.product,
      county: school.county,
      registrationDate: school.registrationDate,
      contactInformation: {
        phone: school.contactInformation.phone,
        email: school.contactInformation.email,
      },
      balance: school.balance,
    };

    return res.status(200).send(schoolDetails);
  } catch (error) {
    console.error('Error fetching school:', error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}




// Controller to create a new school




export async function createSchool(req, res) {
  try {
    const {
      name,
      type,
      product,
      county,
      registrationDate,
      address,
      contactInformation: { email, phone }
    } = req.body;

    // Create a new school instance
    const school = new School({
      name,
      type,
      product,
      county,
      registrationDate,
      contactInformation: {
        email,
        phone,
      },
      address,
    });

    // Save the new school to the database
    await school.save();

    return res.status(201).send({
      message: 'School created successfully',
      school,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}










// Controller to get all schools
export async function getAllSchools(req, res) {
  try {
    // Retrieve all schools from the database
    const schools = await School.find();

    // Send the list of schools as a response
    return res.status(200).json(schools);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}



// Controller to add a collection to an invoice
export async function addCollectionToInvoice(req, res) {
  try {
    const { invoiceId, collectionNumber, amount, status } = req.body;

    // Create a new collection instance
    const collection = new Collection({
      invoice: invoiceId,
      collectionNumber,
      amount,
      status
    });

    // Save the new collection to the database
    await collection.save();

    // Update the invoice with the new collection amount
    const invoice = await Invoice.findById(invoiceId);
    invoice.paidAmount += amount;
    invoice.balance = invoice.amount - invoice.paidAmount;
    invoice.status = invoice.balance > 0 ? 'Pending' : 'Completed';
    await invoice.save();

    return res.status(201).send({
      message: 'Collection added successfully',
      collection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}

// Controller to update the collection status
export async function updateCollectionStatus(req, res) {
  try {
    const collectionId = req.params.id;
    const { status } = req.body;

    // Find the collection by ID and update its status
    const collection = await Collection.findById(collectionId);
    collection.status = status;
    await collection.save();

    // If the collection status is 'Bounced', update the invoice status
    if (status === 'Bounced') {
      const invoice = await Invoice.findById(collection.invoice);
      invoice.status = 'Pending';
      await invoice.save();
    }

    return res.status(200).send({
      message: 'Collection status updated successfully',
      collection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}

// Controller to get a single invoice by ID
export async function getInvoice(req, res) {
    try {
      const invoiceId = req.params.id;
  
      // Find the invoice by ID
      const invoice = await Invoice.findById(invoiceId);
  
      if (!invoice) {
        return res.status(404).send({ error: 'Invoice not found' });
      }
  
      return res.status(200).json(invoice);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: 'Internal server error' });
    }
  }
  