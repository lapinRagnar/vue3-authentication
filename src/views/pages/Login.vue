<template>
  
  <div class="row centrer ">
    <div class="col-md-6 ladiv">
      <h1>Login</h1>
      <div>
        <form>
          <div class="form-group mb-3">
            <input type="email" class="form-control" placeholder="email">
          </div>
          <div class="form-group mb-3">
            <input type="password" class="form-control" placeholder="mot de passe">
          </div>
          <div class="my-3">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
  .centrer{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .ladiv{
      width: 400px;
      height: 100px;
    }

  }


</style>

