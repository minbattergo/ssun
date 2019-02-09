import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../admin.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register-hero',
  templateUrl: './register-hero.component.html',
  styleUrls: ['./register-hero.component.scss']
})
export class RegisterHeroComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService, private toaster: ToastrService) {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      sex: [null, Validators.required],
      country: [null, Validators.required],
      address: null,
      photo: null
      });
  }

  ngOnInit() {
  }

  register() {
    console.log(this.form);
      if (!this.form.valid) {
      // 모든 invalid 항목들을 표시해 준다.
        Object.keys(this.form.controls).forEach(key => {
          const control = this.form.controls[key];
          control.markAsTouched({onlySelf: true});
        });

      this.toaster.error('입력항목 검증오류입니다.', 'ERROR');
      return;
    }

    // 서버연동하여 등록처리
    this.adminService.addHero(this.form.value)
      .subscribe(body => {
        console.log(body);
        this.toaster.success('등록이 되었습니다.', 'INFO');
        // 폼초기화
        this.form.reset();
      });
  }

  fileUpload(e: any) {
    console.log(e);
    const formData = new FormData();
    formData.append('file', e.target.files[0], e.target.files[0].name);

    this.adminService.fileUpload(formData)
      .subscribe(body => {
        this.form.controls['photo'].setValue('http://eastflag.co.kr:3000' + body.value);
      });
  }
}
