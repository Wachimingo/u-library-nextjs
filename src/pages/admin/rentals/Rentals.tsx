import React, { useState, useEffect } from "react";
import { Button, Main, Page, Section } from "~/common";
import styles from "./rentals.module.css";

const Rentals = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch(`/api/rentals`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);
  async function setAsReturned(this: any) {
    await fetch(`/api/rentals/${this.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "Application/json"
      },
      body: JSON.stringify({
        inventory: this.inventory_id
      })
    });
    const date = new Date();
    setBooks((prev: any) => {
      const newArr = prev.map((book: any) => {
        if (book.id === this.id) {
          book.return_date = date.toISOString().split("T")[0].toString();
          return book;
        }
        return book;
      });
      return newArr;
    });
  }
  return (
    <Page>
      <Main>
        <h1>Rented Books</h1>
      </Main>
      <Section row id='books'>
        <table className={styles["rentals-table"]}>
          <thead>
            <tr>
              <th className={styles["rentals-th"]}>ID</th>
              <th className={styles["rentals-th"]}>Book</th>
              <th className={styles["rentals-th"]}>Student</th>
              <th className={styles["rentals-th"]}>Staff</th>
              <th className={styles["rentals-th"]}>Rented on</th>
              <th className={styles["rentals-th"]}>Returned on</th>
              <th className={styles["rentals-th"]}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book: any, i: number) => (
              <tr className={styles["rentals-tr"]} key={book.title + i}>
                <td className={styles["rentals-td"]}>{i + 1}</td>
                <td className={styles["rentals-td"]}>{book.title}</td>
                <td className={styles["rentals-td"]}>{book.student}</td>
                <td className={styles["rentals-td"]}>{book.staff}</td>
                <td className={styles["rentals-td"]}>{book.rental_date}</td>
                <td className={styles["rentals-td"]}>{book.return_date}</td>
                <td className={styles["rentals-td"]} style={{ width: "125px" }}>
                  <Button onClick={setAsReturned.bind(book)}>Set as Returned</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </Page>
  );
};

export default Rentals;
