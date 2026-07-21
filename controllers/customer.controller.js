import Customer from "../model/customer.model.js";

export const createCustomer = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);

        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            data: customer,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();

        res.status(200).json({
            success: true,
            count: customers.length,
            data: customers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getCustomerByAccountNumber = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    // findOne -> Shape 1 query from notes: { field: value } = exact match
    const customer = await Customer.findOne({ accountNumber });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch customer", error: error.message });
  }
};

export const updateBalance = async (req, res) => {
  try {
    const { accountNumber } = req.params;
    const { balance } = req.body;

    const customer = await Customer.findOneAndUpdate(
      { accountNumber },     // WHICH document to find
      { balance },            // WHAT to change
      { new: true }           // return the UPDATED document, not the old one
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Balance updated successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update balance", error: error.message });
  }
};

export const depositMoney = async (req, res) => {
  try {
    const { accountNumber } = req.params;
    const { amount } = req.body;

    // $inc increases the existing value instead of overwriting it
    // e.g. current balance = 5000, amount = 2000 -> new balance = 7000
    const customer = await Customer.findOneAndUpdate(
      { accountNumber },
      { $inc: { balance: amount } },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Amount deposited successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to deposit amount", error: error.message });
  }
};

export const withdrawMoney = async (req, res) => {
  try {
    const { accountNumber } = req.params;
    const { amount } = req.body;

    // Here we can't just $inc with a negative number blindly,
    // because we must first CHECK if enough balance exists.
    // So: 1) fetch the document, 2) check in JS, 3) save manually.
    const customer = await Customer.findOne({ accountNumber });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (customer.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    customer.balance = customer.balance - amount;

    // .save() re-validates the document against the schema and
    // writes the change back to MongoDB. This is the "document instance"
    // way of updating, as opposed to findOneAndUpdate's "query" way.
    await customer.save();

    res.status(200).json({
      message: "Amount withdrawn successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to withdraw amount", error: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const customer = await Customer.findOneAndDelete({ accountNumber });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer deleted successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete customer", error: error.message });
  }
};

export const filterByBalance = async (req, res) => {
  try {
    const { minBalance } = req.query;

    // { balance: { $gt: minBalance } } -> balance > minBalance
    const customers = await Customer.find({
      balance: { $gt: minBalance },
    });

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Failed to filter by balance", error: error.message });
  }
};

export const filterByCity = async (req, res) => {
  try {
    const { city } = req.query;

    const customers = await Customer.find({ city });

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Failed to filter by city", error: error.message });
  }
};

export const filterByAccountType = async (req, res) => {
  try {
    const { accountType } = req.query;

    const customers = await Customer.find({ accountType });

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Failed to filter by account type", error: error.message });
  }
};