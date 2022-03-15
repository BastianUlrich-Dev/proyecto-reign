import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { faChevronDown, faChevronLeft, faChevronRight, faDog } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, combineLatest, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { Post } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {
  @ViewChild('parrafo') title: ElementRef | undefined;
  faDog = faDog;
  chevronDown = faChevronDown;
  chevronLeft = faChevronLeft;
  chevronRight = faChevronRight;
  opcionSeleccionada = false;
  cboActivo = false;

  options = [
    {
      logo: './../../../assets/images/image-138.png',
      text: 'Angular',
    },
    {
      logo: './../../../assets/images/image-140.png',
      text: 'React',
    },
    {
      logo: './../../../assets/images/image-141.png',
      text: 'Vuejs',
    },
  ];

  paginas = [
    {
      numero: 1,
    },
    {
      numero: 2,
    },
    {
      numero: 3,
    },
    {
      numero: 4,
    },
    {
      numero: 5,
    },
    {
      numero: 6,
    },

  ]

  params = new BehaviorSubject({ query: '', page: '0' });

  news: Post[] = [];



  query$ = new BehaviorSubject(localStorage.getItem("query") ?? "");
  page$ = new BehaviorSubject(localStorage.getItem("page") ?? "0");
  likedPosts$ = new BehaviorSubject(JSON.parse(localStorage.getItem("likedPosts") ?? "[]"));

  page = "0";
  isLoading = false;

  // query = new Subject("");
  // isLoading = new BehaviorSubject(false);

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    combineLatest(
      this.query$.pipe(tap((query) => localStorage.setItem("query", query))),
      this.page$.pipe(
        tap((page) => {
          this.page = page;
          localStorage.setItem("page", page);
        })
      ),
      this.likedPosts$.pipe(
        tap((likedPosts) => localStorage.setItem("likedPosts", likedPosts))
      )
    ).pipe(
      switchMap(([query, page, likedPosts]) =>
      this.newsService.getPosts({ query, page }).pipe(
        map((posts) =>
          [...this.news, ...posts.map((post) => ({
            ...post,
            isFavorite: likedPosts.includes(post.objectID),
          }))]
        ))
      )
      ).subscribe(news => {
        this.news = news;
      })
  }
  nextPage() {
    this.page$.next(String(Number(this.page) + 1));
    console.log(this.page$);
  }

  selectOption(option: string) {
    this.query$.next(option);
  }

  goToPage(page: number) {
    this.page$.next(String(page));
  }

  change(): void {
    const asTitle = this.title?.nativeElement;
    console.log(asTitle);
  }

  toggleCboActivo() {
    this.cboActivo = !this.cboActivo;
  }

  toggleButton() {
    this.opcionSeleccionada = !this.opcionSeleccionada;
  }

  activarCbo() {
    this.toggleButton();
    this.toggleCboActivo();
  }


}
