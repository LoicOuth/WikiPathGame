import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameService } from './core/services/GameService/game.service';

const config: SocketIoConfig = { url: environment.socketUrl };

const initGameService = (gameService: GameService) => {
  gameService.startService();
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initGameService,
      deps: [GameService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
