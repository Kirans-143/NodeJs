const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8080;

//Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/testApp")
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log("Error Occured while connecting ", err));

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

//MiddleWare
app.use(express.urlencoded({ extended: false }));

//Routes
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `<ul>${allDbUsers
    .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
    .join("")}</ul>`;
  res.send(html);
});
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});

//REST API
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  })

  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
    return res.json({ status: "Successfully updated lastName" });
  })
  .put((req, res) => {
    return res.json({ status: "pending" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: " Successfully deleted" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ message: "All fields are required...." });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  console.log("result", result);

  return res.status(201).json({
    message: "User created Successfully",
  });
});
app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}`);
});
