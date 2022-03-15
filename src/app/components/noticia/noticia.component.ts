import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/news.model';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  iconReloj = './../../../assets/images/iconmonstr-time-2.svg';
  iconLike = './../../../assets/images/iconmonstr-favorite-3.svg';
  iconoDisLike = './../../../assets/images/iconmonstr-favorite-2.svg';

  @Input()
  active?: boolean = false;

  @Output() toggleLike = new EventEmitter();
  @Input() noticia: Post = {
    author: '',
    story_title: '',
    story_url: '',
    created_at: '',
    objectID: '',
  };

  constructor() {}

  ngOnInit(): void {}

  imagenToggle() {
    this.active = !this.active;
  }

  activeImg() {
    this.imagenToggle();
    // console.log(this.imagenToggle());
    this.toggleLike.emit();
  }
}
