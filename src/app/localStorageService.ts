// manually made to user local storage code for login (Code slighyly modified, clear was made manually)

export class LocalStorageService<T> {
    constructor(private key: string) {

    }

    saveItemsToLocalStorage(items: Array<T> | T) {
        const savedItems = localStorage.setItem(this.key, JSON.stringify(items));
        return savedItems;
      }
      getItemsFromLocalStorage(key?: string) {
          let savedItems;
        if (key != null) {
            savedItems = JSON.parse(localStorage.getItem(key));
        } else {
            savedItems = JSON.parse(localStorage.getItem(this.key));
            // JSON.parse makes it readable for us in console (otherwise its just 1 string)
        }
        return savedItems;
      }

      clearItemFromLocalStorage(key?: string) {
          if (key != null) {
            const items = null;
            localStorage.setItem(key, JSON.stringify(items));
          } else {
            localStorage.clear();
          }
      }
}
