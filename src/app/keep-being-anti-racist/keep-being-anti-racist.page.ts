import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, PopoverController } from "@ionic/angular";
import { SharePopoverComponent } from "src/app/components/share-popover/share-popover.component";
import { HelpPage } from "src/app/help/help.page";
import { Category } from "src/app/models/category.model";
import { Offer } from "src/app/models/offer.model";
import { SubCategory } from "src/app/models/sub-category.model";
import { OffersService } from "src/app/services/offers.service";
import { TranslatableStringService } from "src/app/services/translatable-string.service";

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

    private windowNavigator: any = navigator;

    constructor(
        public offersService: OffersService,
        private route: ActivatedRoute,
        private router: Router,
        public translatableString: TranslatableStringService,
        public modalController: ModalController,
        public popoverController: PopoverController
    ) {
        this.loadKeepBeingAntiRacistData();
    }

    private loadKeepBeingAntiRacistData() {
        this.offersService.getCategories().then(categories => {
            this.categories = this.translateCategories(categories);
            this.offersService.getSubCategories().then(subCategories => {
                this.subCategories = this.translateSubCategories(subCategories);
                this.offersService.getOffers().then(offers => {
                    this.offers = this.translateOffers(offers);
                    this.readQueryParams();
                });
            });
        });
    }

    private translateCategories(categories: Category[]) {
        return categories.map((category: Category) => {
            category.categoryName = this.translatableString.get(
                category.categoryName
            );
            category.categoryDescription = this.translatableString.get(
                category.categoryDescription
            );
            return category;
        });
    }

    private translateSubCategories(subCategories: SubCategory[]) {
        return subCategories.map((subCategory: SubCategory) => {
            subCategory.subCategoryName = this.translatableString.get(
                subCategory.subCategoryName
            );
            subCategory.subCategoryDescription = this.translatableString.get(
                subCategory.subCategoryDescription
            );
            return subCategory;
        });
    }

    private translateOffers(offers: Offer[]) {
        return offers.map((offer: Offer) => {
            offer.offerName = this.translatableString.get(offer.offerName);
            offer.offerDescription = this.translatableString.get(
                offer.offerDescription
            );
            return offer;
        });
    }

    private readQueryParams() {
        this.route.queryParams.subscribe(params => {
            if ("categoryID" in params) {
                this.category = this.categories.find(
                    category =>
                        category.categoryID === Number(params.categoryID)
                );
            }
            if ("subCategoryID" in params) {
                this.subCategory = this.subCategories.find(
                    subCategory =>
                        subCategory.subCategoryID ===
                        Number(params.subCategoryID)
                );
            }
            if ("offerID" in params) {
                this.offer = this.offers.find(
                    offer => offer.offerID === Number(params.offerID)
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
