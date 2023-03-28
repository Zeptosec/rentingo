export interface IPost {
    description: string,
    imageUrl: string,
    videoUrl: string,
    deliveryType: number,
    rentStart: Date,
    rentEnd: Date
}

interface Props {
    post: IPost
}

export default function Post({ post }: Props) {

    return(
        <div>
            
        </div>
    )
}