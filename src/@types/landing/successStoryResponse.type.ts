import { StaticImageData } from 'next/image';

export default interface successStoryResponse {
  id: string;
  img: StaticImageData | string;
  title: string;
  content: string;
  createdAt: string | Date;
}
