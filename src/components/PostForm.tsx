import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react"
import { IPost } from "./Post"
import Image from "next/image"

interface Props {
    onSubmit: Function
    post: IPost
}

export const deliveryTypes = [
    "Atvažiuos savininkas",
    "Atvažiuos nuomininkas"
]

export default function PostForm({ onSubmit, post }: Props) {
    const [tpost, setTPost] = useState(post)
    const [errors, setErrors] = useState<string[]>([])
    const [file, setFile] = useState<File>();
    const [isLoading, setIsLoading] = useState(false);
    const [finished, setFinished] = useState(0);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    async function check(w: FormEvent<HTMLFormElement>) {
        w.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        let errs = [];
        if (tpost.title.length < 3) {
            errs.push("title");
        }
        if (tpost.description.length === 0) {
            errs.push("desc");
        }
        setErrors(errs);
        if (errs.length > 0) {
            setIsLoading(false);
            setFinished(1);
            return;
        }
        let fid: string = tpost.imageUrl ? tpost.imageUrl : "";

        if (file) {
            if (file.size > 8 * 1024 ** 2) {
                alert(`file is too big max size 8MB`)
                errs.push("file");
            } else {
                let fd = new FormData();
                fd.append("file", file);
                try {
                    const rs = await fetch(`https://spangle-curly-seaplane.glitch.me/api/upload`, {
                        method: "POST",
                        body: fd
                    });
                    const json = await rs.json();
                    fid = `https://cdn.discordapp.com/attachments/1025526944776867952/${json.fileid}/blob`;
                } catch (err) {
                    console.log(err);
                }
            }
        }
        try {
            await onSubmit({ ...tpost, imageUrl: fid });
            setFinished(2);
        } catch (err) {
            console.log(err);
            setFinished(1);
        }
        setIsLoading(false)
    }

    return (
        <form onSubmit={w => check(w)} className="py-8 text-base leading-6 grid gap-2 text-gray-700 sm:text-lg sm:leading-7">
            <div className="relative">
                <input onChange={w => setTPost(curr => ({ ...curr, title: w.target.value }))} value={tpost.title} autoComplete="off" id="title" name="title" type="text" className={`peer placeholder-transparent h-10 w-full border-b-2 ${errors.includes("title") ? 'border-red-500' : 'border-gray-300'} text-gray-900 focus:outline-none focus:borer-rose-600`} placeholder="Title" />
                <label htmlFor="title" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Title</label>
            </div>
            <div className="relative">
                <p className="text-gray-600 text-base">Description</p>
                <textarea onChange={w => setTPost(curr => ({ ...curr, description: w.target.value }))} value={tpost.description} name="desc" id="desc" cols={30} rows={10} placeholder="Description" className={`peer placeholder-transparent h-10 w-full border rounded-lg p-1 ${errors.includes("desc") ? 'border-red-500' : 'border-gray-300'} text-gray-900 focus:outline-none focus:borer-rose-600`}></textarea>
            </div>
            <div>
                <p className="text-gray-600 text-base">Image file:</p>
                <input type="file" name="file" id="file" onChange={handleFileChange} />
                {tpost.imageUrl ? <div className="mt-2">
                    <p className="text-gray-600 text-base">Current image</p>
                    <img width={400} src={tpost.imageUrl} />
                </div> : ""}
            </div>
            <div>
                <p className="text-gray-600 text-base">Delivery type:</p>
                <select onChange={w => setTPost(curr => ({ ...curr, deliveryType: parseInt(w.target.value) }))} className="w-1/2" name="delivery" id="delivery">
                    {deliveryTypes.map((w, ind) => (
                        <option key={ind} value={ind}>{w}</option>
                    ))}
                </select>
            </div>
            <div className="relative">
                <button className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
            </div>
            {finished === 1 ? <p className="text-red-500">Error</p> : ""}
            {finished === 2 ? <p className="text-green-500">Success</p> : ""}
        </form>
    )
}