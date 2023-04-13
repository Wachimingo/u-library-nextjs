import React, { useState, useEffect } from "react";
import { Main, Page, Section } from "~/common";
import { BookCard } from "~/common";
const MyBooks = ({ user }: any) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch(`api/rentals/user/my-books?user=${user.user_id}`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);
  return (
    <Page>
      <Main>
        <h1>Books</h1>
      </Main>
      <Section row id='books'>
        {books.map((book: any) => (
          <BookCard key={book.title} book={book}>
            <p>Borrowed on: {book.rental_date}</p>
          </BookCard>
        ))}
      </Section>
    </Page>
  );
};

export default MyBooks;
