import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherDatas } from 'src/app/models/interfaces/weatherDatas';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: [],
})
export class WeatherHomeComponent implements OnInit{

  initialCity: string = 'Rio das Ostras';
  weatherDatas!: WeatherDatas;
  
  constructor(private weatherService: WeatherService) { }
  ngOnInit(): void {
    this.getWeatherDatas(this.initialCity);
  }

  getWeatherDatas(cityName: string):void{
    this.weatherService.getWeatherDatas(cityName)
    .subscribe({
      next: (response) => {
        response && (this.weatherDatas = response);
        console.log("A temperatura maxima e: ",this.weatherDatas.main.temp_max);
      },
      error: (error) => {
        console.log(error);
      },
    })

  }
    
    
  }


