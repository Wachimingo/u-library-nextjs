import { Pool } from "pg";

let conn: any;

if (!conn) {
  conn = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRESS_PASS,
    port: +process.env.POSTGRESS_PORT!
  });
}

export default conn;

// import pgk from "pg";
// const { Pool } = pgk;

// class DatabaseServer {
//   static _instance;
//   static _conn;
//   static _connected;

//   constructor() {
//     const client = new Pool({
// user: process.env.POSTGRES_USER,
// host: process.env.POSTGRES_HOST,
// database: process.env.POSTGRES_DB,
// password: process.env.POSTGRESS_PASS,
// port: process.env.POSTGRESS_PORT
//     });
//     client
//       .connect()
//       .then(() => {
//         console.log("connected to db");
//         DatabaseServer._conn = client;
//         DatabaseServer._connected = true;
//         return client;
//       })
//       .catch((err) => console.log(err));
//   }
//   static getInstance() {
//     if (this._instance) {
//       return this._instance;
//     }

//     this._instance = new DatabaseServer();
//     return this._instance;
//   }
//   static async runQuery(query) {
//     if (DatabaseServer._connected) {
//       const result = await DatabaseServer._conn.query(query);
//       return result.rows;
//     }
//     return "DB is not connected";
//   }
// }
// DatabaseServer.getInstance();

// export default DatabaseServer;
