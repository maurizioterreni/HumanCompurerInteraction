export class Environment {
    private title = "My WeatherStation";
    private version = "0.2.11";

    constructor() {}


    getTitle() {
      return this.title;
    }

    getVersion() {
      return this.version;
    }
}
