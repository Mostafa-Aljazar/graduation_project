import { StaticImageData } from "next/image";


export default interface successStoryResponse {
    id: number;
    img: StaticImageData | string;
    title: string;
    content: string;
}

