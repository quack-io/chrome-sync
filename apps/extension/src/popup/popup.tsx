import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./popup.scss";
import { useChromeSync } from "@chrome-sync/react";

const App: React.FC<{}> = () => {
  const [counter, setCounter] = useChromeSync("counter");

  return (
    <div style={{ width: "350px" }} className="popup-container">
      counter:
      {counter}
      <br />
      <div>
        <button onClick={() => setCounter(counter - 1)}>-</button>
        <button onClick={() => setCounter(counter + 1)}>+</button>
      </div>
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
