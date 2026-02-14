<script setup></script>

<template>
    <div class="card">
		<div class="card-header">
			<img src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/themes/2160462672/assets/placeholder.png?1746171717218425" alt="">
		</div>
		<div class="card-content">
			<h3>Emprendimiento</h3>
		</div>
		<div class="card-divisor"></div>
		<div class="card-footer">
			<button class="button2" type="button">
                <span>Ver</span>
            </button>
		</div>
	</div>
</template>

<style>

	.card{
		--max-card-width: 350px;
		--max-card-height: 500xp;
		--min-card-width: 200px;
		--min-card-height: 350px;
		
		max-width: var(--max-card-width);
		max-height: var(--max-card-height);
		min-width: var(--min-card-width);
		min-height: var(--max-card-height);
		
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 5px 5px 15px #000;
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
	
	}

	.card-header img{
		max-width: var(--max-card-width);
		border-radius: 10px 10px 0px 0px;
	}

	.card-content {
		padding: 1rem;
	}
	
	.card-divisor{
    background-color: #000;
    height: 0.10rem;

    margin-left: 2rem;
    margin-right: 2rem;
    opacity: 0.30;
  	}

	.card-footer{
		padding: 1rem;
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