// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import connection from '../model/connection.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../model/connection.js';



export const save = (req, res) => {
  const data = req.body;
  if (!data.name) {
    return res.status(400).json({ error: "Name is required. Please enter name." });
  } else if (!data.email || !/^[A-Za-z0-9+_.-]+@(.+)$/.test(data.email)) {
    return res.status(400).json({ error: "Email is required and must be a valid email address." });
  } else if (!data.password) {
    return res.status(400).json({ error: "Password is required. Please enter a password." });
  } else if (!data.role) {
    return res.status(400).json({ error: "Role is required. Please enter a role." });
  } else if (!['admin', 'manager', 'event_organizer', 'event_manager', 'event_volunteer'].includes(data.role)) {
    return res.status(400).json({ error: "Please enter a valid role ('admin', 'manager', 'event_organizer', 'event_manager', 'event_volunteer')." });
  }

  const phone = data.phone || null;
  const event_id = data.event_id || null;

  connection.query('INSERT INTO users (name, email, phone, password, role, event_id) VALUES (?, ?, ?, ?, ?, ?)',
    [data.name, data.email, phone, data.password, data.role, event_id],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: "An error occurred while saving data." });
      }

      res.status(200).json({ message: "Data have been saved." });
    }
  );
};




export const fetchAll = async (req, res) => {
  const sql = `SELECT * FROM users`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Data fetch error: ", error);
      return res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
};



export const fetch = async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM users WHERE id = ${id}`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Data fetch error: ", error);
      return res.status(500).send("Internal Server Error");
    } else {
      if (results.length === 0) {
        return res.status(404).json({ error: "ID is not found. Please enter a valid ID." });
      }
      res.json(results);
    }
  });
};




export const deleteuser = async (req, res) => {
  console.log(req.body);

  const condition_object = req.body;

  connection.query('SELECT * FROM  users WHERE ?', condition_object, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ "message": "Server error" });
    }

    if (result.length !== 0) {
      connection.query('DELETE FROM  users WHERE ?', condition_object, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ "message": "Server error" });
        }

        return res.status(201).json({ "message": "Record deleted successfully" });
      });
    } else {
      return res.status(404).json({ "message": "Record not found" });
    }
  });
};



export const updateuser = (req, res) => {
  const values = req.body;
  const id = req.body.id;

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const validRoles = ['admin', 'manager', 'event_organizer', 'event_manager', 'event_volunteer'];

  for (let i in values) {
    const value = values[i];

    if (i === 'role') {
      if (!validRoles.includes(value)) {
        return res.status(400).json({ error: "Please enter a valid role ('admin', 'manager', 'event_organizer', 'event_manager', 'event_volunteer')." });
      }
    }
    if (i === 'email') {
      if (!emailRegex.test(value)) {
        return res.status(400).json({ error: "Please enter a valid email address." });
      }
    }

    const sql = `UPDATE users SET ${i} = ? WHERE id = ?`;
    console.log(value);

    connection.query(sql, [value, id], (err, results) => {
      if (err) {
        console.error('Error : ' + err.message);
        return;
      }
      console.log(`Record updated successfully `);
    });
  }
  res.send(`Update operation completed`);
};


// export const login = (req, res) => {
//   console.log("it's workinggggggggg")
//   const { email, password} = req.body;
//   console.log(email, password )

//   const query = `SELECT * FROM users WHERE email = ?`;

//   connection.query(query, [email], async (err, results) => {
//     if (err) {
//       console.error('Error querying the database: ' + err.stack);
//       return res.status(500).json({ message: 'Server error' });
//     }

//     if (results.length === 1) {
//       const user = results[0];
//       const hashedPassword = user.password;

//       const passwordMatch = await bcrypt.compare(password, hashedPassword);

//       if (passwordMatch) {
//         const payload = { email: user.email, id: user.id }; // Include user data except for the password
//         const secretKey = 'yoursecretkeylikjyhntgbrfvdckujmhyngbfvdclikumjhngbfvdcsxk,mujhngbfvcd'; // Change this to your secret key
//         const options = { expiresIn: '1h' };

//         const token = jwt.sign(payload, secretKey, options);
//         console.log('Generated Token:', token);

//         res.status(200).json({ message: 'Login successful', token, user });
//       } else {
//         res.status(401).json({ message: 'Invalid login credentials' });
//       }   
//     } else {
//       res.status(401).json({ message: 'Invalid login credentials' });
//     }
//   });
// };


// export const login = (req, res) => {
//   const { email, password } = req.body;

//   const query = `SELECT * FROM users WHERE email = ?`;

//   connection.query(query, [email,password], async (err, results) => {
//     if (err) {
//       console.error('Error querying the database: ' + err.stack);
//       return res.status(500).json({ message: 'Server error' });
//     }

//     if (results.length === 1) {
//       const user = results[0];

//       // Compare the provided password with the hashed password
//       const passwordMatch = await bcrypt.compare(password, user.password);

//       console.log(password);
//       console.log(user.password);

//       if (passwordMatch) {
//         const payload = { email: user.email, password: user.password }; // Include user ID in the payload
//         const secretKey = 'your-secret-key'; // Change this to your secret key
//         const options = { expiresIn: '1h' };
//         console.log(payload)

//         const token = jwt.sign(payload, secretKey, options);
//         console.log('Generated Token:', token);

//         res.status(200).json({ message: 'Login successful', token, user });
//       } else {
//         res.status(401).json({ message: 'Invalid login credentials' });
//       }
//     } else {
//       res.status(401).json({ message: 'Invalid login credentials' });
//     }
//   });
// };




export const login = (req, res) => {

  const { email, password } = req.body;
 

  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;

  connection.query(query, [email, password], (err, results, fields) => {

    if (err) {
       console.error('Error querying the database: ' + err.stack);
       console.log(err)
       return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 1) {
      const payload = { email: results[0].email};
      const secretKey = 'your-secret-key'; 
      const options = { expiresIn: '1h' }; 

      const token = jwt.sign(payload, secretKey, options);

      res.status(200).json({ message: 'Login successful',token});
      
      console.log("succesfull")
    } else {
      res.status(401).json({ message: 'Invalid login credentials' });
    }
  });
};



// ############################################################################
// export const login = (req, res) => {
//   const { email, password } = req.body;

//   const query = `SELECT * FROM users WHERE email = ?`;

//   connection.query(query, [email], (err, results) => {
//     if (err) {
//       console.error('Error querying the database: ' + err.stack);
//       return res.status(500).json({ message: 'Server error' });
//     }

//     if (results.length === 1) {
//       const user = results[0];
//       bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
//         if (bcryptErr || !bcryptResult) {
//           return res.status(401).json({ message: 'Invalid login credentials' });
//         }

//         const payload = { email: user.email };
//         const secretKey = 'your-secret-key'; 
//         const options = { expiresIn: '1h' };

//         const token = jwt.sign(payload, secretKey, options);

//         res.status(200).json({ message: 'Login successful', token });
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid login credentials' });
//     }
//   });
// };






