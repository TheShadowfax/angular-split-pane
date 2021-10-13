import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidePaneComponent } from './side-pane/side-pane.component';
import { ResizeLayoutModule } from './layout/resize-layout/resize-layout.module';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {transports:['websocket']} };


@NgModule({
  declarations: [
    AppComponent,
    SidePaneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    ResizeLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
