import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-side-pane',
  templateUrl: './side-pane.component.html',
  styleUrls: ['./side-pane.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidePaneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
