import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-video-choose-audience',
  templateUrl: './add-video-choose-audience.component.html',
  styleUrls: ['./add-video-choose-audience.component.scss'],

})
export class AddVideoChooseAudienceComponent {

  selectedDoctorsByCategory!: any;
  selectedDoctorsFiltered: any[] = []
  selectedDoctors!: any[];


  categoriesList!: any[]

  constructor() { }

  ngOnInit() {
    this.selectedDoctors = this.selectedDoctorsFiltered

    this.categoriesList = [
      {
        "label": "Specializations",
        "data": "S",
        "emptyMessage": "no S",
        "selectable": false,
        "leaf": false,
        "children": []
      },
      {
        "label": "Area",
        "data": "A",
        "emptyMessage": "no A",
        "selectable": false,
        "leaf": false,
        "children": []
      },
      {
        "label": "Title",
        "data": "T",
        "emptyMessage": "no T",
        "selectable": false,
        "leaf": false,
        "children": []
      },
    ]

    // this.files = [
    //   {
    //     "name": "Specializations",
    //     "children": [
    //       { "name": "Spec 1", "title": "title1", "id": 1 },
    //       { "name": "Spec 2", "title": "title2", "id": 2 },
    //       { "name": "Spec 3", "title": "title2", "id": 3 },
    //     ]
    //   },
    //   {
    //     "name": "Area",
    //     "children": [
    //       { "name": "Area 1", "title": "title1", "id": 1 },
    //       { "name": "Area 2", "title": "title2", "id": 2 },
    //       { "name": "Area 3", "title": "title2", "id": 3 },
    //     ]
    //   },
    //   {
    //     "name": "Title",
    //     "children": [
    //       { "name": "Title 1", "title": "title1", "id": 1 },
    //       { "name": "Title 2", "title": "title2", "id": 2 },
    //       { "name": "Title 3", "title": "title2", "id": 3 },
    //     ]
    //   }
    // ]

  }

  onSelect(event: any) {
    this.selectedDoctorsFiltered = []
    this.selectedDoctorsByCategory.forEach((element: any) => {
      if (!element.children) {
        this.selectedDoctorsFiltered.push(element)
      }
    });
    this.selectedDoctors = this.selectedDoctorsFiltered
    // console.log('selectedDoctorsByCategory', this.selectedDoctorsByCategory)
    // console.log('event', event)
    // console.log('selectedDoctorsFiltered', this.selectedDoctorsFiltered)

  }

  onUnSelect(event: any) {
    this.selectedDoctorsFiltered = []
    this.selectedDoctorsByCategory.forEach((element: any) => {
      if (!element.children) {
        this.selectedDoctorsFiltered.push(element)
      }
    });
    // console.log('selectedDoctorsFiltered', this.selectedDoctorsFiltered)
  }

  onExpand(event: any) {
    // console.log('onExpand', event.node.label)
    this.add(event.node.label);
  }

  onCollapse(event: any) {
    // console.log('onCollapse', event)
    // console.log('this.selectedDoctorsByCategory before', this.selectedDoctorsByCategory)

    if (this.selectedDoctorsByCategory.length) {
      for (var i = this.selectedDoctorsByCategory.length - 1; i >= 0; i--) {
        if (this.selectedDoctorsByCategory[i].category) {
          if (this.selectedDoctorsByCategory[i].category == event.node.label) {
            this.selectedDoctorsByCategory.splice(i, 1);
            // console.log('this.selectedDoctorsByCategory after', this.selectedDoctorsByCategory)
          }
        } else {
          if (this.selectedDoctorsByCategory[i].label == event.node.label) {
            this.selectedDoctorsByCategory.splice(i, 1);
          }
        }
      }
    }

    if (this.selectedDoctorsFiltered.length) {
      for (var i = this.selectedDoctorsFiltered.length - 1; i >= 0; i--) {
        if (this.selectedDoctorsFiltered[i].category) {
          if (this.selectedDoctorsFiltered[i].category == event.node.label) {
            this.selectedDoctorsFiltered.splice(i, 1);
            // console.log('this.selectedDoctorsFiltered after', this.selectedDoctorsFiltered)
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

  onLazyLoad(event: any) {
    console.log('onLazyLoad', event.node.label)
  }

  add(label: string) {

    this.categoriesList.forEach((element: any) => {
      if (label === element.label) {
        element.selectable = true
        if (element.label === "Specializations") {
          element.children = [
            { "label": "Spec 1", "title": "title1", "id": 1, "category": "Specializations" },
            { "label": "Spec 2", "title": "title2", "id": 2, "category": "Specializations" },
            { "label": "Spec 3", "title": "title2", "id": 3, "category": "Specializations" },
          ]
        } else if (element.label === "Area") {
          element.children = [
            { "label": "Area 1", "title": "title1", "id": 1, "category": "Area" },
            { "label": "Area 2", "title": "title2", "id": 2, "category": "Area" },
            { "label": "Area 3", "title": "title2", "id": 3, "category": "Area" },
          ]
        } else if (element.label === "Title") {
          element.children = [
            { "label": "Title 1", "title": "title1", "id": 1, "category": "Title" },
            { "label": "Title 2", "title": "title2", "id": 2, "category": "Title" },
            { "label": "Title 3", "title": "title2", "id": 3, "category": "Title" },
          ]
        }
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
