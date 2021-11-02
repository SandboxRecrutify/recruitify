import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: string = ''): any[] {
    if (!items) {
      return [];
    }
    if (!filter) {
      return items;
    }
    if (filter === 'active') {
      return items.filter((item) => item.isActive === true);
    } else if (filter === 'closed') {
      return items.filter((item) =>  item.isActive === false);
    }
    return items
  }
}
