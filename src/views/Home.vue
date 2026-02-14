<script setup>
  import HeaderComp from "../components/HeaderComp.vue"
  import FooterComp from "../components/FooterComp.vue"
  import CardComp from "../components/FooterComp.vue"
</script>

<template>
  <div class="grid-main">
    <nav>  <HeaderComp></HeaderComp> </nav>
    <div class="main-content">   
      <div class="searchbox-bar">
        <h2 class="title">Conecta con tu Ciudad</h2>
        <p>Descubre emprendimientos verificados cerca de ti</p>
        <form onsubmit="#;" role="search">
          <input type="serach" class="search-input" id="search-input" name="search-input" placeholder="Buscar...">
          <button class="button" type="button">
            <span>Buscar</span>
          </button>
        </form>
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, vero? Molestias enim nulla, minus nostrum minima adipisci delectus expedita corporis dicta! At non quo pariatur, illum, tempore qui ad enim accusantium illo in necessitatibus animi asperiores nam nemo repudiandae culpa unde. Similique itaque quaerat doloribus voluptatem eligendi, corrupti provident temporibus iusto tempore labore odio perferendis quas, repellat, voluptate obcaecati sit officiis nostrum nemo. Obcaecati neque officiis alias mollitia voluptas distinctio assumenda vero et, architecto quasi aliquid vitae unde dolorum? Earum culpa illo corrupti itaque mollitia laborum similique, modi nesciunt quisquam blanditiis hic exercitationem assumenda perferendis dolorum fugiat, eligendi debitis quae, reiciendis ipsum doloribus animi? In, excepturi sunt ipsam corporis, non voluptatum at accusantium doloremque labore minus quod! Magni doloribus voluptate molestias voluptas, nulla facere sint accusantium natus modi veritatis ipsam omnis delectus dolore? Quaerat nostrum aut optio eum. Obcaecati aspernatur quibusdam sapiente enim dolorem dolor, doloremque consectetur. Nisi odio beatae inventore commodi quidem id ratione nihil. Perspiciatis perferendis similique consectetur fuga ullam labore deserunt aut est nisi! Eaque eius ullam praesentium. Minima eum nesciunt dignissimos ipsum, doloribus sint eius autem consequuntur? Dolor aliquid sint quas nisi! Labore nostrum quo non neque sapiente, ab eaque. Mollitia nulla soluta aut quidem ducimus.
      </p>
    </div>
    <footer> <FooterComp></FooterComp> </footer>
  </div>
</template>

<style scoped>
  
  .grid-main{
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    grid-template-areas: 
    "navbar"
    "content"
    "footer";
  }

  .grid-main nav{
    grid-area: navbar;
  }

  .grid-main footer{
    grid-area: footer;
    position: relative;
    bottom: 0;
  }

  .main-content{
    grid-area: content;
    padding-top: 6.5rem;
  }

  .searchbox-bar{
    background-color: lightgray;
    width: 100%;
    min-height: 250px;
    align-content: center;
    text-align: center;
  }

  .title{
    font-weight: lighter;
    font-size: 2.3rem;
  }

  .search-input {
  margin: 20px;
  outline: none;
  }

  

  .button{
    --button-background: #fff;
    --button-background-hover: #eee;
    --button-color: #333;

    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--button-background);
    color: var(--button-color);
    outline: none;
    border: solid;
    border-radius: 5px;
    border-width: 2px;
    border-color: #1f2e3e;
    padding: 6px 12px;
    cursor: pointer;
  }

  .button:hover,
  .button:active{
    background-color: var(--button-background-hover);
  }

  .card-list {
	width: 90%;
	max-width: 400px;
  position: absolute;
  align-content: center;
  text-align: center;
  display: flex;
}
</style>
