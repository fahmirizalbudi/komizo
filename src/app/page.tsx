import { auth } from '@/lib/auth'

const Home = async () => {
  const session = await auth()

  return <p>Hello {session?.user?.name}</p>
}

export default Home
