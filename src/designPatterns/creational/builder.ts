class Car {
  public autoPilot = false;
  public parktronic = false;
  public signaling = false;
  public engine: any;
  constructor() {}
}

class CarBuilder {
  private car: Car;

  constructor() {
    this.car = new Car();
  }

  addAutoPilot(autoPilot) {
    this.car.autoPilot = autoPilot;
    return this;
  }

  addParktronic(parktronic) {
    this.car.parktronic = parktronic;
    return this;
  }
  addSignaling(signaling) {
    this.car.signaling = signaling;
    return this;
  }

  updateEngine(engine) {
    this.car.engine = engine;
    return this;
  }

  build() {
    return this.car;
  }
}
// Usage-> new CarBuilder().addAutoPilot(‘autopilot1’)....build();
