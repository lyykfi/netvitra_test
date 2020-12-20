import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./guards/auth/auth.guard";
import { CasesComponent } from "./components/cases/cases.component";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "cases" },
    { path: "login", component: LoginComponent },
    { path: "cases", component: CasesComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
