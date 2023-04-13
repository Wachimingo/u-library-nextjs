// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import postgresServer from "~/utils/postgresConfig.js";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const query = `select * from books`;
    try {
      const data = await postgresServer.runQuery(query);
      res.status(200).send(data);
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
      const data = await postgresServer.runQuery(query);
      const createInventory = `insert into inventory(book, stock) values(${data[0].id},${stock})`;
      await postgresServer.runQuery(createInventory);
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send("An error ocurred");
    }
    return;
  }
  res.status(404).send("Not found");
}
