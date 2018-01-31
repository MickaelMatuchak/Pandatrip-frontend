export class ImageModel {
    constructor(id: number, url: string, description: string ) {
      this.id = id;
      this.url = url;
      this.description = description;
    }
    
    id: number;
    url: string;
    description: string;
  }
  