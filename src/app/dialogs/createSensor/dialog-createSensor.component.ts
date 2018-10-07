/**
 * New typescript file
 */
import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SensorKnowledge } from '../../models/sensorKnowledge/sensorKnowledge';
import { UnitKnowledge } from '../../models/unitKnowledge/unitKnowledge';
import { SensorService } from '../../services/sensor/sensor.service';
import { SensorTypeKnowledge } from '../../services/sensorTypeKnowledge/sensorTypeKnowledge.service';

import { User } from '../../models/user/user';



@Component({
  selector: 'app-dialog-createsensor',
  templateUrl: 'dialog-createSensor.html',
  styleUrls: ['dialog-createSensor.css'],
  providers: [ SensorService, SensorTypeKnowledge ]
})
export class DialogCreateSensorComponent  implements OnInit {
  private user : User;
  // -----------------------------------------------------------------------//
  sensorKnowledges: SensorTypeKnowledge[];
  title: string;
  createSensorForm: FormGroup;
  submitted = false;

  // -----------------------------------------------------------------------//
  constructor(
    private sensorTypeKnowledge: SensorTypeKnowledge,
    private sensorService: SensorService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogCreateSensorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.sensorKnowledges = [];
      this.user = data['user'];
  }

  ngOnInit() {
    this.createSensorForm = this.formBuilder.group({
        title: ['', Validators.required],
        sensorType: ['', Validators.required]
    });
    this.sensorTypeKnowledge.getAllsensorTypeKnowledge()
        .subscribe((sensorKnowledges: SensorTypeKnowledge[]) => {this.sensorKnowledges = sensorKnowledges });
  }

  close(){
    this.dialogRef.close({type: '-1'});
  }


  get f() { return this.createSensorForm.controls; }

  createSensor(){
    this.submitted = true;
    if (this.createSensorForm.invalid) {
        return;
    }

    this.sensorService.createSensor(this.f.sensorType.value, this.f.title.value , this.user.weatherId, this.user.token)
      .subscribe(
        res => {
            this.dialogRef.close({type: '200', sensor: res});
          },
          err => {
            this.dialogRef.close({type: err.status});
            //openSnackBar("User or Password wrong", "undo");

        });
  }
}
