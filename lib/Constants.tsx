export function shuffleArray(array: any[]): any[] {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export const categories = [
  ["Nature", "Animals", "Food", "Abstract", "Sea", "Fantasy", "Patterns", "Backgrounds", "Aviation", "Sunset"],

  ["Health", "Science", "Gaming", "Futuristic", "Forest", "Cars", "Neon", "Mountains", "Landscapes", "Underwater"],

  ["Galaxy", "Computer", "Cartoons", "Buildings", "Night Sky", "Wildlife", "Space", "Arts", "City", "Flowers"]
];


