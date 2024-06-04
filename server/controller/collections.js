import Invoice from '../models/Invoice.model.js';
import School from '../models/School.model.js';
import Collection from '../models/Collection.model.js';

// List all collections for a school
export async function listCollections(req, res) {
  try {
    const { schoolId } = req.params;

    // Find all collections for the school
    const collections = await Collection.find({ school: schoolId })
      .populate('invoice', 'invoiceNumber')
      .exec();

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
  
      // Calculate the new paidAmount by adding the collection amount to the existing paidAmount
      const newPaidAmount = invoiceDoc.paidAmount + amount;
  
      // Update the invoice's paidAmount and balance
      invoiceDoc.paidAmount = newPaidAmount;
      invoiceDoc.balance -= amount; // Decrease the balance by the collection amount
      await invoiceDoc.save();
  
      const lastCollection = await Collection.findOne().sort({ creationDate: -1 });
      let collectionNumber;
      if (lastCollection) {
        const lastCollectionNumber = parseInt(lastCollection.collectionNumber.replace('COL', ''));
        invoiceNumber = `COL${lastCollectionNumber + 1}`;
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
        amount,
      });
  
      // Save the new collection to the database
      const savedCollection = await collection.save();
  
      // Update the school to include the new collection ID and recalculate balance
      const schoolDoc = await School.findById(school);
      schoolDoc.collections.push(savedCollection._id);
      schoolDoc.balance -= amount; // Decrease the balance by the collection amount
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
  
// Update the status of a collection
export async function updateCollectionStatus(req, res) {
  try {
    const { collectionId } = req.params;
    const { status } = req.body;

    // Update the collection status
    const collection = await Collection.findById(collectionId);
    if (!collection) {
      return res.status(404).send({ error: 'Collection not found' });
    }

    collection.status = status;
    await collection.save();

    return res.status(200).send({
      message: 'Collection status updated successfully',
      collection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}
