// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import postgresServer from "~/utils/postgresConfig.js";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const query = `select rentals.id, inventory.book from rentals inner join inventory on rentals.inventory = inventory.id where rentals.user=${req.query.user} and book=${req.query.book}`;
    try {
      const data = await postgresServer.runQuery(query);
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send("An error ocurred");
    }
    return;
  }
  res.status(404).send("Not found");
}
