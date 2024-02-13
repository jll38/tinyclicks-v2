"use client";
import React from "react";
import { LinkValidator } from "@/lib/validator";
export default function Shortener() {
  const userID = "657bf0e8f02c01a8e4417663"; //Temporary value
  const [link, setLink] = React.useState<string>("");
  
  return (
    <div>
      <div>Shortener</div>
      <input
        type="text"
        placeholder="https://example.com"
        onChange={(e) => {
          setLink(e.target.value);
        }}
      ></input>
      <button
        disabled={!LinkValidator.validate(link)}
        onClick={() => {
          fetch("api/url/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userID,
              originalURL: link,
              locked: false,
            }),
          })
            .then((response) => {
              if (response.status === 200) alert("Success!");
              else alert("Error!");
              return response.json();
            })
            .then((data) => {
              console.log(data);
            })
            .catch((error) => console.error("Error:", error));
        }}
      >
        Shorten
      </button>
    </div>
  );
}
