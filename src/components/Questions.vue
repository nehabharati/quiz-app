<template>
  <div class="questions-container">
    <div>
      <div class="query-container">
        {{ currentQuestion.question }}
      </div>

      <div class="answers">
        <div
          class="selected"
          v-for="(answer, index) in shuffledAnswers"
          :key="index"
          @click.prevent="selectAnswer(index)"
          :class="answerClass(index)"
        >
          {{ answer }}
        </div>
      </div>

      <button @click.prevent="next" class="next">Next</button>
      <button
        @click.prevent="submitAnswer"
        :disabled="selectedIndex === null || answered"
        class="submit"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "Questions",
  props: {
    currentQuestion: Object,
    next: Function,
    increment: Function,
  },
  data: function () {
    return {
      selectedIndex: null,
      correctIndex: null,
      shuffledAnswers: [],
      answered: false,
    };
  },
  computed: {
    answers() {
      let answers = [...this.currentQuestion.incorrect_answers];
      answers.push(this.currentQuestion.correct_answer);
      return answers;
    },
  },
  watch: {
    currentQuestion: {
      immediate: true,
      handler() {
        this.selectedIndex = null;
        this.answered = false;
        this.shuffleAnswers();
      },
    },
  },
  methods: {
    selectAnswer(index) {
      this.selectedIndex = index;
    },
    submitAnswer() {
      let isCorrect = false;
      if (this.selectedIndex === this.correctIndex) {
        isCorrect = true;
      }
      this.answered = true;
      this.increment(isCorrect);
    },
    shuffleAnswers() {
      let answers = [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer,
      ];
      this.shuffledAnswers = _.shuffle(answers);
      this.correctIndex = this.shuffledAnswers.indexOf(
        this.currentQuestion.correct_answer
      );
    },
    answerClass(index) {
      let answerClass = "";
      if (!this.answered && this.selectedIndex === index) {
        answerClass = "highlighted";
      } else if (this.answered && this.correctIndex === index) {
        answerClass = "is-correct";
      } else if (
        this.answered &&
        this.selectedIndex === index &&
        this.correctIndex !== index
      ) {
        answerClass = "is-incorrect";
      } else {
        answerClass = "";
      }
      return answerClass;
    },
  },
};
</script>

<style scoped>
.query-container {
  width: 50%;
  margin: 1em auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border-radius: 10px;
  padding: 4em;
  -webkit-box-shadow: 0px 0px 25px 10px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 0px 25px 10px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 0px 25px 10px rgba(0, 0, 0, 0.15);
}
.answers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-content: center;
  justify-content: center;
  width: 50%;
  margin: auto;
}
.answers .selected {
  padding: 1em;
  font-size: 1rem;
  background-color: #d8f5ff;
  border-radius: 10px;
  margin: 1em;
  cursor: pointer;
  border: 2px solid #00a2d8;
}
.answers .selected:hover {
  background-color: #b1ebff;
}
.is-correct {
  background-color: #89ffe2 !important;
  border: solid 2px #00b185 !important;
}
.highlighted {
  background-color: #4ed3ff !important;
  border: solid 2px#0084b1 !important;
}
.is-incorrect {
  background-color: #ffa789 !important;
  border: solid 2px #c43200 !important;
}
button {
  padding: 1em;
  border: none;
  margin: 0 1em;
  border-radius: 10px;
  width: 100px;
  font-size: 1rem;
  cursor: pointer;
}
button:disabled {
  background-color: #4fd44f;
}
.next {
  background-color: #ffa500;
  color: white;
}
.submit {
  background-color: #2aab2a;
  color: white;
}
@media screen and (max-width: 640px) {
  .query-container {
    padding: 2em;
    margin: 0 auto;
    margin-top: 1em;
    margin-bottom: 1em;
  }
  .answers {
    width: 100%;
  }
}
</style>