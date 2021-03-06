import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MainPageComponent } from './main-page/main-page.component';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthorizationService } from './auth/shared/authorization.service';
import { StorageService } from './shared/services/storage.service';
import { DialogService } from './shared/services/dialog.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NewsItemComponent } from './main-page/news-item/news-item.component';
import { MainPageService } from './main-page/shared/main-page.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule } from '@angular/forms';
import { FilterService } from './shared/services/filter.service';
import { SearchItemComponent } from './common/header/search-item/search-item.component';
import { EditoralContactsComponent } from './main-page/editoral-contacts/editoral-contacts.component';
import { AgmCoreModule } from '@agm/core';
import { BBCodeParser } from './shared/parsers/bbcode.parser';
import { CompileDirectiveModule } from './shared/directives/compile.directive';
import { AuthGuard } from './shared/guards/auth.guard';
import { ChangesGuard } from './shared/guards/chandes.guard';
import { TextMapComponent } from './common/text-modificators/text-map/text-map.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    NewsItemComponent,
    SearchItemComponent,
    EditoralContactsComponent,
    TextMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxSkeletonLoaderModule,
    CompileDirectiveModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAnVNHcjKDSp3iyXaOAse99A3KNUP6UsHU'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [
    MatDialogModule,
  ],
  providers: [
    AuthorizationService,
    StorageService,
    DialogService,
    MainPageService,
    FilterService,
    BBCodeParser,
    AuthGuard,
    ChangesGuard,
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
