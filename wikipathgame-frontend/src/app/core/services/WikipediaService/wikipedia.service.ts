import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameService } from '../GameService/game.service';

@Injectable({
  providedIn: 'root',
})
export class WikipediaService {
  constructor(
    private httpClient: HttpClient,
    private gameService: GameService
  ) {}

  public getHtmlFromName(title: string): Observable<string> {
    const url = `https://${this.gameService.currentGame?.lang}.wikipedia.org/w/api.php?origin=*&format=json&action=parse&page=${title}`;

    return this.httpClient
      .get(encodeURI(url))
      .pipe(map((res: any) => res.parse.text[Object.keys(res.parse.text)[0]]));
  }
}
