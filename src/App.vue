<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar--title">
        Todo Sticky Notes App
      </div>
      <div class="navbar--menu">
        <router-link to="/">Home</router-link>
        <router-link to="/note/new">Add</router-link>
      </div>
    </nav>
    <section id="content">
      <router-view/>
    </section>

  </div>
</template>

<style lang="scss">
  @import './assets/styles/custom.scss';
  body, * {
    margin: 0;
    padding: 0;
    color: $font-primary;
    font-family: Roboto, Arial, Avenir, sans-serif;
    font-size: 14px;
  }

  .navbar{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: $primary;
    padding: 30px;

    & .navbar--title{
      font-size: 1.6em;
    }

    & .navbar--menu{
      & a{
        font-size: 16px;
        height: 100%;

        padding: 35px;

        &:hover{
          background: #55a0fa;
        }
      }
    }
  }
</style>
