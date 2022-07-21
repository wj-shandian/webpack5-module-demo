import React from "react";
import * as ReactDOM from "react-dom";

const RemoteApp = React.lazy(() => import("remote/App"));
export default function App() {
  return (
    <div>
      <h1>展示远程组件</h1>
      <RemoteApp></RemoteApp>
    </div>
  );
}
