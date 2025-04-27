import { StaticImageData } from "next/image";

export default interface articleResponse {
    id: string;
    title: string;
    content: string;
    brief: string;
    image: StaticImageData | string;
    createdAt: string | Date;
    updatedAt?: string | Date;
}



