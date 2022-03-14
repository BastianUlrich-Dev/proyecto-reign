import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { faChevronDown, faDog } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Post } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {

  @ViewChild('parrafo') title: ElementRef | undefined;
  faDog = faDog;
  chevronDown = faChevronDown;
  opcionSeleccionada = false;
  cboActivo = false;

  options = [
    {
      logo: "./../../../assets/images/image-138.png",
      text: "Angular"
    },
    {
      logo: "./../../../assets/images/image-140.png",
      text: "React"
    },
    {
      logo: "./../../../assets/images/image-141.png",
      text: "Vuejs"
    },
  ];

  params = new BehaviorSubject({ query: "", page: "0" });

  news:Post[] = [];

  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.params
    .pipe(switchMap(params => this.newsService.getPosts(params)))
    .subscribe(news => {
      this.news = news;
    });
  }

  change():void{
    const asTitle = this.title?.nativeElement;
    console.log(asTitle);
  }

  toggleCboActivo(){
    this.cboActivo = !this.cboActivo;
  }

  toggleButton(){
    this.opcionSeleccionada = !this.opcionSeleccionada;
  }

  activarCbo(){
    this.toggleButton();
    this.toggleCboActivo();
  }

  selectOption(option: string) {
    this.params.next({ query: option, page: "0" });
  }

}
