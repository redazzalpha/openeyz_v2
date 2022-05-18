import Vue from 'vue';
export const httpRequest = {

    post: function (body: FormData): Promise<string>  {
        return new Promise((resolve, reject) => {
            Vue.http.post("http://localhost:8081/api/access", body, {credentials: true})
            .then(
                (res: Response) => { res.text().then( text => resolve(text) ); },
                (err: Error)  => { reject(err.message) },
            );
        });
    }, 

};