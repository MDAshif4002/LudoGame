import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { SupportComponent } from './support/support.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { VerifynumberComponent } from './verifynumber/verifynumber.component';
import { WalletComponent } from './wallet/wallet.component';
import { DipositmoneyComponent } from './dipositmoney/dipositmoney.component';
import { PaymentgatewayComponent } from './paymentgateway/paymentgateway.component';
import { ReferralComponent } from './referral/referral.component';
import { HistoryComponent } from './history/history.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ProfileComponent } from './profile/profile.component';
import { LegaltermComponent } from './legalterm/legalterm.component';
import { TermsComponent } from './terms/terms.component';
import { ClassicludoComponent } from './classicludo/classicludo.component';
import { LudogameComponent } from './ludogame/ludogame.component';
import { LudoplayerComponent } from './ludoplayer/ludoplayer.component';
import { SnakeAndLadderComponent } from './snake-and-ladder/snake-and-ladder.component';
import { ClassicludodetailComponent } from './classicludodetail/classicludodetail.component';
import { SnakeladderdetailComponent } from './snakeladderdetail/snakeladderdetail.component';
import { ContactusComponent } from './contactus/contactus.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "home", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    {path: "support", component: SupportComponent},
    {path: "userhome", component: UserhomeComponent},
    {path: "verifynumber", component: VerifynumberComponent},
    {path: "wallet", component: WalletComponent},
    {path: "dipositmoney", component: DipositmoneyComponent},
    {path: "paymentgateway", component: PaymentgatewayComponent},
    {path: "referral", component: ReferralComponent},
    {path: "history", component: HistoryComponent},
    {path: "withdraw", component: WithdrawComponent},
    {path: "profile", component: ProfileComponent},
    {path: "legalterm", component: LegaltermComponent},
    {path: "terms", component: TermsComponent},
    {path: "classicludo", component: ClassicludoComponent},
    {path: "ludogame", component: LudogameComponent},
    {path: "ludoplayer", component: LudoplayerComponent},
    {path:"snake-and-ladder",component:SnakeAndLadderComponent},
    {path:"classicludodetail",component:ClassicludodetailComponent},
    {path:"snakeladderdetail",component:SnakeladderdetailComponent},
    {path:"contactus",component:ContactusComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
