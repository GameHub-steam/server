const prisma = require("../db/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



 const signin = async (req, res) => {

    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(404).json("Email or Password should be provided");
    }
  
    try {
      const admin = await prisma.admin.findUnique({
        where: {
          email: email,
        },
      });
      if (!admin) {
        return res.status(404).json("admin not found");
      }

      
  
      const cofirmPassword = await bcrypt.compare(password, admin.password);
  
      if (!cofirmPassword) {
        return res.status(401).json("Password is incorrect.");
      }
  
      const token = jwt.sign(
        {
          adminId: admin.id,
          role: "admin",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );


  
      let loggedUser = {
        id: admin.id,
        FullName: admin.FullName,

      };
  
      res.status(200).json({ loggedUser, token, message: "Login succeeded" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
 
    }
}

module.exports={
signin,
}