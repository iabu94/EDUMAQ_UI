import { Pipe, PipeTransform } from '@angular/core';
import { Hostel } from '../models';

@Pipe({
  name: 'hostelName',
  pure: false,
})
export class HostelNamePipe implements PipeTransform {
  constructor() {}

  transform(id: number, hostels: Hostel[]): string {
    return hostels.find(h => h.id === id)?.name;
  }
}
