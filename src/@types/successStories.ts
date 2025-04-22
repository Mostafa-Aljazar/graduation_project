import { StaticImageData } from "next/image";


export default interface successStory {
    id: number;
    img: StaticImageData | string;
    title: string;
    content: string;
}

