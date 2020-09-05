<template>
  <ul class="social fade-in">
    <li>
      <a href="https://www.facebook.com/diegoulises.martinezaguilar.1" target="blank">
        <i class="lab la-facebook"></i>
      </a>
    </li>

    <li>
      <a href="https://www.instagram.com/diego.ulisess/" target="blank">
        <i class="lab la-instagram"></i>
      </a>
    </li>

    <li>
      <a href="https://github.com/Diego-Ulises" target="blank">
        <i class="lab la-github"></i>
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul.social {
  position: absolute;
  bottom: 40px;
  margin: 0;
  padding: 0;
  li {
    display: inline-block;
    margin: 0 10px;
    a {
      font-size: 30px;
      font-weight: normal;
      color: #424242;
      @media screen and (max-width: $break-small) {
        color: #fff;
      }
    }
  }
}
</style>