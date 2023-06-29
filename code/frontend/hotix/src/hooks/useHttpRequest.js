import { useState } from "react";

const BASE_URL = "/api";

export const useHttpRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = async (
    url,
    method,
    body,
    headers = {
      "Content-Type": "application/json",
    }
  ) => {
    setIsLoading(true);
    let res;
    try {
      const data = await fetch(`${BASE_URL}/${url}`, {
        method,
        headers,

        body: JSON.stringify(body),
      });
      res = await data.json();

      if (res.error || res.detail) {
        throw new Error(res.error);
      }
      setError();
      return res;
    } catch (error) {
      if (url === "auth/jwt/create") setError("Invalid username or password");
      else setError(error.toString().replace("Error: ", ""));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, sendRequest };
};
