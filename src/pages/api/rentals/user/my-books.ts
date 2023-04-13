// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import postgresServer from "~/utils/postgresConfig.js";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const query = `select rentals.id as rental_id, books.id as book_id, books.title, books.img, concat(students.first_name,' ', students.last_name) as student, rentals.rental_date, rentals.return_date, concat(staff.first_name,' ', staff.last_name) as staff from rentals inner join inventory on rentals.inventory = inventory.id inner join users students on rentals.user = students.user_id inner join users staff on rentals.staff = staff.user_id inner join books on inventory.book = books.id where students.user_id = ${req.query.user}`;
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
