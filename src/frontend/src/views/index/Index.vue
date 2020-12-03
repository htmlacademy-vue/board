<template>
  <section
    class="desk"
    :class="{'desk--rubber': !isUserAuthorized}"
  >
    <router-view />
    <div class="desk__header">
      <div class="desk__header-top">
        <h1 class="desk__title">
          Design Coffee Lab
        </h1>

        <button
          v-if="getUserAttribute('isAdmin')"
          class="desk__add"
          type="button"
          @click="addColumn"
        >
          Добавить столбец
        </button>
      </div>

      <div class="desk__filters">
        <div class="desk__user-filter">
          <ul class="user-filter">
            <li
              v-for="user in users"
              :key="user.id"
              :title="user.name"
              class="user-filter__item"
              :class="{ active: filters.users.some(id => id === user.id) }"
              @click="filterTasks(user.id, 'users')"
            >
              <a class="user-filter__button">
                <img
                  :src="user.avatar"
                  alt="Аватар юзера"
                  width="24"
                  height="24"
                />
              </a>
            </li>
          </ul>
        </div>
        <div class="desk__meta-filter">
          <ul class="meta-filter">
            <li
              v-for="({ value, label }) in statuses"
              :key="value"
              class="meta-filter__item"
              :class="{ active: filters.statuses.some(s => s === value) }"
              @click="filterTasks(value, 'statuses')"
            >
              <a
                class="meta-filter__status"
                :class="`meta-filter__status--${value}`"
                :title="label"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      v-if="columns.length"
      ref="columns"
      class="desk__columns"
    >
      <DeskColumn
        v-for="column in columns"
        :key="column.id"
        :column="column"
        @update="put($event)"
        @delete="deleteColumn"
      />
    </div>

    <p
      v-else
      class="desk__emptiness"
    >
      Пока нет ни одной колонки
    </p>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import { statuses } from '@/common/constants';
import DeskColumn from '@/modules/columns/components/DeskColumn';

export default {
  name: 'IndexHome',
  layout: 'AppLayoutMain',
  components: {
    DeskColumn
  },

  data() {
    return {
      newColumnTitle: 'Новый столбец',
      statuses
    };
  },

  computed: {
    ...mapState(['users']),
    ...mapState('Auth', ['user']),
    ...mapState('Columns', ['columns']),
    ...mapState('Tasks', ['filters']),
    ...mapGetters('Auth', ['getUserAttribute']),
    isUserAuthorized() {
      return this.user && Object.keys(this.user).length;
    }
  },

  methods: {
    ...mapActions('Columns', ['post', 'put', 'delete']),
    ...mapMutations('Tasks', ['UPDATE_FILTERS']),
    async addColumn() {
      await this.post({ title: this.newColumnTitle });
      // Note: move horizontal scroll to the new column
      this.$refs.columns.scrollLeft = this.$refs.columns.scrollWidth;
    },

    deleteColumn(id) {
      this.delete(id);
    },

    filterTasks(item, entity) {
      const resultValues = [...this.filters[entity]];
      const itemIndex = resultValues.findIndex(el => el === item);
      ~itemIndex
        ? resultValues.splice(itemIndex, 1)
        : resultValues.push(item);
      this.UPDATE_FILTERS({
        [entity]: resultValues
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/meta-filter.scss";
.desk {
  $bl: '.desk';
  background-color: $white-900;
  padding-top: 27px;
  flex-grow: 1;
  width: calc(100% - 400px);
  display: flex;
  flex-direction: column;

  &--rubber {
    width: 100%;
  }

  &__header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 17px;
    margin-bottom: 24px;
  }

  &__header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  &__title {
    @include m-s24-h21;
    color: $black-900;
    margin: 0;
    margin-right: auto;
  }

  &__add {
    position: relative;
    padding: 0 0 0 35px;
    margin: 0;
    border: none;
    outline: none;
    background-color: transparent;
    color: $blue-gray-600;
    cursor: pointer;

    &::before {
      content: '';
      width: 24px;
      height: 24px;
      background-image: url('~@/assets/img/icon-add.svg');
      @include p_center-v;
    }

    &:hover {
      color: $blue-600;
    }

    &:active {
      color: $blue-300;
    }
  }

  &__filters {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 16px;
  }

  &__user-filter {
    margin-right: 40px;
  }

  &__columns {
    border-top: 1px solid $blue-gray-200;
    display: flex;
    flex-grow: 1;
    overflow-x: auto;
    overflow-y: hidden;
  }

  &__emptiness {
    margin: 0;
    padding-left: 17px;
    @include r-s14-h21;
  }
}

.user-filter {
  @include clear-list;

  display: flex;
  flex-direction: row-reverse;

  &__button {
    display: block;
    overflow: hidden;

    width: 24px;
    height: 24px;

    cursor: pointer;
    transition: 0.3s;

    border-radius: 50%;
    outline: none;
    background-color: $gray-100;

    img {
      display: block;

      width: 24px;
      height: 24px;
    }

    &:hover {
      box-shadow: 0 0 0 3px $orange-300;
    }
  }

  &__item {
    margin-right: -4px;
    transition: margin 0.2s;
  }

  &__item.active {
    margin-left: 8px;
    margin-right: 4px;

    .user-filter__button {
      box-shadow: 0 0 0 3px $blue-600;
    }
  }
}
</style>
