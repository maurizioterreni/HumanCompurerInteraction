export class ServiceConfig {
    private protocol = "http";
    private host = "80.211.86.68";
    private port = "8080";
    private url = "WeatherApi/rest/1.0/";

    constructor() {}

    public getEndPoint() : string{
      return this.protocol + '://' + this.host + ':' + this.port + '/' + this.url;
    }
}
