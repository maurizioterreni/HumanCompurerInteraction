import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { SensorComponent } from './layout/sensor/sensor.component';
import { WeatherStationMapComponent } from './layout/weatherstationMap/weatherstationMap.component';

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
