import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CategoryComponent } from "src/app/components/category/category.component";
import { OfferComponent } from "src/app/components/offer/offer.component";
import { SubCategoryComponent } from "src/app/components/sub-category/sub-category.component";
import { CategoryFilterPipe } from "src/app/pipes/category-filter.pipe";
import { SegmentFilterPipe } from "src/app/pipes/segment-filter.pipe";
import { SubCategoryFilterPipe } from "src/app/pipes/sub-category-filter.pipe";

@NgModule({
  declarations: [
    CategoryComponent,
    SubCategoryComponent,
    OfferComponent,
    CategoryFilterPipe,
    SubCategoryFilterPipe,
    SegmentFilterPipe,
  ],
  imports: [CommonModule, IonicModule, FormsModule, TranslateModule.forChild()],
  exports: [
    CategoryComponent,
    SubCategoryComponent,
    OfferComponent,
    TranslateModule,
    CategoryFilterPipe,
    SubCategoryFilterPipe,
    SegmentFilterPipe,
  ],
})
export class SharedModule {}
