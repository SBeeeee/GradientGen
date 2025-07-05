import "./globals.css";
import { Analytics } from "@vercel/analytics/next"


export const metadata = {
  title: "Rangify",
  description: "Your Go-To Pallete for unique gradients",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
