import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompleteVehicleService {

  constructor() { }

  typeData: any = [];
  modelData: any = [];
  variantData: any = [];
  colorData: any = [];

  public addType(message) {
    this.typeData = message;
  }

  public getType() {
    return this.typeData;
  }

  public addModel(message) {
    this.modelData = message;
  }

  public getModel() {
    return this.modelData;
  }

  public addVariant(message) {
    this.variantData = message;
  }

  public getVariant() {
    return this.variantData;
  }

  public addColor(message) {
    this.colorData = message;
  }

  public getColor() {
    return this.colorData;
  }
  
}
