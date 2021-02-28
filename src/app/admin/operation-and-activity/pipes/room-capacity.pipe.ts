import { Pipe, PipeTransform } from '@angular/core';
import { Floor, Hostel, Room } from '../models';

@Pipe({
  name: 'roomCapacity',
  pure: false,
})
export class RoomCapacityPipe implements PipeTransform {
  constructor() {}

  transform(
    entity: any,
    floors: Floor[] | undefined,
    rooms: Room[] | undefined,
    // beds: Bed[] | undefined
  ): number {
    if (floors && rooms) {
      const hostel = entity as Hostel;
      const floorIds = floors.filter((f) => f.hostelId === hostel.id).map((f) => f.id);
      const count = 0;
      return rooms.filter((r) => floorIds.includes(r.floorId)).reduce((a, b) => a + b.capacity, 0);
    }
  }
}
