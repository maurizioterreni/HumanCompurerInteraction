export class ServiceConfig {
    private protocol = "https";
    private host_prod = "80.211.86.68";
    private host_dev = "localhost";
    private port = "8443";
    private url_pord = "WeatherApi/rest/1.0/";
    private url_dev = "WeatherSt-0.0.1-SNAPSHOT/rest/1.0/";

    constructor() {}

    public getEndPoint() : string{
      //return this.getDevEndPoint();
      return this.getProdEndPoint();
    }

    private getDevEndPoint() : string{
      return this.protocol + '://' + this.host_dev + ':' + this.port + '/' + this.url_dev;
    }

    private getProdEndPoint() : string{
      return this.protocol + '://' + this.host_prod + ':' + this.port + '/' + this.url_pord;
    }
}
