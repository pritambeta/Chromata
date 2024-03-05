export function shuffleArray(array: any[]): any[] {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export const categories = [
  ["Nature", "Animals", "Food", "Abstract", "Travel", "Vintage", "Architecture", "Technology", "Sea", "Fantasy", "Minimalist", "Patterns", "Backgrounds", "Aviation", "Sunset"],

  ["Business", "Health", "Science", "Education", "Gaming", "Futuristic", "Forest", "Cars", "Neon", "Mountains", "Textures", "Landscapes", "Underwater"],

  ["Galaxy", "Village", "Computer", "Ancient", "Cartoons", "Retro", "Buildings", "Night Sky", "Wildlife", "Space", "Arts", "City", "Flowers"]];


