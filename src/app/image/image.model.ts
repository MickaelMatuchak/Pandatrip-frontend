export class ImageModel {
    constructor(id: number, url: string, desc: string ) {
      this.id = id;
      this.url = url;
      this.description = desc;
    }
    
    id: number;
    url: string;
    description: string;
  }
  