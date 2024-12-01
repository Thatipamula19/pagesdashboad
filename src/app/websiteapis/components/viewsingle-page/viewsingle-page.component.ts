import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-viewsingle-page',
  templateUrl: './viewsingle-page.component.html',
  styleUrls: ['./viewsingle-page.component.css']
})
export class ViewsinglePageComponent implements OnInit {
  pageId: any;
  pageData: any;
  panelOpenState = false;
  constructor(private pageService: PageService, private activeRoute: ActivatedRoute, private router: Router) {
    console.log(this.activeRoute.snapshot.queryParams);
    let data = this.activeRoute.snapshot.queryParams;
    this.pageId = data?.page;
    console.log(this.pageId);
    if (this.pageId) {
      this.getPage(this.pageId);
    }
  }

  ngOnInit(): void {
  }

  getPage(page) {
    this.pageService.getPage(page).subscribe((resp: any) => {
      console.log(resp);
      this.pageData = resp?.data?.[0];
    })
  }

  editPage() {
    this.router.navigate([`/add-page`], { queryParams: { page: this.pageData?.pageUrl } });
  }

}