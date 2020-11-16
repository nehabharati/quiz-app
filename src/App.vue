<template>
  <div id="app">
    <template v-if="index < 10">
      <Header
        :numCorrect="numCorrect"
        :numTotal="numTotal"
        v-if="questions.length"
      />
      <Questions
        v-if="questions.length"
        :currentQuestion="questions[index]"
        :next="next"
        :increment="increment"
      />
    </template>
    <Score v-if="index === 10" :numCorrect="numCorrect" :numTotal="numTotal" />
  </div>
</template>

<script>
import Questions from "./components/Questions";
import Header from "./components/Header";
import Score from "./components/Score";
import axios from "axios";

export default {
  name: "App",
  components: {
    Questions,
    Header,
    Score,
  },
  data() {
    return {
      questions: [],
      index: 0,
      numCorrect: 0,
      numTotal: 0,
    };
  },
  methods: {
    next() {
      this.index++;
    },
    increment(isCorrect) {
      if (isCorrect) {
        this.numCorrect++;
      }
      this.numTotal++;
    },
  },
  mounted: function () {
    axios
      .get("https://opentdb.com/api.php?amount=10&category=17&difficulty=easy")
      .then((res) => (this.questions = res.data.results));
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
