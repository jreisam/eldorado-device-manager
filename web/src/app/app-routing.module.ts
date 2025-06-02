import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryCreateComponent } from './components/category/category-create/category-create.component';
import { DeviceListComponent } from './components/device/device-list/device-list.component';
import { DeviceCreateComponent } from './components/device/device-create/device-create.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/create', component: CategoryCreateComponent },
  { path: 'devices', component: DeviceListComponent },
  { path: 'devices/create', component: DeviceCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
