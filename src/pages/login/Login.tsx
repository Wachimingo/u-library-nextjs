import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Main, Page, Section } from "~/common";

const Login = ({ setUser }: any) => {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const submitLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/users/login`, {
        method: "POST",
        headers: {
          "Content-type": "Application/json"
        },
        body: JSON.stringify({ email, pass })
      });
      if (!res.ok) throw Error("Incorrect email or password, please try again.");
      const data = await res.json();
      setUser(data[0]);
      localStorage.setItem("user", JSON.stringify(data[0]));
      push("/home");
    } catch (error) {
      window.alert(error);
    }
  };
  return (
    <Page>
      <Main>
        <h1>Login</h1>
      </Main>
      <Section>
        <Form id={"login-form"} onSubmit={submitLogin}>
          <Input type='text' id='email' fieldName='Email' action={setEmail} required />
          <Input type='password' id='password' fieldName='Password' action={setPass} min='6' required />
        </Form>
      </Section>
    </Page>
  );
};

export default Login;
