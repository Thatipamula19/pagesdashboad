import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/users/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PageService } from '../../services/page.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-viewall-pages',
  templateUrl: './viewall-pages.component.html',
  styleUrls: ['./viewall-pages.component.css']
})
export class ViewallPagesComponent implements OnInit {

  panelOpenState = false;
  pagesData: any = [];
  isAdmin:boolean = false;
  isMarketing:boolean = false;
  displayedColumns: string[] = ['pagename', 'pageUrl', 'seepage', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dialog: MatDialog, private pageService: PageService, private authService: AuthService, private router: Router,
    private spinner: NgxSpinnerService,  
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.pageService.getPages().subscribe((resp: any) => {
      console.log(resp);
      this.pagesData = new MatTableDataSource<Page>(resp?.data);
      this.pagesData.paginator = this.paginator;
      this.pagesData.sort = this.sort;
      console.log(this.pagesData);
      this.spinner.hide();
    }, (err) => {
      this.spinner.hide();
    });
   this.isAdmin = this.authService.isAdminCheck();
   this.isMarketing = this.authService.isMarketingCheck();
  }

  addPage() {
    this.router.navigate(['/add-page']);
  }

  editPage(page) {
    this.router.navigate([`/add-page`], { queryParams: { page: page } });
  }
  deletePage(page) {
    this.spinner.show();
    this.pageService.deletePage(page).subscribe((resp: any) => {
      console.log(resp);
      window.location.reload();
      this.spinner.hide();
    }, (err) => {
      this.spinner.hide();
    })
  }

  showMore(page) {
    this.router.navigate([`/view-single-page`], { queryParams: { page: page } });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pagesData.filter = filterValue.trim().toLowerCase();

    if (this.pagesData.paginator) {
      this.pagesData.paginator.firstPage();
    }
  }
}

export interface Page {
  page: string;
  id: string;
  pageUrl: string;
  banners: Array<any>;
  keyFeatures: Array<any>;
  faqs:Array<any>;
}


