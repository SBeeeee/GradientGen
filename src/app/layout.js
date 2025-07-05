import "./globals.css";



export const metadata = {
  title: "GradientGen",
  description: "Your Go-To Pallete for unique gradients",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
