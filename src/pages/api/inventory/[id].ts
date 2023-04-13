// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import conn from "~/utils/postgresConfig";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const query = `select inventory.id, books.title, inventory.stock from inventory inner join books on inventory.book = books.id where inventory.id = ${req.query.id}`;
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
    const query = `update inventory set stock=${req.body.stock} where id=${req.query.id}`;
    try {
      const data = await conn.query(query);
      res.status(200).send(data.rows);
    } catch (error) {
      console.log(error);
      res.status(500).send("An error ocurred");
    }
    return;
  }
  res.status(404).send("Not found");
}
