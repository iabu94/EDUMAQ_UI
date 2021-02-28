import { Pipe, PipeTransform } from "@angular/core";
import { Floor, Hostel, Room } from "../models";

@Pipe({
  name: "roomCount",
  pure: false,
})
export class RoomCountPipe implements PipeTransform {
  constructor() {}

  transform(hostel: Hostel, floors: Floor[], rooms: Room[]): number {
    const filteredFloorIds = floors.filter(f => f.hostelId == hostel.id).map(f => f.id);
    const filteredRooms = rooms.filter(r => filteredFloorIds.includes(r.floorId));
    return filteredRooms.length;
  }
}
