<template>
  <li>
    Срок:
    <div class="task-card__datepicker">
      <Datepicker
        :value="dueDate"
        format="dd.MM.yyyy"
        :disabled-dates="{ to: new Date(Date.now() - 8640000) }"
        @input="$emit('input', $event)"
      />
    </div>
  </li>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
  name: 'TaskCardCreatorDueDateSelector',
  components: { Datepicker },
  model: {
    prop: 'dueDate',
    event: 'input'
  },
  props: {
    dueDate: {
      type: Date,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
.task-card {
  &__datepicker {
    margin-left: 5px;

    &::v-deep input {
      @include r-s16-h21;
      text-decoration: none;
      color: $gray-900;
      border: none;
      padding: 0;
      margin: 0;
      outline: 0;
    }
  }
}
</style>
