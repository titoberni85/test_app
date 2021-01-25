import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageItem } from '../../interfaces/image-item';
import { IMAGELIST_LITERALS } from '../../constants/constants';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() imageList: ImageItem[] = [];
  
  @Output() filterEvent = new EventEmitter<ImageItem[]>();

  public literals = IMAGELIST_LITERALS;
  public searchForm!: FormGroup;
  public submitDisabled: boolean = true;
  
  private imageListFiltered : ImageItem[] = [];
  
  get form() { return this.searchForm.controls }

  
  ngOnInit(): void {
    this.initForm();
  }

  resetFilter(): void {
    this.form.id.reset();
    this.form.text.reset();
    this.imageListFiltered = this.imageList.filter(() => { return true });
    this.filterEvent.emit(this.imageListFiltered);
  }

  searchItems(): void {
    if (this.form.searchType.value === 'id') {
      this.searchById();
    } else {
      this.searchByText();
    }
  }

  private initForm(): void {
    this.searchForm = new FormGroup({
      searchType: new FormControl('id'),
      id: new FormControl('', [Validators.required]),
      text: new FormControl('')
    });
    this.searchForm.controls.searchType.valueChanges.subscribe((searchType) => {
      this.resetFilter();
      this.searchForm.controls.id.clearValidators();
      this.searchForm.controls.text.clearValidators();
      searchType === 'id' ? this.form.id.setValidators([Validators.required]) : this.form.text.setValidators([Validators.required]);
      this.searchForm.controls.id.updateValueAndValidity();
      this.searchForm.controls.text.updateValueAndValidity();
    })
  }

  private searchById(): void {
    this.imageListFiltered = this.imageList.filter((image) => {
      return image.id === parseInt(this.form.id.value);
    });
    this.filterEvent.emit(this.imageListFiltered);
  }

  private searchByText(): void {
    this.imageListFiltered = this.imageList.filter((image) => {
      return image.text.toLowerCase().indexOf(this.form.text.value.toLowerCase()) !== -1;
    });
    this.filterEvent.emit(this.imageListFiltered);
  }

}