import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { SensorComponent } from './layout/sensor/sensor.component';
import { WeatherStationMapComponent } from './layout/weatherstationMap/weatherstationMap.component';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { PersonalComponent } from './layout/personal/personal.component';
import { MyWeatherStationComponent } from './layout/myWeatherStation/myWeatherStation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'sensor/:id',
    component: SensorComponent,
  },
  {
    path: 'weatherstationMap',
    component: WeatherStationMapComponent,
  },
  {
    path: 'myWeather',
    component: MyWeatherStationComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'personal',
    component: PersonalComponent
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
