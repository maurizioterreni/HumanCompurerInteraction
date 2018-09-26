import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { SensorComponent } from './layout/sensor/sensor.component';
import { TemperatureCardComponent } from './layout/sensor/temperature/temperature.component';
import { RainCardComponent } from './layout/sensor/rain/rain.component';
import { WindCardComponent } from './layout/sensor/wind/wind.component';
import { DaylightCardComponent } from './layout/sensor/daylight/daylight.component';
import { PressureCardComponent } from './layout/sensor/pressure/pressure.component';
import { UvCardComponent } from './layout/sensor/uv/uv.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogMaps } from './dialogs/map/dialogMap.component';
import { DialogChart } from './dialogs/chart/dialogChart.component';
import { WeatherStationMapComponent } from './layout/weatherstationMap/weatherstationMap.component';
import { AlertComponent } from './layout/alert/alert.component';
import { JwtInterceptor } from './layout/helper/jwt.interceptor';
import { ErrorInterceptor } from './layout/helper/error.interceptor';
import { LoginComponent } from './layout/login/login.component';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WeatherStationMapComponent,
    SensorComponent,
    TemperatureCardComponent,
    PressureCardComponent,
    WindCardComponent,
    DaylightCardComponent,
    UvCardComponent,
    RainCardComponent,
    DialogMaps,
    DialogChart,
    AlertComponent,
    LoginComponent,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyB9t2Ki03ItPGImdj2sro-hMyBcQEsnloc'}),
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  entryComponents: [DialogMaps, DialogChart],
  bootstrap: [AppComponent]
})
export class AppModule { }
