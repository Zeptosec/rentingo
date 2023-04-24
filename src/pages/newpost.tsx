import { IPost } from "@/components/Post";
import PostForm from "@/components/PostForm";
import { useUser } from "@/context/user";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NewPost() {
    const { loadingState, user } = useUser();
    const router = useRouter();
    useEffect(() => {
        if (loadingState === 'loading') return;
        if (loadingState === 'loggedout') router.push("/login");
    }, [loadingState]);
    const [post, setPost] = useState<IPost>({
        description: "",
        videoUrl: "",
        deliveryType: 1,
        rentStart: new Date(),
        rentEnd: new Date(new Date().getTime() + Math.round(1000 * 60 * 60 * 24 * 10 * (Math.random() / 2 + 0.5))),
        id: 0,
        title: ""
    });

    async function CreatePost(newPost: IPost) {
        let obj: any = { ...newPost };
        delete obj.id;
        await fetch(`${process.env.NEXT_PUBLIC_API}/api/adverts`, {
            method: "POST",
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
                <title>Naujas skelbimas</title>
                <meta name="description" content="Renting system" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {loadingState === 'loggedin' ?
                <PostForm onSubmit={CreatePost} post={post} /> : <p>Kraunama...</p>}
        </div>
    )
}