import express from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomerByAccountNumber,
  updateBalance,
  depositMoney,
  withdrawMoney,
  deleteCustomer,
  filterByBalance,
  filterByCity,
  filterByAccountType,
} from "../controllers/customer.controller.js";


// ----- Specific / static routes FIRST -----
router.get("/filter/balance", filterByBalance);       // GET  /customers/filter/balance?minBalance=10000
router.get("/filter/city", filterByCity);              // GET  /customers/filter/city?city=Dehradun
router.get("/filter/account-type", filterByAccountType); // GET /customers/filter/account-type?accountType=saving

// ----- General collection routes -----
router.post("/", createCustomer);                      // POST /customers
router.get("/", getAllCustomers);                       // GET  /customers

// ----- Dynamic routes LAST (must come after the /filter/... routes) -----
router.get("/:accountNumber", getCustomerByAccountNumber);        // GET    /customers/101
router.patch("/:accountNumber/balance", updateBalance);           // PATCH  /customers/101/balance
router.patch("/:accountNumber/deposit", depositMoney);             // PATCH  /customers/101/deposit
router.patch("/:accountNumber/withdraw", withdrawMoney);           // PATCH  /customers/101/withdraw
router.delete("/:accountNumber", deleteCustomer);                  // DELETE /customers/101

export default router;