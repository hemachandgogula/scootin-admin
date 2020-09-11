import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  categoryList: Category[] = [];
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAllCategory().subscribe((res: Category[]) => {
      this.categoryList = res;
    })
  }

}
