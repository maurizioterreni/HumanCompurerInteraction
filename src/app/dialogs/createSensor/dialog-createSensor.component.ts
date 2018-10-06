/**
 * New typescript file
 */
import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { SensorKnowledge } from '../../models/sensorKnowledge/sensorKnowledge';
import { UnitKnowledge } from '../../models/unitKnowledge/unitKnowledge';
import { SensorService } from '../../services/sensor/sensor.service';
import { User } from '../../models/user/user';



@Component({
  selector: 'app-dialog-createsensor',
  templateUrl: 'dialog-createSensor.html',
  styleUrls: ['dialog-createSensor.css'],
  providers: [ SensorService ]
})
export class DialogCreateSensorComponent  implements OnInit {
  private user : User;
  // -----------------------------------------------------------------------//
  sensorKnowledges: SensorKnowledge[];
  selectedSensorKnowledge: string;
  title: string;

  // -----------------------------------------------------------------------//
  constructor(
    private sensorService: SensorService,
    public dialogRef: MatDialogRef<DialogCreateSensorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.user = data['user'];
  }

  ngOnInit() {
    this.selectedSensorKnowledge = '0';
  /*  this.sensorService.getAllSensorKnowledge()
        .subscribe(sensorKnowledges => this.sensorKnowledges = sensorKnowledges);*/
  }

  createSensor(e){
/*
    this.sensorService.createSensor(this.selectedSensorKnowledge, this.title , this.user)
    .subscribe(
      res => {
          this.dialogRef.close(true);
        },
        err => {
          this.dialogRef.close(false);
          //openSnackBar("User or Password wrong", "undo");

      });*/
  }

  addTitle(title: string): void{
    this.title = title;
  }
}
