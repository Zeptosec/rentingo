import { IPost } from "@/components/Post";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import PostForm from "@/components/PostForm";
import { useUser } from "@/context/user";
import { useRouter } from "next/router";
interface Props {
    post: IPost
}

export default function Post() {
    const [post, setPost] = useState<IPost>()
    const { loadingState, user } = useUser();
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        async function fetchPost() {
            if (id) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/adverts/${id}`);
                const post = await res.json();
                post.deliveryType = post.deliveryType === 'PickUp' ? 0 : 1;
                setPost(post);
            }
        }
        console.log(loadingState)
        if (loadingState === 'loading') return;
        if (loadingState === 'loggedout') router.push('/login');
        else {
            fetchPost();
        }
    }, [loadingState, id])

    async function onSubmit(newPost: IPost) {
        const id = newPost.id;
        let startDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
        let endDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10)
        let obj: any = { ...newPost, rentStart: startDate, rentEnd: endDate }
        delete obj.id;
        await fetch(`${process.env.NEXT_PUBLIC_API}/api/adverts/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token}`
            },
            body: JSON.stringify(obj)
        })
    }

    return (
        <div className="mx-auto w-1/2 mt-2">
            <Head>
                <title>{post ? post.title : 'Kraunama'}</title>
            </Head>
            {post ? <PostForm onSubmit={onSubmit} post={post} /> : <p>Kraunama...</p>}
        </div>
    )
}