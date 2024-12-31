import { Routes } from '@angular/router';
import { LoginComponent } from './compnents/login/login.component';
import { RegisterComponent } from './compnents/register/register.component';
import { UsersComponent } from './compnents/users/users.component';
import { UserProfileComponent } from './compnents/user-profile/user-profile.component';
import { UpdateUserProfileComponent } from './compnents/update-user-profile/update-user-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './compnents/home/home.component';
import { CreateBlogComponent } from './compnents/create-blog/create-blog.component';
import { ViewBlogComponent } from './compnents/view-blog/view-blog.component';
import { DashboardComponent } from './compnents/dashboard/dashboard.component';
import { UpdateDeleteBlogComponent } from './compnents/update-delete-blog/update-delete-blog.component';

export const routes: Routes = [
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'',
        redirectTo:'/home',
        pathMatch:'full'
    },
    {
        path:'admin',
        loadChildren: () => import('./admin/admin.module').then(m=>m.AdminModule)
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'users',
        children :[
            {
                path:'',
                component:UsersComponent
            },
            {
                path:':id',
                component:UserProfileComponent
            },
            {
                path:'update-profile',
                component:UpdateUserProfileComponent
            }
        ]
    },
    {
        path:'update-profile',
        component:UpdateUserProfileComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'create-blog',
        component:CreateBlogComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'view-blog/:id',
        component:ViewBlogComponent
    },
    {
        path:'dashboard',
        // component:DashboardComponent
        children:[
            {
                path:'',
                component:DashboardComponent
            },
            {

                path:'update-profile',
                component:UpdateUserProfileComponent
            },
            {
                path:'update-blog',
                component:UpdateDeleteBlogComponent
            },
            {
                path:'users',
                children:[
                    {
                        path:'',
                        component:UsersComponent
                    },
                    {
                        path:':id',
                        component:UserProfileComponent
                    },
                ]
            }



        ]
    }
    

];
