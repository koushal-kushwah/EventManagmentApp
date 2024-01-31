import connection from '../model/connection.js'

  export const save = (req, res) => {
    const data = req.body;
    const errors = [];
  
    function validateField(fieldName, errorMessage) {
      if (!data[fieldName]) {
        errors.push({ field: fieldName, error: errorMessage });
      }
    }
  
    validateField("name", "Name is required. Please enter Name.");
    validateField("event_id", "Event ID is required. Please enter Event ID.");

    if (!data.description || data.description.trim() === '') {
      data.description = null;
    }
    if (!data.icon || data.icon.trim() === '') {
      data.icon = null;
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    
    connection.query(
      'INSERT INTO event_functions (name, event_id,id,description,icon) VALUES (?,?,?,?,?)',
      // 'INSERT INTO event_functions (name, event_id,description,icon) VALUES (?,?,?,?)',
      [data.name, data.event_id,data.id,data.description,data.icon],
      (error, result) => {
        if (error) {
          console.log(error)
          return res.status(500).json({ error: "Please enter id  which exist in event tabel" });
        }
  
        res.status(200).json({ message: "Data has been saved.", result });
      }
    );
  };
  

export const fetchAll = async (req, res) => {
  const sql = `SELECT * FROM event_functions`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Data fetch error: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};


export const fetch = async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM event_functions WHERE id = ${id}`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Data fetch error: ", error);
      return res.status(500).send("Internal Server Error");
    } else {
      if (results.length === 0) {
        return res.status(404).send("ID is not found. Please enter a valid ID.");
      }
      res.json(results);
    }
  });
};

export const deleteuser = async (req, res) => {
  const  id  = req.params.id; 
  connection.query(`DELETE FROM event_functions WHERE id = ${id}`, (deleteErr, deleteResult) => {
    if (deleteErr) {
      console.error('Error deleting records:', deleteErr);
      return res.status(500).json({ message: 'Server error while deleting records' });
    }

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ message: 'No records deleted. ID not found.' });
    }

    return res.status(200).json({ message: 'Record deleted successfully' });
  });
};



export const update = (req, res) => {
  const id = req.params.id;
  const {name, description, icon } = req.body;
  console.log(id)
  console.log(req.body)

  if (!name) {
    return res.status(400).json({ error: "Name is required." });
  }

  const eventCheckQuery = `SELECT * FROM events WHERE id = ${id}`;

  connection.query(eventCheckQuery,(eventCheckError, eventCheckResults) => {
    if (eventCheckError) {
      console.error('Error checking event_id:', eventCheckError);
      res.status(500).json({ message: 'Server error' });
      return;
    }

   
    const updateQuery = `UPDATE event_functions SET name=?, description=?, icon=? WHERE id = ${id}`;

    connection.query(updateQuery, [name, description, icon, id], (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ message: 'Server error' });
        return;
      }

      res.status(200).json({ message: 'Data updated successfully' });
    });
  });
};






