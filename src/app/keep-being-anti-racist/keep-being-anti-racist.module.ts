import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { HelpPage } from "src/app/help/help.page";
import { SharedModule } from "src/app/shared/shared.module";
import { KeepBeingAntiRacistPage } from "./keep-being-anti-racist.page";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: "", component: KeepBeingAntiRacistPage },
        ]),
        SharedModule,
    ],
    declarations: [KeepBeingAntiRacistPage, HelpPage],
    entryComponents: [HelpPage],
})
export class KeepBeingAntiRacistPageModule {}
