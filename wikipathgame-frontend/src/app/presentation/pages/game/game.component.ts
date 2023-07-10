import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IGame } from 'src/app/core/models/interfaces/IGame.interface';
import { IPart } from 'src/app/core/models/interfaces/IPart.interface';
import { PageDto } from 'src/app/core/models/PageDto';
import { GameService } from 'src/app/core/services/GameService/game.service';
import { PartService } from 'src/app/core/services/PartService/part.service';
import { WikipediaService } from 'src/app/core/services/WikipediaService/wikipedia.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
})
export class GameComponent implements OnInit, OnDestroy {
  public showSidebar: boolean = false;
  public currentHtml: SafeHtml = '';
  public loadingPage: boolean = false;
  public waitingNewGame: boolean = false;
  public timer: number = this.gameService.currentGame!.timeBetweenParts;

  private _routeSub?: Subscription;

  constructor(
    public gameService: GameService,
    private wikipediaService: WikipediaService,
    private partService: PartService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this._routeSub = this.route.paramMap.subscribe((params: ParamMap) => {
      this.getHtml(params.get('page') as string);
    });

    this.gameService._subGame.subscribe((game: IGame) => {
      let lastPartIndex = game.parts.length - 1;

      if (game.isStarted) {
        if (game.parts[lastPartIndex].inGame) {
          this.router.navigate([
            'game',
            game.parts[lastPartIndex].startPage.title.replace(/\s/g, '_'),
          ]);

          this.waitingNewGame = false;
        } else {
          this.waitingNewGame = true;
        }
      } else {
        this.router.navigate(['leaderboard']);
      }
    });

    this.partService._subTimer.subscribe(
      (timer: number) => (this.timer = timer)
    );
  }

  private getHtml(currentPage: string): void {
    let lastPart: IPart =
      this.gameService.currentGame?.parts[
        this.gameService.currentGame.parts.length - 1
      ]!;

    if (currentPage === lastPart.startPage.title.replace(/\s/g, '_')) {
      this.currentHtml = this.sanitizer.bypassSecurityTrustHtml(
        lastPart.startPage.html
      );
    } else if (currentPage === lastPart.endPage.title.replace(/\s/g, '_')) {
      this.partService.finishPart();

      this.currentHtml = this.sanitizer.bypassSecurityTrustHtml(
        lastPart.endPage.html
      );
    } else {
      this.loadingPage = true;
      this.wikipediaService
        .getHtmlFromName(currentPage)
        .subscribe((res: string) => {
          this.currentHtml = this.sanitizer.bypassSecurityTrustHtml(res);
          this.partService.currentPartPath.push(
            new PageDto(currentPage.replace(/\_/g, ' '))
          );
          this.loadingPage = false;
        });
    }
  }

  ngOnDestroy(): void {
    this._routeSub?.unsubscribe();
  }
}
