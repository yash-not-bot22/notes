const express = require("express");
const User = require("../models/User");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT_SECRET = "hellodarknesssmile";
const router = express.Router();
const jwt = require("jsonwebtoken");
const userdetails = require("../middleware/userdetails");
router.post(
  "/createuser",
  // validation through express validator npm package
  body("name").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),

  async (req, res) => {
    // if errors in th eformat
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    //to check if email already exists or not
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "user with email already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const secPAss = bcrypt.hashSync(req.body.password, salt);
    //creating user and sending response
    try{
      user = await User.create({
        name: req.body.name,
        password: secPAss,
        email: req.body.email,
      });
      //jwt token send using id in db of user
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    }catch(e)
    {
      console.log(e.message);
      res.status(400).json(e);
    }
    
  }
);

//login endpoint
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    //to get email and password from user
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "user does not exists" });
      }

      const passwordcompare = await bcrypt.compare(password, user.password);
      if (passwordcompare==false) {
        return res.status(400).json({ error: "incorrect passsword" });
      }
     

      const payload = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(payload, JWT_SECRET);
      res.json({ authtoken });
    } catch (e) {
      console.error(e.message);
      res.status(400).send("error occured");
    }
  }
);

// to view user endpoint

router.post("/profile", userdetails, async (req, res) => {
  const userid = req.user.id;
  try{const user = await User.findById(userid).select("-password");
  res.send(user);}catch(e){
    console.log(e);
    res.status(400).json(e);
  }
});

module.exports = router;
