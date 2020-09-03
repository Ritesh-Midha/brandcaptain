import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { FormBuilder} from "@angular/forms";

import { MatDialog } from '@angular/material/dialog';

import { AddnewcardComponent } from './addnewcard/addnewcard.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'brandcaptain';

  displayedColumns: any[] = ['employeeid', 'fullName', 'age', 'email', 'action'];
  dataSource: MatTableDataSource<any>;

  employeearray = [];

  @ViewChild(MatPaginator, { static : true }) paginator: MatPaginator;
  @ViewChild(MatSort , {static: false}) sort: MatSort;
  @ViewChild('table', { static : false }) table;

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog, private _snackBar: MatSnackBar) {
      
  }


  ngAfterViewInit() {
  }

  ngOnInit() {

    this.dataSource = new MatTableDataSource<Element>(this.employeearray);

    this.employeearray.forEach(element => {
      
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });

  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addTags(row?, index?) {
    const emparray = [];

    this.employeearray.forEach(element => {
      emparray.push(element);
    })
    const dialogRef = this.dialog.open(AddnewcardComponent, {
      data: {row: row, emparray: emparray, index: index}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result !== undefined) {
        if(result.action === 'new') {
          this.employeearray.push(result);
        } else if(result.action === 'edit'){
          this.employeearray[index] = result;
        }
        
        this.dataSource = new MatTableDataSource(this.employeearray);
      }
    });
  }

  deleterow(row, index) {
    console.log(row)
    this.employeearray.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.employeearray);
  }
}
