import React from "react";
import ReactDOM from "react-dom";

let done = false;
let promise = null;

const waitFor = text => {
  console.log("waitFor");
  if (done) return text;
  if (!promise) {
    promise = new Promise(resolve =>
      setTimeout(() => {
        done = true;
        resolve();
      }, 5000)
    );
  }
  throw promise;
};

const AsyncText = ({ text }) => <h1>{waitFor(text)}</h1>;

const App = () => (
  <div hidden={true}>
    <React.Timeout ms={0}>
      {didTimeout =>
        didTimeout ? <h1>Loading...</h1> : <AsyncText text="foo" />
      }
    </React.Timeout>
  </div>
);

const root = ReactDOM.unstable_createRoot(document.getElementById("root"));
root.render(<App />);
