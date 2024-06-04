import { Router } from "express";
const router= Router()

import * as controller from "../controller/invoice.js"
import * as collectionController from "../controller/collections.js"
import * as schoolController from "../controller/school.js"



router.route("/new-invoice").post(controller.createInvoice)

router.route("/new-school").post(schoolController.createSchool)

router.route("/invoices/:schoolId").get(controller.listAllInvoices)
router.route("/invoice/:id").get(controller.getInvoice)
router.route("/collections").post(controller.addCollectionToInvoice)
router.route("/collections/:id").put(controller.updateCollectionStatus)
router.route("/invoice/update/:id").put(controller.updateInvoice)
router.route("/schools").get(schoolController.getAllSchools)
router.route("/schools/:schoolId").get(schoolController.getSchoolById)
router.route("/all-invoice").get(controller.allInvoices)
router.route("/create-collection").post(collectionController.createCollection)
router.route("/schools/:schoolId/collections").get(collectionController.listCollectionsBySchool)


export default router