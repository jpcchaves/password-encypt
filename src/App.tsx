import { useState } from "react";
import bcrypt from "bcryptjs";
import "./App.css";

const App = () => {
  const [password, setPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [saltRounds, setSaltRounds] = useState<number>(8);

  const hashPassword = () => {
    if (password.length) {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      setHashedPassword(hash);
    }
  };

  const incrementSalt = () => {
    if (saltRounds >= 20) {
      return;
    }

    setSaltRounds((prev) => prev + 1);
  };

  const decrementSalt = () => {
    if (saltRounds <= 1) {
      return;
    }

    setSaltRounds((prev) => prev - 1);
  };

  const toggleLoading = () => {
    setIsLoading((prev) => !prev);
  };

  return (
    <div className="App">
      {password && <p>{password}</p>}
      {hashedPassword && <p>{hashedPassword}</p>}
      <input
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type="button" onClick={() => hashPassword()}>
        Hash Password
      </button>
      <div>
        <button onClick={() => decrementSalt()}>-</button>
        {saltRounds}
        <button onClick={() => incrementSalt()}>+</button>
      </div>
    </div>
  );
};

export default App;
