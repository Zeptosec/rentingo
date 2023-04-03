import Post, { IPost } from '@/components/Post'
import Posts from '@/components/Posts';
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        const rs = await fetch(`${process.env.NEXT_PUBLIC_API}/api/adverts`);
        if (rs.ok) {
          const json = await rs.json();
          
          setPosts(json);
        }
      } catch (rr) {
        console.log(rr);
      } finally {
        setIsLoading(false);
      }
    }
    getPosts();
  }, [])

  return (
    <>
      <Head>
        <title>Rentingo</title>
        <meta name="description" content="Renting system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading ? <div>Loading...</div> :
        <div className='grid'>
          {posts.length > 0 ? <Posts posts={posts} setPosts={setPosts} /> : <p>No posts</p>}
        </div>}
    </>
  )
}
