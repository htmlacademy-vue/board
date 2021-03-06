<template>
  <div
    ref="dialog"
    class="task-card"
    tabindex="0"
    @click.self="closeDialog"
    @keydown.esc="closeDialog"
  >
    <section class="task-card__wrapper">
      <button
        class="task-card__close"
        type="button"
        @click="closeDialog"
      />

      <div class="task-card__block">
        <div class="task-card__row">
          <input
            v-model="task.title"
            type="text"
            name="task_name"
            class="task-card__name"
            :class="{ 'task-card__name--min': editTaskId }"
            max="37"
          />

          <a
            v-if="editTaskId"
            class="task-card__edit task-card__edit--red"
            @click="removeTask"
          >
            Удалить Задачу
          </a>

          <span
            v-if="validations.title.error"
            class="task-card__error-text"
          >
            {{ validations.title.error }}
          </span>
        </div>
      </div>

      <div class="task-card__status">
        <h4 class="task-card__title">
          Выберите статус:
        </h4>

        <ul class="meta-filter task-card__meta">
          <li
            v-for="({ value, label }) in statusList"
            :key="value"
            class="meta-filter__item"
            :class="{ active: value === taskStatuses[task.statusId]}"
            @click="setStatus(value)"
          >
            <a
              class="meta-filter__status"
              :class="`meta-filter__status--${value}`"
              :title="label"
            />
          </li>
        </ul>
      </div>

      <div
        v-if="task.id"
        class="task-card__block"
      >
        <p class="task-card__date">
          #{{ task ? task.id : '*' }} создана {{ timeAgo }}
        </p>
      </div>

      <div class="task-card__block">
        <ul class="task-card__params">
          <TaskCardCreatorUserSelector v-model="task.userId" />
          <TaskCardCreatorDueDateSelector v-model="task.dueDate" />
        </ul>
      </div>

      <div class="task-card__block">
        <div class="task-card__description">
          <h4 class="task-card__title">
            Описание
          </h4>
          <textarea
            v-model="task.description"
            name="task_description"
            placeholder="Добавьте описание к задаче"
          />
        </div>
      </div>

      <div class="task-card__block">
        <div class="task-card__links">
          <h4 class="task-card__title">
            Ссылки
          </h4>

          <div class="task-card__links-item">
            <input
              v-model="task.url"
              type="text"
              name="task_link_url"
              placeholder="Введите url"
            />
            <span
              v-if="validations.url.error"
              class="task-card__error-text"
            >
              {{ validations.url.error }}
            </span>
            <input
              v-model="task.urlDescription"
              type="text"
              name="task_link_desc"
              placeholder="Добавьте описание к ссылке"
            />
          </div>
        </div>
      </div>

      <div class="task-card__block">
        <TaskCardViewTicksList
          :ticks="task.ticks"
          @createTick="createTick"
          @updateTick="updateTick"
          @removeTick="removeTick"
        />
      </div>

      <div class="task-card__block">
        <TaskCardCreatorTags
          :tags="task.tags"
          @setTags="$set(task, 'tags', $event)"
        />
      </div>

      <div class="task-card__buttons">
        <AppButton
          class="button--border"
          @click="closeDialog"
        >
          Отменить
        </AppButton>
        <AppButton
          class="button"
          :class="{'button--primary': isFormValid}"
          :disabled="!isFormValid"
          @click="submit"
        >
          Сохранить
        </AppButton>
      </div>
    </section>
  </div>
</template>

<script>
import TaskCardCreatorUserSelector
  from '@/modules/tasks/components/TaskCardCreatorUserSelector';
import TaskCardCreatorDueDateSelector
  from '@/modules/tasks/components/TaskCardCreatorDueDateSelector';
import TaskCardViewTicksList
  from '@/modules/tasks/components/TaskCardViewTicksList';
import TaskCardCreatorTags
  from '@/modules/tasks/components/TaskCardCreatorTags';
import { statuses } from '@/common/constants';
import { createUUIDv4, getTimeAgo } from '@/common/helpers';
import { mapActions, mapGetters } from 'vuex';
import validator from '@/common/mixins/validator';
import { TASK_DETAILS_CONFIG } from '@/common/queryConfig';
import taskStatuses from '@/common/enums/taskStatuses';

