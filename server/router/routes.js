import { Router } from "express";
const router= Router()

import * as controller from "../controller/invoice.js"


router.route("/new-invoice").post(controller.createInvoice)

router.route("/new-school").post(controller.createSchool)

router.route("/invoices/:schoolId").get(controller.listAllInvoices)
router.route("/invoice/:id").get(controller.getInvoice)
router.route("/collections").post(controller.addCollectionToInvoice)
router.route("/collections/:id").put(controller.updateCollectionStatus)
router.route("/invoice/update/:id").put(controller.updateInvoice)
router.route("/schools").get(controller.getAllSchools)
router.route("/schools/:id").get(controller.getSchoolById)
router.route("/all-invoice").get(controller.allInvoices)


export default router