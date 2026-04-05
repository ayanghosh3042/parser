import { useState } from "react";
import { passwordChecks } from "../Logic/passwordChecks";

export const usePasswordValidation = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const allValid = passwordChecks.every(rule => rule.test(password));

  return {
    password,
    setPassword,
    showPassword,
    setShowPassword,
    allValid
  };
};