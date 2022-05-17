import Vue from 'vue';
export function post(body: FormData): void  {
    
    const p: FormData = new FormData();
    p.append("username", "max@gmail.com");
    p.append("password", "1234");

    Vue.http.post("http://localhost:8081/api/access", p, {credentials: true});
    
}