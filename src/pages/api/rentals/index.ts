// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import conn from "~/utils/postgresConfig";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const query = `select rentals.id, inventory.id as inventory_id, books.title, concat(students.first_name,' ', students.last_name) as student, rentals.rental_date, rentals.return_date, concat(staff.first_name,' ', staff.last_name) as staff from rentals inner join inventory on rentals.inventory = inventory.id inner join users students on rentals.user = students.user_id inner join users staff on rentals.staff = staff.user_id inner join books on inventory.book = books.id`;
    try {
      const data = await conn.query(query);
      res.status(200).send(data.rows);
    } catch (error) {
      console.log(error);
      res.status(500).send("An error ocurred");
    }
    return;
  }
  if (req.method === "POST") {
    const date = new Date();
    const query = `insert into rentals(inventory, "user", rental_date, return_date, staff) values(${req.body.inventory}, ${req.body.user}, '${
      date.toISOString().split("T")[0]
    }', '', 3)`;
    try {
      const data = conn.query(query);
      const updateStock = `update inventory set stock=((select stock from inventory where id=${req.body.inventory})-1) where id=${req.body.inventory}`;
      await conn.query(updateStock);
      res.status(200).send(data.rows);
    } catch (error) {
      console.log(error);
      res.status(500).send("An error ocurred");
    }
    return;
  }
  res.status(404).send("Not found");
}
