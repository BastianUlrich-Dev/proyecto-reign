import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faDog,
} from '@fortawesome/free-solid-svg-icons';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
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

  params = new BehaviorSubject({ query: '', page: '0' });

  news: Post[] = [];
  query$ = new BehaviorSubject(localStorage.getItem('query') || '');
  page$ = new BehaviorSubject('0');
  showLikedPostsOnly$ = new BehaviorSubject(true);
  query = '';
  page = '0';
  likedPosts: Post[] = [];
  isLoading = false;

  likedPosts$ = new BehaviorSubject<Post[]>(
    JSON.parse(localStorage.getItem('likedPosts') || '[]')
  );

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    combineLatest(
      this.query$.pipe(
        distinctUntilChanged(),
        tap((query) => localStorage.setItem('query', query))
      ),
      this.page$.pipe(
        tap((page) => {
          this.page = page;
        })
      ),
      this.likedPosts$.pipe(
        tap((likedPosts) => {
          this.likedPosts = likedPosts;
          localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
        })
      ),
      this.showLikedPostsOnly$
    )
      .pipe(
        switchMap(([query, page, likedPosts, showLikedPostsOnly]) =>
          this.newsService.getPosts({ query, page }).pipe(
            map((posts) =>
              posts.map((post) => ({
                ...post,
                isFavorite: !!this.isPostLiked(post, likedPosts),
              }))
            ),
            map((posts) =>
              this.query === query
                ? [
                    ...this.news,
                    ...posts.filter(
                      (post) =>
                        !this.news.find(
                          ({ objectID }) => objectID === post.objectID
                        )
                    ),
                  ]
                : posts
            ),
            tap(() => {
              this.query = query;
            }),
            map((posts) => ({ posts, likedPosts, showLikedPostsOnly }))
          )
        )
      )
      .subscribe(({ posts, likedPosts, showLikedPostsOnly }) => {
        this.news = showLikedPostsOnly
          ? likedPosts.map((post) => ({ ...post, isFavorite: true }))
          : posts;
      });
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

  toggleLike(post: Post) {
    if (this.isPostLiked(post)) {
      // Deletes the post
      this.likedPosts$.next(
        this.likedPosts.filter(({ objectID }) => objectID !== post.objectID)
      );
    } else {
      this.likedPosts$.next([...this.likedPosts, post]);
    }
  }

  isPostLiked(post: Post, ref = this.likedPosts) {
    return ref.find(({ objectID }) => objectID === post.objectID);
  }

  activarCbo() {
    this.toggleButton();
    this.toggleCboActivo();
  }
}
