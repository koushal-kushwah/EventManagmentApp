import connection from '../model/connection.js'

export const save = (req, res) => {
  const data = req.body;
  console.log(req.body)

  if (!data.name) {
    return res.status(400).json({ error: "Name is required." });
  }

  connection.query('INSERT INTO events SET ?', data, (error, result, fields) => {
    if (error) {
      console.error("Error inserting event data:", error);
      return res.status(500).json({ error: "Failed to save event data." });
    }

    console.log("Event data saved successfully");
    res.status(200).json({ message: "Event data saved successfully" });
  });
};


export const fetchAll = (req, res) => {
  const sql = `SELECT * FROM events`;

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
  const sql = `SELECT * FROM events WHERE id = ${id}`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Data fetch error: ", error);
      return res.status(500).send("Internal Server Error");
    } else {
      if (results.length === 0) {
        return res.status(404).json({ error: "ID not found. Please enter a valid ID." });
      }
      res.json(results);
    }
  });
};


export const deleteuser = async (req, res) => {
  const id = req.params.id; 
  console.log(id);

  if (!id) {
    return res.status(400).json({ "message": "Id is required." });
  }

  connection.query('DELETE FROM events WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ "message": "Server error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ "message": "Record not found" });
    }

    return res.status(200).json({ "message": "Record deleted successfully" });
  });
};



export const updateuser = (req, res) => {
  console.log(req.body)
  const ide=req.params.id;

  const { name,description,subtitle,address,start_dt} = req.body;
console.log(ide)
  
  const updateQuery = `UPDATE events SET name=?, description=?, address=?,subtitle=?,start_dt=? WHERE id= ${ide}`;

  connection.query(
    updateQuery,
    [ name, description, address,subtitle,start_dt],
    (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ message: 'Server error' });
        return;
      }

      res.status(200).json({ message: 'Data updated successfully' });
    }


  );
};

  // export const updateuser = (req, res) => {
  //   const { id, name, user_id, subtitle, start_dt, end_dt, description, address, latitude, longitude, location_range, contact_person, contact_phone, logo } = req.body;
  
  //   if (!id) {
  //     return res.status(400).json({ error: "ID is required." });
  //   }
  
  //   const updateQuery = 'UPDATE events SET name=?, user_id=?, subtitle=?, start_dt=?, end_dt=?, description=?, address=?, latitude=?, longitude=?, location_range=?, contact_person=?, contact_phone=?, logo=? WHERE id=?';
  
  //   connection.query(
  //     updateQuery,
  //     [name, user_id, subtitle, start_dt, end_dt, description, address, latitude, longitude, location_range, contact_person, contact_phone, logo, id],
  //     (err, result) => {
  //       if (err) {
  //         console.error('Error updating data:', err);
  //         res.status(500).json({ message: 'Server error' });
  //         return;
  //       }
  
  //       res.status(200).json({ message: 'Data updated successfully' });
  //     }
  //   );
  // };
  // export const updateuser = (req, res) => {
  //   const id=req.params.id;

  //   const {name, user_id, subtitle, start_dt, end_dt, description, address, latitude, longitude, location_range, contact_person, contact_phone, logo } = req.body;
  // console.log(id)
    
  //   const updateQuery = `UPDATE events SET name=?, user_id=?, subtitle=?, start_dt=?, end_dt=?, description=?, address=?, latitude=?, longitude=?, location_range=?, contact_person=?, contact_phone=?, logo=?  WHERE id= ${id}`;
  
  //   connection.query(
  //     updateQuery,
  //     [id, name, user_id, subtitle, start_dt, end_dt, description, address, latitude, longitude, location_range, contact_person, contact_phone, logo],
  //     (err, result) => {
  //       if (err) {
  //         console.error('Error updating data:', err);
  //         res.status(500).json({ message: 'Server error' });
  //         return;
  //       }
  
  //       res.status(200).json({ message: 'Data updated successfully' });
  //     }
  //   );
  // };

  // export const updateuser = (req, res) => {
  //   const id = req.params.id;
  //   const {
  //     user_id,
  //     name,
  //     subtitle,
  //     start_dt,
  //     end_dt,
  //     description,
  //     address,
  //     latitude,
  //     longitude,
  //     location_range,
  //     contact_person,
  //     contact_phone,
  //     logo
  //   } = req.body;
  
  //   // Set default values for fields that can be null
  //   const defaultLatitude = null;
  //   const defaultLongitude = null;
  //   const defaultLocationRange = null;
  //   const defaultContactPerson = null;
  //   const defaultContactPhone = null;
  //   const defaultlogo = null;
  //   console.log(id);
  
  //   const updateQuery = `UPDATE events SET  user_id=?, name=?,  subtitle=?, start_dt=?, end_dt=?, description=?, address=?, latitude=?, longitude=?, location_range=?, contact_person=?, contact_phone=?, logo=?  WHERE id= ${id}`;
  
  //   connection.query(
  //     updateQuery,
  //     [
  //       id,
  //       name,
  //       user_id,
  //       subtitle,
  //       start_dt,
  //       end_dt,
  //       description,
  //       address,
  //       latitude || defaultLatitude, // Use default value if latitude is null
  //       longitude || defaultLongitude, // Use default value if longitude is null
  //       location_range || defaultLocationRange, // Use default value if location_range is null
  //       contact_person ||defaultContactPerson,
  //       contact_phone || defaultContactPhone,
  //       logo || defaultlogo
  //     ],
  //     (err, result) => {
  //       if (err) {
  //         console.error('Error updating data:', err);
  //         res.status(500).json({ message: 'Server error' });
  //         return;
  //       }
  
  //       res.status(200).json({ message: 'Data updated successfully' });
  //     }
  //   );
  // };
  


