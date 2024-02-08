export interface Film {
    file_url: string;
    synopsis_url: string;
    title: string;
  }
  
  export interface Chapter {
    pos: number;
    title: string;
  }
  

  export interface Tag {
    title: string;
    url: string;
  }
  
  export interface Keywords {
    pos: number;
    data: Tag[];
  }

  export interface film{
    file_url: string;
    synopsis_url: string;
    title: string;
  }