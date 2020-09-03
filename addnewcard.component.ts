import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-addnewcard',
  templateUrl: './addnewcard.component.html',
  styleUrls: ['./addnewcard.component.css']
})
export class AddnewcardComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddnewcardComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }


    
  ngOnInit(): void {
    console.log(this.data)
  }
  
    registerForm: FormGroup = this.formBuilder.group({
      employeeid: [this.data.row !== undefined ? this.data.row.employeeid : '',  {
        validators: [Validators.required, Validators.pattern, this.duplicateValidation('employeeid')],
        updateOn: "change",
      }],
      fullName: [this.data.row !== undefined ? this.data.row.fullName : '', { validators: [Validators.required, this.fullNameValidation], updateOn: "change" }],
      email: [this.data.row !== undefined ? this.data.row.email : '', {
        validators: [Validators.required, Validators.pattern, this.duplicateValidation('email')],
        updateOn: "change",
      }],
      age: [this.data.row !== undefined ? this.data.row.age : '', { validators: [Validators.max(120), Validators.required, Validators.min(18), Validators.pattern], updateOn: "change" }],
    });

    fullNameValidation(controlName: AbstractControl) {
      console.log(controlName)
      if (controlName.value === null || controlName.value.trim() === "") {
        return { 'fullnamearrayInvalid': true }; // return object if the validation is not passed.
      } else {
        const fullnamearray = controlName.value.split(" ");
        if (fullnamearray.length !== 2)
          return { 'fullnamearrayInvalid': true };
        else {
          let returnvalue = 1;
          fullnamearray.forEach(element => {
            if (element.length === 0)
            returnvalue = 0;
          });
          if(!returnvalue)
          return { 'fullnamearrayInvalid': true };
        }
      }
      return null;
    }
    
    duplicateValidation(fieldname) {
      return (controlName: AbstractControl): {[key: string]: any} | null => {
        if (controlName.value === null ) {
          return { 'duplicate': true }; // return object if the validation is not passed.
        } else {if (this.duplicatfiledcheck(fieldname, controlName.value) === 1) {
            return { 'duplicate': true };
        }
      }
      return null;
      };
    }
    closedialog(type) {
      this.registerForm.value['action'] = type;
      this.dialogRef.close(this.registerForm.value)
    }

    duplicatfiledcheck(filedname, value) {
      let returnValue = 0;
      this.data.emparray.forEach((element, index1) => {
        if(this.data.index !== index1) {
          if(element[filedname] === value) {
            returnValue = 1;
          }
        }
      });
      return returnValue;
    }


}
