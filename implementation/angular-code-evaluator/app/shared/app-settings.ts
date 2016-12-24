/**
 * Global Variables for Settings
 */
export class AppSettings {

    //global URL Endpoint. Comment according to environment
   
   //LOCAL
   public static get API_ENDPOINT(): string { return 'http://localhost:8091'; }

   //STAGING
  // public static get API_ENDPOINT(): string { return 'http://192.168.58.62:8091'; }

   //PRODUCTION
   //public static get API_ENDPOINT(): string { return 'http://192.168.58.62:8090'; }
}