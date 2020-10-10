import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
    {
        path: "",
        component: TabsPage,
        children: [
            {
                path: "",
                children: [
                    {
                        path: "",
                        loadChildren:
                            "../keep-being-anti-racist/keep-being-anti-racist.module#KeepBeingAntiRacistPageModule",
                    },
                ],
            },
            {
                path: "",
                redirectTo: "/",
                pathMatch: "full",
            },
        ],
    },
    {
        path: "",
        redirectTo: "/",
        pathMatch: "full",
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {}
