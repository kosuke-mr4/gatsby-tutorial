import React from "react";
import { footer } from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={footer}>
      © {new Date().getFullYear()} murakami_blog
    </footer>
  );
}
