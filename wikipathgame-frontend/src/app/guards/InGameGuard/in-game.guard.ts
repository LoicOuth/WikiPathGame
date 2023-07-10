import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GameService } from 'src/app/core/services/GameService/game.service';

@Injectable({
  providedIn: 'root',
})
export class InGameGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(private gameService: GameService, private router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.gameService.currentGame == undefined) {
      this.router.navigate(['']);

      return false;
    }

    return true;
  }

  canDeactivate(
    _component: unknown,
    _currentRoute: ActivatedRouteSnapshot,
    _currentState: RouterStateSnapshot,
    _nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.gameService.currentGame != undefined) {
      if (
        this.gameService.currentGame.isStarted &&
        this.gameService.currentGame.parts.length > 0
      )
        return true;

      if (
        !this.gameService.currentGame.isStarted &&
        _nextState?.url === '/leaderboard'
      )
        return true;

      return false;
    }

    return true;
  }
}
