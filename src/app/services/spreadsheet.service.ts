import { Injectable } from "@angular/core";
import helpMock from "src/app/mocks/help.mock";
import homeMock from "src/app/mocks/home.mock";
import { Category } from "src/app/models/category.model";
import { Help } from "src/app/models/help.model";
import { Home } from "src/app/models/home.model";
import { Offer } from "src/app/models/offer.model";
import { Segment } from "src/app/models/segment.enum";
import { SubCategory } from "src/app/models/sub-category.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SpreadsheetService {
  private spreadsheetURL = environment.google_sheets_api_url;
  private spreadsheetId = environment.google_sheets_sheet_id;
  private categorySheetIndex = 2;
  private subCategorySheetIndex = 3;
  private offerSheetIndex = 1;
  private helpSheetIndex = 5;
  private homeSheetIndex = 6;

  constructor() {}

  static readCellValue(row, key): string {
    return row[key].$t;
  }

  convertCategoryRowToCategoryObject(categoryRow): Category {
    return {
      categoryID: Number(
        SpreadsheetService.readCellValue(categoryRow, "gsx$categoryid")
      ),
      categoryName: SpreadsheetService.readCellValue(
        categoryRow,
        "gsx$categoryname"
      ),
      categoryIcon: SpreadsheetService.readCellValue(
        categoryRow,
        "gsx$categoryicon"
      ),
      categoryDescription: SpreadsheetService.readCellValue(
        categoryRow,
        "gsx$categorydescription"
      ),
    };
  }

  getCategories(): Promise<Category[]> {
    return fetch(
      `${this.spreadsheetURL}/${this.spreadsheetId}/${this.categorySheetIndex}` +
        "/public/values?alt=json"
    )
      .then((response) => response.json())
      .then((response) => {
        return response.feed.entry.map(this.convertCategoryRowToCategoryObject);
      })
      .catch((_) => {
        return [];
      });
  }

  convertSubCategoryRowToSubCategoryObject(subCategoryRow): SubCategory {
    return {
      subCategoryID: Number(
        SpreadsheetService.readCellValue(subCategoryRow, "gsx$subcategoryid")
      ),
      subCategoryName: SpreadsheetService.readCellValue(
        subCategoryRow,
        "gsx$subcategoryname"
      ),
      subCategoryIcon: SpreadsheetService.readCellValue(
        subCategoryRow,
        "gsx$subcategoryicon"
      ),
      subCategoryDescription: SpreadsheetService.readCellValue(
        subCategoryRow,
        "gsx$subcategorydescription"
      ),
      categoryID: Number(
        SpreadsheetService.readCellValue(subCategoryRow, "gsx$categoryid")
      ),
    };
  }

  getSubCategories(): Promise<SubCategory[]> {
    return fetch(
      `${this.spreadsheetURL}/${this.spreadsheetId}/${this.subCategorySheetIndex}` +
        "/public/values?alt=json"
    )
      .then((response) => response.json())
      .then((response) => {
        return response.feed.entry.map(
          this.convertSubCategoryRowToSubCategoryObject
        );
      })
      .catch((_) => {
        return [];
      });
  }

  convertOfferRowToOfferObject(offerRow): Offer {
    return {
      offerID: Number(
        SpreadsheetService.readCellValue(offerRow, "gsx$offerid")
      ),
      offerName: SpreadsheetService.readCellValue(offerRow, "gsx$name"),
      offerIcon: SpreadsheetService.readCellValue(offerRow, "gsx$icon"),
      offerDescription: SpreadsheetService.readCellValue(
        offerRow,
        "gsx$whatservice"
      ),
      offerLink: SpreadsheetService.readCellValue(
        offerRow,
        "gsx$linktowebsite"
      ),
      offerImage: SpreadsheetService.readCellValue(offerRow, "gsx$image"),
      offerNumber: SpreadsheetService.readCellValue(
        offerRow,
        "gsx$phonenumber"
      ),
      offerEmail: SpreadsheetService.readCellValue(
        offerRow,
        "gsx$emailaddress"
      ),
      offerAddress: SpreadsheetService.readCellValue(offerRow, "gsx$address"),
      offerOpeningHoursWeekdays: SpreadsheetService.readCellValue(
        offerRow,
        "gsx$openinghoursweekdays"
      ),
      offerOpeningHoursWeekends: SpreadsheetService.readCellValue(
        offerRow,
        "gsx$openinghoursweekends"
      ),
      offerForWhom: SpreadsheetService.readCellValue(offerRow, "gsx$forwhom"),
      offerCapacity: SpreadsheetService.readCellValue(offerRow, "gsx$capacity"),
      offerVisible:
        SpreadsheetService.readCellValue(offerRow, "gsx$visible") === "Show",
      subCategoryID: Number(
        SpreadsheetService.readCellValue(offerRow, "gsx$sub-categoryid")
      ),
      categoryID: Number(
        SpreadsheetService.readCellValue(offerRow, "gsx$categoryid")
      ),
      segment:
        Segment[SpreadsheetService.readCellValue(offerRow, "gsx$segment")],
    };
  }

  getOffers(): Promise<Offer[]> {
    return fetch(
      `${this.spreadsheetURL}/${this.spreadsheetId}/${this.offerSheetIndex}` +
        "/public/values?alt=json"
    )
      .then((response) => response.json())
      .then((response) => {
        return response.feed.entry
          .map(this.convertOfferRowToOfferObject)
          .filter((offer) => offer.offerVisible);
      })
      .catch((_) => {
        return [];
      });
  }

  convertHelpRowToHelpObject(helpRows): Help {
    return {
      helpTitle: SpreadsheetService.readCellValue(helpRows[0], "gsx$value"),
      helpIcon: SpreadsheetService.readCellValue(helpRows[1], "gsx$value"),
      helpText: SpreadsheetService.readCellValue(helpRows[2], "gsx$value"),
      helpPhoneLabel: SpreadsheetService.readCellValue(
        helpRows[3],
        "gsx$value"
      ),
      helpPhone: SpreadsheetService.readCellValue(helpRows[4], "gsx$value"),
      helpWhatsApp: SpreadsheetService.readCellValue(helpRows[5], "gsx$value"),
      helpFacebook: SpreadsheetService.readCellValue(helpRows[6], "gsx$value"),
      helpTwitter: SpreadsheetService.readCellValue(helpRows[7], "gsx$value"),
    };
  }

  getHelp(): Promise<Help> {
    return fetch(
      `${this.spreadsheetURL}/${this.spreadsheetId}/${this.helpSheetIndex}` +
        "/public/values?alt=json"
    )
      .then((response) => response.json())
      .then((response) => {
        return this.convertHelpRowToHelpObject(response.feed.entry);
      })
      .catch((_) => {
        return helpMock;
      });
  }

  convertHomeRowToHomeObject(homeRows): Home {
    return {
      homeGreeting: SpreadsheetService.readCellValue(homeRows[0], "gsx$value"),
      homeAR: SpreadsheetService.readCellValue(homeRows[1], "gsx$value"),
      homeBAR: SpreadsheetService.readCellValue(homeRows[2], "gsx$value"),
      homeKBAR: SpreadsheetService.readCellValue(homeRows[3], "gsx$value"),
      homeARLabel: SpreadsheetService.readCellValue(homeRows[4], "gsx$value"),
      homeARLink: SpreadsheetService.readCellValue(homeRows[5], "gsx$value"),
      homeBARLabel: SpreadsheetService.readCellValue(homeRows[6], "gsx$value"),
      homeBARLink: SpreadsheetService.readCellValue(homeRows[7], "gsx$value"),
      homeKBARLabel: SpreadsheetService.readCellValue(homeRows[8], "gsx$value"),
      homeKBARLink: SpreadsheetService.readCellValue(homeRows[9], "gsx$value"),
    };
  }

  getHome(): Promise<Home> {
    return fetch(
      `${this.spreadsheetURL}/${this.spreadsheetId}/${this.homeSheetIndex}` +
        "/public/values?alt=json"
    )
      .then((response) => response.json())
      .then((response) => {
        return this.convertHomeRowToHomeObject(response.feed.entry);
      })
      .catch((_) => {
        return homeMock;
      });
  }
}
