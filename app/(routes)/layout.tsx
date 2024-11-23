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
      <body>{children}</body>
    </html>
  );
}
