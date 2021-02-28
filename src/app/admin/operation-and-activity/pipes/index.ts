
// export * from './bed-count.pipe';
// export * from './hostel-name.pipe';
// export * from './room-count.pipe';
// export * from './room-type.pipe';

import { BedCountPipe } from './bed-count.pipe';
import { HostelNamePipe } from './hostel-name.pipe';
import { RoomCapacityPipe } from './room-capacity.pipe';
import { RoomCountPipe } from './room-count.pipe';
import { RoomTypePipe } from './room-type.pipe';

export const PIPES = [
    BedCountPipe,
    HostelNamePipe,
    RoomCountPipe,
    RoomTypePipe,
    RoomCapacityPipe
];
