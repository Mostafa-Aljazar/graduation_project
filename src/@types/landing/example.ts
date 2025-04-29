export default interface ExampleResponse {
  message?: string;
  user?: {
    id: string;
    username?: string;
    name?: string;
    bio?: string;
    location?: string;
    link?: string;
    image?: string;
    coverImage?: string;
  };
  error?: string;
  status?: number;
}
