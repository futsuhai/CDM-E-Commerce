import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MapData } from '../../models/map.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private maps: MapData[] = [];

  constructor(
      private sanitizer: DomSanitizer,
  ) {
      this.maps = [
          new MapData(sanitizer, 'п. Щельяюр', 'https://yandex.ru/map-widget/v1/?ll=53.411873%2C65.326404&mode=search&oid=25315321891&ol=biz&z=16'),
          new MapData(sanitizer, 'с. Вертеп', 'https://yandex.ru/map-widget/v1/?azimuth=0.1636246173744684&ll=53.203800%2C65.300390&mode=search&oid=123189097260&ol=biz&tilt=0.053990851189513175&z=17'),
          new MapData(sanitizer, 'п. Краснобор', 'https://yandex.ru/map-widget/v1/?azimuth=0.1636246173744684&ll=30.680068%2C59.678377&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoxNTA4NTYzMDU4EpoB0KDQvtGB0YHQuNGPLCDQm9C10L3QuNC90LPRgNCw0LTRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwg0KLQvtGB0L3QtdC90YHQutC40Lkg0YDQsNC50L7QvSwg0JrRgNCw0YHQvdC-0LHQvtGA0YHQutC-0LUg0LPQvtGA0L7QtNGB0LrQvtC1INC_0L7RgdC10LvQtdC90LjQtSIKDRBn9UEVtLVuQg%2C%2C&tilt=0.053990851189513175&z=15.85'),
          new MapData(sanitizer, 'г. Диюр', 'https://yandex.ru/map-widget/v1/?ll=53.411873%2C65.326404&mode=search&oid=25315321891&ol=biz&z=16')
      ]
  }

  public getMapData(): MapData[] {
      return this.maps;
  }
}
