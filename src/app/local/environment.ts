export class Environment {
    private title = "My WeatherStation";
    private version = "0.2.14";

    constructor() {}


    getTitle() {
      return this.title;
    }

    getVersion() {
      return this.version;
    }
}
