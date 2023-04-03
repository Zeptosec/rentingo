import { IPost } from "@/components/Post";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import PostForm from "@/components/PostForm";
interface Props {
    post: IPost
}

export default function Post({ post }: Props) {

    async function onSubmit(newPost: IPost) {
        const id = newPost.id;
        let startDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
        let endDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10)
        let obj: any = { ...newPost, rentStart: startDate, rentEnd: endDate }
        delete obj.id;
        await fetch(`${process.env.NEXT_PUBLIC_API}/api/adverts/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
    }

    return (
        <div className="mx-auto w-1/2 mt-2">
            <Head>
                <title>{post.title}</title>
            </Head>
            <PostForm onSubmit={onSubmit} post={post} />
        </div>
    )
}

// Function gets called at build time on server-side.  
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/adverts/${params.id}`);
    const post = await res.json();
    console.log(params.id);
    return {
        props: {
            post,
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 10, // In seconds
    }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/adverts`)
    const posts = await res.json()

    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post: IPost) => ({
        params: { id: post.id.toString() },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: 'blocking' } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: 'blocking' }
}
