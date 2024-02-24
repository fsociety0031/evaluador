const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const store = require('store')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
   res.setHeader('ngrok-skip-browser-warning', '2030');
   next();
})

let lastIndex = -1;
let confirmacoes = 0;
let saldo_atual = 0;
let responseSent = false;
let userId = uuidv4();

let data = {
    confirmacoes,
    saldo_atual,
    responseSent,
    userId
}

store.set('user', data)

let user = store.get('user');

app.post('/', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler arquivo JSON:', err);
            res.status(500).send('Erro interno do servidor');
            return;
        }
        
        const jsonData = JSON.parse(data);
        if (req.body.r && req.body.r === 'demo' && jsonData.demo) {
            const responseData = jsonData.demo;
            res.setHeader('Content-Type', 'text/html');
            res.send(responseData.html_content);
        } else if (req.body.r && req.body.r === 'open_marca' && req.body.marca_id && jsonData.open_marcas[req.body.marca_id]) {
            const marcaData = jsonData.open_marcas[req.body.marca_id];
            if (req.body.variation_id) {
                const variationData = marcaData.find(variation => variation.variation_id == req.body.variation_id);
                if (variationData) {
                    res.setHeader('Content-Type', 'text/html');
                    res.send(variationData.html_content);
                } else {
                    es.setHeader('Content-Type', 'text/html');
                    res.status(400).send('Variação inválida para a marca especificada');
                }
            } else {
                let randomIndex = Math.floor(Math.random() * marcaData.length);
                while (randomIndex === lastIndex) {
                    randomIndex = Math.floor(Math.random() * marcaData.length);
                }
                lastIndex = randomIndex;
                const randomVariationData = marcaData[randomIndex];
                res.setHeader('Content-Type', 'text/html');
                res.send(randomVariationData.html_content);
            }
        } else if(req.body.r && req.body.r === 'confirma_produto') {

            const { r, produto_id, marca_id, valor_produto } = req.body;

            user.confirmacoes++;
            user.saldo_atual += parseFloat(valor_produto);
            
            if (user.confirmacoes >= 3 && !user.responseSent) {

                res.setHeader('Content-Type', 'text/html');
                res.send(`
                <h1 style="text-align: center; font-size: 19px;border-bottom:none; padding: 5px">Despierta un ingreso extraordinario, ganando <font style="    color: #00c700;
                   font-weight: 600;"> hasta US$ 1.000,00</font> al día evaluando marcas. Conviértete en un Maestro Evaluador y transforma <font style="color: #6d27b2;
                   font-weight: 600;">opiniones en beneficios instantáneos.</font></h1>
                
                <span style="
                   text-align: center;
                   display: block;
                   font-size: 14px;
                   margin-bottom: 20px;
                   margin-top: -14px;
                   padding: 5px;
                ">Descubre ahora el camino hacia ganancias fáciles y alcanza tu libertad financiera de una vez por todas.</span>
                
                <div id="vid_65b1c7ec102fa5000859d629" style="position:relative;width:100%;padding: 56.25% 0 0;"><img id="thumb_65b1c7ec102fa5000859d629" src="https://images.converteai.net/47762d37-ea93-4766-b98a-153f0ff96c2e/players/65b1c7ec102fa5000859d629/thumbnail.jpg" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;"><div id="backdrop_65b1c7ec102fa5000859d629" style="position:absolute;top:0;width:100%;height:100%;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);"></div></div><script type="text/javascript" id="scr_65b1c7ec102fa5000859d629">var s=document.createElement("script");s.src="https://scripts.converteai.net/47762d37-ea93-4766-b98a-153f0ff96c2e/players/65b1c7ec102fa5000859d629/player.js",s.async=!0,document.head.appendChild(s);</script>
                
                <div style="
                   background-color: #f9f9f9;
                   width: 100%;
                   height: 15px;
                   margin-top: 30px;
                   border-radius: 100px;
                   box-shadow: 0px 0px 2px 0px #c5c5c5;
                   overflow: hidden;
                " class="barra">
                   <div class="progresso" style="
                       width: 0%;
                       background-color: #6e27b3;
                       display: block;
                       position: relative;
                       left: 0px;
                       height: 15px;
                       box-sizing: border-box;
                       float: left;
                   "></div>
                </div>
                
                
                <h1 style="
                   font-size: 17px;
                   padding: 18px;
                   border-bottom: none;
                   position: relative;
                   text-align: center;
                   font-weight: normal;
                ">
                Estás avanzando, tienes:</h1>
                
                
                <style>
                   
                   #saldo_acumulado{
                
                   display: block;
                   text-align: center;
                   font-size: 18px;
                   font-weight: bold;
                   color: #ffffff;
                   background-color: #45d14b;
                   border-radius: 100px;
                   padding: 5px;
                   margin-top: -5px;
                
                   }
                
                </style>
                
                <div id="saldo_acumulado">US$ 0,00</div>
                
                <h1 style="
                   font-size: 17px;
                   padding: 18px;
                   border-bottom: none;
                   position: relative;
                   text-align: center;
                   font-weight: normal;
                ">¡Sigue mirando!</h1>
                
                
                <h4 style="color:#6d27b2; text-align: center;">Vea cómo surgió el evaluador galardonado</h4>
                
                <img style="
                   box-shadow: none;
                   width: 200px;
                   text-align: center;
                   display: block;
                   margin-bottom: 20px;
                " src="assets/img/logo.png"/>
                
                <style type="text/css">
                   .historia{
                       padding: 5px;
                   display: block;
                   }
                   .historia > p{
                text-align: center;
                   }
                </style>
                
                <div class="historia">
                   <p>En una época en la que la búsqueda de autenticidad y calidad se volvió esencial, surgió el Evaluador de Marcas. Inspirado en la necesidad de ofrecer a los consumidores una manera confiable de elegir productos y servicios, este concepto innovador nació de la unión entre la pasión por las marcas excepcionales y el deseo de simplificar las elecciones.</p>
                
                <p>La idea floreció al darse cuenta de que cada evaluación es una expresión valiosa de la experiencia personal. Basado en la confianza en retroalimentación real, el Evaluador de Marcas se convirtió en el puente entre consumidores y empresas, promoviendo una comunidad que valora la excelencia.</p>
                
                <p>Así, nació no solo una herramienta, sino una revolución en la forma en que percibimos las marcas. Esté a la vanguardia, únase a la comunidad del Evaluador de Marcas y forme parte de un viaje donde su opinión no solo cuenta, sino que también da forma al estándar de excelencia en el mundo de las elecciones inteligentes.</p>
                </div>
                
                
                
                
                
                
                <div id="mostrar_botao" style="
                   text-align: center;
                   display: block;
                   padding: 10px;
                   background-color: #9C27B0;
                   border-radius: 5px;
                   color: #fff;
                   font-weight: bold;
                   font-size: 20px;
                   box-shadow: 0px 5px 9px -3px #818181;
                   display: none;
                ">
                  ¡QUIERO RECIBIR MI BONO!
                </div>
                
                
                <style type="text/css">
                   .d-block{
                       max-width: 425px;
                       border-radius: 10px;
                       }
                
                       .carousel{
                               max-width: 425px;
                       }
                </style>
                
                
                <h3 style="text-align: center;">Testimonios de los miembros</h3>
                
                
                <div id="carouselevaluador" class="carousel slide" data-bs-ride="carousel">
                 <div class="carousel-inner">
                  <div class="carousel-item active">
                     <img src="assets/img/Depoimento6.png" class="d-block w-100" alt="...">
                   </div>
                   <div class="carousel-item" >
                     <img src="assets/img/Depoimento7.png" class="d-block w-100" alt="...">
                   </div>
                
                    <div class="carousel-item">
                     <img src="assets/img/Depoimento5.png" class="d-block w-100" alt="...">
                   </div>
                
                
                   <div class="carousel-item">
                     <img src="assets/img/Depoimento2.jpg" class="d-block w-100" alt="...">
                   </div>
                
                    <div class="carousel-item">
                     <img src="assets/img/Depoimento3.png" class="d-block w-100" alt="...">
                   </div>
                
                    <div class="carousel-item">
                     <img src="assets/img/Depoimento4.jpg" class="d-block w-100" alt="...">
                   </div>
                
                
                    <div class="carousel-item">
                     <img src="assets/img/Depoimento0.jpg" class="d-block w-100" alt="...">
                   </div>
                   <div class="carousel-item" >
                     <img src="assets/img/Depoimento1.jpg" class="d-block w-100" alt="...">
                   </div>
                 </div>
                 <button class="carousel-control-prev" type="button" data-bs-target="#carouselevaluador" data-bs-slide="prev">
                   <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                   <span class="visually-hidden">Previous</span>
                 </button>
                 <button class="carousel-control-next" type="button" data-bs-target="#carouselevaluador" data-bs-slide="next">
                   <span class="carousel-control-next-icon" aria-hidden="true"></span>
                   <span class="visually-hidden">Next</span>
                 </button>
                </div>
                
                
                
                
                
                
                
                
                <script type="text/javascript">
                   let valorFinal = 50.00;
                   let valorAcumulado = 0.00;
                   let porcentagemEmAndamento = 0;
                
                
                
                
                setInterval(function(){
                element1 = document.querySelector('.smartplayer-fake-bar');
                
                if (element1) {
                 width = element1.clientWidth;
                 parentWidth = element1.parentElement.clientWidth;
                 percentage = (width / parentWidth) * 100;
                 valor = (percentage / 50) * 25.00;
                 $(".progresso").css("width", width);
                 $("#saldo_acumulado").text("US$ "+valor.toFixed(2).replace(".", ","));
                } 
                },1000)
                
                
                </script>
                
                
                
                `);
                user.responseSent = true;
            } else {
                if(user.responseSent) {
                    res.setHeader('Content-Type', 'text/html');
                    res.send(`
                    <h1 style="text-align: center; font-size: 19px;border-bottom:none; padding: 5px">Despierta un ingreso extraordinario, ganando <font style="    color: #00c700;
                       font-weight: 600;"> hasta US$ 1.000,00</font> al día evaluando marcas. Conviértete en un Maestro Evaluador y transforma <font style="color: #6d27b2;
                       font-weight: 600;">opiniones en beneficios instantáneos.</font></h1>
                    
                    <span style="
                       text-align: center;
                       display: block;
                       font-size: 14px;
                       margin-bottom: 20px;
                       margin-top: -14px;
                       padding: 5px;
                    ">Descubre ahora el camino hacia ganancias fáciles y alcanza tu libertad financiera de una vez por todas.</span>
                    
                    <div id="vid_65cb57692b58ec00092f7c33" style="position:relative;width:100%;padding: 52.785923753665685% 0 0;"><img id="thumb_65cb57692b58ec00092f7c33" src="https://images.converteai.net/47762d37-ea93-4766-b98a-153f0ff96c2e/players/65cb57692b58ec00092f7c33/thumbnail.jpg" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;"><div id="backdrop_65cb57692b58ec00092f7c33" style="position:absolute;top:0;width:100%;height:100%;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);"></div></div><script type="text/javascript" id="scr_65cb57692b58ec00092f7c33">var s=document.createElement("script");s.src="https://scripts.converteai.net/47762d37-ea93-4766-b98a-153f0ff96c2e/players/65cb57692b58ec00092f7c33/player.js",s.async=!0,document.head.appendChild(s);</script>
                    
                    <div style="
                       background-color: #f9f9f9;
                       width: 100%;
                       height: 15px;
                       margin-top: 30px;
                       border-radius: 100px;
                       box-shadow: 0px 0px 2px 0px #c5c5c5;
                       overflow: hidden;
                    " class="barra">
                       <div class="progresso" style="
                           width: 0%;
                           background-color: #6e27b3;
                           display: block;
                           position: relative;
                           left: 0px;
                           height: 15px;
                           box-sizing: border-box;
                           float: left;
                       "></div>
                    </div>
                    
                    
                    <h1 style="
                       font-size: 17px;
                       padding: 18px;
                       border-bottom: none;
                       position: relative;
                       text-align: center;
                       font-weight: normal;
                    ">
                    Estás avanzando, tienes:</h1>
                    
                    
                    <style>
                       
                       #saldo_acumulado{
                    
                       display: block;
                       text-align: center;
                       font-size: 18px;
                       font-weight: bold;
                       color: #ffffff;
                       background-color: #45d14b;
                       border-radius: 100px;
                       padding: 5px;
                       margin-top: -5px;
                    
                       }
                    
                    </style>
                    
                    <div id="saldo_acumulado">US$ 0,00</div>
                    
                    <h1 style="
                       font-size: 17px;
                       padding: 18px;
                       border-bottom: none;
                       position: relative;
                       text-align: center;
                       font-weight: normal;
                    ">¡Sigue mirando!</h1>
                    
                    
                    <h4 style="color:#6d27b2; text-align: center;">Vea cómo surgió el evaluador galardonado</h4>
                    
                    <img style="
                       box-shadow: none;
                       width: 200px;
                       text-align: center;
                       display: block;
                       margin-bottom: 20px;
                    " src="assets/img/logo.png"/>
                    
                    <style type="text/css">
                       .historia{
                           padding: 5px;
                       display: block;
                       }
                       .historia > p{
                    text-align: center;
                       }
                    </style>
                    
                    <div class="historia">
                       <p>En una época en la que la búsqueda de autenticidad y calidad se volvió esencial, surgió el Evaluador de Marcas. Inspirado en la necesidad de ofrecer a los consumidores una manera confiable de elegir productos y servicios, este concepto innovador nació de la unión entre la pasión por las marcas excepcionales y el deseo de simplificar las elecciones.</p>
                    
                    <p>La idea floreció al darse cuenta de que cada evaluación es una expresión valiosa de la experiencia personal. Basado en la confianza en retroalimentación real, el Evaluador de Marcas se convirtió en el puente entre consumidores y empresas, promoviendo una comunidad que valora la excelencia.</p>
                    
                    <p>Así, nació no solo una herramienta, sino una revolución en la forma en que percibimos las marcas. Esté a la vanguardia, únase a la comunidad del Evaluador de Marcas y forme parte de un viaje donde su opinión no solo cuenta, sino que también da forma al estándar de excelencia en el mundo de las elecciones inteligentes.</p>
                    </div>
                    
                    
                    
                    
                    
                    
                    <div id="mostrar_botao" style="
                       text-align: center;
                       display: block;
                       padding: 10px;
                       background-color: #9C27B0;
                       border-radius: 5px;
                       color: #fff;
                       font-weight: bold;
                       font-size: 20px;
                       box-shadow: 0px 5px 9px -3px #818181;
                       display: none;
                    ">
                      ¡QUIERO RECIBIR MI BONO!
                    </div>
                    
                    
                    <style type="text/css">
                       .d-block{
                           max-width: 425px;
                           border-radius: 10px;
                           }
                    
                           .carousel{
                                   max-width: 425px;
                           }
                    </style>
                    
                    
                    <h3 style="text-align: center;">Testimonios de los miembros</h3>
                    
                    
                    <div id="carouselevaluador" class="carousel slide" data-bs-ride="carousel">
                     <div class="carousel-inner">
                      <div class="carousel-item active">
                         <img src="assets/img/Depoimento6.png" class="d-block w-100" alt="...">
                       </div>
                       <div class="carousel-item" >
                         <img src="assets/img/Depoimento7.png" class="d-block w-100" alt="...">
                       </div>
                    
                        <div class="carousel-item">
                         <img src="assets/img/Depoimento5.png" class="d-block w-100" alt="...">
                       </div>
                    
                    
                       <div class="carousel-item">
                         <img src="assets/img/Depoimento2.jpg" class="d-block w-100" alt="...">
                       </div>
                    
                        <div class="carousel-item">
                         <img src="assets/img/Depoimento3.png" class="d-block w-100" alt="...">
                       </div>
                    
                        <div class="carousel-item">
                         <img src="assets/img/Depoimento4.jpg" class="d-block w-100" alt="...">
                       </div>
                    
                    
                        <div class="carousel-item">
                         <img src="assets/img/Depoimento0.jpg" class="d-block w-100" alt="...">
                       </div>
                       <div class="carousel-item" >
                         <img src="assets/img/Depoimento1.jpg" class="d-block w-100" alt="...">
                       </div>
                     </div>
                     <button class="carousel-control-prev" type="button" data-bs-target="#carouselevaluador" data-bs-slide="prev">
                       <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                       <span class="visually-hidden">Previous</span>
                     </button>
                     <button class="carousel-control-next" type="button" data-bs-target="#carouselevaluador" data-bs-slide="next">
                       <span class="carousel-control-next-icon" aria-hidden="true"></span>
                       <span class="visually-hidden">Next</span>
                     </button>
                    </div>
                    
                    
                    
                    
                    
                    
                    
                    
                    <script type="text/javascript">
                       let valorFinal = 50.00;
                       let valorAcumulado = 0.00;
                       let porcentagemEmAndamento = 0;
                    
                    
                    
                    
                    setInterval(function(){
                    element1 = document.querySelector('.smartplayer-fake-bar');
                    
                    if (element1) {
                     width = element1.clientWidth;
                     parentWidth = element1.parentElement.clientWidth;
                     percentage = (width / parentWidth) * 100;
                     valor = (percentage / 50) * 25.00;
                     $(".progresso").css("width", width);
                     $("#saldo_acumulado").text("US$ "+valor.toFixed(2).replace(".", ","));
                    } 
                    },1000)
                    
                    
                    </script>
                    
                    
                    
                    `);
                } else {
                    res.setHeader('Content-Type', 'text/html');
                    res.send(`<style type="text/css"> .confirm_avaliacao{ width: 100%; border-radius: 10px; box-shadow: 0px 0px 10px -3px #000; object-fit: cover; margin-top: 30px; padding: 19px; } </style> <div class="confirm_avaliacao"> <div style=" text-align: center; display: block; "> <div class="checkmark-container"> <div class="checkmark"> <svg class="confetti" height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg"> <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z" fill="#00C8E5"> </path></svg> <svg class="confetti" height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg"> <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z" fill="#00C8E5"> </path></svg> <svg class="confetti" height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg"> <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z" fill="#00C8E5"> </path></svg> <svg class="confetti" height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg"> <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z" fill="#00C8E5"> </path></svg> <svg class="confetti" height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg"> <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z" fill="#00C8E5"> </path></svg> <svg class="confetti" height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg"> <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z" fill="#00C8E5"> </path></svg> <svg class="checkmark__check" height="36" viewBox="0 0 48 36" width="48" xmlns="http://www.w3.org/2000/svg"> <path d="M47.248 3.9L43.906.667a2.428 2.428 0 0 0-3.344 0l-23.63 23.09-9.554-9.338a2.432 2.432 0 0 0-3.345 0L.692 17.654a2.236 2.236 0 0 0 .002 3.233l14.567 14.175c.926.894 2.42.894 3.342.01L47.248 7.128c.922-.89.922-2.34 0-3.23"> </path></svg> <svg class="checkmark__back" height="115" viewBox="0 0 120 115" width="120" xmlns="http://www.w3.org/2000/svg"> <path d="M107.332 72.938c-1.798 5.557 4.564 15.334 1.21 19.96-3.387 4.674-14.646 1.605-19.298 5.003-4.61 3.368-5.163 15.074-10.695 16.878-5.344 1.743-12.628-7.35-18.545-7.35-5.922 0-13.206 9.088-18.543 7.345-5.538-1.804-6.09-13.515-10.696-16.877-4.657-3.398-15.91-.334-19.297-5.002-3.356-4.627 3.006-14.404 1.208-19.962C10.93 67.576 0 63.442 0 57.5c0-5.943 10.93-10.076 12.668-15.438 1.798-5.557-4.564-15.334-1.21-19.96 3.387-4.674 14.646-1.605 19.298-5.003C35.366 13.73 35.92 2.025 41.45.22c5.344-1.743 12.628 7.35 18.545 7.35 5.922 0 13.206-9.088 18.543-7.345 5.538 1.804 6.09 13.515 10.696 16.877 4.657 3.398 15.91.334 19.297 5.002 3.356 4.627-3.006 14.404-1.208 19.962C109.07 47.424 120 51.562 120 57.5c0 5.943-10.93 10.076-12.668 15.438z" fill="#00C8E5"> </path></svg> </div> </div> </div> <span style=" text-align: center; display: block; font-weight: 800; font-size: 20px; ">¡Gracias! </span> <span style=" display: block; text-align: center; padding: 10px; font-size: 18px; font-weight: 400; ">Completaste esta encuesta y recibiste:</span> <div style="display: block; text-align: center; font-size: 32px; font-weight: bold; color: #6c27b2">US$ ${valor_produto}0</div> <span style=" text-align: center; display: block; color: #b3b3b3; padding: 10px; font-weight: 500; ">Nuovo equilibrio</span> <div id="saldo_usuario" style="display: block; text-align: center; color: #4CAF50; font-weight: bold; font-size: 16px;">US$ <span id="saldo_avaliado">${saldo_atual}</span></div> <div style="text-align: center; display: block; padding: 10px; background-color: #6c27b2; border-radius: 10px; margin-top: 20px; color: #fff;" class="proximo_form" marca="1">Próxima evaluación</div> <div style="    display: block; text-align: center; padding: 10px; margin-top: 10px; margin-bottom: -16px; font-weight: 500; color: #8b8b8b;" class="voltar_inicio">Volver al inicio</div> <script type="text/javascript"> saldo_atual = ${saldo_atual}; function atualizarSaldo() { var saldoElementAvaliado = document.getElementById("saldo_avaliado"); var saldoElementMenu = document.getElementById("saldo_menu"); var saldoAtual = parseFloat(saldo_atual); var valorAleatorio = parseFloat("20.50".replace(",", ".")); atualizarTextoComAnimacao(saldoAtual, saldoAtual + valorAleatorio, saldoElementAvaliado); atualizarTextoComAnimacao(saldoAtual, saldoAtual + valorAleatorio, saldoElementMenu); } function atualizarTextoComAnimacao(valorInicial, valorFinal, elemento) { var passos = 50; var intervalo = 30; var diff = valorFinal - valorInicial; var incremento = diff / passos; var contador = 0; var animacao = setInterval(function() { valorInicial += incremento; if (elemento.id === "saldo_menu") { elemento.innerText = "US$ " + valorInicial.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); } else { elemento.innerText = valorInicial.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); } contador++; if (contador === passos) { clearInterval(animacao); } }, intervalo); } atualizarSaldo(); $(".proximo_form").on("click", function() { var marca_id = $(this).attr("marca"); $.ajax({ type: "POST", url: "https://1985-167-99-125-31.ngrok-free.app/", data: { "r": "open_marca", "marca_id": marca_id, "type": "first" }, success: function(response) { $("#open_produtos").html(response); $("#open_produtos").show(); } }); }); $(".voltar_inicio").on("click", function() { window.location.href = ""; })</script> </div>`);
                }
            }
        }
        console.log(user)
    });
});

app.listen(3000, () => {
    console.log('Servidor está rodando na porta 3000');
});

app.on('error', (err) => {
    console.error('Erro no servidor:', err);
    console.log('Reiniciando servidor...');
    reiniciarServidor();
});

function reiniciarServidor() {
    setTimeout(() => {
        console.log('Iniciando servidor novamente...');
        iniciarServidor();
    }, 500);
}
