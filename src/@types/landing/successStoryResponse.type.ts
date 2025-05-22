import { StaticImageData } from 'next/image';

export default interface successStoryResponse {
  id: string | number;
  img: StaticImageData | string;
  title: string;
  content: string;
  createdAt: string | Date;
}
