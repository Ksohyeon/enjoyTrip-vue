<template>
  <div>
    <write-form type="create"></write-form>
  </div>
</template>

<script>
export default {
  components: {
    "write-form": () => import("@/components/place/include/WriteForm"),
  },
};
</script>

<style></style>