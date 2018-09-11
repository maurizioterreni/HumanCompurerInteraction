import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-map',
  styleUrls: ['dialog-map.css'],
  templateUrl: 'dialog-map.html',
})
export class DialogMaps {
  lat = 51.678418;
  lng = 7.809007;
  dialogDisplay = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.lat = Number(data['lat']);
    this.lng = Number(data['lng']);
    this.dialogDisplay = true;
  }
}
