// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import conn from "~/utils/postgresConfig";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const query = `select * from books`;
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
    const { title, published_year, author, genre, img, stock } = req.body;
    const query = `insert into books(title, published_year, author, genre, img) values('${title}', '${published_year}', '${author}', '${genre}', '${img}') returning id;`;
    try {
      const data = await conn.query(query);
      const createInventory = `insert into inventory(book, stock) values(${data.rows[0].id},${stock})`;
      await conn.query(createInventory);
      res.status(200).send(data.rows);
    } catch (error) {
      console.log(error);
      res.status(500).send("An error ocurred");
    }
    return;
  }
  res.status(404).send("Not found");
}
