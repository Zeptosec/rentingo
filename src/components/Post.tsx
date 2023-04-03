import Image from "next/image"
import Link from "next/link"

export interface IPost {
    description: string,
    imageUrl?: string,
    videoUrl: string,
    deliveryType: number,
    rentStart: Date,
    rentEnd: Date,
    id: Number,
    title: string
}

interface Props {
    post: IPost,
    delPost: Function
}

function isValidUrl(string: string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

export default function Post({ post, delPost }: Props) {

    return (

        <div className="relative w-full flex gap-2 py-2 border-t border-b border-indigo-200 hover:bg-gray-100 bg-white transition-colors overflow-hidden">
            <Link href={`/posts/${post.id}`}>
                <img width={200} height={200} alt="advert logo" src={(post.imageUrl && isValidUrl(post.imageUrl)) ? post.imageUrl : `https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg`} />
            </Link>
            <div>
                <Link href={`/posts/${post.id}`}>
                    <h3 className="text-xl font-semibold text-green-600 hover:underline">{post.title}</h3>
                </Link>
                <p className="text-gray-500">{post.description}</p>
            </div>
            <div className="absolute right-2 top-2 grid justify-end text-end">
                <Link className="hover:underline hover:text-blue-400" href={`/editpost/${post.id}`}>Edit</Link>
                <button onClick={() => delPost(post)} className="hover:underline grid hover:text-blue-400">Delete</button>
            </div>
        </div>
    )
}