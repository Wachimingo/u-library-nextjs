import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Main, Page, Section } from "~/common";

const Details = ({ user }: any) => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState({ author: "", title: "", img: "/default.webp", genre: "", published_year: "", inventory_id: 0, stock: 0 });
  const [isBorrowed, setIsBorrowed] = useState(false);
  useEffect(() => {
    if (id) {
      fetch(`/api/books/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBook((prev) => {
            if (data.length > 0) {
              return data[0];
            }
            return prev;
          });
        })
        .catch((error) => console.log(error));
      fetch(`/api/rentals/user?user=${user.user_id}&book=${id}`)
        .then((res) => res.json())
        .then((data) => setIsBorrowed(data))
        .catch((error) => console.log(error));
    }
  }, [id, user]);

  const borrowBook = async () => {
    try {
      await fetch(`/api/rentals`, {
        method: "POST",
        headers: {
          "Content-type": "Application/json"
        },
        body: JSON.stringify({
          inventory: book.inventory_id,
          user: user.user_id
        })
      });
      setBook((prev) => {
        return {
          author: prev.author,
          title: prev.title,
          img: prev.img,
          genre: prev.genre,
          published_year: prev.published_year,
          inventory_id: prev.inventory_id,
          stock: +prev.stock - 1
        };
      });
      setIsBorrowed(true);
    } catch (error) {
      console.log(error);
    }
  };
  const BurrowButton = () => {
    if (isBorrowed) return <h3>You have borrowed this book</h3>;
    if (book.stock < 1) return <h3>Out of Stock</h3>;
    return <Button onClick={borrowBook}>Borrow</Button>;
  };
  return (
    <Page>
      <Main>
        <h1>{book.title}</h1>
      </Main>
      <Section id='books'>
        <img src={`${book.img}`} alt={book.title} loading='lazy' width={"250px"} height={"353px"} />
        <p>Published Year: {book.published_year}</p>
        <h3>In Stock: {book.stock}</h3>
      </Section>
      <Section row id='controls'>
        <BurrowButton />
      </Section>
    </Page>
  );
};

export default Details;
