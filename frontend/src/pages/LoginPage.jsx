/**
 * LoginPage
 *
 * Renders an email + password login form.
 * No submission logic yet — wired up in a later task.
 */
const LoginPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Sign In</h2>
        <p style={styles.sub}>Welcome back to DriveEasy</p>

        <form style={styles.form}>
          <label style={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            style={styles.input}
            autoComplete="email"
          />

          <label style={styles.label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            style={styles.input}
            autoComplete="current-password"
          />

          <button type="submit" style={styles.btn}>
            Login
          </button>
        </form>

        <p style={styles.footer}>
          Don&apos;t have an account?{' '}
          <a href="/register" style={styles.link}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f6fa',
  },
  card: {
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '8px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    width: '360px',
  },
  heading: {
    margin: '0 0 4px',
    fontSize: '1.5rem',
  },
  sub: {
    margin: '0 0 24px',
    color: '#666',
    fontSize: '0.9rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '0.95rem',
    outline: 'none',
  },
  btn: {
    marginTop: '8px',
    padding: '10px',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  footer: {
    marginTop: '20px',
    fontSize: '0.85rem',
    textAlign: 'center',
    color: '#555',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
  },
};

export default LoginPage;
