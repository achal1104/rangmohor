import { Link } from '../router.jsx'
import { PageHead } from '../components.jsx'

export default function NotFound() {
  return (
    <>
      <PageHead title="Page not found" text="We couldn't find the page you were looking for." />
      <p style={{ textAlign: 'center', padding: '0 5vw 80px' }}><Link className="btn gold" to="/">Back to Home</Link></p>
    </>
  )
}
