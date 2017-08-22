class APIRequestService extends Configuration {
    public pageMgr: PageMgr;

    constructor() {
        super();
        this.pageMgr = new PageMgr();
    }

    request(requestMethod: string, requestURL: string, requestData?: Object, onSuccess?: Function, onError?: Function) {
        const self = this;
        requestData = JSON.stringify(requestData);
        requestURL = APIRequestService.buildRequestURL(requestURL);


        this.pageMgr.loadingMode(true);
        console.log(` >>> ${requestMethod} :: ${requestURL}`, requestData || '');

        const xhr = new XMLHttpRequest();
        xhr.open(requestMethod, requestURL, true);
        xhr.timeout = APIRequestService.requestTimeout;

        xhr.onload = function () {
            if(undefined !== onSuccess) {
                onSuccess(xhr);
            }

            self.pageMgr.loadingMode(false);
        };
        xhr.onerror = function () {
            if(undefined !== onError) {
                onError(xhr);
            }

            self.pageMgr.loadingMode(false);
        };

        xhr.send(requestData);

        // $.ajax(<any>{
        //     accepts: 'application/json',
        //     dataType: 'json',
        //     crossDomain: true,
        //     method: requestMethod,
        //     url: requestURL,
        //     data: requestData,
        //     timeout: APIRequestService.requestTimeout,
        //     beforeSend: function () {
        //         self.pageMgr.loadingMode(true);
        //         console.log(` >>> ${requestMethod} :: ${requestURL}`, requestData || '');
        //     },
        //     complete: function (jqXHR) {
        //         self.pageMgr.loadingMode(false);
        //         console.log(` >>> ${requestMethod} :: ${requestURL}`, jqXHR);
        //     },
        //     success: onSuccess,
        //     error: onError
        // });
    }

    protected static buildRequestURL(requestPath: string): string {
        requestPath = requestPath.replace(/^\/|\/$/g, '');

        return `${APIRequestService.requestProtocol}://${APIRequestService.requestHost}/${requestPath}`
    }
}
