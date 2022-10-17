<template>
    <div class="404 justify-center">
      <v-img class="image" src="../../public/error.svg"/>
      <div class="text">
        <h1> ERROR 404 </h1>
        <h2> Page Not Found </h2>
        <h3> The page you are looking for does not exist. </h3>
        <h3>
          Please go back or
          <a href="/">click here</a>
          to return to Home
        </h3>
      </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500&display=swap');
.text{
  text-align: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 100%;
}
.image{
  margin: 3% auto 1% auto;
  width: 30%;
}
</style>