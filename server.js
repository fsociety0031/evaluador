const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

let lastIndex = -1;
let confirmacoes = 0;
let saldo_atual = 0;
let responseSent = false;

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

            confirmacoes++;
            saldo_atual += parseFloat(valor_produto);
            
            if (confirmacoes >= 3) {

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
               responseSent = true;
               confirmacoes = 0;
               saldo_atual = 0;
            } else {
                res.send()
            }
        }
    });
});

app.listen(80, () => {
    console.log('Servidor está rodando na porta 80');
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
