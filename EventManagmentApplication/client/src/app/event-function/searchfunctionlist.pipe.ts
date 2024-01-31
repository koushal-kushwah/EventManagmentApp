// // search.pipe.ts

// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'search',
// })
// export class SearchPipe implements PipeTransform {
//   transform(items: any[], searchText: string): any[] {
//     if (!items) return [];
//     if (!searchText) return items;

//     searchText = searchText.toLowerCase();

//     return items.filter((item) => {
//       if (!item) return false; // Add a null check here

//       // Customize the properties you want to search for
//       return (
//         (item.name && item.name.toLowerCase().includes(searchText)) ||
//         (item.description && item.description.toLowerCase().includes(searchText)) ||
//         (item.icon && item.icon.toLowerCase().includes(searchText))
//       );
//     });
//   }
// }


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      if (!item) return false; // Add a null check here

      // Customize the properties you want to search for
      return (
        (item.name && item.name.toLowerCase().includes(searchText)) ||
        (item.description && item.description.toLowerCase().includes(searchText))
      );
    });
  }
}
