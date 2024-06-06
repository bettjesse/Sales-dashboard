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


router.route("/collections/:id/status").put(collectionController.updateCollectionStatus)

router.route("/schools").get(schoolController.getAllSchools)
router.route("/schools/:schoolId").get(schoolController.getSchoolById)
router.route("/all-invoice").get(controller.allInvoices)
router.route("/create-collection").post(collectionController.createCollection)
router.route("/schools/:schoolId/collections").get(collectionController.listCollectionsBySchool)
router.route("/collections").get(collectionController.listCollections)
router.route("/invoices/:id").put(controller.editInvoice)


export default router