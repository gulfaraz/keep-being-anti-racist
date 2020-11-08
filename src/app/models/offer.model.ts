import { Segment } from "src/app/models/segment.enum";

export class Offer {
  offerID: number;
  offerName: string;
  offerIcon: string;
  offerDescription: string;
  offerLink?: string;
  offerImage: string;
  offerNumber?: string;
  offerEmail?: string;
  offerAddress?: string;
  offerOpeningHoursWeekdays?: string;
  offerOpeningHoursWeekends?: string;
  offerForWhom?: string;
  offerCapacity?: string;
  offerVisible: boolean;
  subCategoryID: number;
  categoryID: number;
  segment: Segment;
}
