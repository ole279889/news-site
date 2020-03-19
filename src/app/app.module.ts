import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MainPageComponent } from './main-page/main-page.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsEditComponent } from './news-edit/news-edit.component';
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
import { NewsItemComponent } from './news-item/news-item.component';
import { MainPageService } from './main-page/shared/main-page.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NewsDetailComponent,
    NewsEditComponent,
    HeaderComponent,
    FooterComponent,
    NewsItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
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
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
