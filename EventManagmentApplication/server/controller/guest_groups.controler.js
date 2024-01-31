import connection from '../model/connection.js'


export const save = (req, res) => {
  const data = req.body;
  const errorMessages = [];

  if (!data.event_id) {
    errorMessages.push("event_id field is required");
  }

  if (!data.name) {
    errorMessages.push("name field is required");
  }

  if (!data.slug) {
    errorMessages.push("slug field is required");
  }

  if (errorMessages.length > 0) {
    return res.status(400).json({ errors: errorMessages });
  }

  const checkEventQuery = 'SELECT id FROM events WHERE id = ?';
  connection.query(checkEventQuery, [data.event_id], (eventError, eventResult) => {
    if (eventError) {
      console.error("Error checking event_id:", eventError);
      return res.status(500).json({ error: "An error occurred while checking event_id" });
    }

    if (eventResult.length === 0) {
      return res.status(400).json({ errors: ["Invalid event_id"] });
    }

    connection.query('INSERT INTO guest_groups SET ?', data, (insertError, result, fields) => {
      if (insertError) {
        console.error("Error:", insertError);
        return res.status(500).json({ error: "An error occurred while saving data." });
      }

      console.log("Data saved successfully");
      res.status(200).json({ message: "Data saved successfully" });
    });
  });
};


export const fetchAll = async (req, res) => {
  const sql = "SELECT * FROM guest_groups";

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Data fetch error: ", error);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
};



export const fetch = async (req, res) => {

  const id = req.params.id;
  const sql = `SELECT * FROM  guest_groups WHERE id = ${id}`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Data fetch error: ", error);

      res.status(500).send("Internal Server Error");
    } else {

      res.json(results);
    }
  });

};


export const deleteuser = async (req, res) => {
  console.log(req.body);

  const condition_object = req.body;

  connection.query('SELECT * FROM  guest_groups WHERE ?', condition_object, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ "message": "Server error" });
    }

    if (result.length !== 0) {
      connection.query('DELETE FROM  guest_groups WHERE ?', condition_object, (err, result) => {
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
  const { id, name, event_id, slug } = req.body;

  const errorMessages = [];


  if (!id) {
    errorMessages.push("Id field is required");
  }

  if (!event_id) {
    errorMessages.push("event_id field is required");
  }

  if (!name) {
    errorMessages.push("name field is required");
  }

  if (!slug) {
    errorMessages.push("slug field is required");
  }

  if (errorMessages.length > 0) {
    return res.status(400).json({ errors: errorMessages });
  }

  connection.query('SELECT id FROM events WHERE id = ?', event_id, (eventError, eventResults) => {
    if (eventError) {
      console.error('Error checking event_id:', eventError);
      return res.status(500).json({ message: 'Server error' });
    }

    if (eventResults.length === 0) {
      return res.status(400).json({ message: 'Invalid event_id. Event not found.' });
    }

    const updateQuery = 'UPDATE guest_groups SET name=?, event_id=?, slug=? WHERE id = ?';

    connection.query(updateQuery, [name, event_id, slug, id], (updateError, result) => {
      if (updateError) {
        console.error('Error updating data:', updateError);
        res.status(500).json({ message: 'Server error' });
        return;
      }

      res.status(200).json({ message: 'Data updated successfully' });
    });
  });
};
