import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  categoryList: Category[] = [];
  constructor(private categoryService: CategoryService, private utility: UtilityService) { }

  ngOnInit() {
    this.categoryService.getAllCategory().subscribe((res: Category[]) => {
      this.categoryList = res;
    })
  }

  toggleCategory(event, categoryId: number) {
    this.categoryService.toggleCategory(event.target.checked, categoryId).subscribe(res => {
      event.target.checked ? this.utility.showSuccess("Successfully Enabled") : this.utility.showSuccess("Successfully Disabled")
    })
  }

}
