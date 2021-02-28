import { Pipe, PipeTransform } from '@angular/core';
import { RoomType } from '../models';

@Pipe({
  name: 'roomType',
  pure: false,
})
export class RoomTypePipe implements PipeTransform {
  constructor() {}

  transform(id: number, roomTypes: RoomType[]): string {
    return roomTypes.find(t => t.id === id)?.type;
  }
}
