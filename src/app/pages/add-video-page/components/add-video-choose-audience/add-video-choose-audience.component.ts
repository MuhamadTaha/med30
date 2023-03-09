import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { AddVideoService } from '../../services/add-video.service';

@Component({
  selector: 'app-add-video-choose-audience',
  templateUrl: './add-video-choose-audience.component.html',
  styleUrls: ['./add-video-choose-audience.component.scss'],

})
export class AddVideoChooseAudienceComponent {

  categoriesList: any[] = []
  selectedCategories: any[] = [];

  selectedCategoriesIds: any[] = [];

  doctorsListByCategory: any[] = [];
  selectedDoctors: any[] = [];

  showCategoriesLoading = false;
  showDoctorsLoading = false;

  doctorsListEmptyMessage = 'No doctors selected yet';

  @Output() onSubmitDoctorsList = new EventEmitter<any>();


  constructor(private addVideoService: AddVideoService) { }

  ngOnInit() {
    this.getSections()
  }

  getSections() {
    this.showCategoriesLoading = true;
    this.addVideoService.getSections().subscribe((res: any) => {
      if (res) this.categoriesList = res;
      this.showCategoriesLoading = false;
    })
  }

  onSelectOrUnselectCategory(event: any) {
    this.showDoctorsLoading = true;
    this.selectedCategoriesIds = this.getSelectedCategoriesIds()

    this.addVideoService.getDoctorsListByCategory(event.node.label, { docChar: this.selectedCategoriesIds })
      .subscribe((res: any) => {
        if (res) this.doctorsListByCategory = res; this.selectedDoctors = res
        this.showDoctorsLoading = false;
      })
  }

  onExpandCategory(event: any) {
    this.showCategoriesLoading = true;
    const expandedItem = event.node;

    this.categoriesList.forEach((item) => {
      if (item.id == expandedItem.id) {
        if (!item.children.length) {
          this.addVideoService.getSectionsItems(expandedItem.label, expandedItem.id).subscribe((res: any) => {
            if (res) item.children = res
            this.showCategoriesLoading = false;
          })
        } else {
          this.showCategoriesLoading = false;
        }
      }
    });
  }

  onCollapseCategory(event: any) { }

  onSelectOrUnselectDoctor(event: any) { }

  getSelectedCategoriesIds() {
    return this.selectedCategories.filter((item: any) => {
      if (!item.children) return item
    }).map((row: any) => row.id)
  }

  continueLater() {
    console.log('continueLater')
  }

  cancelRequest() {
    console.log('cancelRequest')
  }

  submitDoctorsList() {
    this.onSubmitDoctorsList.emit(this.selectedDoctors);
  }

}
