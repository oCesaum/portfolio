import { Poppins } from "next/font/google";

import "./globals.css";
import "./scrollbar.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Portfólio - César Augusto",
  description:
    'Meu portfólio em React, gerado via "create next app" e utilizando Tailwind e Typescrit',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body
        className={`mx-auto max-w-[1600px] bg-gradient-to-bl from-gray-300 to-gray-100 ${poppins.className}`}
      >
        {children}
      </body>
    </html>
  );
}
