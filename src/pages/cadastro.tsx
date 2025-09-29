import { useState } from "react";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Cadastro enviado:", { email, password });
    // aqui vai a lógica de envio
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={handleChangePassword}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
