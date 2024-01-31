import connection from '../model/connection.js'


export const save = (req, res) => {
  const data = req.body;

  if (!data.user_id) {
    return res.status(400).json({ error: "User Id is required. Please enter a User Id." });
  } else if (!data.activity || !data.tbl || !data.tbl_key || !data.tbl_value) {
    return res.status(400).json({ error: "All fields (activity, tbl, tbl_key, tbl_value) are required. Please fill in all the fields." });
  }

  connection.query('SELECT * FROM users WHERE id = ?', data.user_id, (userError, userResults) => {
    if (userError) {
      console.error("Error checking user_id:", userError);
      return res.status(500).json({ error: "An error occurred while checking User Id." });
    }

    if (userResults.length === 0) {
      return res.status(400).json({ error: "Invalid User Id. User not found." });
    }

      connection.query('INSERT INTO activity_log SET ?', data, (insertError, result, fields) => {
        if (insertError) {
          console.error("Error inserting activity log:", insertError);
          return res.status(500).json({ error: "An error occurred while saving activity log." });
        }

        console.log("Activity log saved");
        res.status(200).json({ message: "Activity log saved" });
      });
    });
  };




export const fetchAll = async (req, res) => {
  const sql = `SELECT * FROM activity_log`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Data fetch error: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Data fetched successfully");
      res.json(results);
    }
  });
};


export const fetch = async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM activity_log WHERE id = ${id}`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Data fetch error: ", error);
      res.status(500).send("Internal Server Error");
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: "ID not found" });
      } else {
        res.json(results);
      }
    }
  });
};


export const deleteuser = async (req, res) => {
  console.log(req.body);

  const condition_object = req.body;

  connection.query('SELECT * FROM activity_log WHERE ?', condition_object, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ "message": "Server error" });
    }

    if (result.length !== 0) {
      connection.query('DELETE FROM activity_log WHERE ?', condition_object, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ "message": "Server error" });
        }

        return res.status(201).json({ "message": "Record deleted successfully" });
      });
    } else {
      return res.status(404).json({ "message": "Record have not found" });
    }
  });
};



export const updateuser = (req, res) => {
  const { id, user_id, event_id, activity, tbl, tbl_key, tbl_value } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Id must be filled in.' });
  }
  if (!user_id) {
    return res.status(400).json({ error: 'User Id must be filled in.' });
  }
  if (!activity) {
    return res.status(400).json({ error: 'Activity must be filled in.' });
  }
  if (!tbl) {
    return res.status(400).json({ error: 'TBL must be filled in.' });
  }if (!tbl_key ) {
    return res.status(400).json({ error: 'TBL Key must be filled in.' });
  }if (!tbl_value) {
    return res.status(400).json({ error: 'TBL Value must be filled in.' });
  }

  const userQuery = 'SELECT * FROM users WHERE id = ?';
  connection.query(userQuery, user_id, (userError, userResults) => {
    if (userError) {
      console.error('Error checking user_id:', userError);
      return res.status(500).json({ error: 'Server error' });
    }

      const updateQuery =
        'UPDATE activity_log SET user_id = ?, event_id = ?, activity = ?, tbl = ?, tbl_key = ?, tbl_value = ? WHERE id = ?';
      connection.query(updateQuery, [user_id, event_id, activity, tbl, tbl_key, tbl_value, id], (updateError, updateResult) => {
        if (updateError) {
          console.error('Error updating data:', updateError);
          return res.status(500).json({ error: 'Server error' });
        }

        res.status(200).json({ message: 'Data updated successfully' });
      });
    });
  };

