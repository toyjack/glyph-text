import './globals.css'

export const metadata = {
  title: 'glyph-text',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="container md:mx-auto md:px-4">{children}</body>
    </html>
  )
}
