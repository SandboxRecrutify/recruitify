import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string  = '', field: string = 'Name'): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    return items.filter((item) => {
      return item[field].toLowerCase().includes(searchText.toLowerCase());
    });
  }
}
