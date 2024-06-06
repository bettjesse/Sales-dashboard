import Invoice from '../models/Invoice.model.js';
import School from '../models/School.model.js';
import Collection from '../models/Collection.model.js';


export async function listCollections(req, res) {
  try {
    // Find all collections and populate the invoice field to get the invoice number
    const collections = await Collection.find({})
      .populate('invoice', 'invoiceNumber')
      .populate('school', 'name') 
      .select('collectionNumber invoice dateOfCollection status amount')
      .exec();

    // Send the response with the collections
    return res.status(200).send(collections);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}

export async function listCollectionsBySchool(req, res) {
    try {
      const { schoolId } = req.params;
  
      const collections = await Collection.find({ school: schoolId })
        .populate('invoice', ['invoiceNumber'])
        .select('invoice dateOfCollection status amount collectionNumber')
        .exec();
  
      return res.status(200).send(collections);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: 'Internal server error' });
    }
  }
  


export async function createCollection(req, res) {
  try {
    const { invoice, school, dateOfCollection, status, amount } = req.body;

    // Find the invoice associated with the collection
    const invoiceDoc = await Invoice.findById(invoice);
    if (!invoiceDoc) {
      return res.status(404).send({ error: 'Invoice not found' });
    }

    // Ensure amount is a number
    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber)) {
      return res.status(400).send({ error: 'Invalid amount' });
    }

    // Calculate the new paidAmount by adding the collection amount to the existing paidAmount
    const currentPaidAmount = parseFloat(invoiceDoc.paidAmount) || 0;
    const newPaidAmount = currentPaidAmount + amountNumber;

    // Update the invoice's paidAmount and balance
    invoiceDoc.paidAmount = newPaidAmount;
    invoiceDoc.balance -= amountNumber; // Decrease the balance by the collection amount
    await invoiceDoc.save();

    // Get the last collection to generate a new collection number
    const lastCollection = await Collection.findOne().sort({ creationDate: -1 });
    let collectionNumber;
    if (lastCollection) {
      const lastCollectionNumber = parseInt(lastCollection.collectionNumber.replace('COL', ''));
      collectionNumber = `COL${lastCollectionNumber + 1}`;
    } else {
      collectionNumber = 'COL1';
    }

    // Create a new collection instance
    const collection = new Collection({
      invoice,
      school,
      dateOfCollection,
      collectionNumber,
      status,
      amount: amountNumber,
    });

    // Save the new collection to the database
    const savedCollection = await collection.save();

    // Update the school to include the new collection ID and recalculate balance
    const schoolDoc = await School.findById(school);
    schoolDoc.collections.push(savedCollection._id);
    schoolDoc.balance -= amountNumber; // Decrease the balance by the collection amount
    await schoolDoc.save();

    return res.status(201).send({
      message: 'Collection created successfully',
      collection: savedCollection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}

  


export async function updateCollectionStatus(req, res) {
  try {
    const { id } = req.params; 
    const { status } = req.body; // New status ("Bounced" or "Valid")

    console.log("UPDATING COLLECTION WITH ID", id)

    // Find the collection by ID and update its status
    const updatedCollection = await Collection.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated collection after the update
    );

    if (!updatedCollection) {
      return res.status(404).json({ error: 'Collection not found' });
    }

    return res.status(200).json({ message: 'Collection status updated successfully', collection: updatedCollection });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
