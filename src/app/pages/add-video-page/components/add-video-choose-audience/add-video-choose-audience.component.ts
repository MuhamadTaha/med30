import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ValidatorsService } from 'src/app/services/validators.service';
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

  createMessageForm!: FormGroup;
  imagePath!: any;
  isLoading = false;

  @Output() onSubmitDoctorsList = new EventEmitter<any>();


  constructor(
    private addVideoService: AddVideoService,
    private domSanitizer: DomSanitizer,
    private validatorsService: ValidatorsService,
  ) { }

  ngOnInit() {
    this.formInitiation();
    this.getSections();
  }

  formInitiation() {
    this.createMessageForm = new FormGroup({
      'id': new FormControl(0),
      'titleEn': new FormControl(''),
      'titleAr': new FormControl(''),
      'descriptionEn': new FormControl(''),
      'descriptionAr': new FormControl(''),
      'coverPhotoPath': new FormControl(''),
      'charactristics': new FormControl([]),
      'doctors': new FormControl([]),
    },
      { validators: [this.validatorsService.checkCreateMessageFile] },
    )

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

  onFileSelect(event: any) {
    const file = event.currentFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePath = this.domSanitizer.bypassSecurityTrustResourceUrl('' + reader.result);
      this.createMessageForm.get('coverPhotoPath')?.setValue(this.imagePath.changingThisBreaksApplicationSecurity.split('base64,')[1])
    };
  }

  onFileRemove(event: any) {
    this.createMessageForm.get('coverPhotoPath')?.setValue(null)
  }

  continueLater() {
    console.log('continueLater')
  }

  cancelRequest() {
    console.log('cancelRequest')
  }

  submitDoctorsList(form: any) {
    const title = this.createMessageForm.get('titleEn')?.value
    const description = this.createMessageForm.get('descriptionEn')?.value
    this.createMessageForm.get('titleAr')?.setValue(title);
    this.createMessageForm.get('descriptionAr')?.setValue(description);
    this.createMessageForm.get('charactristics')?.setValue(this.selectedCategoriesIds);
    this.createMessageForm.get('doctors')?.setValue(this.selectedDoctors.map((item: any) => item.id));
    this.onSubmitDoctorsList.emit(form.value);
  }

}
