interface MetaData {
  id: number;
  name: string;
}

export interface ResponseGame {
  id: number;
  title: string;
  description: string;
  price: number;
  cover_image_url: string;
  genres: Array<MetaData>;
  platforms: Array<MetaData>;

}



export interface IMainProps {
  slides: Array<ResponseGame>;
}