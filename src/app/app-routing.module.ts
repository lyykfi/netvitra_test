import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { CasesComponent } from "./cases/cases.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "login" },
    { path: "login", component: LoginComponent },
    { path: "cases", component: CasesComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
