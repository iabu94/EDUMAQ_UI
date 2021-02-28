import { Pipe, PipeTransform } from '@angular/core';
import { Bed, Floor, Hostel, Room } from '../models';

@Pipe({
  name: 'bedCount',
  pure: false,
})
export class BedCountPipe implements PipeTransform {
  constructor() {}

  transform(hostel: Hostel, floors: Floor[], rooms: Room[], beds: Bed[]): number {
    const filteredFloorIds = floors.filter(f => f.hostelId === hostel.id).map(f => f.id);
    const filteredRoomIds = rooms.filter(r => filteredFloorIds.includes(r.floorId)).map(r => r.id);
    const filteredBeds = beds.filter(b => filteredRoomIds.includes(b.roomId));
    return filteredBeds.length;
  }
}
