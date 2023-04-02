import { IPost } from "@/components/Post";
import PostForm from "@/components/PostForm";
import { useState } from "react";

export default function NewPost() {
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
    }

    return (
        <div className="mx-auto w-1/2 mt-2">
            <PostForm onSubmit={CreatePost} post={post} />
        </div>
    )
}