const createNewTask = () => ({
  userId: null,
  columnId: null,
  statusId: null,
  title: 'Название задачи',
  description: '',
  sortOrder: 0,
  dueDate: createNewDate(),
  url: '',
  urlDescription: '',
  ticks: [],
  tags: ''
});

const createNewTick = () => ({
  uuid: createUUIDv4(),
  taskId: null,
  text: '',
  done: false
});

const createNewDate = () => {
  return new Date(new Date().setHours(23,59,59,999));
};

export default {
  name: 'TaskCardCreator',
  components: {
    TaskCardCreatorUserSelector,
    TaskCardCreatorDueDateSelector,
    TaskCardViewTicksList,
    TaskCardCreatorTags
  },
  mixins: [validator],
  data() {
    return {
      task: createNewTask(),
      validations: {
        title: {
          error: '',
          rules: ['required']
        },
        url: {
          error: '',
          rules: ['url']
        }
      },
      isFormValid: true,
      statusList: statuses.slice(0, 3),
      taskStatuses
    };
  },
  computed: {
    ...mapGetters('Tasks', ['sidebarTasksCount']),
    editTaskId() {
      return this.$route.params.id;
    },
    timeAgo() {
      return getTimeAgo(this.task?.dueDate);
    }
  },
  watch: {
    task: {
      deep: true,
      handler() {
        this.isFormValid = true;
      }
    }
  },
  async created() {
    if (this.editTaskId) {
      try {
        const task = await this.$api.tasks.get(
          this.editTaskId, TASK_DETAILS_CONFIG
        );
        this.task = {
          ...task,
          dueDate: task.dueDate ? new Date(task.dueDate) : createNewDate(),
          ticks: task.ticks || []
        };
      } catch {
        this.$notifier.warning('Задача для редактирования не найдена');
      }
    }
  },
  mounted() {
    this.$refs.dialog.focus();
  },
  methods: {
    ...mapActions('Tasks', {
      tasksPost: 'post',
      tasksPut: 'put',
      taskDelete: 'delete'
    }),
    ...mapActions('Ticks', {
      ticksPost: 'post',
      ticksPut: 'put',
      tickDelete: 'delete'
    }),
    async submit() {
      if (!this.$validateFields(this.task, this.validations)) {
        this.isFormValid = false;
        return;
      }

      this.task = { ...this.task, sortOrder: this.sidebarTasksCount };
      const ticks = this.task.ticks;
      let id = this.task.id;
      if (this.editTaskId) {
        await this.tasksPut(this.task);
      } else {
        const task = await this.tasksPost(this.task);
        id = task.id;
      }
      // Note: submit all ticks with task id
      await this.submitTicks(id, ticks);
      this.closeDialog();
    },
    async submitTicks(taskId, ticks) {
      const promises = ticks
        .filter(tick => !tick.id)
        .map(tick => {
          if (!tick.text) {
            return;
          }
          delete tick.uuid;
          tick.taskId = taskId;
          return tick.id
            ? this.ticksPut(tick)
            : this.ticksPost(tick);
        });
      await Promise.all(promises);
    },
    createTick() {
      this.task.ticks = [...this.task.ticks, createNewTick()];
    },
    async updateTick(tick) {
      if (tick.id) {
        this.ticksPut(tick);
      } else {
        const index = this.task.ticks
          .findIndex(({ uuid }) => tick.uuid === uuid);
        if (~index) {
          this.task.ticks.splice(index, 1, tick);
        }
      }
    },
    async removeTick({ id, uuid }) {
      if (id) {
        await this.tickDelete(id);
        this.task.ticks = this.task.ticks.filter(tick => tick.id !== id);
      } else {
        this.task.ticks = this.task.ticks.filter(tick => tick.uuid !== uuid);
      }
    },
    async removeTask() {
      await this.taskDelete(this.editTaskId);
      this.$notifier.success('Задача удалена');
      this.$router.push('/').catch(() => {});
    },
    setStatus(status) {
      const [key] = Object.entries(taskStatuses)
        .find(([_, value]) => value === status);
      if (!this.task.statusId || this.task.statusId !== +key) {
        this.$set(this.task, 'statusId', +key);
      } else {
        this.$set(this.task, 'statusId', null);
      }
    },
    closeDialog() {
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/meta-filter.scss";
@import "~@/assets/scss/blocks/task-card.scss";
</style>
