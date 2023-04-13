// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import conn from "~/utils/postgresConfig";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const query = `select books.id, books.title, books.img, books.author, books.genre, books.published_year, inventory.id as inventory_id, inventory.stock from books inner join inventory on books.id = inventory.book where books.id = ${req.query.id}`;
    try {
      const data = await conn.query(query);
      res.status(200).send(data.rows);
    } catch (error) {
      console.log(error);
      res.status(500).send("An error ocurred");
    }
    return;
  }
  if (req.method === "PATCH") {
    const date = new Date();
    const query = `update rentals set return_date='${date.toISOString().split("T")[0]}' where rentals.id=${req.query.id}`;
    try {
      const data = await conn.query(query);
      const updateStock = `update inventory set stock=((select stock from inventory where id=${req.body.inventory})+1) where id=${req.body.inventory}`;
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
