import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterModule } from "@angular/router";
import { ModalController, PopoverController } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CategoryComponent } from "src/app/components/category/category.component";
import { OfferComponent } from "src/app/components/offer/offer.component";
import { SubCategoryComponent } from "src/app/components/sub-category/sub-category.component";
import { CategoryFilterPipe } from "src/app/pipes/category-filter.pipe";
import { SegmentFilterPipe } from "src/app/pipes/segment-filter.pipe";
import { SubCategoryFilterPipe } from "src/app/pipes/sub-category-filter.pipe";
import { KeepBeingAntiRacistPage } from "./keep-being-anti-racist.page";

describe("KeepBeingAntiRacistPage", () => {
  let component: KeepBeingAntiRacistPage;
  let fixture: ComponentFixture<KeepBeingAntiRacistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KeepBeingAntiRacistPage,
        CategoryComponent,
        SubCategoryComponent,
        OfferComponent,
        CategoryFilterPipe,
        SubCategoryFilterPipe,
        SegmentFilterPipe,
      ],
      imports: [TranslateModule.forRoot(), RouterModule.forRoot([])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ModalController,
        },
        {
          provide: PopoverController,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepBeingAntiRacistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
