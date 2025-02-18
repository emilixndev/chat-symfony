import React from "react";
import ReactDOM from "react-dom/client";
import ChatBox from './react/controllers/ChatBox';
import './styles/app.css';

const rootElement = document.getElementById("app");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<ChatBox />);
} else {
  console.error("Élément #app introuvable dans le DOM !");
}
