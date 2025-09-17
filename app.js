import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());

let customers = [
  { id: 1, name: "John Doe", email: "jhondon@gmail.com" },
  { id: 2, name: "Jane Smith", email: "janesmith@gmail.com" },
  { id: 3, name: "Alice Johnson", email: "alicejhonson@gmail.com" },
];

//GET
app.get("/customers", (req, res) => {
  res.status(200).json(customers);
});

//GET id
app.get("/customers/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const customer = customers.find(c => c.id === id);
    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }
   res.status(200).json(customer);
});

//POST
app.post("/customers", (req, res) => {
  const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }
  const id = customers[customers.length - 1]?.id + 1 || 1;
  const newCustomer = { id, name, email };
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

//PUT
app.put("/customers/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let customer = customers.find(c => c.id === id);
    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }
    const index = customers.indexOf(customer);
    customer = { ...customer, name, email };
    customers[index] = customer;
    res.status(200).json(customer);
});

//DELETE
app.delete("/customers/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const customer = customers.find(c => c.id === id);
    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }
    customers = customers.filter(c => c.id !== id);
    res.status(200).json({ message: "Customer deleted successfully" });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
