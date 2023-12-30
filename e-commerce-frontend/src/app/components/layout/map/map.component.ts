import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MapData } from 'src/app/models/map.model';
import { MapService } from 'src/app/services/map/map.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  host: {
    class: 'map'
  }
})
export class MapComponent implements OnInit {

  public maps: MapData[] = [];
  public selectedMapIndex: number = 0;

  constructor(private mapService: MapService) { }

  public ngOnInit() {
    this.maps = this.mapService.getMapData();
  }

  public selectMap(index: number) {
    this.selectedMapIndex = index;
  }
}
