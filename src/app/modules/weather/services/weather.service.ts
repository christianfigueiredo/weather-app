import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  URL = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = '562abc8e1c9b6d2c81baa95d5e31980b';

  getWeatherDatas(cityName: string): Observable<any>{
    return this.http.get(`${this.URL}?q=${cityName}&units=metric&mode=json&appid=${this.apiKey}`,{});    
  }
}