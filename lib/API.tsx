class API {
  root: string;
  constructor() {
    this.root = 'https://source.unsplash.com';
  }
  private async getOriginalURL(url: string): string | null {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        redirect: 'follow',
      });

      const responseURL = response.url;
      if (responseURL.startsWith("https://plus")) {
        return this.getOriginalURL(url);
      }
      if (responseURL.startsWith("https://images.unsplash.com/source-404")) {
        return this.getOriginalURL("https://source.unsplash.com/400x600/?India");
      }
      return responseURL;
    } catch (error) {
      return null;
    }
  }
  async getRandomPhoto(width:number = 600, height:number = 400): Promise<string | null> {
    const url = `${this.root}/random/${width}x${height}`;
    return this.getOriginalURL(url);
  }
  async getRandomPhotos(width:number = 600, height:number = 400, count:number = 10): Promise<string[] | null> {
    const urls = [];
    for (let i = 0; i < count; i++) {
      const url = await this.getRandomPhoto(width, height);
      if (url) {
        urls.push(url);
      }
    }
    return urls;
  }
  
  async getPhotoByCategory(category:string, width:number=400, height:number=600): Promise<string | null> {
    const url = `${this.root}/${width}x${height}/?${category}`;
    return this.getOriginalURL(url);
  }

  async getPhotosByCategory(category, width:number=600, height:number=400, count:number=10): Promise<string[] | null> {
    const urls = [];
    for (let i = 0; i < count; i++) {
      const url = await this.getPhotoByCategory(category, width, height);
      if (url) {
        urls.push(url);
      }
    }
    return urls;
  }

  getPhotoId(url:string) {
    const start = url.indexOf("photo-");
    const end = url.indexOf("?");
    if (start !== -1 && end !== -1) {
        const uniqueIdentifier = url.substring(start, end);
        return uniqueIdentifier;
    } else {
        return null;
    }
  }
}

export default API;
