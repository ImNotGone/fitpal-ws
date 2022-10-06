<template>
  <div class="landing-page image">
    <TopToolbar/>
    <h1 class="ma-6 white--text">Welcome to your exercise companion</h1>
    <h2 class="ma-6 white--text">Exercise at home today!</h2>
    <NoLoginFooter/>
  </div>
</template>


<script>
import TopToolbar from "@/components/TopToolbar";
import NoLoginFooter from "@/components/NoLoginFooter";
export default {
  components: {NoLoginFooter, TopToolbar}
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600&display=swap');
  .image{
    background-image: url('../assets/background-landingpage.jpg');
    background-size: cover;
    height: 100%;
    width: 100%;
  }
  h1{
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 300%;
    width: 50%;
  }
  h2{
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 200%;
    width: 50%;
  }
</style>