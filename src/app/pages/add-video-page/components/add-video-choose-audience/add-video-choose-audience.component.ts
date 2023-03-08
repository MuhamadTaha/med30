import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AddVideoService } from '../../services/add-video.service';

@Component({
  selector: 'app-add-video-choose-audience',
  templateUrl: './add-video-choose-audience.component.html',
  styleUrls: ['./add-video-choose-audience.component.scss'],

})
export class AddVideoChooseAudienceComponent {

  selectedCategories!: any;
  selectedDoctorsFiltered: any[] = []
  selectedDoctors!: any[];
  showCategoriesLoading = false;
  showDoctorsLoading = false;
  doctorsListEmptyMessage = 'No doctors selected yet';

  categoriesList: any[] = []
  selectedCategoriesIds: any[] = []

  constructor(private addVideoService: AddVideoService) { }

  ngOnInit() {
    this.selectedDoctors = this.selectedDoctorsFiltered;
    this.getCharacteristicsSections()
  }

  getCharacteristicsSections() {
    this.showCategoriesLoading = true;
    this.addVideoService.getCharacteristicsSections().subscribe((res: any) => {
      if (res.data?.length) {
        res.data.forEach((element: any) => {
          let parent = {
            id: element.id,
            label: element.name,
            emptyMessage: `no ${element.name}`,
            selectable: false,
            leaf: false,
            children: []
          }
          this.categoriesList.push(parent)
        })
      }
      this.showCategoriesLoading = false;
    })
  }

  onSelect(event: any) {
    this.showDoctorsLoading = true;

    this.selectedDoctorsFiltered = []
    this.selectedCategoriesIds = []
    this.selectedCategories.forEach((element: any) => {
      if (!element.children) this.selectedCategoriesIds.push(element.id)
    })

    this.addVideoService.getDoctorsListByCategory({ docChar: this.selectedCategoriesIds }).subscribe((res: any) => {
      if (res.data?.length) {

        res.data.forEach((element: any) => {
          let parent = { id: element.id, label: element.name, category: event.node.label }
          this.selectedDoctorsFiltered.push(parent)
        })
      }
      this.showDoctorsLoading = false;
    })
    this.selectedDoctors = this.selectedDoctorsFiltered

  }

  onUnSelect(event: any) {
    this.showDoctorsLoading = true;

    this.selectedDoctorsFiltered = []
    this.selectedCategoriesIds = []
    this.selectedCategories.forEach((element: any) => {
      if (!element.children) this.selectedCategoriesIds.push(element.id)
    })

    this.addVideoService.getDoctorsListByCategory({ docChar: this.selectedCategoriesIds }).subscribe((res: any) => {
      if (res.data?.length) {
        res.data.forEach((element: any) => {
          let parent = { id: element.id, label: element.name, category: event.node.label }
          this.selectedDoctorsFiltered.push(parent)
        })
      }
      this.showDoctorsLoading = false;
    })
  }

  onExpand(event: any) {
    this.showCategoriesLoading = true;
    this.addVideoService.getCharacteristicsSectionsItems(event.node.id).subscribe((res: any) => {
      this.categoriesList.forEach((category) => {
        if (category.id == event.node.id) {
          if (res.data?.length) {
            res.data.forEach((element: any) => {
              let newElement = { label: element.name, id: element.id, category: event.node.label }
              category.children.push(newElement)
            });
          }
        }
      });
      this.showCategoriesLoading = false;
    })
  }

  onCollapse(event: any) {
    if (this.selectedCategories?.length) {
      for (var i = this.selectedCategories.length - 1; i >= 0; i--) {
        if (this.selectedCategories[i].category) {
          if (this.selectedCategories[i].category == event.node.label) {
            this.selectedCategories.splice(i, 1);
          }
        } else {
          if (this.selectedCategories[i].label == event.node.label) {
            this.selectedCategories.splice(i, 1);
          }
        }
      }
    }

    if (this.selectedDoctorsFiltered.length) {
      for (var i = this.selectedDoctorsFiltered.length - 1; i >= 0; i--) {
        if (this.selectedDoctorsFiltered[i].category) {
          if (this.selectedDoctorsFiltered[i].category == event.node.label) {
            this.selectedDoctorsFiltered.splice(i, 1);
          }
        }
      }
    }

    this.categoriesList.forEach((element: any) => {
      if (element.label === event.node.label) {
        element.children = []
        element.selectable = false
      }
    })
  }

  onSelectDoctor(event: any) {
    console.log('onSelectDoctor this.selectedDoctorsFiltered', this.selectedDoctorsFiltered)
    console.log('onSelectDoctor this.selectedDoctors', this.selectedDoctors)
  }
  onUnselectDoctor(event: any) {
    console.log('onUnselectDoctor this.selectedDoctorsFiltered', this.selectedDoctorsFiltered)
    console.log('onUnselectDoctor this.selectedDoctors', this.selectedDoctors)
  }

}
