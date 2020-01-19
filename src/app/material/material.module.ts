import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

const MaterialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatSidenavModule
];

@NgModule({
  imports: [...MaterialModules],
  exports: [...MaterialModules]
})
export class MaterialModule { }
