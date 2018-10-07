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
import { DialogCreateWeatherStation } from './dialogs/createWeatherStation/dialog-createWeatherStation.component';
import { DialogCreateSensorComponent } from './dialogs/createSensor/dialog-createSensor.component';
import { WeatherStationMapComponent } from './layout/weatherstationMap/weatherstationMap.component';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { PersonalComponent } from './layout/personal/personal.component';
import { MyWeatherStationComponent } from './layout/myWeatherStation/myWeatherStation.component';
import { AlertModule } from 'ngx-alerts';
import { CookieLawModule } from 'angular2-cookie-law';
import { AuthenticationService } from './services/authentication/authentication.service';


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
    DialogCreateWeatherStation,
    DialogChart,
    DialogCreateSensorComponent,
    LoginComponent,
    RegisterComponent,
    PersonalComponent,
    MyWeatherStationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyB9t2Ki03ItPGImdj2sro-hMyBcQEsnloc'}),
    MaterialModule,
    CookieLawModule
  ],
  providers: [ AuthenticationService ],
  entryComponents: [DialogMaps, DialogChart, DialogCreateWeatherStation, DialogCreateSensorComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
