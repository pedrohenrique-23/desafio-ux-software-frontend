import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Tentando login:", { email, password });
    // aqui vai a lógica de autenticação
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
