import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { SensorComponent } from './layout/sensor/sensor.component';
import { TemperatureCardComponent } from './layout/sensor/temperature/temperature.component';
import { PressureCardComponent } from './layout/sensor/pressure/pressure.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DialogMaps } from './dialogs/map/dialogMap.component';
import { WeatherStationMapComponent } from './layout/weatherstationMap/weatherstationMap.component';
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
    DialogMaps
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
  providers: [],
  entryComponents: [DialogMaps],
  bootstrap: [AppComponent]
})
export class AppModule { }
