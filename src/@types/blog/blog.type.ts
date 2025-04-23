import { IconType } from 'react-icons';
export interface ISocialLink {
  icon: IconType;
  href: string;
}

export interface ISocialMediaLinksProps {
  links: ISocialLink[];
}
export interface IForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

export interface IContactFormProps {
  onSubmit: (values: IForm) => void;
  status: string;
  setStatus: (status: string) => void;
}
export interface IDetail {
  title: string;
  brief: string;
  lists: {
    id: number;
    title: string;
    text: string;
  }[];
}

export interface IBlogArticleProps {
  article: IDetail;
}
