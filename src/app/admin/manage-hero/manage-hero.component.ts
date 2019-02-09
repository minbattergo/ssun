import { Component, OnInit } from '@angular/core';
import {HeroService} from '../../hero.service';
import {Hero} from '../../hero';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ManageDialogComponent} from './manage-dialog/manage-dialog.component';
import {AdminService} from '../admin.service';
import {subscribeOn} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-manage-hero',
  templateUrl: './manage-hero.component.html',
  styleUrls: ['./manage-hero.component.scss']
})
export class ManageHeroComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService, private modalService: NgbModal, private adminService: AdminService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes()
      .subscribe(body => this.heroes = body);
  }

  confirmDelete(hero: Hero) {
    const dialogRef = this.modalService.open(ManageDialogComponent); // 클래스를 넘긴다. !!!!!!
    dialogRef.componentInstance.name = hero.name;

    dialogRef.result
      .then(result => {console.log(result);
       if(result) {
         this.adminService.removeHero(hero.hero_id)
           .subscribe(data => {
             console.log(data);
              if(data.result === 0) {
                const index = this.heroes.findIndex(item => item.hero_id === hero.hero_id);
                this.heroes.splice(index, 1);
                this.toastr.info('삭제되었습니다.', 'INFO');
              }

           });
       }

      });
  }

}
