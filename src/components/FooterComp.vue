<script setup></script>

<template>
    <footer class="outer-footer">
        <div class="inner-footer responsive-wrapper">
            <a href="#" class="footer-icon"><i class="fa-brands fa-facebook"></i></a>
			<a href="#" class="footer-icon"><i class="fa-brands fa-instagram"></i></a>
			<a href="#" class="footer-icon"><i class="fa-brands fa-whatsapp"></i></a>
        </div>
    </footer>

</template>

<style>
:root {
	--footer-outer-height: 110px;
	--header-inner-height: 70px;
}

.outer-footer{
    height: var(--footer-outer-height);
	position: absolute;
	bottom: 0;
    left: 0;
    right: 0;
	display: flex;
	align-items: center;
	background-color: white;
	box-shadow: 2px 0px 10px 0 rgba(0,0,0, 0.1);
}

.responsive-wrapper {
	width: 90%;
	max-width: 1280px;;
}

.inner-footer{
    height: var(--footer-inner-height);
	position: sticky;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}

.footer-icon{
	color:black;
	font-size: 1.5rem;
}
</style>