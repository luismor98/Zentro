<script setup>
  import HeaderComp from "../components/HeaderComp.vue"
  import FooterComp from "../components/FooterComp.vue"
</script>

<template>
    <div class="grid-detail">
        <nav>
            <HeaderComp></HeaderComp>
        </nav>
        <div class="detail-content">
            <img src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/themes/2160462672/assets/placeholder.png?1746171717218425" alt="" class="img-detail">
        
            <div class="desc-bar">
                <h3>Descripcion</h3>
                <button class="button2" type="button">
                <span><i class="fa-regular fa-heart"></i></span>
                </button>
            </div>
            <div class="divisor"></div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta praesentium dolorum reiciendis, assumenda totam fugit, natus vitae deleniti ea maxime debitis perferendis, asperiores aliquam optio illum voluptatum rem sapiente incidunt nulla aliquid ratione dolorem? Explicabo facere iste excepturi. Soluta veritatis dolor possimus magni molestias quos ducimus molestiae? Ut voluptate veniam, modi quisquam facilis accusantium sit. Maiores, itaque veritatis. Inventore, aliquam. Necessitatibus consequatur perspiciatis atque nisi velit dolores voluptas nulla laudantium minus maiores pariatur laborum illo, blanditiis non expedita culpa aliquam eligendi quam in temporibus iste ex quae aspernatur tempore! Consequuntur adipisci temporibus pariatur error qui reiciendis dignissimos necessitatibus numquam voluptate. Similique, natus recusandae deleniti atque non cupiditate eius debitis omnis itaque doloribus, aut aperiam doloremque molestias iure beatae dolorem exercitationem dolorum amet id? Aspernatur totam odit dolorum aliquid earum in nemo ipsum, ad aliquam commodi corrupti repellendus provident quas nam minima, repudiandae quo quia velit error illum minus amet laudantium! Ipsum, vero? Eaque quis architecto facere, ad sunt sed, perferendis nam qui iste cum enim incidunt perspiciatis voluptatibus distinctio odit exercitationem commodi quos tempora autem, voluptates soluta illum tenetur ullam! Voluptate fuga illo culpa officia odit at repellat inventore, cum veniam. Quam unde ad culpa fuga natus? Porro nemo laborum soluta illo quos cupiditate deserunt quis assumenda recusandae amet ipsum fugit blanditiis at dolore, eos eius quia aperiam fuga quidem, dicta quae magni qui culpa. Fugit, assumenda a officiis provident illo praesentium amet architecto, unde dolorum excepturi voluptate cum, animi quas aliquam numquam corrupti? Doloribus quia praesentium vero quidem minima voluptatum, quo rerum eum fugit est eaque autem nisi cum ducimus nostrum sint incidunt minus esse placeat id distinctio consequatur voluptate consequuntur? Est ad harum repellendus facere quidem nobis laudantium beatae, cumque tenetur dolorem eos deserunt culpa perspiciatis autem dolore ullam, quos tempora. Fugit sed cumque harum numquam tempore saepe.</p>
        </div>
        <footer >
            <FooterComp></FooterComp>
        </footer>
    </div>
</template>

<style>
    .grid-detail{
        display: grid;
        grid-template-rows: auto 1fr auto;
        min-height: 100vh;
        grid-template-areas: 
        "navbar"
        "content"
        "footer";
    }

    .grid-detail nav{
        grid-area: navbar;
    }

    .grid-detail footer{
        grid-area: footer;
        position: relative;
        bottom: 0;
    }

    .detail-content{
        grid-area: content;
        padding-top: 6.5rem;
        justify-items: center;
        align-items: center;
    }

    .detail-content p{
        padding: 1rem;
        text-align: justify;
    }

    .img-detail{
        max-height: 400px;
        min-width: 100%;
    }

    .desc-bar{
        padding: 3rem;
        background-color: #fff;
        display: grid;
        grid-template-columns:  1fr auto;
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

    .divisor{
        background-color: #000;
        height: 0.10rem;
        margin-top: 1.5rem;
        margin-left: 2rem;
        margin-right: 2rem;
        opacity: 0.30;
    }
</style>