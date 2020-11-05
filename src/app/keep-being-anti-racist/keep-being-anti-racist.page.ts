import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, PopoverController } from "@ionic/angular";
import { SharePopoverComponent } from "src/app/components/share-popover/share-popover.component";
import { HelpPage } from "src/app/help/help.page";
import homeMock from "src/app/mocks/home.mock";
import { Category } from "src/app/models/category.model";
import { Home } from "src/app/models/home.model";
import { Offer } from "src/app/models/offer.model";
import { SubCategory } from "src/app/models/sub-category.model";
import { HomeDataService } from "src/app/services/home-data.service";
import { OffersService } from "src/app/services/offers.service";

@Component({
  selector: "app-keep-being-anti-racist",
  templateUrl: "keep-being-anti-racist.page.html",
  styleUrls: ["keep-being-anti-racist.page.scss"],
})
export class KeepBeingAntiRacistPage {
  public offers: Offer[];
  public categories: Category[];
  public subCategories: SubCategory[];

  public category: Category;
  public subCategory: SubCategory;
  public offer: Offer;

  public homeData: Home = homeMock;

  private windowNavigator: any = navigator;

  constructor(
    public offersService: OffersService,
    private route: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
    public popoverController: PopoverController,
    public homeDataService: HomeDataService
  ) {
    this.loadKeepBeingAntiRacistData();
  }

  private loadKeepBeingAntiRacistData() {
    this.homeDataService.getHomeData().then((homeData) => {
      this.homeData = homeData;
      this.offersService.getCategories().then((categories) => {
        this.categories = categories;
        this.offersService.getSubCategories().then((subCategories) => {
          this.subCategories = subCategories;
          this.offersService.getOffers().then((offers) => {
            this.offers = offers;
            this.readQueryParams();
          });
        });
      });
    });
  }

  private readQueryParams() {
    this.route.queryParams.subscribe((params) => {
      if ("categoryID" in params) {
        this.category = this.categories.find(
          (category) => category.categoryID === Number(params.categoryID)
        );
      }
      if ("subCategoryID" in params) {
        this.subCategory = this.subCategories.find(
          (subCategory) =>
            subCategory.subCategoryID === Number(params.subCategoryID)
        );
      }
      if ("offerID" in params) {
        this.offer = this.offers.find(
          (offer) => offer.offerID === Number(params.offerID)
        );
      }
    });
  }

  public clickCategory(category: Category) {
    this.category = category;
    this.subCategory = null;
    this.offer = null;
    this.router.navigate(["/"], {
      queryParams: {
        categoryID: this.category.categoryID,
      },
    });
  }

  public clickSubCategory(subCategory: SubCategory) {
    this.subCategory = subCategory;
    this.offer = null;
    this.router.navigate(["/"], {
      queryParams: {
        categoryID: this.category.categoryID,
        subCategoryID: this.subCategory.subCategoryID,
      },
    });
  }

  public clickOffer(offer: Offer) {
    this.offer = offer;
    this.router.navigate(["/"], {
      queryParams: {
        categoryID: this.category.categoryID,
        subCategoryID: this.subCategory.subCategoryID,
        offerID: this.offer.offerID,
      },
    });
  }

  goBack() {
    if (this.offer) {
      this.clickSubCategory(this.subCategory);
    } else if (this.subCategory) {
      this.clickCategory(this.category);
    } else if (this.category) {
      this.category = null;
      this.router.navigate(["/"]);
    }
  }

  async openHelpModal() {
    const helpModal = await this.modalController.create({
      component: HelpPage,
    });
    return await helpModal.present();
  }

  openSharePopover() {
    const url = window.location.href;
    if (this.windowNavigator.share) {
      this.windowNavigator
        .share({
          title: "Keep Being Anti-Racist",
          url: url,
        })
        .then(() => {
          console.log("Thank you for being anti-racist!");
        })
        .catch(console.error);
    } else {
      this.presentPopover(url);
    }
  }

  async presentPopover(url: string) {
    const popover = await this.popoverController.create({
      component: SharePopoverComponent,
      animated: true,
      cssClass: "share-popover",
      translucent: true,
      showBackdrop: true,
      componentProps: {
        url: url,
      },
    });

    return await popover.present();
  }
}
