import { Injectable } from "@angular/core";
import { Home } from "src/app/models/home.model";
import { SpreadsheetService } from "src/app/services/spreadsheet.service";

@Injectable({
  providedIn: "root",
})
export class HomeDataService {
  constructor(private spreadsheetService: SpreadsheetService) {}

  getHomeData(): Promise<Home> {
    return this.spreadsheetService.getHome();
  }
}
