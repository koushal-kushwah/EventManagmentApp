import connection from '../model/connection.js'



export const save = (req, res) => {
  const data = req.body;
  const { function_id, event_id } = data;

  if (!data.function_id) {
    return res.status(400).json({ error: "Function ID is required." });
  }

  if (!data.event_id) {
    return res.status(400).json({ error: "Event ID is required." });
  }

  if (!data.title) {
    return res.status(400).json({ error: "Title is required." });
  }

  connection.query('SELECT id FROM events WHERE id = ?', event_id, (eventCheckError, eventCheckResults) => {
    if (eventCheckError) {
      console.error('Error checking event_id:', eventCheckError);
      return res.status(500).json({ error: 'Server error' });
    }

    if (eventCheckResults.length === 0) {
      return res.status(400).json({ error: "Invalid event_id. Event not found." });
    }

    connection.query('SELECT id FROM event_functions WHERE id = ?', function_id, (functionCheckError, functionCheckResults) => {
      if (functionCheckError) {
        console.error('Error checking function_id:', functionCheckError);
        return res.status(500).json({ error: 'Server error' });
      }

      if (functionCheckResults.length === 0) {
        return res.status(400).json({ error: "Invalid function_id. Function not found." });
      }

      connection.query('INSERT INTO function_schedules SET ?', data, (insertError, result, fields) => {
        if (insertError) {
          console.error("Error:", insertError);
          return res.status(500).json({ error: "An error occurred while saving data." });
        }

        console.log("Data saved successfully");
        res.status(200).json({ message: "Data saved successfully" });
      });
    });
  });
};


export const fetchAll = async (req, res) => {
  const sql = `SELECT * FROM function_schedules`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Data fetch error: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json(results);
  });
};


export const fetch = async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM function_schedules WHERE id = ${id}`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Data fetch error: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "ID not found" });
    }

    res.json(results);
  });
};

export const deleteuser = async (req, res) => {
  const id = req.params.id; 

  connection.query(
    'DELETE FROM function_schedules WHERE id = ?',
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Record not found' });
      }

      return res.status(201).json({ message: 'Record deleted successfully' });
    }
  );
};


export const updateuser = (req, res) => {
  const values = req.body;
  const id = req.params.id;

  // Ensure that the 'id' field is present in the request body
  if (!id) {
    return res.status(400).json({ error: 'ID is required in the request body.' });
  }

  // Prepare an array to store promises for each update query
  const updatePromises = [];

  // Iterate through the fields in 'values' and create a promise for each valid field to update
  for (const field in values) {
    if (values.hasOwnProperty(field)) {
      const value = values[field];
      // Ensure that the field name is valid to prevent SQL injection
      if (['function_id', 'event_id', 'title','allowed_guest_ids'].includes(field)) {
        const sql = `UPDATE function_schedules SET ${field} = ? WHERE id = ?`;
        const updatePromise = new Promise((resolve, reject) => {
          connection.query(sql, [value, id], (err, result) => {
            if (err) {
              console.error(`Error updating data for field ${field}:`, err);
              reject(err);
            } else {
              console.log(`Record updated successfully for field: ${field}`);
              resolve(result);
            }
          });
        });
        updatePromises.push(updatePromise);
      }
    }
  }

  Promise.all(updatePromises)
    .then(() => {
      res.status(200).json({ message: 'Event function data updated successfully' });
    })
    .catch((err) => {
      res.status(500).json({ error: 'An error occurred while updating event function data.' });
    });
};

// export const updateuser = (req, res) => {
//   const id = req.params.id;
//   const {title } = req.body;

//   const errors = [];

//   if (!id) {
//     errors.push("ID is required.");
//   }
//   if (!title) {
//     errors.push("Title is required.");
//   }

//   if (errors.length > 0) {
//     return res.status(400).json({ errors });
//   }

//   const defaultAllowedX = 1;
//   const defaultAllowedGuestGroups = "all";
//   const defaultAllowedGuestIds = "all"; 

//   const updatedAllowedX = allowed_x !== undefined ? allowed_x : defaultAllowedX;
//   const updatedAllowedGuestGroups = allowed_guest_groups !== undefined ? allowed_guest_groups : defaultAllowedGuestGroups;
//   const updatedAllowedGuestIds = allowed_guest_ids !== undefined ? allowed_guest_ids : defaultAllowedGuestIds;

//     connection.query(`SELECT * FROM event_functions WHERE id = ${{id}}`, function_id, (functionCheckError, functionCheckResults) => {
//       if (functionCheckError) {
//         console.error('Error checking function_id:', functionCheckError);
//         return res.status(500).json({ error: 'Server error' });
//       }

//       if (functionCheckResults.length === 0) {
//         return res.status(400).json({ error: "Invalid function_id. Function not found." });
//       }

//       connection.query(`UPDATE function_schedules SET function_id=?, event_id=?, title=?, start_dt=?, end_dt=?, allowed_x=?, allowed_guest_groups=?, allowed_guest_ids=? WHERE id = ${id}`, 
//         [title], 
//         (insertError, result, fields) => {
//           if (insertError) {
//             console.error("Error:", insertError);
//             return res.status(500).json({ error: "An error occurred while saving data." });
//           }
          
//           res.status(200).json({ message: "Data updated successfully" });
//         }
//       );
//     });
//   }


