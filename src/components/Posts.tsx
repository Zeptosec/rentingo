import Post, { IPost } from "./Post";

interface Props {
    posts: IPost[]
}

export default function Posts({ posts }: Props) {

    return (
        <div className="max-w-4xl w-full m-auto px-2 grid">
            {posts.map((post, ind) => <Post key={ind} post={post} />)}
        </div>
    )
}