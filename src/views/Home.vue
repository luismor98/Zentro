<script setup>
  import HeaderComp from "../components/HeaderComp.vue"
  import FooterComp from "../components/FooterComp.vue"
  import CardComp from "../components/CardComp.vue"
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
      <div class="card-container">
        <CardComp></CardComp>
        <CardComp></CardComp>
        <CardComp></CardComp>
      </div>
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

  .card-container{
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

</style>
