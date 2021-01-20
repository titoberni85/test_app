import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'image-list', pathMatch: 'full' },
  { path: 'image-list', loadChildren: () => import(`./pages/image-list/image-list.module`).then(m => m.ImageListModule)}
  // { path: 'image-list', loadChildren: './pages/image-list/image-list.module#ImageListModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
