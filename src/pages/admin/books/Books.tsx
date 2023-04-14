import React, { useState } from "react";
import { Form, Input, Main, Page, Section } from "~/common";

const Books = () => {
  const [book, setBook] = useState({ author: "", title: "", img: "/default.webp", genre: "", published_year: "", stock: 0 });
  const submitBook = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(`/api/books`, {
        method: "POST",
        headers: {
          "Content-type": "Application/json"
        },
        body: JSON.stringify(book)
      });
    } catch (error) {
      console.log(error);
    }
    location.replace("/");
  };
  return (
    <Page>
      <Main>
        <h1>Add Books</h1>
      </Main>
      <Section id='form-section'>
        <Form id='book-form' onSubmit={submitBook}>
          <Input type='text' id='author' fieldName='Author' action={setBook} required />
          <Input type='text' id='title' fieldName='Title' action={setBook} required />
          <Input type='text' id='genre' fieldName='Genre' action={setBook} required />
          <Input type='text' id='published_year' fieldName='Published Year' action={setBook} required />
          <Input type='text' id='img' fieldName='Cover' action={setBook} value='default.webp' />
          <Input type='text' id='stock' fieldName='Stock' action={setBook} required />
        </Form>
      </Section>
    </Page>
  );
};

export default Books;
