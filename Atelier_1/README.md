# **Setup**

- Pour lancer le reverse proxy :
```
docker run --rm --name my-custom-asi-nginx-container -p 80:80 -v "chemin_absolu"/CPE_ASI2_Atellier_1/Atelier_1/nginx.conf:/etc/nginx/nginx.conf:ro nginx
```

- Pour lancer le microservice front :
```
npm run dev -- --host
```
