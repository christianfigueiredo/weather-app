import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { WeatherDatas } from 'src/app/models/interfaces/WeatherDatas';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: [],
})
export class WeatherHomeComponent implements OnInit, OnDestroy{

  initialCity: string = 'Malaga';
  weatherDatas!: WeatherDatas;
  private readonly destroy$: Subject<void> = new Subject();
  searchIcon = faMagnifyingGlass;
  
  constructor(private weatherService: WeatherService) { }
 
  ngOnInit(): void {
    this.getWeatherDatas(this.initialCity);
  }

  getWeatherDatas(cityName: string):void{
    this.weatherService.getWeatherDatas(cityName)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        response && (this.weatherDatas = response);
        console.log("A temperatura maxima em ",this.weatherDatas.name+" é: ",this.weatherDatas.main.temp_max);
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  onSubmit(): void {
    this.getWeatherDatas(this.initialCity);
    this.initialCity = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
    
  }


