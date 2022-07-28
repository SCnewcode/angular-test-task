import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {  UniversitiesDataModuleService } from './universities-component.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CurrencyPipe } from '@angular/common';

export interface UniversitiesData {
  alpha_two_code: string;
  name: string;
  web_pages: string;
  domains: string;
  isExpanded: boolean;
  isHaveDetails: boolean;
}

export interface CustomColumn {
  position: number;
  name: string;
  displayText: string;
  isActive: boolean;
}

@Component({
  selector: 'universities-component',
  styleUrls: ['universities-component.scss'],
  templateUrl: 'universities-component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0px', visibility: 'collapse' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UniversitiesDataComponent implements AfterViewInit {

  public dataNew: number = new Date().getFullYear();

  private columns: any[] = [
    {
      name: 'expand',
      displayText: '',
      isShowHide: false,
      isPrintable: false,
    }, 
    {
      name: 'alpha_two_code',
      displayText: 'Code',
      isShowHide: true,
      isPrintable: true,
    },
    {
      name: 'name',
      displayText: 'Name',
      isShowHide: true,
      isPrintable: true,
    },
    {
      name: 'web_pages',
      displayText: 'Web pages',
      isShowHide: true,
      isPrintable: true,
    },
    {
      name: 'domains',
      displayText: 'Domains',
      isShowHide: true,
      isPrintable: true,
    },
  ];

  public displayedColumns: string[] = this.columns.map(col => col.name);

  public dataSource!: MatTableDataSource<UniversitiesData>;

  public previousIndex!: number;

  public expandedElement!: UniversitiesData | null;

  public columnShowHideList: CustomColumn[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private service: UniversitiesDataModuleService, private cp: CurrencyPipe) { }

  ngOnInit(): void {
    this.initializeColumnProperties();
    this.service.getUsers().subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
      for (let user of this.dataSource.data) {
        user.isExpanded = false; 
         user.isHaveDetails = this.getRandomBoolean();
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.paginator.pageIndex = 0;
  }

  public expandCollapse(row: any) {
    if (row.isExpanded) {
      row.isExpanded = false;
    } else {
      row.isExpanded = true;
    }
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   public getRandomBoolean(): boolean {
    return Math.random() < 0.5;
  } 

  setDisplayedColumns() {
    this.columns.forEach(( colunm, index) => {
      colunm.index = index;
      this.displayedColumns[index] = colunm.field;
    });
  }

  public toggleColumn(column: CustomColumn) {
    if (column.isActive) {
      if (column.position > this.displayedColumns.length - 1) {
        this.displayedColumns.push(column.name);
      } else {
        this.displayedColumns.splice(column.position, 0, column.name);
      }
    } else {
      let i = this.displayedColumns.indexOf(column.name);
      let opr = i > -1 ? this.displayedColumns.splice(i, 1) : undefined;
    }
  }

  public initializeColumnProperties() {
    this.columns.forEach((element, index) => {
      if(element.isShowHide){
        this.columnShowHideList.push({ position: index, name: element.name, displayText: element.displayText, isActive: true });
      }
    });
  }

}
