<template>
  <div>
    <nav>
      <p><b>Quiz app</b></p>
      <p>Correct: {{ numCorrect }}/{{ numTotal }}</p>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["numCorrect", "numTotal"],
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  border-bottom: 2px solid #ddd;
  padding: 1em;
}
p {
  margin: 0 1em;
}
</style>