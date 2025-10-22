import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Gravitris - an online, free, gravity based block game',
  description: 'Gravitris is an online, free, gravity based block game that you can play in your browser.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Bootstrap CSS */}
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"
          integrity="sha384-KA6wR/X5RY4zFAHpv/CnoG2UW1uogYfdnP67Uv7eULvTveboZJg0qUpmJZb5VqzN"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning>
        <div className="container-fluid h-100 d-flex flex-column">
          <nav className="navbar navbar-expand-md fixed-top navbar-dark" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
            <Link className="navbar-brand text-light" href="/" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
              Gravitris
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-toggle="collapse" 
              data-target="#navbar1" 
              aria-controls="navbar1" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
              style={{ borderColor: '#666' }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar1">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link text-light" href="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" href="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" href="/about">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <main className="row align-items-center flex-grow-1">
            {children}
          </main>
        </div>

        {/* Bootstrap JS */}
        <Script
          src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
          integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"
          integrity="sha384-xrRywqdh3PHs8keKZN+8zzc5TX0GRTLCcmivcbNJWm2rs5C8PRhcEn3czEjhAO9o"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=UA-148352430-1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-148352430-1');
          `}
        </Script>
      </body>
    </html>
  )
}
