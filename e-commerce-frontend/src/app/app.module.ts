import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { BannerComponent } from './components/layout/banner/banner.component';
import { ProductCardComponent } from './components/layout/product-card/product-card.component';
import { ProductListComponent } from './components/layout/product-list/product-list.component';
import { RatingComponent } from './components/layout/rating/rating.component';
import { SpecialComponent } from './components/layout/special/special.component';
import { MapComponent } from './components/layout/map/map.component';
import { ActicleListComponent } from './components/layout/acticle-list/acticle-list.component';
import { ArticleComponent } from './components/layout/article/article.component';
import { RublesPipe } from './pipes/rubles.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    ProductCardComponent,
    ProductListComponent,
    RatingComponent,
    SpecialComponent,
    MapComponent,
    ActicleListComponent,
    ArticleComponent,
    RublesPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
