import { Pipe, PipeTransform } from "@angular/core";
import { Offer } from "src/app/models/offer.model";
import { Segment } from "src/app/models/segment.enum";

@Pipe({
  name: "segmentFilter",
})
export class SegmentFilterPipe implements PipeTransform {
  transform(items: Array<Offer>, segment: Segment): any {
    if (!items || !segment) {
      return items;
    }
    return items.filter((item) => item.segment == segment);
  }
}
