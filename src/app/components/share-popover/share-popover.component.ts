import { Component } from "@angular/core";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-share-popover",
  templateUrl: "./share-popover.component.html",
  styleUrls: ["./share-popover.component.scss"],
})
export class SharePopoverComponent {
  public url: string;

  constructor(private popoverController: PopoverController) {}

  public async closePopover() {
    await this.popoverController.dismiss();
  }

  copyMessage(val: string) {
    // https://stackoverflow.com/a/49121680/1753041
    const selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }
}
