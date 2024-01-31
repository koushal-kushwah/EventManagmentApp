import connection from '../model/connection.js'



export const save = (req, res) => {
  const data = req.body;

  const errors = [];

  if (!data.name) {
    errors.push("Name is required.");
  }

  if (!data.event_id) {
    errors.push("Event Id is required.");
  }

  if (!data.unique_code) {
    errors.push("Unique Code is required.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  connection.query('SELECT id FROM events WHERE id = ?', data.event_id, (selectError, selectResult) => {
    if (selectError) {
      console.error("Error checking event_id:", selectError);
      return res.status(500).json({ error: "An error occurred while checking event_id." });
    }

    if (selectResult.length === 0) {
      return res.status(400).json({ error: "Invalid event_id. Event not found." });
    }

    connection.query('INSERT INTO guests SET ?', data, (error, result, fields) => {
      if (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "An error occurred while saving data." });
      }

      console.log("Data saved successfully");
      res.status(200).json({ message: "Data saved successfully" });
    });
  });
};




export const fetchAllGuests = (req, res) => {
  const sql = 'SELECT * FROM guests';

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Data fetch error: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};




export const fetch = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM guests WHERE id = ${id}`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Data fetch error: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: "ID not found. Please enter a valid ID." });
      } else {
        res.json(results);
      }
    }
  });
};

export const deleteuser = async (req, res) => {
  console.log(req.body);

  const condition_object = req.body;

  connection.query('SELECT * FROM  guests WHERE id = id', condition_object, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ "message": "Server error" });
    }

    if (result.length !== 0) {
      connection.query('DELETE FROM  guests WHERE ?', condition_object, (err, result) => {
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



export const update = (req, res) => {
  const { id, event_id, name, unique_code, designation, email, phone, address, type, company } = req.body;

  const errors = [];

  if (!id) {
    errors.push("ID is required.");
  }

  if (!event_id) {
    errors.push("Event ID is required.");
  }

  if (!name) {
    errors.push("Name is required.");
  }

  if (!unique_code) {
    errors.push("Unique Code is required.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  connection.query('SELECT id FROM events WHERE id = ?', event_id, (eventCheckError, eventCheckResults) => {
    if (eventCheckError) {
      console.error('Error checking event_id:', eventCheckError);
      res.status(500).json({ message: 'Server error' });
      return;
    }

    if (eventCheckResults.length === 0) {
      return res.status(400).json({ error: "Invalid event_id. Event not found." });
    }

    const updateQuery = 'UPDATE guests SET event_id=?, name=?, unique_code=?, designation=?, email=?, phone=?, address=?, type=?, company=? WHERE id = ?';

    connection.query(
      updateQuery,
      [event_id, name, unique_code, designation, email, phone, address, type, company, id],
      (err, result) => {
        if (err) {
          console.error('Error updating data:', err);
          res.status(500).json({ message: 'Server error' });
          return;
        }

        res.status(200).json({ message: 'Data updated successfully' });
      }
    );
  });
};




