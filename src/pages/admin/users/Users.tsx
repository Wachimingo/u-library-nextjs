import React, { useState } from "react";
import { Form, Input, Main, Page, Section } from "~/common";

const Users = () => {
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
  const submitUser = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(`/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-type": "Application/json"
        },
        body: JSON.stringify(user)
      });
    } catch (error) {
      console.log(error);
    }
    location.replace("/");
  };
  return (
    <Page>
      <Main>
        <h1>Add Users</h1>
      </Main>
      <Section id='form-section'>
        <Form id='user-form' onSubmit={submitUser}>
          <Input type='text' id='first_name' fieldName='First Name' action={setUser} required />
          <Input type='text' id='last_name' fieldName='Last name' action={setUser} required />
          <Input type='text' id='email' fieldName='E-mail' action={setUser} required />
        </Form>
      </Section>
    </Page>
  );
};

export default Users;
