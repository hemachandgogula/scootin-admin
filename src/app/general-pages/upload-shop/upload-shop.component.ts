import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { Media } from 'src/app/models/media';

@Component({
  selector: 'app-upload-shop',
  templateUrl: './upload-shop.component.html',
  styleUrls: ['./upload-shop.component.scss']
})
export class UploadShopComponent implements OnInit {
  selectedShopFile: string = '';
  constructor(private utility: UtilityService) { }

  ngOnInit() {
  }
  upload_csv(value) {
    alert("Successfuly uploaded.");
  }
  uploadImage(file, type) {
    this.utility.uploadImage(file.item(0)).subscribe((res: Media) => {
      this.selectedShopFile = file.item(0).name;
      var mimeType = file[0].type;
      if (mimeType.match(/csv\/*/) == null) {
        alert("Only csv are supported.");
        return;
      }
      // var reader = new FileReader();
      // this.panImgPath = file;
      // reader.readAsDataURL(file[0]);
      // reader.onload = (_event) => {
      //   this.panImgURL = reader.result;
      // }
      // this.addShopForm.get('owner').patchValue({
      //   pan_id: res.id
      // });

    })
  }
}
