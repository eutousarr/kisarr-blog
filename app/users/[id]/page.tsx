import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function User({ params }: { params: { id: number } }) {
    const id = Number(params.id)
    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
        include: {
            profile: true,
            posts: true,
        }
    })

    if (!user) {
        return <p>User not found</p>
    }

    return (
        <section className='py-24'>
            <div className='container'>
                <h1 className='text-4xl font-bold'>{user.prenom} {user.nom}</h1>

                <ul className='mt-6 flex flex-col gap-2'>
                    {user.posts.map(post => (
                        <div key={post.id}>
                            <li>
                                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                {/* <div
                                    className='prose-headings:font-title font-default prose mt-4 dark:prose-invert focus:outline-none'
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                >
                                </div> */}
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </section>
    )
}
