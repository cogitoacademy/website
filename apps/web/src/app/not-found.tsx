const PRIMARY_COLOR = '#ff6801';

const styles = {
  body: {
    margin: 0,
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
    textAlign: 'center' as const,
    padding: '1rem',
  },
  heading: {
    fontSize: '3rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
  },
  description: {
    fontSize: '1.125rem',
    color: '#555',
    marginBottom: '1.5rem',
  },
  link: {
    display: 'inline-block',
    padding: '0.5rem 1.25rem',
    borderRadius: '0.375rem',
    background: PRIMARY_COLOR,
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 500,
  },
};

// Global not-found: renders outside the root layout when no locale matches.
// Must include its own <html>/<body> since it has no layout wrapper.
export default function NotFound() {
  return (
    <html lang="en">
      <body style={styles.body}>
        <div>
          <h1 style={styles.heading}>404</h1>
          <p style={styles.description}>Page not found</p>
          <a href="/" style={styles.link}>
            Go home
          </a>
        </div>
      </body>
    </html>
  );
}
