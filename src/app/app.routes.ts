import { Routes } from '@angular/router';
import { Assignments } from './assignments/assignments';
import {AddAssignment} from './assignments/add-assignment/add-assignment';
import {AssignmentDetail} from './assignments/assignment-detail/assignment-detail';
import {EditAssignment} from './assignments/edit-assignment/edit-assignment';
import { authGuard } from './shared/auth-guard';
import { AuthService } from './shared/auth.service';
import { Login } from './login/login';

export const routes: Routes = [
    //home page qui sera afficher avec l'url http://localhost:4200
    //ou http://localhost:4200
    // elle va etre redriger vers la page /home
    {path:'',redirectTo: 'home',pathMatch:'full'},
    //page home qui sera affichera avec l'url http://localhost:4200
    {path:'home',component:Assignments},
    {path:'add',component:AddAssignment},
    {path:'assignment/:id',component:AssignmentDetail},
    { path: 'assignment/:id/edit',component: EditAssignment},
    {path: 'assignment/:id/edit',component:EditAssignment,canActivate: [authGuard]},
    {path:'login',component:Login}
];
