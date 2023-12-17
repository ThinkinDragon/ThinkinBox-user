import {
  InAppBrowser,
  type InAppBrowserOptions,
} from "@awesome-cordova-plugins/in-app-browser";

export default function useInBrowser(url:string,fields:InAppBrowserOptions) {
  const config = useRuntimeConfig();
    return reactive({
    url,browser:null as any | null,
    fields,
    processing: false,
    error: null as any | null,
    async startBrowser() {
      if (this.processing) return;
 
      this.error = null;
      this.processing = true;
 
      try {
        this.browser = InAppBrowser.create(this.url,'_self', this.fields);
        this.browser.on('beforeload').subscribe( (event:any) => {
          console.log("beforeload 1ww");
          return this.urlFun(event);
       });
        this.browser.on('exit').subscribe((event:any) => {
          console.log("exit 2ww");

          return this.urlFun(event);
       });
        this.browser.on('loaderror').subscribe((event:any) => {
          console.log("loaderror 3ww");
          return this.urlFun(event);
       });
        this.browser.on('loadstart').subscribe((event:any) => {
          console.log("loadstart 3ww",JSON.stringify(event) );

          let domain = (new URL(event.url));
          let domain2 = (new URL(config.public.BASE_URL));
          console.log("loadstart 4ww",JSON.stringify(domain));
          console.log("loadstart 5ww",JSON.stringify(this.url));
          console.log("loadstart 6ww",this.url !== domain.href);
          
          if (this.url !== domain.href) {
            if (domain.hostname === domain2.hostname) {
              return this.browser.close()
            }
          }
       });
        this.browser.on('loadstop').subscribe((event:any) => {
          console.log("loadstop 5ww");
          return this.urlFun(event);
       });
      } catch (err) {
        this.error = err;
      }
      this.processing = false;
    },
    async urlFun(event: any) {
      console.log("urlFun",JSON.stringify(event));
      let domain = (new URL(event.url));
      let domain2 = (new URL(config.public.BASE_URL));
      
      if (this.url === domain.href) {
        return
      }
      if (domain.hostname === domain2.hostname) {
        return this.browser.close()
      }
      let data = event.url;
      console.log('url check',data);
      let data2 = 'https://www.google.com/';
      console.log(data === data2 );
      if (this.url !== data) 
      if (data === data2) {
        return this.browser.close();
      }
      return true;
    },
  });
}