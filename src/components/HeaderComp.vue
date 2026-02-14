<script setup>

</script>

<template>
    <header class="header-outer">
	    <div class="header-inner responsive-wrapper">
		<div class="header-logo">
			<h1>Zentro</h1>
	    </div>
		    <nav class="header-navigation">
			    <router-link to="/"><a href="#"> <i class="fa-regular fa-house"></i> Inicio </a></router-link>
			    <router-link to="/profile"><a href="#"> <i class="fa-regular fa-user"></i> Perfil </a></router-link>
				<router-link to="/"><a href="#"> <i class="fa-solid fa-magnifying-glass"></i> Explorar </a></router-link>
		    </nav>
			<router-link to="/login">
				<button class="button2" type="button">
                	<span>Registrarse</span>
            	</button>
			</router-link>
	    </div>
    </header>
</template>

<style>
    @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap");

*,
*:after,
*:before {
	box-sizing: border-box;
}

:root {
	--header-outer-height: 110px;
	--header-inner-height: 70px;
}

.responsive-wrapper {
	width: 90%;
	max-width: 1280px;
	margin-left: auto;
	margin-right: auto;
}

.header-outer {
	height: var(--header-outer-height);
	position: absolute;
	top: 0;
    left: 0;
    right: 0;
	display: flex;
	align-items: center;
	background-color: white;
	box-shadow: 0 2px 10px 0 rgba(0,0,0, 0.1);
}

.header-inner {
	height: var(--header-inner-height);
	position: sticky;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.header-logo img {
	display: block;
	height: calc(var(--header-inner-height) - 30px);
}

.header-navigation {
	display: flex;
	flex-wrap: wrap;
}

.header-navigation a{
	font-size: 1.125rem;
	color: inherit;
	margin-left: 1.75rem;
	position: relative;
	font-weight: 500;
}

.header-navigation a {
    display: inline-block;
	font-size: 1.125rem;
	color: inherit;
	text-decoration: none;
}

.button2 {
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