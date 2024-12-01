import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFaqsComponent } from '../add-faqs/add-faqs.component';
import { FaqsapiComponent } from '../faqsapi/faqsapi.component';
import { FaqsService } from '../../services/faqs.service';
import { AuthService } from 'src/app/users/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-pages',
  templateUrl: './view-pages.component.html',
  styleUrls: ['./view-pages.component.css']
})
export class ViewPagesComponent implements OnInit {
  panelOpenState = false;
  faqs: any = [];
  isAdmin:boolean = false;
  isMarketing:boolean = false;
  displayedColumns: string[] = ['pagename', 'seefaqs', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dialog: MatDialog, private faqService: FaqsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.faqService.getFaqs().subscribe((resp: any) => {
      console.log(resp);
      this.faqs = new MatTableDataSource<Faqs>(resp?.faqs);
      this.faqs.paginator = this.paginator;
      this.faqs.sort = this.sort;
      console.log(this.faqs)
    });
   this.isAdmin = this.authService.isAdminCheck();
   this.isMarketing = this.authService.isMarketingCheck();
  }

  addFaqs() {
    let dialogRef = this.dialog.open(AddFaqsComponent, {
      width: '800px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }

  editFaqs(page) {
    let dialogRef = this.dialog.open(AddFaqsComponent, {
      width: '800px',
      data: {
        page: page
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }
  deleteFaq(page) {
    this.faqService.deleteFaq(page).subscribe((resp: any) => {
      console.log(resp);
      window.location.reload();
    })
  }

  showMore(page) {
    this.dialog.open(FaqsapiComponent, {
      width: '800px',
      data: {
        page: page
      },
      disableClose: true
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.faqs.filter = filterValue.trim().toLowerCase();

    if (this.faqs.paginator) {
      this.faqs.paginator.firstPage();
    }
  }
}

export interface Faqs {
  page: string;
  id: string;
  faqs:Array<any>;
}
