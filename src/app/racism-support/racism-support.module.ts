import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { HelpPage } from "src/app/help/help.page";
import { SharedModule } from "src/app/shared/shared.module";
import { RacismSupportPage } from "./racism-support.page";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{ path: "", component: RacismSupportPage }]),
        SharedModule,
    ],
    declarations: [RacismSupportPage, HelpPage],
    entryComponents: [HelpPage],
})
export class RacismSupportPageModule {}
