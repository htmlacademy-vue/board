<template>
  <li>
    Участник:
    <div class="task-card__participant">
      <button
        v-if="!currentWorkerId"
        type="button"
        class="task-card__link"
        @click="isMenuOpened = !isMenuOpened"
      >
        добавить пользователя
      </button>
      <button
        v-else
        class="users-list__user"
      >
        <img
          :src="currentWorker.avatar"
          @click="isMenuOpened = !isMenuOpened"
        />
        <span @click="isMenuOpened = !isMenuOpened">
          {{ currentWorker.name }}
        </span>
        <AppIcon
          class="icon--trash users-list__icon"
          @click="$emit('select', null)"
        />
      </button>
      <div class="task-card__users">
        <ul
          v-if="isMenuOpened"
          class="users-list"
        >
          <li
            v-for="user in users"
            :key="user.id"
          >
            <button
              class="users-list__user"
              @click="setUser(user.id)"
            >
              <img :src="user.avatar" />
              <span>{{ user.name }}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script>

export default {
  name: 'TaskCardCreatorUserSelector',
  model: {
    prop: 'currentWorkerId',
    event: 'select'
  },
  props: {
    currentWorkerId: {
      type: [String],
      default: null
    }
  },
  data() {
    return {
      isMenuOpened: false
    };
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    currentWorker() {
      return this.users.find(({ id }) => id === this.currentWorkerId);
    }
  },
  methods: {
    setUser(id) {
      this.$emit('select', id);
      this.isMenuOpened = false;
    }
  }
};
</script>
<style lang="scss" scoped>
  .task-card {

    &__participant {
      display: inline-block;
      vertical-align: baseline;
      margin-left: 10px;
    }
    &__users {
      position: absolute;
      display: block;
      right: 0;
      top: 0;
      z-index: 10;
      width: 210px;
      border-radius: 6px;
      box-sizing: border-box;
      background-color: #fff;
      box-shadow: 0 4px 8px rgba(54, 123, 245, .24);
    }
  }
  .users-list {
    list-style-type: none;
    margin: 0;
    padding: 8px;

    li {
      margin-bottom: 10px;
    }

    &__user {
      border: 0;
      outline: 0;
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0 23px 0 0;
      margin: 0;
      background-color: transparent;
      text-align: left;
      font-family: inherit;
      font-size: 14px;
      font-weight: 400;
      font-style: normal;
      line-height: 16px;
      cursor: pointer;
      position: relative;

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
      &:hover {
        text-decoration: none;
        .users-list__icon {
          opacity: 1;
        }
      }
    }

    &__icon {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0;
      transition: opacity .3s;
    }


  }
</style>
