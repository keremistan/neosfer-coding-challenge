import "../_styles/global.css";
import "../_styles/output.css";

export const metadata = {
  title: "Next.js",
  description: "Barebone Next.js installation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <script src="http://localhost:8097"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  );
}
