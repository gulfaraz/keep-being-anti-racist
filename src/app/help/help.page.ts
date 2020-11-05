import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";
import helpMock from "src/app/mocks/help.mock";
import { Help } from "src/app/models/help.model";
import { HelpService } from "src/app/services/help.service";

@Component({
  selector: "app-help",
  templateUrl: "./help.page.html",
  styleUrls: ["./help.page.scss"],
})
export class HelpPage {
  public help: Help = helpMock;

  constructor(
    public modalController: ModalController,
    public helpService: HelpService
  ) {
    this.loadHelpDetails();
  }

  loadHelpDetails() {
    this.helpService.getHelp().then((help) => {
      this.help = help;
    });
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
