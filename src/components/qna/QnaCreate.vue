<template>
  <div>
    <write-form type="create"></write-form>
  </div>
</template>

<script>
export default {
  components: {
    "write-form": () => import("@/components/qna/include/WriteForm"),
  },
};
</script>

<style></style>
