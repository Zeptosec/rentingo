import Image from "next/image"
import Link from "next/link"

export interface IPost {
    description: string,
    imageUrl?: string,
    videoUrl: string,
    deliveryType: number,
    rentStart: Date,
    rentEnd: Date,
    title: string
}

interface Props {
    post: IPost
}

export default function Post({ post }: Props) {

    return (

        <div className="w-full flex gap-2 py-2 border-t border-b border-indigo-200 hover:bg-gray-100 bg-white transition-colors overflow-hidden">
            <Link href={`/`}>
                <Image width={200} height={200} alt="advert logo" src={post.imageUrl ? post.imageUrl : `https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg`} />
            </Link>
            <div>
                <Link href={`/`}>
                    <h3 className="text-xl font-semibold text-green-600 hover:underline">{post.title}</h3>
                </Link>
                <p className="text-gray-500">{post.description}</p>
            </div>
        </div>
    )
}