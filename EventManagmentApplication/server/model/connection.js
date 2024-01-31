import mysql from 'mysql'
 const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'prompt_v2',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:');
  }
});   

export default connection;


