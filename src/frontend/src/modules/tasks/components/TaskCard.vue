<template>
  <AppDrop @drop="$emit('drop', $event)">
    <AppDrag :transfer-data="task">
      <div
        class="task"
        @click="$emit('click', task.id)"
      >
        <div
          v-if="task.user"
          class="task__user"
        >
          <div class="task__avatar">
            <img
              :src="task.user.avatar"
              alt="Аватар пользователя"
              width="20"
              height="20"
            />
          </div>
          {{ task.user.name }}
        </div>
        <div class="task__statuses">
          <span
            v-if="task.status"
            class="task__status"
            :class="`task__status--${task.status}`"
          />
          <span
            v-if="task.timeStatus"
            class="task__status"
            :class="`task__status--${task.timeStatus}`"
          />
        </div>
        <h5
          class="task__title"
          :class="{ 'task__title--first': !task.user }"
        >
          {{ task.title }}
        </h5>
        <TaskCardTags
          v-if="task.tags && task.tags.length"
          :tags="task.tags"
        />
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import AppDrag from '@/modules/drag-n-drop/AppDrag';
import AppDrop from '@/modules/drag-n-drop/AppDrop';
import TaskCardTags from '@/modules/tasks/components/TaskCardTags';

export default {
  name: 'TaskCard',
  components: {
    AppDrag,
    AppDrop,
    TaskCardTags
  },

  props: {
    task: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.task {
  $bl: ".task";

  display: flex;
  flex-wrap: wrap;

  padding: 8px;

  cursor: pointer;

  border-radius: 6px;
  background-color: $white-900;
  box-shadow: 0 4px 8px $shadow-500;

  &:hover {
    background-color: $blue-200;
  }

  &:active {
    box-shadow: 0 2px 4px $shadow-500;
  }

  &--backlog {
    box-shadow: none;

    #{$bl}__title {
      order: -2;

      max-width: 290px;
      margin-top: 0;
      margin-right: auto;
    }

    #{$bl}__statuses {
      order: -1;

      margin-left: 20px;
    }
  }

  &__user {
    @include m-s10-h21;

    display: flex;
    align-items: center;
    justify-content: space-between;

    max-width: 80%;
    margin-right: auto;
  }

  &__avatar {
    margin-right: 4px;

    img {
      display: block;

      width: 20px;
      height: 20px;
    }
  }

  &__statuses {
    display: flex;
    align-items: center;
    align-self: flex-start;

    height: 16px;
    margin: 3px 0 0 auto;
  }

  &__status {
    margin-left: 8px;
    border-radius: 50%;

    width: 8px;
    height: 8px;

    &:first-child {
      margin-left: 0;
    }

    &--green {
      background-color: $green-600;
    }

    &--orange {
      background-color: $orange-600;
    }

    &--red {
      background-color: $red-600;
    }

    &--time {
      width: 16px;
      height: 16px;

      background-image: url("~@/assets/img/status-time.svg");
      background-repeat: no-repeat;
      background-size: cover;
    }

    &--alert {
      width: 16px;
      height: 16px;

      background-image: url("~@/assets/img/status-alert.svg");
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  &__title {
    @include r-s14-h21;

    width: 100%;
    margin-top: 9px;
    margin-bottom: 0;

    &--first {
      width: 85%;
      margin-top: 0;
      order: -1;
    }
  }
}
</style>
