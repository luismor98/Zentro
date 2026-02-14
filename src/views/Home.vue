<script setup>
  import HeaderComp from "../components/HeaderComp.vue"
  import FooterComp from "../components/FooterComp.vue"
  import CardComp from "../components/FooterComp.vue"
</script>

<template>
  <div class="grip-main">
    <HeaderComp></HeaderComp>
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
    <div class="home-content">
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam eaque aliquam fugiat placeat doloremque soluta voluptatem dolor pariatur omnis ipsa corrupti error odio minima laborum tempora tenetur repellendus, dignissimos repudiandae id facilis similique at atque beatae sequi. Itaque laboriosam ducimus nam inventore similique ea optio reiciendis nulla laudantium. Reprehenderit id illum, exercitationem delectus molestiae eligendi aspernatur incidunt provident minus. Consequuntur quasi tempora corporis cupiditate voluptatum, est doloribus. Blanditiis saepe aspernatur odit, id consequuntur ut corporis sapiente nostrum perspiciatis quos tempore molestiae laboriosam illum, debitis perferendis quo fugiat laborum, voluptatem repellat repellendus adipisci. Sunt ab consequatur sed excepturi odio veritatis, non ipsa cum! Repellat deleniti molestias nobis id temporibus facilis adipisci, non est quo sequi, perferendis exercitationem ipsum provident pariatur ad numquam expedita amet aliquid inventore velit. Beatae tempore quis quia id! Sit commodi possimus magni quas sunt similique, sed aut excepturi velit aperiam, sapiente aliquid. Minima tempora quasi voluptatem incidunt. Molestiae officiis corporis ipsum aliquam, obcaecati voluptatum doloremque dicta consequuntur repudiandae animi reprehenderit cupiditate necessitatibus expedita et voluptate non iste! Placeat dicta, consectetur alias modi fuga unde cum eveniet voluptatum dolorum, est officia laudantium dolore! Deserunt repellat autem a placeat, accusamus ut sequi rem qui, totam animi tempora necessitatibus rerum.</p>
    </div>
    <FooterComp></FooterComp>
  </div>
</template>

<style scoped>
  .grip-main{
    padding-top: 6.5rem;
    padding-bottom: 10%;
  }

  .searchbox-bar{
    background-color: lightgray;
    width: 100%;
    min-height: 250px;
    right: 0;
    position: absolute;
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
