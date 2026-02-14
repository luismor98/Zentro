<script setup>
</script>

<template>
    <div class="grid-profile">
        <div class="sidebar">
            <h1>Zentro</h1>
            <ul>
                <li><a href="#"> <i class="fa-regular fa-house"></i> Inicio </a></li>
			    <li><a href="#"> <i class="fa-regular fa-heart"></i> Favoritos </a></li>
				<li><a href="#"> <i class="fa-solid fa-magnifying-glass"></i> Explorar </a></li>
                <li><a href="#"> <i class="fa-regular fa-user"></i> Perfil </a></li>
            </ul>
        </div>
        <div class="profile-content">
            <div>
                <img src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png" alt="" class="img-container">
            </div>
            <div>
                <h2>Nombre</h2>
            </div>
            <div class="verfied-box">
                Verificado <i class="fa-solid fa-check"></i>
            </div>
            <div class="divisor"></div>
            <div class="profile-card">
                <h4>¿Tienes un Emprendimiento?</h4>
                <button class="button2" type="button">
                <span>Registralo</span>
                </button>
            </div>
        </div>

    </div>
</template>

<style>
    .grid-profile{
        height: 100vh;
        display: grid;
        grid-template-columns: auto 1fr;
    }

    .sidebar{
        background-color: #fff;
        text-align: center;
        min-width: 200px;
        box-shadow: 0px 2px 5px #000;
    }

    .sidebar h1{
        border-bottom: 0.3px #111 solid;
        padding: 5px;
    }

    li{
        margin-top: 1rem;
    }

    li a{
        color: black;
        text-decoration: none;
    }

    .profile-content{
        padding-top: 1.5rem;
        justify-items: center;
        text-align: center;
    }

    .img-container{
        max-height: 200px;
        max-width: 200px;
        border-radius: 50%;
    }

    .verfied-box{
        margin-top: 1rem;
        padding: 0.75rem;
        background-color: #ddd;
        border: 0.5px darkgray solid; 
        max-width: 120px;
        border-radius: 2rem;
        display: inline-flex;
        align-self: center;
    }

    .verfied-box i{
        margin-left: 5px;
    }

    .divisor{

        background-color: #000;
        height: 0.10rem;
        margin-top: 1.5rem;
        margin-left: 2rem;
        margin-right: 2rem;
        opacity: 0.30;
    }

    .profile-card{
        margin-top: 1rem;
        padding: 2rem;
        border: 1px #1f2e3e solid;
        max-width: 40%;
        display: inline-flex;
        align-self: center;
        border-radius: 8px;
    }

    .button2{
    --button-background: #1f2e3e;
    --button-background-hover: #eee;
    --button-color: #fff;

    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--button-background);
    color: var(--button-color);
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;
  }

</style>