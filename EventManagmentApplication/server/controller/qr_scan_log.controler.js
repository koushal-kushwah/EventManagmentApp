import connection from '../model/connection.js'

export const save = (req, res) => {
  const data = req.body;
  console.log(data);

  const errorMessages = [];

  if (!data.user_id) {
    errorMessages.push("user_id field is required");
  }

  if (!data.guest_id) {
    errorMessages.push("guest_id field is required");
  }

  if (!data.event_id) {
    errorMessages.push("event_id field is required");
  }

  if (!data.function_id) {
    errorMessages.push("function_id field is required");
  }

  if (!data.schedule_id) {
    errorMessages.push("schedule_id field is required");
  }

  if (!data.status) {
    errorMessages.push("status field is required");
  } else if (data.status !== 'success' && data.status !== 'failed') {
    errorMessages.push("status field must be 'success' or 'failed'");
  }

  if (errorMessages.length > 0) {
    res.status(400).json({ errors: errorMessages });
  } else {
    connection.query('INSERT INTO qr_scan_log SET ?', data, (error, result, fields) => {
      if (error) {
        console.log("error", error);
        res.status(500).json({ error: "An error occurred" });
      } else {
        console.log("Qr Scan Successfully");
        res.status(200).json({ message: "Qr Scan Successfully" });
      }
    });
  }
};


export const fetchAll = async (req, res) => {
  const sql = "SELECT * FROM qr_scan_log";

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Data fetch error: ", error);
      return res.status(500).send("Internal Server Error");
    } else {
      if (results.length === 0) {
        return res.status(404).json({ message: "Data not found" });
      }

      res.json(results);
    }
  });
};


// export const fetchAll = async (req, res) => {
//   const sql = "SELECT * FROM qr_scan_log";

//   connection.query(sql, (error, results) => {
//     if (error) {
//       console.error("Data fetch error: ", error);
//       res.status(500).send("Internal Server Error");
//     } else {
//       res.json(results);
//     }
//   });
// };


export const fetch = async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM qr_scan_log WHERE id = ${id}`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Data fetch error: ", error);
      return res.status(500).send("Internal Server Error");
    } else {
      if (results.length === 0) {
        return res.status(404).json({ message: "ID not found" });
      }

      res.json(results);
    }
  });
};

// export const fetch = async (req, res) => {

//   const id = req.params.id;
//   const sql = `SELECT * FROM  qr_scan_log WHERE id = ${id}`;

//   connection.query(sql, (error, results) => {
//     if (error) {
//       console.error("Data fetch error: ", error);

//       res.status(500).send("Internal Server Error");
//     } else {

//       res.json(results);
//     }
//   });

// };



export const deleteuser = async (req, res) => {
  console.log(req.body);

  const condition_object = req.body;

  connection.query('SELECT * FROM  qr_scan_log WHERE ?', condition_object, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ "message": "Server error" });
    }

    if (result.length !== 0) {
      connection.query('DELETE FROM  qr_scan_log WHERE ?', condition_object, (err, result) => {
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
  const { id, user_id, guest_id, event_id, function_id, schedule_id, status, remark } = req.body;

  const errorMessages = [];

  if (!id) {
    errorMessages.push("id field is required");
  }

  if (!user_id) {
    errorMessages.push("user_id field is required");
  }

  if (!guest_id) {
    errorMessages.push("guest_id field is required");
  }

  if (!event_id) {
    errorMessages.push("event_id field is required");
  }

  if (!function_id) {
    errorMessages.push("function_id field is required");
  }

  if (!schedule_id) {
    errorMessages.push("schedule_id field is required");
  }

  if (!status) {
    errorMessages.push("status field is required");
  }

  if (errorMessages.length > 0) {
    return res.status(400).json({ errors: errorMessages });
  }

  const checkIdQuery = 'SELECT id FROM qr_scan_log WHERE id = ?';
  connection.query(checkIdQuery, [id], (idError, idResult) => {
    if (idError) {
      console.error('Error checking id:', idError);
      return res.status(500).json({ message: 'Server error' });
    }

    if (idResult.length === 0) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const checkUserQuery = 'SELECT id FROM users WHERE id = ?';
    connection.query(checkUserQuery, [user_id], (userError, userResult) => {
      if (userError) {
        console.error('Error checking user_id:', userError);
        return res.status(500).json({ message: 'Server error' });
      }

      if (userResult.length === 0) {
        return res.status(400).json({ message: 'Invalid user_id' });
      }

      const updateQuery = 'UPDATE qr_scan_log SET status = ?, remark = ? WHERE id = ?';
      connection.query(updateQuery, [status, remark, id], (err, result) => {
        if (err) {
          console.error('Error updating data:', err);
          return res.status(500).json({ message: 'Server error' });
        }

        res.status(200).json({ message: 'Data updated successfully' });
      });
    });
  });
};


