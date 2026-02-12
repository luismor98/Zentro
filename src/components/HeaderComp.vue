<script setup></script>

<template>
    <header class="header-outer">
	    <div class="header-inner responsive-wrapper">
		<div class="header-logo">
			<h1>Zentro</h1>
	    </div>
		    <nav class="header-navigation">
			    <a href="#"> <i class="fa-regular fa-house"></i> Inicion </a>
			    <a href="#"> <i class="fa-solid fa-magnifying-glass"></i> Explorar </a>
			    <a href="#"> <i class="fa-regular fa-heart"></i> Favoritos </a>
		    </nav>
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
	--header-height-difference: calc(
		var(--header-outer-height) - var(--header-inner-height)
	);
	--header-bg: #fff;
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

</style>