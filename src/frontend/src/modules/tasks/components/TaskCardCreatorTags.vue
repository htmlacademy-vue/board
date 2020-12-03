<template>
  <div class="task-card__tags">
    <div class="task-card__tags--text">
      Добавьте тэги, разделенные символом #
    </div>
    <transition name="replace">
      <TaskCardCreatorTagsAnalyzer
        v-if="showAnalyzer"
        class="task-card__tags-analyzer"
        :tags="tags"
        @setTags="setTags"
      />
    </transition>
  </div>
</template>

<script>
import TaskCardCreatorTagsAnalyzer
  from '@/modules/tasks/components/TaskCardCreatorTagsAnalyzer';

export default {
  name: 'TaskCardCreatorTags',
  components: { TaskCardCreatorTagsAnalyzer },
  props: {
    tags: {
      type: String,
      required: true
    }
  },
  data: () => ({
    showAnalyzer: true
  }),
  methods: {
    setTags(tags) {
      this.showAnalyzer = false;
      this.$emit('setTags', tags);
      setTimeout(() => {
        this.showAnalyzer = true;
      }, 100);
    }
  }
};
</script>

<style lang="scss" scoped>
.task-card__tags {
  &-analyzer {
    border: 1px solid $gray-100;
    border-radius: 6px;
    padding: 8px;
    outline: none;
    color: $blue-gray-600;
    @include r-s14-h21;
    box-sizing: border-box;
  }

  &--text {
    padding: 10px 0;
    @include r-s10-h12;
    color: $blue-gray-600;
  }

  .replace-enter-active, .replace-leave-active {
    transition: opacity .5s;
  }

  .replace-enter, .replace-leave-to {
    opacity: 0;
  }
}
</style>
