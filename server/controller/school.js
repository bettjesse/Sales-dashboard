import School from '../models/School.model.js';

export async function getSchoolById(req, res) {
  try {
    const { schoolId } = req.params;

    console.log(`Looking for school with ID: ${schoolId}`);

    // Find the school by ID and populate invoices and collections
    const school = await School.findById(schoolId)
      .populate('invoices')
      .populate('collections')
      .exec();

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
      invoices: school.invoices,
      collections: school.collections
    };

    return res.status(200).send(schoolDetails);
  } catch (error) {
    console.error('Error fetching school:', error);
    return res.status(500).send({ error: 'Internal server error' });s
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
  
  
  
 

export async function getAllSchools(req, res) {
  try {
    const schools = await School.find().exec();

    return res.status(200).send(schools);
  } catch (error) {
    console.error('Error fetching schools:', error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}
