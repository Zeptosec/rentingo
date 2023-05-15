import Post, { IPost } from '@/components/Post'
import Posts from '@/components/Posts';
import Spinner from '@/components/Spinner';
import { useUser } from '@/context/user';
import { fetchPosts } from '@/controllers/PostController';
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const { loadingState, user } = useUser();
  useEffect(() => {
    async function getPosts() {
      try {
        setPosts(await fetchPosts());
      } catch (rr) {
        console.log(rr);
      } finally {
        setIsLoading(false);
      }
    }
    getPosts();
  }, [loadingState])
  return (
    <>
      <Head>
        <title>Rentingo</title>
        <meta name="description" content="Renting system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading ? <div className='flex justify-center mt-2'>
        <Spinner />
      </div> :
        <div className='grid'>
          {posts.length > 0 ? <Posts loadingState={loadingState} user={user} posts={posts} setPosts={setPosts} /> : <p>Skelbimų nėra</p>}
        </div>}
    </>
  )
}
