import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchSchedule'
})
export class SearchSchedulePipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      if (!item.title) {
        return false;
      }
      return item.title.toLowerCase().includes(searchText);
    });
  }
}




// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'search'
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
//         (item.title && item.title.toLowerCase().includes(searchText)) 
//       );
//     });
//   }
// }
