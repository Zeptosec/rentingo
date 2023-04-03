import Post, { IPost } from "./Post";

interface Props {
    posts: IPost[]
    setPosts: Function
}

export default function Posts({ posts, setPosts }: Props) {

    async function delPost(post: IPost) {
        if (confirm(`Are you sure you want to delete ${post.title}?`)) {
            try {
                await fetch(`${process.env.NEXT_PUBLIC_API}/api/adverts?id=${post.id}`, { method: "DELETE" })
                setPosts((curr: IPost[]) => [...curr.filter((a: IPost) => a.id !== post.id)])
            } catch (err: any) {
                console.log(err);
                alert("failed to delete " + err.message);
            }
        }
    }

    return (
        <div className="max-w-4xl w-full m-auto px-2 grid">
            {posts.map((post, ind) => <Post key={ind} post={post} delPost={delPost} />)}
        </div>
    )
}