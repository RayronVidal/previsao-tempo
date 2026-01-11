import { useState } from 'react';
import './style.css';
import styles from './index.module.css';
import axios from 'axios';

const ImaGarfild = "/public/imageNomal.png";
const ImaGarfildCalor = "/public/Calor.png";
const ImaGarfildFrio = "/public/image.png";

function PegarHora(){
    let agora = new Date()
    let horas = agora.getHours().toString().padStart(2, '0')
    let minutos = agora.getMinutes().toString().padStart(2, '0')
    const hora = document.getElementById("hora")
    hora.innerHTML = `${horas}:${minutos}`
}

function PegarUmidade(dados){
    const umidade = document.getElementById("umidade")
    umidade.innerHTML = `${dados.main.humidity}%`
    
}

function PegarTempMax(dados){
    const TempMax = document.getElementById("TempMax")
    TempMax.innerHTML = `${dados.main.temp_max.toFixed(0)}º C`

}

function Vento(dados){
    const vento = document.getElementById("vento")
    vento.innerHTML = `${dados.wind.speed} km/h`
}

function Data(){
    const hoje = new Date();
    const dia = hoje.getDate().toString().padStart(2, '0');
    const mes = (hoje.getMonth() + 1).toString().padStart(2, '0'); // Janeiro é 0
    const ano = hoje.getFullYear();

    const data = document.getElementById("data")

    const dataFormatada = `${dia}/${mes}/${ano}`

    data.innerHTML = dataFormatada

}

function MudarImagem(dados){
    const estadoClima = dados.weather[0].description
    console.log(estadoClima)

    if (estadoClima.includes("nublado") || estadoClima.includes("nuvem")) {
    imagem.src = ImaGarfildFrio;
  } else if (estadoClima.includes("sol") || estadoClima.includes("limpo")) {
    imagem.src = ImaGarfildCalor;
  } else {
    imagem.src = ImaGarfild; 
    
  }
}

async function Total() {
    const City = document.getElementById("city").value;
    const Apikey = "acc21d927ee9eab90b8d5b2b7b94f958";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${Apikey}&units=metric&lang=pt_br`;

    const retorno = await axios.get(url);
    const dados = retorno.data;
    console.log(dados)

    
    const Temp = document.getElementById("valorTemp")
    const nomeCity = document.getElementById("nomeCity")

    Temp.innerHTML = `${dados.main.temp.toFixed(0)}º C`
    nomeCity.innerHTML = dados.name
    
    MudarImagem(dados)
    PegarHora()
    PegarUmidade(dados)
    PegarTempMax(dados)
    Vento(dados)
    Data()
}

function Home() {
  return (
    <div className='container'>
      <div className='search'>
        <input type="text" placeholder='Cidade' id='city' />
        <button className='botao' onClick={Total}>Pesquisar</button>
      </div>

      <div className='temperature'>
        <div className='Temp'>
          <h2 id='valorTemp'>28º C</h2>
          <p id='nomeCity'>NameCity</p>
        </div>

        <div className='tempImage'>
          <img src={ImaGarfild} alt="Imagem do clima"  id='imagem'/>
        </div>
      </div>

      <div className={styles.information}>
        <div className={styles.coluna}>
          <h3>Hora</h3>
          <p id='hora'>14:20 PM</p>
          <br />
          <h3>Data</h3>
          <p id='data'>30/06/2025</p>
        </div>
        <div className={styles.coluna}>
          <h3>Vento</h3>
          <p id='vento'>15 Km/h</p>
          <br />
          <h3>Umidade</h3>
          <p id='umidade'>65%</p>
        </div>
        <div className={styles.coluna}>
          <h3>Chuva</h3>
          <p>10%</p>
          <br />
          <h3>Temp Max</h3>
          <p id='TempMax'>28º C</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
