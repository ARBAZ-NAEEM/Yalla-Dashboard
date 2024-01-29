import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { JsonInstance } from "../utils/Config";

const useRequest = (type = "POST", url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState(true);

  const getRequest = async (payload) => {
    let resp = null;
    switch (type) {
      case "POST":
        resp = await JsonInstance.post(url, payload);
        break;
      case "GET":
        resp = await JsonInstance.get(url);
        break;
      case "DELETE":
        resp = await JsonInstance.delete(url);
        break;
      case "PUT":
        resp = await JsonInstance.put(url, payload);
        break;
      default:
        break;
    }
    setResponse(resp);
  };

  return [isLoading, response, getRequest, setIsLoading];
};

export default useRequest;
