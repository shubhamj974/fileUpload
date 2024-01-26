import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  public fileForm!: FormGroup;
  constructor() {
    this.createFileUploadForm();
  }

  ngOnInit(): void {}

  onBannerFile(eve: any) {
    let selectedFile = eve.target.files[0];
    this.readFile(selectedFile).then((res) => {
      this.fileForm.get('bannerImg')?.setValue(res);
    });
  }

  onThumnailFile(eve: any) {
    let selectedFile = eve.target.files[0];
    this.readFile(selectedFile).then((res) => {
      this.fileForm.get('thumnailImg')?.setValue(res);
    });
  }

  readFile(file: File) {
    return new Promise((resolve, reject) => {
      if (file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          let obj = {
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            fileTime: Date.now(),
            fileBase64: e.target?.result,
          };
          resolve(obj);
        };
        reader.readAsDataURL(file);
      } else {
        reject('Pls select proper file');
      }
    });
  }

  createFileUploadForm() {
    this.fileForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      discription: new FormControl(null, [Validators.required]),
      bannerImg: new FormControl(null, [Validators.required]),
      thumnailImg: new FormControl(null, [Validators.required]),
    });
  }

  onFileForm() {
    if (this.fileForm.valid) {
      console.log(this.fileForm.value);
    }
  }
}
