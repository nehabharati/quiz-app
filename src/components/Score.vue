<template>
  <div>Your final score is {{ numCorrect }}/{{ numTotal }}</div>
</template>

<script>
export default {
  name: "Score",
  props: ["numCorrect", "numTotal"],
};
</script>

<style scoped>
div {
  font-size: 3rem;
  padding: 2em;
}
</style>