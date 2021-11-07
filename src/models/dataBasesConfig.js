const optionsMySQL = {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'root123',
      database: 'e-commerce'
    },
    pool: { min: 0, max: 7 }
};

const optionsSQLite = {
  client: 'sqlite3',
  connection: {filename: '../DB/ecommerce.sqlite'},
  useNullAsDefault: true
};

const optionsSQLite2 = {
  client: 'sqlite3',
  connection: {filename: './DB/ecommerce.sqlite'},
  useNullAsDefault: true
}

module.exports = {
  optionsMySQL,
  optionsSQLite,
  optionsSQLite2
}