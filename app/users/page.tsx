import Link from 'next/link'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function Blogs() {
  const users = await prisma.user.findMany({
    orderBy: {
      id: 'desc'
    }
  })

  if (!users) {
    return <div>No users found.</div>
  }

  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-3xl font-bold'>Users</h1>
        <ul className='mt-6 flex flex-col gap-2'>
          {users.map(user => (
            <li key={user.id}>
              <Link href={`/blog/${user.id}`}>{user.prenom} {user.nom}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
