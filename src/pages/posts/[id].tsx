import { IPost } from "@/components/Post";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { deliveryTypes } from "@/components/PostForm";
interface Props {
    post: IPost
}

export default function Post({ post }: Props) {

    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>
            <div className="max-w-4xl w-full m-auto mt-2 gap-2 px-2 flex">
                <img width={500} height={500} alt="advert logo" src={post.imageUrl ? post.imageUrl : `https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg`} />
                <div>
                    <h3 className="text-xl font-semibold text-green-600">{post.title}</h3>
                    <p className="text-gray-500">{post.description}</p>
                    <p className="text-gray-500">{deliveryTypes[post.deliveryType]}</p>
                </div>
            </div>
        </>
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
        // - At most once every 60 seconds
        revalidate: 60, // In seconds
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
