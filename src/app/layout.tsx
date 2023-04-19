import './globals.css'
import './scrollbar.css'

export const metadata = {
  title: 'Portfólio - César Augusto',
  description: 'Meu portfólio em React, gerado via "create next app" e utilizando Tailwind',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
