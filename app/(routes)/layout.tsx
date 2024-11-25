import "../_styles/global.css";
import "../_styles/output.css";

export const metadata = {
  title: "MovieLibs",
  description: "Your Favourite Movie Library",
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
      <body
        className="bg-gray-100/25 min-w-96 md:w-full h-full p-4 min-h-screen"
      >{children}</body>
    </html>
  );
}
